import { createRoot } from 'react-dom/client';
import { configure, toJS } from 'mobx';
import { Game } from 'core/game';
import { GameClient } from 'core/gameClient';
import { App } from './App';
import { GameProvider } from './gameProvider';
import { activities } from './game/activities';
import { locations } from './game/location';
import { activityTags } from './game/activityTags';
import { GameState } from './core/state';
import { GameRegistry } from './core/registry';

configure({
  enforceActions: 'always',
});

const gameRegistry = new GameRegistry(activities, locations, activityTags, [
  'day',
  'night',
]);
const gameState = new GameState(
  activities.empty,
  locations.empty,
  gameRegistry,
);

const newGame = new Game(gameRegistry, gameState);
const newGameClient = new GameClient(newGame);

console.log('Registry', newGame.gameRegistry);
console.log('State', toJS(newGame.gameState));

const element = document.getElementById('root');

if (element) {
  const root = createRoot(element);

  root.render(
    <GameProvider game={newGame} gameClient={newGameClient}>
      <App />
    </GameProvider>,
  );
}
