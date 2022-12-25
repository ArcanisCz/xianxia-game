import { createRoot } from 'react-dom/client';
import { configure } from 'mobx';
import { Game } from 'core/game';
import { App } from './App';
import { GameProvider } from './gameProvider';
import { activities } from './game/activities';
import { GameClient } from './core/gameClient';
import { locations } from './game/location';

configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
});

const newGame = new Game(
  activities,
  locations,
  activities.empty,
  locations.empty,
);
const newGameClient = new GameClient(newGame);

newGame.init(
  newGame.activityRegistry.raid,
  newGame.activityRegistry.meditate,
  newGame.locationRegistry.graveyard,
);

const element = document.getElementById('root');

if (element) {
  const root = createRoot(element);

  root.render(
    <GameProvider game={newGame} gameClient={newGameClient}>
      <App />
    </GameProvider>,
  );
}
