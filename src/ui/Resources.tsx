import { chain } from 'lodash';
import { withRootStore } from '../gameProvider';

export const Resources = withRootStore(({ game }) => {
  const { gameRegistry } = game;

  return (
    <div>
      <div>Resources:</div>
      {chain(gameRegistry.resources)
        .mapValues(resource => (
          <div key={resource.id}>
            {resource.name}: {resource.amount} / {resource.max}
          </div>
        ))
        .toArray()
        .value()}
    </div>
  );
});
