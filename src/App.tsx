import { withRootStore } from './gameProvider';
import css from './app.module.css';
import { ActivityTime } from './core/activity';

export const App = withRootStore(({ game }) => {
  const pokus = () => {
    if (game.currentLocation.id === 'graveyard') {
      game.changeLocation('sect');
    } else {
      game.changeLocation('graveyard');
    }
  };

  return (
    <div className={css.pokus}>
      <div>Day: {game.activeActivity.day.name}</div>
      <div>Night: {game.activeActivity.night.name}</div>
      <hr />
      <div>Loc: {game.currentLocation.name}</div>
      <hr />
      <div>
        Day activities:{' '}
        {game.availableDayActivities[ActivityTime.Day]
          .map(a => a.name)
          .join(', ')}
      </div>
      <div>
        Night activities:{' '}
        {game.availableDayActivities[ActivityTime.Night]
          .map(a => a.name)
          .join(', ')}
      </div>
      <button onClick={pokus}>aaa</button>
    </div>
  );
});
