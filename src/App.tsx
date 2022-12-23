import { withRootStore } from './gameProvider';
import css from './app.modules.css';

console.log(css);

export const App = withRootStore(({ game }) => {
  const pokus = () => {
    if (game.currentLocation?.id === 'graveyard') {
      game.changeLocation('sect');
    } else {
      game.changeLocation('graveyard');
    }
  };

  return (
    <div className={css.pokus}>
      <div>Idle: {game.idleActivity?.name}</div>
      <div>Active: {game.activeActivity?.name}</div>
      <hr />
      <div>Loc: {game.currentLocation?.name}</div>
      <hr />
      <div>
        Activities:{' '}
        {game.currentLocation?.activities.map(a => a.name).join(', ')}
      </div>
      <button onClick={pokus}>aaa</button>
    </div>
  );
});
