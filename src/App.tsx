import { withRootStore } from './gameProvider';
import css from './app.module.css';
import { ActivityTime } from './core/activity';
import { ActivityKeys } from './game/activities';

export const App = withRootStore(({ game }) => {
  const pokus = () => {
    if (game.currentLocation.id === 'graveyard') {
      game.changeLocation('sect');
    } else {
      game.changeLocation('graveyard');
    }
  };

  const changeActivity = (time: ActivityTime, activity: ActivityKeys) => {
    game.changeActivity(time, activity);
  };

  return (
    <div className={css.pokus}>
      <div>Day: {game.activeActivity.day.name}</div>
      <div>
        {game.availableActivities[ActivityTime.Day].map(activity => (
          <button
            key={activity.id}
            disabled={activity.id === game.activeActivity.day.id}
            onClick={() => changeActivity(ActivityTime.Day, activity.id)}
          >
            {activity.name}
          </button>
        ))}
      </div>
      <div>Night: {game.activeActivity.night.name}</div>
      <div>
        {game.availableActivities[ActivityTime.Night].map(activity => (
          <button
            key={activity.id}
            disabled={activity.id === game.activeActivity.night.id}
            onClick={() => changeActivity(ActivityTime.Night, activity.id)}
          >
            {activity.name}
          </button>
        ))}
      </div>
      <hr />
      <div>Loc: {game.currentLocation.name}</div>
      <hr />
      <button onClick={pokus}>aaa</button>
    </div>
  );
});
