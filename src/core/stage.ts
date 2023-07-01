import { makeObservable } from 'mobx';
import { EffectDef, Effect } from './effect';

export type StageDef<ResourceKeys extends string, StageKeys extends string> = {
  id: StageKeys;
  name: string;
  effects?: EffectDef<ResourceKeys>[];
  // TODO: upgrade to next.
  nextStage?: StageKeys;
};

export class Stage<
  ActivityKeys extends string,
  LocationKeys extends string,
  ResourceKeys extends string,
  StageKeys extends string,
  UpgradeKeys extends string,
> {
  constructor(init: {
    id: StageKeys;
    name: string;
    nextStage?: StageKeys;
    effects: Effect<ActivityKeys, LocationKeys, ResourceKeys, StageKeys, UpgradeKeys>[];
  }) {
    this.name = init.name;
    this.id = init.id;
    this.nextStage = init.nextStage;
    this.effects = init.effects;

    makeObservable(this, {
      name: false,
      id: false,
      nextStage: false,
      effects: false,
    });
  }

  readonly name: string;
  readonly id: StageKeys;
  readonly nextStage?: StageKeys;
  readonly effects: Effect<
    ActivityKeys,
    LocationKeys,
    ResourceKeys,
    StageKeys,
    UpgradeKeys
  >[];
}
