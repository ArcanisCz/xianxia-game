import { Activity } from './activity';

export type LocationInit<LocationKeys, ActivityKeys> = {
  id: LocationKeys;
  name: string;
  activities: ActivityKeys[];
};

export class Location<LocationKeys, ActivityKeys> {
  constructor(init: LocationInit<LocationKeys, ActivityKeys>) {
    this.name = init.name;
    this.id = init.id;
    // this.activities = [...init.activities];
  }

  readonly name: string;
  readonly id: LocationKeys;
  readonly activities: Activity<ActivityKeys>[];
}
