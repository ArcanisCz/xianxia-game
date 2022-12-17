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
import { Game } from './core/game';

type CurrentGame = Game<ActivityKeys>;

export const StoreContext = createContext<{ game: CurrentGame }>({
  game: new Game(new Map()),
});

export const GameProvider: FC<{
  game: CurrentGame;
  children: ReactNode;
}> = ({ children, game }): ReactElement => {
  return (
    <StoreContext.Provider value={{ game }}>{children}</StoreContext.Provider>
  );
};

export function useGame(): {
  game: CurrentGame;
} {
  return useContext(StoreContext);
}

export function withRootStore<Props>(
  Component: ComponentType<Props & { game: CurrentGame }>,
): ComponentType<Props> {
  const WrappedComponent = observer(Component);
  const ComponentWithStore = props => {
    const { game } = useGame();

    return <WrappedComponent {...props} game={game} />;
  };

  return ComponentWithStore;
}
