import {
  FC,
  createContext,
  ReactNode,
  ReactElement,
  ComponentType,
  useContext,
} from 'react';
import { observer } from 'mobx-react';
import { Game } from './core/game';

export const StoreContext = createContext<{ game: Game }>({ game: new Game() });

export const GameProvider: FC<{
  game: Game;
  children: ReactNode;
}> = ({ children, game }): ReactElement => {
  return (
    <StoreContext.Provider value={{ game }}>{children}</StoreContext.Provider>
  );
};

export function useGame(): {
  game: Game;
} {
  return useContext(StoreContext);
}

export function withRootStore<Props>(
  Component: ComponentType<Props & { game: Game }>,
): ComponentType<Props> {
  const WrappedComponent = observer(Component);
  const ComponentWithStore = props => {
    const { game } = useGame();

    return <WrappedComponent {...props} game={game} />;
  };

  return ComponentWithStore;
}
