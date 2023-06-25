import { chain } from 'lodash';
import { Effect } from './effect';

export function resolveEffects<
  ActivityKeys extends string,
  LocationKeys extends string,
  ResourceKeys extends string,
>(effects: Effect<ActivityKeys, LocationKeys, ResourceKeys>[]): number {
  const baseValue = chain(effects)
    .filter(effect => !!effect.value.baseAmnt)
    .sumBy(effect => effect.value.baseAmnt || 0)
    .value();

  const additiveMult = chain(effects)
    .filter(effect => !!effect.value.addMult)
    .sumBy(effect => effect.value.addMult || 0)
    .value();

  const multiplicativeMult = chain(effects)
    .filter(effect => !!effect.value.multMult)
    .reduce((mul, effect) => mul * (effect.value.multMult || 1), 1)
    .value();

  if (!baseValue) {
    return 0;
  }

  return baseValue * (1 + additiveMult) * multiplicativeMult;
}
