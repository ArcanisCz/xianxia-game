import { makeObservable } from 'mobx';

export type EffectDef<ResourceKeys extends string> = {
  resource: ResourceKeys;
  resourceTarget: 'gain' | 'max';
  value: Value;
};

export class Effect<
  ActivityKeys extends string,
  LocationKeys extends string,
  ResourceKeys extends string,
  StageKeys extends string,
> {
  constructor(
    init: EffectDef<ResourceKeys>,
    source: Source<ActivityKeys, LocationKeys, StageKeys>,
  ) {
    this.resource = init.resource;
    this.source = source;
    this.value = init.value;
    this.resourceTarget = init.resourceTarget;

    makeObservable(this, {
      source: false,
      resource: false,
      value: false,
      resourceTarget: false,
    });
  }

  readonly resource: ResourceKeys;
  readonly resourceTarget: 'gain' | 'max';
  readonly source: Source<ActivityKeys, LocationKeys, StageKeys>;
  readonly value: Value;
}

type Source<ActivityKeys, LocationKeys, StageKeys> =
  | {
      location: LocationKeys;
      activity?: never;
      stage?: never;
    }
  | {
      location?: never;
      activity: ActivityKeys;
      stage?: never;
    }
  | {
      location?: never;
      activity?: never;
      stage: StageKeys;
    };

type Value =
  | {
      baseAmnt: number;
      addMult?: never;
      multMult?: never;
    }
  | {
      baseAmnt?: never;
      addMult: number;
      multMult?: never;
    }
  | {
      baseAmnt?: never;
      addMult?: never;
      multMult: number;
    };
