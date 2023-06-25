import { chain, find, forEach, groupBy } from 'lodash';
import { action, computed, makeObservable, observable } from 'mobx';
import { Effect } from './effect';
import { GameRegistry } from './registry';
import { resolveEffects } from './utils';

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

  @computed
  get activeEffectsByResource(): {
    [key in Resources]: Effect<Activities, Locations, Resources>[];
  } {
    return groupBy(this.activeEffects, effect => effect.resource) as {
      [key in Resources]: Effect<Activities, Locations, Resources>[];
    };
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
    chain(this.activeEffectsByResource)
      .keys()
      .forEach(resourceKey => {
        const resource = this.registry.resources[resourceKey as Resources];

        resource.add(resolveEffects(resource.getActiveGainEffects));
      })
      .value();
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
