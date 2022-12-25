import { action, computed, makeObservable, observable } from 'mobx';
import { Activity, ActivityTime } from './activity';
import { Location } from './location';

export class Game<Activities extends string, Locations extends string> {
  constructor(
    readonly activityRegistry: { [key in Activities]: Activity<Activities> },
    readonly locationRegistry: {
      [key in Locations]: Location<Locations, Activities>;
    },
    readonly emptyActivity: Activity<Activities>,
    emptyLocation: Location<Locations, Activities>,
  ) {
    this.activeActivity = {
      day: emptyActivity,
      night: emptyActivity,
    };
    this.currentLocation = emptyLocation;

    makeObservable(this);
  }

  @observable
  activeActivity: {
    [ActivityTime.Day]: Activity<Activities>;
    [ActivityTime.Night]: Activity<Activities>;
  };
  @observable
  currentLocation: Location<Locations, Activities>;

  @computed
  get availableActivities(): {
    [ActivityTime.Day]: Activity<Activities>[];
    [ActivityTime.Night]: Activity<Activities>[];
  } {
    // TODO: remove duplicates?
    // TODO: maybe categories?
    return {
      [ActivityTime.Day]: [
        this.emptyActivity,
        ...this.currentLocation.activities[ActivityTime.Day],
      ],
      [ActivityTime.Night]: [
        this.emptyActivity,
        ...this.currentLocation.activities[ActivityTime.Night],
      ],
    };
  }

  @computed
  get availableActivitiesSet(): {
    [ActivityTime.Day]: Set<Activities>;
    [ActivityTime.Night]: Set<Activities>;
  } {
    return {
      [ActivityTime.Day]: new Set(
        this.availableActivities[ActivityTime.Day].map(a => a.id),
      ),
      [ActivityTime.Night]: new Set(
        this.availableActivities[ActivityTime.Night].map(a => a.id),
      ),
    };
  }

  @action
  changeLocation(newLocation: Locations) {
    this.currentLocation = this.locationRegistry[newLocation];

    this.checkActiveActivities();
  }

  @action
  changeActivity(time: ActivityTime, activity: Activities) {
    this.activeActivity[time] = this.activityRegistry[activity];

    this.checkActiveActivities();
  }

  private checkActiveActivities() {
    if (
      !this.availableActivitiesSet[ActivityTime.Day].has(
        this.activeActivity[ActivityTime.Day].id,
      )
    ) {
      this.activeActivity[ActivityTime.Day] = this.emptyActivity;
    }

    if (
      !this.availableActivitiesSet[ActivityTime.Night].has(
        this.activeActivity[ActivityTime.Night].id,
      )
    ) {
      this.activeActivity[ActivityTime.Night] = this.emptyActivity;
    }
  }
}
