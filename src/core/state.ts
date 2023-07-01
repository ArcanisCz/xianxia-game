import { chain, groupBy } from 'lodash';
import { action, computed, makeObservable, observable } from 'mobx';
import { Effect } from './effect';
import { GameRegistry } from './registry';

export class GameState<
  Activities extends string,
  Locations extends string,
  Resources extends string,
  Stages extends string,
  Upgrades extends string,
> {
  constructor(
    private readonly emptyActivity: Activities,
    startingLocation: Locations,
    startingStage: Stages,
    private readonly registry: GameRegistry<
      Activities,
      Locations,
      Resources,
      Stages,
      Upgrades
    >,
  ) {
    this.currentLocation = startingLocation;
    this.currentStage = startingStage;
    this.activeActivity = this.emptyActivity;

    makeObservable(this);
  }
  @observable
  activeActivity: Activities;

  @observable
  currentLocation: Locations;

  @observable
  currentStage: Stages;

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
  get activeEffects(): Effect<
    Activities,
    Locations,
    Resources,
    Stages,
    Upgrades
  >[] {
    return [
      ...this.registry.locations[this.currentLocation].effects,
      ...this.registry.activities[this.activeActivity].effects,
      ...this.registry.stages[this.currentStage].effects,
    ];
  }

  @computed
  get activeEffectsByResource(): {
    [key in Resources]: Effect<
      Activities,
      Locations,
      Resources,
      Stages,
      Upgrades
    >[];
  } {
    return groupBy(this.activeEffects, effect => effect.resource) as {
      [key in Resources]: Effect<
        Activities,
        Locations,
        Resources,
        Stages,
        Upgrades
      >[];
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
    this.activeActivity = activity;

    this.checkActiveActivities();
  }

  @action
  changeResourcesTick() {
    chain(this.activeEffectsByResource)
      .keys()
      .forEach(resourceKey => {
        const resource = this.registry.resources[resourceKey as Resources];

        resource.add(resource.gainPerSec);
      })
      .value();
  }

  @computed
  private get availableActivitiesSet(): Set<Activities> {
    return new Set(this.availableActivities);
  }

  private checkActiveActivities() {
    if (!this.availableActivities.includes(this.activeActivity)) {
      this.activeActivity = this.emptyActivity;
    }
  }
}
