import { find, forEach, chain } from 'lodash';
import { action, computed, makeObservable, observable } from 'mobx';
import { Effect } from './effect';
import { GameRegistry } from './registry';

export class GameState<
  Activities extends string,
  Locations extends string,
  Resources extends string,
> {
  constructor(
    private readonly emptyActivity: Activities,
    private readonly startingLocation: Locations,
    private readonly registry: GameRegistry<Activities, Locations, Resources>,
  ) {
    this.currentLocation = this.startingLocation;

    makeObservable(this);

    this.init();
  }
  @computed
  get activeActivity(): Activities {
    return (
      find(this.registry.activities, activity => activity.active)?.id ||
      this.emptyActivity
    );
  }

  @observable
  currentLocation: Locations;

  @computed
  get availableActivities(): Activities[] {
    // TODO: remove duplicates?
    // TODO: maybe categories?
    return [
      this.emptyActivity,
      ...this.registry.locations[this.currentLocation].activities,
    ];
  }

  @computed
  get availableLocations(): Locations[] {
    return [...this.registry.locations[this.currentLocation].locations];
  }

  @computed
  get activeEffects(): Effect<Activities, Locations, Resources>[] {
    return [
      ...this.registry.locations[this.currentLocation].effects,
      ...this.registry.activities[this.activeActivity].effects,
    ];
  }

  @action
  changeLocation(newLocation: Locations) {
    if (this.availableLocations.includes(newLocation)) {
      this.currentLocation = newLocation;
    }

    this.checkActiveActivities();
  }

  @action
  changeActivity(activity: Activities) {
    this.registry.activities[this.activeActivity].setActive(false);
    this.registry.activities[activity].setActive(true);

    this.checkActiveActivities();
  }

  @action
  changeResourcesTick() {
    const result = chain(this.activeEffects)
      .groupBy(effect => effect.resource)
      .mapValues(effects => {
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
          return 0;
        }

        return baseValue * (1 + additiveMult) * multiplicativeMult;
      })
      .value();

    forEach(result, (value, res) => {
      this.registry.resources[res as Resources].add(value || 0);
    });
  }

  @action
  init() {
    const emptyActivityInst = this.registry.activities[this.emptyActivity];

    emptyActivityInst.setActive(true);
  }

  @computed
  private get availableActivitiesSet(): Set<Activities> {
    return new Set(this.availableActivities);
  }

  private checkActiveActivities() {
    if (!this.availableActivities.includes(this.activeActivity)) {
      this.registry.activities[this.activeActivity].setActive(false);
      this.registry.activities[this.emptyActivity].setActive(true);
    }
  }
}
