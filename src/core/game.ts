import { observable, makeObservable, action, computed } from 'mobx';
import { Activity } from './activity';
import { Location } from './location';

export class Game<Activities extends string, Locations extends string> {
  constructor(
    readonly activityRegistry: { [key in Activities]: Activity<Activities> },
    readonly locationRegistry: Map<Locations, Location<Locations>>,
    emptyActivity: Activity<Activities>,
  ) {
    makeObservable(this);

    this.idleActivity = emptyActivity;
    this.activeActivity = emptyActivity;
  }

  @observable
  idleActivity: Activity<Activities>;
  @observable
  activeActivity: Activity<Activities>;
  @observable
  currentLocation?: Location<Locations>;

  @computed
  get availableActivities(): Activity<Activities>[] {
    return [...(this.currentLocation?.activities || [])];
  }

  @action
  changeLocation(newLocation: Locations) {
    this.currentLocation = this.locationRegistry.get(newLocation);
  }

  @action
  init(
    idleActivity: Activity<Activities>,
    activeActivity: Activity<Activities>,
    location: Location<Locations>,
  ) {
    this.activeActivity = activeActivity;
    this.idleActivity = idleActivity;
    this.currentLocation = location;
  }
}
