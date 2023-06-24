import { makeObservable, observable } from 'mobx';
import { EffectDef, Effect } from './effect';

export type ActivityDef<
  ActivityKeys extends string,
  ActivityTags extends string,
  ResourceKeys extends string,
> = {
  id: ActivityKeys;
  name: string;
  tags: ActivityTags[];
  effects?: EffectDef<ResourceKeys>[];
};

export class Activity<
  ActivityKeys extends string,
  ActivityTags extends string,
  LocationKeys extends string,
  ResourceKeys extends string,
> {
  constructor(init: {
    id: ActivityKeys;
    name: string;
    tags: Set<ActivityTags>;
    effects: Effect<ActivityKeys, LocationKeys, ResourceKeys>[];
  }) {
    this.name = init.name;
    this.id = init.id;
    this.tags = init.tags;
    this.effects = init.effects;

    makeObservable(this, {
      name: false,
      id: false,
      tags: false,
      effects: false,
      setActive: false,
      active: observable,
    });
  }

  readonly name: string;
  readonly id: ActivityKeys;
  readonly tags: Set<ActivityTags>;
  readonly effects: Effect<ActivityKeys, LocationKeys, ResourceKeys>[];

  active: Set<ActivityTags> = new Set();

  setActive(tag: ActivityTags, active: boolean) {
    if (!active) {
      this.active.delete(tag);
    } else {
      this.active.add(tag);
    }
  }
}
