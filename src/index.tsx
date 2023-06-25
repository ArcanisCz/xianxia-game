import { configure, toJS } from 'mobx';
import { createRoot } from 'react-dom/client';
import { Game, GameClient } from 'core';
import {
  activityDefinitions,
  locationDefinitions,
  resourceDefinitions,
  XianxiaGame,
  XianxiaGameClient,
} from 'game';
import { App } from './App';
import { GameProvider } from './gameProvider';

configure({
  enforceActions: 'always',
});

const newGame: XianxiaGame = new Game(
  {
    locationDefinitions,
    activityDefinitions,
    resourceDefinitions,
  },
  {
    startingLocation: 'sect',
    emptyActivity: 'empty',
  },
);
const newGameClient: XianxiaGameClient = new GameClient(newGame);

newGame.gameState.changeActivity('meditate');

// eslint-disable-next-line no-console
console.log('Registry', newGame.gameRegistry);
// eslint-disable-next-line no-console
console.log('State', toJS(newGame.gameState));
// eslint-disable-next-line no-console
console.log('---------------------');
newGameClient.aaa();

// @ts-ignore
window.gameClient = newGameClient;
// @ts-ignore
window.game = newGame;

const element = document.getElementById('root');

if (element) {
  const root = createRoot(element);

  root.render(
    <GameProvider game={newGame} gameClient={newGameClient}>
      <App />
    </GameProvider>,
  );
}
