import { chain } from 'lodash';
import { Fragment } from 'react';
import { withRootStore } from '../gameProvider';
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
    </div>
  );
});
