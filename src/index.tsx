import { createRoot } from 'react-dom/client';
import { configure } from 'mobx';
import { Game } from 'core/game';
import { App } from './App';
import { GameProvider } from './gameProvider';
import { activities } from './game/activities';
import { GameClient } from './core/gameClient';
import { locations } from './game/locations';

configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
});

const newGame = new Game(activities, locations);
const newGameClient = new GameClient(newGame);

newGame.init(
  newGame.activityRegistry.get('raid'),
  newGame.activityRegistry.get('meditate'),
  newGame.locationRegistry.get('graveyard'),
);

const root = createRoot(document.getElementById('root'));

root.render(
  <GameProvider game={newGame} gameClient={newGameClient}>
    <App />
  </GameProvider>,
);
