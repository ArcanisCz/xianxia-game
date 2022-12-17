import { createRoot } from 'react-dom/client';
import { configure } from 'mobx';
import { Game } from 'core/game';
import { App } from './App';
import { GameProvider } from './gameProvider';
import { activities } from './game/activities';

configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
});

const root = createRoot(document.getElementById('root'));
const newGame = new Game(activities);

newGame.init(
  newGame.activityRegistry.get('raid'),
  newGame.activityRegistry.get('meditate'),
);

root.render(
  <GameProvider game={newGame}>
    <App />
  </GameProvider>,
);
