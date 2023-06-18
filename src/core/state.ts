import { action, computed, makeObservable, observable } from 'mobx';
import { Activity } from './activity';
import { Location } from './location';
import { GameRegistry } from './registry';

export class GameState<
  Activities extends string,
  Locations extends string,
  ActivityTags extends string,
  Resources extends string,
> {
  private readonly emptyActivity: Activity<Activities, ActivityTags>;
  private readonly startingLocation: Location<
    Locations,
    Activities,
    ActivityTags
  >;

  constructor(
    emptyActivityId: Activities,
    startingLocationId: Locations,
    private readonly registry: GameRegistry<
      Activities,
      Locations,
      ActivityTags,
      Resources
    >,
  ) {
    this.emptyActivity = registry.activities[emptyActivityId];
    this.startingLocation = registry.locations[startingLocationId];

    this.activeActivity = this.registry.parallelActivityTags.reduce(
      (acc, item) => {
        acc[item] = this.emptyActivity;

        return acc;
      },
      {} as { [key in ActivityTags]: Activity<Activities, ActivityTags> },
    );

    this.currentLocation = this.startingLocation;

    makeObservable(this);
  }
  @observable
  activeActivity: {
    [key in ActivityTags]: Activity<Activities, ActivityTags>;
  };
  @observable
  currentLocation: Location<Locations, Activities, ActivityTags>;

  availableActivitiesByTag(
    tag: ActivityTags,
  ): Activity<Activities, ActivityTags>[] {
    return this.availableActivities.filter(
      a => a.tags.has(tag) || a === this.emptyActivity,
    );
  }

  @computed
  get availableLocations(): Location<Locations, Activities, ActivityTags>[] {
    return [...this.currentLocation.locations];
  }

  @action
  changeLocation(newLocation: Locations) {
    const newLocationInst = this.registry.locations[newLocation];

    if (this.availableLocations.includes(newLocationInst)) {
      this.currentLocation = newLocationInst;
    }

    this.checkActiveActivities();
  }

  @action
  changeActivity(tag: ActivityTags, activity: Activities) {
    if (this.registry.parallelActivityTags.includes(tag)) {
      this.activeActivity[tag] = this.registry.activities[activity];
    }

    this.checkActiveActivities();
  }

  availableActivitiesSetByTag(tag: ActivityTags): Set<Activities> {
    return new Set(
      this.availableActivities
        .filter(a => a.tags.has(tag) || a === this.emptyActivity)
        .map(a => a.id),
    );
  }

  @computed
  private get availableActivities(): Activity<Activities, ActivityTags>[] {
    // TODO: remove duplicates?
    // TODO: maybe categories?
    return [this.emptyActivity, ...this.currentLocation.activities];
  }

  @computed
  private get availableActivitiesSet(): Set<Activities> {
    return new Set(this.availableActivities.map(a => a.id));
  }

  private checkActiveActivities() {
    this.registry.parallelActivityTags.forEach(tag => {
      if (
        !this.availableActivitiesSetByTag(tag).has(this.activeActivity[tag].id)
      ) {
        this.activeActivity[tag] = this.emptyActivity;
      }
    });
  }
}
