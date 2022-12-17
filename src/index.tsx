import { createRoot } from 'react-dom/client';
import { configure } from 'mobx';
import { Game } from 'core/game';
import { App } from './App';
import { GameProvider } from './gameProvider';
import { Activity } from './core/activity';
import { medidate, raid } from './game/activities';

configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
});

const root = createRoot(document.getElementById('root'));
const newGame = new Game();

newGame.init(new Activity(medidate), new Activity(raid));

root.render(
  <GameProvider game={newGame}>
    <App />
  </GameProvider>,
);
