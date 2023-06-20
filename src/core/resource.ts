import { makeObservable, observable } from 'mobx';

export type ResourceDef<ResourceKeys> = {
  id: ResourceKeys;
  name: string;
};

export class Resource<ResourceKeys> {
  constructor(init: { id: ResourceKeys; name: string }) {
    this.name = init.name;
    this.id = init.id;

    makeObservable(this, {
      name: false,
      id: false,
      amount: observable,
    });
  }

  readonly id: ResourceKeys;
  readonly name: string;

  amount: number = 0;
  // TODO: category
}
