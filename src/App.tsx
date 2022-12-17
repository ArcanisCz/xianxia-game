import { withRootStore } from './gameProvider';

export const App = withRootStore(({ game, gameClient }) => {
  const pokus = () => {
    const { activityRegistry } = game;

    game.init(activityRegistry.get('meditate'), activityRegistry.get('raid'));

    gameClient.aaa();
  };

  return (
    <div>
      <div>{game.idleActivity.name}</div>
      <div>{game.activeActivity.name}</div>
      <button onClick={pokus}>aaa</button>
    </div>
  );
});
