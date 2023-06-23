import { makeObservable, observable } from 'mobx';

export type ActivityDef<
  ActivityKeys extends string,
  ActivityTags extends string,
  ResourceKeys extends string,
> = {
  id: ActivityKeys;
  name: string;
  tags: ActivityTags[];
  resources?: { [key in ResourceKeys]?: number };
};

export class Activity<
  ActivityKeys extends string,
  ActivityTags extends string,
  ResourceKeys extends string,
> {
  constructor(init: {
    id: ActivityKeys;
    name: string;
    tags: Set<ActivityTags>;
    resources: { [key in ResourceKeys]?: number };
  }) {
    this.name = init.name;
    this.id = init.id;
    this.tags = init.tags;
    this.resources = init.resources;

    makeObservable(this, {
      name: false,
      id: false,
      tags: false,
      resources: false,
      setActive: false,
      active: observable,
    });
  }

  readonly name: string;
  readonly id: ActivityKeys;
  readonly tags: Set<ActivityTags>;
  readonly resources: { [key in ResourceKeys]?: number };

  active: Set<ActivityTags> = new Set();

  setActive(tag: ActivityTags, active: boolean) {
    if (!active) {
      this.active.delete(tag);
    } else {
      this.active.add(tag);
    }
  }
}
