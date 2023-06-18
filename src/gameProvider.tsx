import { observer } from 'mobx-react';
import {
  FC,
  createContext,
  ReactNode,
  ReactElement,
  ComponentType,
  useContext,
} from 'react';
import { XianxiaGame, XianxiaGameClient } from 'game';

type GameContext = {
  game: XianxiaGame;
  gameClient: XianxiaGameClient;
};

export const StoreContext = createContext<GameContext>(
  {} as { game: XianxiaGame; gameClient: XianxiaGameClient },
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
