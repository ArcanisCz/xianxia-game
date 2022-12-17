import { withRootStore } from './gameProvider';

export const App = withRootStore(({ game }) => {
  const pokus = () => {
    const { currentLocation, changeLocation } = game;

    if (currentLocation.id === 'graveyard') {
      changeLocation('sect');
    } else {
      changeLocation('graveyard');
    }
  };

  return (
    <div>
      <div>Idle: {game.idleActivity.name}</div>
      <div>Active: {game.activeActivity.name}</div>
      <hr />
      <div>Loc: {game.currentLocation.name}</div>
      <hr />
      <div>
        Activities:{' '}
        {game.currentLocation.activities.map(a => a.name).join(', ')}
      </div>
      <button onClick={pokus}>aaa</button>
    </div>
  );
});
