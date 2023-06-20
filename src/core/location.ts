import { makeObservable } from 'mobx';

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
> {
  constructor(init: {
    id: LocationKeys;
    name: string;
    activities: ActivityKeys[];
    locations: LocationKeys[];
  }) {
    this.name = init.name;
    this.id = init.id;
    this.activities = init.activities;
    this.locations = init.locations;

    makeObservable(this, {
      name: false,
      id: false,
      activities: false,
      locations: false,
    });
  }

  readonly name: string;
  readonly id: LocationKeys;
  readonly activities: ActivityKeys[];
  readonly locations: LocationKeys[];
  // Danger Level
  // Spiritual particles density
}
