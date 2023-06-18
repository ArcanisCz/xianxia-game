import { observer } from 'mobx-react';
import {
  FC,
  createContext,
  ReactNode,
  ReactElement,
  ComponentType,
  useContext,
} from 'react';
import { Game, GameClient } from 'core';
import { ActivityKeys, LocationKeys, ActivityTagKeys } from 'game';

type CurrentGame = Game<ActivityKeys, LocationKeys, ActivityTagKeys>;
type CurrentGameClient = GameClient<
  ActivityKeys,
  LocationKeys,
  ActivityTagKeys
>;

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
