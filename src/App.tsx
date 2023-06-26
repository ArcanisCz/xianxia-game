import css from './app.module.css';
import { ActivityKeys } from './game/activities';
import { LocationKeys } from './game/location';
import { withRootStore } from './gameProvider';

export const App = withRootStore(({ game }) => {
  const { gameRegistry, gameState } = game;

  const changeLocation = (locKey: LocationKeys) => {
    gameState.changeLocation(locKey);
  };

  const changeActivity = (activity: ActivityKeys) => {
    gameState.changeActivity(activity);
  };

  const currentLocation = gameRegistry.locations[gameState.currentLocation];

  return (
    <div className={css.pokus}>
      <div>
        {gameState.availableActivities.map(activityKey => {
          const activity = gameRegistry.activities[activityKey];

          return (
            <button
              key={activity.id}
              disabled={activity.id === gameState.activeActivity}
              onClick={() => changeActivity(activityKey)}
            >
              {activity.name}
            </button>
          );
        })}
      </div>

      <hr />
      <div>Loc: {currentLocation.name}</div>
      <hr />
      {currentLocation.locations.map(locKey => {
        const loc = gameRegistry.locations[locKey];

        return (
          <button onClick={() => changeLocation(locKey)}>{loc.name}</button>
        );
      })}
    </div>
  );
});
