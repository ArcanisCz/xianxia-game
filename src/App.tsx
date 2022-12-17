import { useEffect, useState } from 'react';
import { Game } from './core/game';
import { PokusActivity } from './game/pokusActivity';

export const App = () => {
  const [game, setGame] = useState<Game | undefined>();

  useEffect(() => {
    const newGame = new Game();

    newGame.init(new PokusActivity(), new PokusActivity());
    setGame(newGame);
  }, []);

  return (
    <div>
      {game ? (
        <>
          <div>{game.idleActivity.name}</div>
          <div>{game.activeActivity.name}</div>
        </>
      ) : (
        'loading'
      )}
    </div>
  );
};
