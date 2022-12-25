import { Activity } from './activity';

export type LocationDef<
  LocationKeys extends string,
  ActivityKeys extends string,
> = {
  id: LocationKeys;
  name: string;
  activities?: ActivityKeys[];
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
  }) {
    this.name = init.name;
    this.id = init.id;
    this.activities = init.activities;
  }

  readonly name: string;
  readonly id: LocationKeys;
  readonly activities: Activity<ActivityKeys, ActivityTagKeys>[];
  // Danger Level
  // Spiritual particles density
}
