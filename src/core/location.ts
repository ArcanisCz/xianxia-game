import { Activity } from './activity';

export type LocationDef<
  LocationKeys extends string,
  ActivityKeys extends string,
> = {
  id: LocationKeys;
  name: string;
  activities?: ActivityKeys[];
  locations?: LocationKeys[];
};

export class Location<
  LocationKeys extends string,
  ActivityKeys extends string,
  ActivityTagKeys extends string,
> {
  constructor(init: {
    id: LocationKeys;
    name: string;
    activities: Activity<ActivityKeys, ActivityTagKeys>[];
    locations: Location<LocationKeys, ActivityKeys, ActivityTagKeys>[];
  }) {
    this.name = init.name;
    this.id = init.id;
    this.activities = init.activities;
    this.locations = init.locations;
  }

  readonly name: string;
  readonly id: LocationKeys;
  readonly activities: Activity<ActivityKeys, ActivityTagKeys>[];
  readonly locations: Location<LocationKeys, ActivityKeys, ActivityTagKeys>[];
  // Danger Level
  // Spiritual particles density
}
