import { observable, makeObservable, action, computed } from 'mobx';
import { Activity, ActivityTime } from './activity';
import { Location } from './location';

export class Game<Activities extends string, Locations extends string> {
  constructor(
    readonly activityRegistry: { [key in Activities]: Activity<Activities> },
    readonly locationRegistry: {
      [key in Locations]: Location<Locations, Activities>;
    },
    emptyActivity: Activity<Activities>,
    emptyLocation: Location<Locations, Activities>,
  ) {
    makeObservable(this);

    this.idleActivity = emptyActivity;
    this.activeActivity = emptyActivity;
    this.currentLocation = emptyLocation;
  }

  @observable
  idleActivity: Activity<Activities>;
  @observable
  activeActivity: Activity<Activities>;
  @observable
  currentLocation: Location<Locations, Activities>;

  @computed
  get availableDayActivities(): {
    [ActivityTime.Day]: Activity<Activities>[];
    [ActivityTime.Night]: Activity<Activities>[];
  } {
    return {
      [ActivityTime.Day]: [
        ...this.currentLocation.activities[ActivityTime.Day],
      ],
      [ActivityTime.Night]: [
        ...this.currentLocation.activities[ActivityTime.Night],
      ],
    };
  }

  @action
  changeLocation(newLocation: Locations) {
    this.currentLocation = this.locationRegistry[newLocation];
  }

  @action
  init(
    idleActivity: Activity<Activities>,
    activeActivity: Activity<Activities>,
    location: Location<Locations, Activities>,
  ) {
    this.activeActivity = activeActivity;
    this.idleActivity = idleActivity;
    this.currentLocation = location;
  }
}
