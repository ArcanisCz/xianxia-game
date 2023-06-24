import { mapValues, find, keyBy, reduce, forEach } from 'lodash';
import { action, computed, makeObservable, observable } from 'mobx';
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
    // TODO
    // const result = reduce(
    //   this.registry.parallelActivityTags,
    //   (acc, tag) => {
    //     const resources =
    //       this.registry.activities[this.activeActivity[tag]].resources;
    //
    //     forEach(resources, (value, res) => {
    //       if (!value) {
    //         return;
    //       }
    //
    //       if (!acc[res as Resources]) {
    //         acc[res as Resources] = 0;
    //       }
    //
    //       acc[res as Resources]! += value;
    //     });
    //
    //     return acc;
    //   },
    //   {} as { [key in Resources]?: number },
    // );
    //
    // forEach(result, (value, res) => {
    //   this.registry.resources[res as Resources].add(value || 0);
    // });
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
