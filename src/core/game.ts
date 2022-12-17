import { observable, makeObservable, action, computed } from 'mobx';
import { Activity } from './activity';
import { Location } from './location';

export class Game<Activities extends string, Locations extends string> {
  constructor(
    readonly activityRegistry: Map<Activities, Activity>,
    readonly locationRegistry: Map<Locations, Location<Locations>>,
  ) {
    makeObservable(this);
  }

  @observable
  idleActivity: Activity;
  @observable
  activeActivity: Activity;
  @observable
  currentLocation: Location<Locations>;

  @computed
  get availableActivities(): Activity[] {
    return [...this.currentLocation.activities];
  }

  @action
  changeLocation(newLocation: Locations) {
    this.currentLocation = this.locationRegistry.get(newLocation);
  }

  @action
  init(
    idleActivity: Activity,
    activeActivity: Activity,
    location: Location<Locations>,
  ) {
    this.activeActivity = activeActivity;
    this.idleActivity = idleActivity;
    this.currentLocation = location;
  }
}
