import { filter, reduce, sumBy } from 'lodash';
import React, { Fragment } from 'react';
import { ResourceKeys, GameEffect, XianxiaGame } from '../game';
import { withRootStore } from '../gameProvider';
import css from './resourceEffectList.module.css';
import { formatResourceValue } from './utils';

export const ResourceEffectList = withRootStore<{
  resourceKey: ResourceKeys;
  type: 'max' | 'gain';
}>(({ game, resourceKey, type }) => {
  const resource = game.gameRegistry.resources[resourceKey];

  const effects =
    type === 'gain'
      ? resource.getActiveGainEffects
      : resource.getActiveMaxEffects;

  if (!effects.length) {
    return null;
  }

  const base = filter(effects, effect => !!effect.value.baseAmnt);

  if (!base.length) {
    return null;
  }

  const additive = filter(effects, effect => !!effect.value.addMult);
  const multiplicative = filter(effects, effect => !!effect.value.multMult);
  const sumBase = sumBy(base, eff => eff.value.baseAmnt || 0);
  const sumAdd = sumBy(additive, eff => eff.value.addMult || 0);
  const sumMult = reduce(
    multiplicative,
    (acc, eff) => acc * (eff.value.multMult || 1),
    1,
  );

  return (
    <div className={css.container}>
      <div>{resource.name}</div>
      <div />

      {base.map(eff => (
        <Fragment
          key={
            formatSource(eff.source, game.gameRegistry) +
            '' +
            formatAmount(eff.value)
          }
        >
          <div>{formatSource(eff.source, game.gameRegistry)}:</div>
          <div>{formatAmount(eff.value)}</div>
        </Fragment>
      ))}
      <div />
      <div>= {formatResourceValue(sumBase)}</div>

      {additive.map(eff => (
        <Fragment
          key={
            formatSource(eff.source, game.gameRegistry) +
            '' +
            formatAmount(eff.value)
          }
        >
          <div>{formatSource(eff.source, game.gameRegistry)}:</div>
          <div>{formatAmount(eff.value)}</div>
        </Fragment>
      ))}
      {!!additive.length && (
        <>
          <div />
          <div>
            * {formatResourceValue(sumAdd + 1)} ={' '}
            {formatResourceValue(sumBase * (1 + sumAdd))}
          </div>
        </>
      )}

      {multiplicative.map(eff => (
        <Fragment
          key={
            formatSource(eff.source, game.gameRegistry) +
            '' +
            formatAmount(eff.value)
          }
        >
          <div>{formatSource(eff.source, game.gameRegistry)}: </div>
          <div>{formatAmount(eff.value)}</div>
        </Fragment>
      ))}
      {!!multiplicative.length && (
        <>
          <div />
          <div>
            * {formatResourceValue(sumMult)} ={' '}
            {formatResourceValue(sumBase * (1 + sumAdd) * sumMult)}
          </div>
        </>
      )}
    </div>
  );
});

function formatSource(
  source: GameEffect['source'],
  registry: XianxiaGame['gameRegistry'],
): string {
  if (source.activity) {
    return registry.activities[source.activity].name;
  }

  if (source.location) {
    return registry.locations[source.location].name;
  }

  if (source.upgrade) {
    return registry.upgrades[source.upgrade].name;
  }

  return registry.stages[source.stage].name;
}

function formatAmount(amount: GameEffect['value']): string {
  if (amount.baseAmnt) {
    return `+ ${formatResourceValue(amount.baseAmnt)}`;
  }

  if (amount.addMult) {
    return `+ ${formatResourceValue(amount.addMult * 100)} %`;
  }

  return `* ${formatResourceValue(((amount.multMult || 0) - 1) * 100)} %`;
}
