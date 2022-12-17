import { withRootStore } from './gameProvider';

export const App = withRootStore(({ game }) => {
  const pokus = () => {
    const { activityRegistry } = game;

    game.init(activityRegistry.get('meditate'), activityRegistry.get('raid'));
  };

  return (
    <div>
      <div>{game.idleActivity.name}</div>
      <div>{game.activeActivity.name}</div>
      <button onClick={pokus}>aaa</button>
    </div>
  );
});
