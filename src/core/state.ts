import { mapValues, find, keyBy, reduce, forEach, chain } from 'lodash';
import { action, computed, makeObservable, observable } from 'mobx';
import { Effect } from './effect';
import { GameRegistry } from './registry';

export class GameState<
  Activities extends string,
  Locations extends string,
  ActivityTags extends string,
  Resources extends string,
> {
  constructor(
    private readonly emptyActivity: Activities,
    private readonly startingLocation: Locations,
    private readonly registry: GameRegistry<
      Activities,
      Locations,
      ActivityTags,
      Resources
    >,
  ) {
    this.currentLocation = this.startingLocation;

    makeObservable(this);

    this.init();
  }
  @computed
  get activeActivity(): {
    [key in ActivityTags]: Activities;
  } {
    return mapValues(keyBy(this.registry.parallelActivityTags), tag => {
      return (
        find(this.registry.activities, activity => activity.active.has(tag))
          ?.id || this.registry.activities
      );
    }) as { [key in ActivityTags]: Activities };
  }

  @observable
  currentLocation: Locations;

  availableActivitiesByTag(tag: ActivityTags): Activities[] {
    return this.availableActivities.filter(
      a =>
        this.registry.activities[a].tags.has(tag) || a === this.emptyActivity,
    );
  }

  @computed
  get availableLocations(): Locations[] {
    return [...this.registry.locations[this.currentLocation].locations];
  }

  @computed
  get activeEffects(): {
    [key in ActivityTags]: Effect<Activities, Locations, Resources>[];
  } {
    return reduce(
      this.registry.parallelActivityTags,
      (acc, tag) => {
        acc[tag] = [
          ...this.registry.locations[this.currentLocation].effects,
          ...this.registry.activities[this.activeActivity[tag]].effects,
        ];

        return acc;
      },
      {} as {
        [key in ActivityTags]: Effect<Activities, Locations, Resources>[];
      },
    );
  }

  @action
  changeLocation(newLocation: Locations) {
    if (this.availableLocations.includes(newLocation)) {
      this.currentLocation = newLocation;
    }

    this.checkActiveActivities();
  }

  @action
  changeActivity(tag: ActivityTags, activity: Activities) {
    if (this.registry.parallelActivityTags.includes(tag)) {
      this.registry.activities[this.activeActivity[tag]].setActive(tag, false);
      this.registry.activities[activity].setActive(tag, true);
    }

    this.checkActiveActivities();
  }

  @action
  changeResourcesTick() {
    const result = reduce(
      this.registry.parallelActivityTags,
      (acc, tag) => {
        chain(this.activeEffects[tag])
          .groupBy(effect => effect.resource)
          .forEach((effects, res) => {
            const baseValue = chain(effects)
              .filter(effect => !!effect.value.baseAmnt)
              .sumBy(effect => effect.value.baseAmnt || 0)
              .value();

            const additiveMult = chain(effects)
              .filter(effect => !!effect.value.addMult)
              .sumBy(effect => effect.value.addMult || 0)
              .value();

            const multiplicativeMult = chain(effects)
              .filter(effect => !!effect.value.multMult)
              .reduce((mul, effect) => mul * (effect.value.multMult || 1), 1)
              .value();

            if (!baseValue) {
              return;
            }

            if (!acc[res as Resources]) {
              acc[res as Resources] = 0;
            }

            acc[res as Resources]! +=
              baseValue * (1 + additiveMult) * multiplicativeMult;
          })
          .value();

        return acc;
      },
      {} as { [key in Resources]?: number },
    );

    forEach(result, (value, res) => {
      this.registry.resources[res as Resources].add(value || 0);
    });
  }

  @action
  init() {
    const emptyActivityInst = this.registry.activities[this.emptyActivity];

    this.registry.parallelActivityTags.forEach(tag => {
      emptyActivityInst.setActive(tag, true);
    });
  }

  availableActivitiesSetByTag(tag: ActivityTags): Set<Activities> {
    return new Set(
      this.availableActivities.filter(
        a =>
          this.registry.activities[a].tags.has(tag) || a === this.emptyActivity,
      ),
    );
  }

  @computed
  private get availableActivities(): Activities[] {
    // TODO: remove duplicates?
    // TODO: maybe categories?
    return [
      this.emptyActivity,
      ...this.registry.locations[this.currentLocation].activities,
    ];
  }

  @computed
  private get availableActivitiesSet(): Set<Activities> {
    return new Set(this.availableActivities);
  }

  private checkActiveActivities() {
    this.registry.parallelActivityTags.forEach(tag => {
      if (
        !this.availableActivitiesSetByTag(tag).has(this.activeActivity[tag])
      ) {
        this.registry.activities[this.activeActivity[tag]].setActive(
          tag,
          false,
        );
        this.registry.activities[this.emptyActivity].setActive(tag, true);
      }
    });
  }
}
