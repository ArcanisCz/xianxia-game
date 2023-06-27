import { withRootStore } from '../gameProvider';

export const Stage = withRootStore(({ game }) => {
  const { gameRegistry, gameState } = game;

  return (
    <div>
      <div>Stage: {gameRegistry.stages[gameState.currentStage].name}</div>
    </div>
  );
});
