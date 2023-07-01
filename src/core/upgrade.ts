import { computed, makeObservable, observable } from 'mobx';
import { Effect, EffectDef } from './effect';

export type UpgradeDef<
  ActivityKeys extends string,
  ResourceKeys extends string,
  UpgradeKeys extends string,
> = {
  id: UpgradeKeys;
  name: string;
  activities?: ActivityKeys[];
  effects?: (level: number) => EffectDef<ResourceKeys>[];
  price?: (level: number) => { [key in ResourceKeys]?: number };
};

export class Upgrade<
  ActivityKeys extends string,
  LocationKeys extends string,
  ResourceKeys extends string,
  StageKeys extends string,
  UpgradeKeys extends string,
> {
  constructor(init: {
    id: UpgradeKeys;
    name: string;
    activities: ActivityKeys[];
    effects: (level: number) => EffectDef<ResourceKeys>[];
    price: (level: number) => { [key in ResourceKeys]?: number };
  }) {
    this.name = init.name;
    this.id = init.id;
    this.activities = init.activities;
    this.getEffects = init.effects;
    this.getPrice = init.price;

    makeObservable<
      Upgrade<ActivityKeys, LocationKeys, ResourceKeys, StageKeys, UpgradeKeys>,
      'getEffects' | 'getPrice'
    >(this, {
      name: false,
      id: false,
      activities: false,
      getEffects: false,
      getPrice: false,

      level: observable,

      effects: computed,
      price: computed,
    });
  }

  readonly name: string;
  readonly id: UpgradeKeys;
  readonly activities: ActivityKeys[];
  private readonly getEffects: (level: number) => EffectDef<ResourceKeys>[];
  private readonly getPrice: (level: number) => {
    [key in ResourceKeys]?: number;
  };

  level: number = 0;
  get effects(): Effect<
    ActivityKeys,
    LocationKeys,
    ResourceKeys,
    StageKeys,
    UpgradeKeys
  >[] {
    return this.getEffects(this.level).map(
      def =>
        new Effect(
          {
            resource: def.resource,
            resourceTarget: def.resourceTarget,
            value: def.value,
          },
          {
            upgrade: this.id,
          },
        ),
    );
  }

  get price(): {
    [key in ResourceKeys]?: number;
  } {
    return this.getPrice(this.level);
  }
}
