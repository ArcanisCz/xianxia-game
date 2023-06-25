import { makeObservable, observable } from 'mobx';
import { EffectDef, Effect } from './effect';

export type ActivityDef<
  ActivityKeys extends string,
  ResourceKeys extends string,
> = {
  id: ActivityKeys;
  name: string;
  effects?: EffectDef<ResourceKeys>[];
};

export class Activity<
  ActivityKeys extends string,
  LocationKeys extends string,
  ResourceKeys extends string,
> {
  constructor(init: {
    id: ActivityKeys;
    name: string;
    effects: Effect<ActivityKeys, LocationKeys, ResourceKeys>[];
  }) {
    this.name = init.name;
    this.id = init.id;
    this.effects = init.effects;

    makeObservable(this, {
      name: false,
      id: false,
      effects: false,
      setActive: false,
      active: observable,
    });
  }

  readonly name: string;
  readonly id: ActivityKeys;
  readonly effects: Effect<ActivityKeys, LocationKeys, ResourceKeys>[];

  active: boolean = false;

  setActive(active: boolean) {
    this.active = active;
  }
}
