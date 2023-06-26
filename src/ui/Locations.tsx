import { LocationKeys } from 'game';
import { withRootStore } from '../gameProvider';

export const Locations = withRootStore(({ game }) => {
  const { gameRegistry, gameState } = game;

  const changeLocation = (locKey: LocationKeys) => {
    gameState.changeLocation(locKey);
  };

  const currentLocation = gameRegistry.locations[gameState.currentLocation];

  return (
    <div>
      <div>Locations: {currentLocation.name}</div>
      {currentLocation.locations.map(locKey => {
        const loc = gameRegistry.locations[locKey];

        return (
          <button key={locKey} onClick={() => changeLocation(locKey)}>
            {loc.name}
          </button>
        );
      })}
    </div>
  );
});
