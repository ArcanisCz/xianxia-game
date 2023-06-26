import { ActivityKeys } from 'game';
import { withRootStore } from '../gameProvider';

export const Activities = withRootStore(({ game }) => {
  const { gameRegistry, gameState } = game;

  const changeActivity = (activity: ActivityKeys) => {
    gameState.changeActivity(activity);
  };

  return (
    <div>
      <div>
        Activities: {gameRegistry.activities[gameState.activeActivity].name}
      </div>
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
  );
});
