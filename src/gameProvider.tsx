import {
  FC,
  createContext,
  ReactNode,
  ReactElement,
  ComponentType,
  useContext,
} from 'react';
import { observer } from 'mobx-react';
import { ActivityKeys } from 'game/activities';
import { LocationKeys } from 'game/location';
import { Game } from './core/game';
import { GameClient } from './core/gameClient';
import { ActivityTagKeys } from './game/activityTags';

type CurrentGame = Game<ActivityKeys, LocationKeys, ActivityTagKeys>;
type CurrentGameClient = GameClient<ActivityKeys, LocationKeys>;

type GameContext = {
  game: CurrentGame;
  gameClient: CurrentGameClient;
};

export const StoreContext = createContext<GameContext>(
  {} as { game: CurrentGame; gameClient: CurrentGameClient },
);

export const GameProvider: FC<
  {
    children: ReactNode;
  } & GameContext
> = ({ children, game, gameClient }): ReactElement => {
  return (
    <StoreContext.Provider value={{ game, gameClient }}>
      {children}
    </StoreContext.Provider>
  );
};

export function useGame(): GameContext {
  return useContext(StoreContext);
}

export function withRootStore<Props>(
  Component: ComponentType<Props & GameContext>,
): ComponentType<Props> {
  const WrappedComponent = observer(Component);
  const ComponentWithStore = (props: Props) => {
    const { game, gameClient } = useGame();

    return <WrappedComponent {...props} game={game} gameClient={gameClient} />;
  };

  return ComponentWithStore;
}
