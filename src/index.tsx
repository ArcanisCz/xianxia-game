import { createRoot } from 'react-dom/client';
import { configure } from 'mobx';
import { Game } from 'core/game';
import { App } from './App';
import { GameProvider } from './gameProvider';
import { activities } from './game/activities';
import { GameClient } from './core/gameClient';

configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
});

const root = createRoot(document.getElementById('root'));
const newGame = new Game(activities);
const newGameClient = new GameClient(newGame);

newGame.init(
  newGame.activityRegistry.get('raid'),
  newGame.activityRegistry.get('meditate'),
);

root.render(
  <GameProvider game={newGame} gameClient={newGameClient}>
    <App />
  </GameProvider>,
);
