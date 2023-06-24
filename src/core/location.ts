import { makeObservable } from 'mobx';
import { Effect, EffectDef } from './effect';

export type LocationDef<
  LocationKeys extends string,
  ActivityKeys extends string,
  ResourceKeys extends string,
> = {
  id: LocationKeys;
  name: string;
  activities?: ActivityKeys[];
  locations?: LocationKeys[];
  effects?: EffectDef<ResourceKeys>[];
};

export class Location<
  LocationKeys extends string,
  ActivityKeys extends string,
  ResourceKeys extends string,
> {
  constructor(init: {
    id: LocationKeys;
    name: string;
    activities: ActivityKeys[];
    locations: LocationKeys[];
    effects: Effect<ActivityKeys, LocationKeys, ResourceKeys>[];
  }) {
    this.name = init.name;
    this.id = init.id;
    this.activities = init.activities;
    this.locations = init.locations;
    this.effects = init.effects;

    makeObservable(this, {
      name: false,
      id: false,
      activities: false,
      locations: false,
      effects: false,
    });
  }

  readonly name: string;
  readonly id: LocationKeys;
  readonly activities: ActivityKeys[];
  readonly locations: LocationKeys[];
  readonly effects: Effect<ActivityKeys, LocationKeys, ResourceKeys>[];
  // Danger Level
  // Spiritual particles density
}
