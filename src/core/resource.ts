import { filter } from 'lodash';
import { computed, makeObservable, observable } from 'mobx';
import { Effect } from './effect';
import { GameState } from './state';
import { resolveEffects } from './utils';

export type ResourceDef<ResourceKeys extends string> = {
  id: ResourceKeys;
  name: string;
};

export class Resource<
  ActivityKeys extends string,
  LocationKeys extends string,
  ResourceKeys extends string,
> {
  constructor(init: { id: ResourceKeys; name: string }) {
    this.name = init.name;
    this.id = init.id;

    makeObservable<
      Resource<ActivityKeys, LocationKeys, ResourceKeys>,
      'gameState'
    >(this, {
      id: false,
      name: false,
      gameState: false,
      amount: observable,

      getActiveGainEffects: computed,
      getActiveMaxEffects: computed,
      max: computed,

      add: false,
      setGameState: false,
    });
  }

  private gameState?: GameState<ActivityKeys, LocationKeys, ResourceKeys>;

  readonly id: ResourceKeys;
  readonly name: string;

  amount: number = 0;
  // TODO: category

  get getActiveGainEffects(): Effect<
    ActivityKeys,
    LocationKeys,
    ResourceKeys
  >[] {
    return filter(
      this.gameState?.activeEffects,
      effect => effect.resource === this.id && effect.resourceTarget === 'gain',
    );
  }

  get getActiveMaxEffects(): Effect<
    ActivityKeys,
    LocationKeys,
    ResourceKeys
  >[] {
    return filter(
      this.gameState?.activeEffects,
      effect => effect.resource === this.id && effect.resourceTarget === 'max',
    );
  }

  get max(): number {
    return resolveEffects(this.getActiveMaxEffects);
  }

  add(amount: number) {
    this.amount += amount;
  }

  setGameState(gameState: GameState<ActivityKeys, LocationKeys, ResourceKeys>) {
    this.gameState = gameState;
  }
}
