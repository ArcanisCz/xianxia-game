import { action, computed, makeObservable, observable } from 'mobx';
import { computedFn } from 'mobx-utils';
import { Activity } from './activity';
import { Location } from './location';
import { ActivityTagDef } from './activityTag';

export class Game<
  Activities extends string,
  Locations extends string,
  ActivityTags extends string,
> {
  constructor(
    readonly activityRegistry: {
      [key in Activities]: Activity<Activities, ActivityTags>;
    },
    readonly locationRegistry: {
      [key in Locations]: Location<Locations, Activities, ActivityTags>;
    },
    readonly activityTagsRegistry: {
      [key in ActivityTags]: ActivityTagDef<ActivityTags>;
    },
    readonly emptyActivity: Activity<Activities, ActivityTags>,
    readonly emptyLocation: Location<Locations, Activities, ActivityTags>,
    readonly parallelActivityTags: ActivityTags[],
  ) {
    this.activeActivity = parallelActivityTags.reduce((acc, item) => {
      acc[item] = emptyActivity;

      return acc;
    }, {} as { [key in ActivityTags]: Activity<Activities, ActivityTags> });
    this.currentLocation = emptyLocation;

    makeObservable(this);
  }

  @observable
  activeActivity: {
    [key in ActivityTags]: Activity<Activities, ActivityTags>;
  };
  @observable
  currentLocation: Location<Locations, Activities, ActivityTags>;

  @computed
  get availableActivities(): Activity<Activities, ActivityTags>[] {
    // TODO: remove duplicates?
    // TODO: maybe categories?
    return [this.emptyActivity, ...this.currentLocation.activities];
  }

  availableActivitiesByTag = computedFn(
    (tag: ActivityTags): Activity<Activities, ActivityTags>[] =>
      this.availableActivities.filter(a => a.tags.has(tag)),
  );

  @computed
  get availableActivitiesSet(): Set<Activities> {
    return new Set(this.availableActivities.map(a => a.id));
  }

  availableActivitiesSetByTag = computedFn(
    (tag: ActivityTags): Set<Activities> => {
      return new Set(
        this.availableActivities.filter(a => a.tags.has(tag)).map(a => a.id),
      );
    },
  );

  @action
  changeLocation(newLocation: Locations) {
    this.currentLocation = this.locationRegistry[newLocation];

    this.checkActiveActivities();
  }

  @action
  changeActivity(tag: ActivityTags, activity: Activities) {
    if (this.parallelActivityTags.includes(tag)) {
      this.activeActivity[tag] = this.activityRegistry[activity];
    }

    this.checkActiveActivities();
  }

  private checkActiveActivities() {
    this.parallelActivityTags.forEach(tag => {
      if (
        !this.availableActivitiesSetByTag(tag).has(this.activeActivity[tag].id)
      ) {
        this.activeActivity[tag] = this.emptyActivity;
      }
    });
  }
}
