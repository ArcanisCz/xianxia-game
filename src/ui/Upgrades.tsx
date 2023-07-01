import { chain } from 'lodash';
import { withRootStore } from '../gameProvider';

export const Upgrades = withRootStore(({ game }) => {
  const { gameRegistry, gameState } = game;

  return (
    <div>
      <div>Upgrades</div>
      {chain(gameRegistry.upgrades)
        .mapValues(upgrade => {
          return (
            <button
              key={upgrade.id}
              disabled={!upgrade.canUpgrade}
              onClick={() => gameState.upgradeUpgrade(upgrade.id)}
            >
              {upgrade.name} ({upgrade.level}) ({JSON.stringify(upgrade.price)})
            </button>
          );
        })
        .toArray()
        .value()}
    </div>
  );
});
