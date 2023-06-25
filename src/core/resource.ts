import { makeObservable, observable } from 'mobx';
import { GameState } from './state';

export type ResourceDef<ResourceKeys extends string> = {
  id: ResourceKeys;
  name: string;
};

export class Resource<
  ActivityKeys extends string,
  LocationKeys extends string,
  ResourceKeys extends string,
> {
  constructor(
    init: { id: ResourceKeys; name: string },
    private readonly state: GameState<ActivityKeys, LocationKeys, ResourceKeys>,
  ) {
    this.name = init.name;
    this.id = init.id;
    this.state = state;

    makeObservable<Resource<ActivityKeys, LocationKeys, ResourceKeys>, 'state'>(
      this,
      {
        state: false,
        add: false,
        name: false,
        id: false,
        amount: observable,
      },
    );
  }

  readonly id: ResourceKeys;
  readonly name: string;

  amount: number = 0;
  // TODO: category

  add(amount: number) {
    this.amount += amount;
  }
}
