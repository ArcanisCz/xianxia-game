import { chain } from 'lodash';
import { Fragment } from 'react';
import { withRootStore } from '../gameProvider';
import { ResourceEffectList } from './ResourceEffectList';
import { ResourceGain } from './ResourceGain';
import css from './resources.module.css';
import { formatResourceValue } from './utils';

export const Resources = withRootStore(({ game }) => {
  const { gameRegistry } = game;

  return (
    <div>
      <div>Resources:</div>
      <div className={css.resourceList}>
        {chain(gameRegistry.resources)
          .mapValues(resource => (
            <Fragment key={resource.id}>
              <div>{resource.name}</div>
              <div>{formatResourceValue(resource.amount)}</div>
              <div>/ {formatResourceValue(resource.max)}</div>
              <ResourceGain gain={resource.gainPerSec} />
            </Fragment>
          ))
          .toArray()
          .value()}
      </div>
      <div>Gains:</div>
      <div className={css.effectsList}>
        {chain(gameRegistry.resources)
          .mapValues(resource => (
            <ResourceEffectList
              key={resource.id}
              resourceKey={resource.id}
              type="gain"
            />
          ))
          .toArray()
          .value()}
      </div>
      <div>Max:</div>
      <div className={css.effectsList}>
        {chain(gameRegistry.resources)
          .mapValues(resource => (
            <ResourceEffectList
              key={resource.id}
              resourceKey={resource.id}
              type="max"
            />
          ))
          .toArray()
          .value()}
      </div>
    </div>
  );
});
