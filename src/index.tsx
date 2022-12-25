import { createRoot } from 'react-dom/client';
import { configure } from 'mobx';
import { Game } from 'core/game';
import { App } from './App';
import { GameProvider } from './gameProvider';
import { activities } from './game/activities';
import { GameClient } from './core/gameClient';
import { locations } from './game/location';
import { activityTags } from './game/activityTags';

configure({
  enforceActions: 'always',
});

const newGame = new Game(
  activities,
  locations,
  activityTags,
  activities.empty,
  locations.empty,
  ['day', 'night'],
);
const newGameClient = new GameClient(newGame);

const element = document.getElementById('root');

if (element) {
  const root = createRoot(element);

  root.render(
    <GameProvider game={newGame} gameClient={newGameClient}>
      <App />
    </GameProvider>,
  );
}
