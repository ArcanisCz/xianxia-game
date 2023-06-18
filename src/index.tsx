import { createRoot } from 'react-dom/client';
import { configure, toJS } from 'mobx';
import { Game, GameClient, GameState, GameRegistry } from 'core';
import { activities } from 'game/activities';
import { locations } from 'game/registry';
import { activityTags } from 'game/activityTags';
import { App } from './App';
import { GameProvider } from './gameProvider';

configure({
  enforceActions: 'always',
});

const gameRegistry = new GameRegistry(activities, locations, activityTags, [
  'day',
  'night',
]);

const gameState = new GameState(
  activities.empty,
  gameRegistry.locations.sect,
  gameRegistry,
);

const newGame = new Game(gameRegistry, gameState);
const newGameClient = new GameClient(newGame);

// eslint-disable-next-line no-console
console.log('Registry', newGame.gameRegistry);
// eslint-disable-next-line no-console
console.log('State', toJS(newGame.gameState));
// eslint-disable-next-line no-console
console.log('---------------------');
newGameClient.aaa();

// @ts-ignore
window.gameClient = newGameClient;

const element = document.getElementById('root');

if (element) {
  const root = createRoot(element);

  root.render(
    <GameProvider game={newGame} gameClient={newGameClient}>
      <App />
    </GameProvider>,
  );
}
