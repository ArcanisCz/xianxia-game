import { medidate, raid } from './game/activities';
import { Activity } from './core/activity';
import { withRootStore } from './gameProvider';

export const App = withRootStore(({ game }) => {
  const pokus = () => {
    game.init(new Activity(raid), new Activity(medidate));
  };

  return (
    <div>
      <div>{game.idleActivity.name}</div>
      <div>{game.activeActivity.name}</div>
      <button onClick={pokus}>aaa</button>
    </div>
  );
});
