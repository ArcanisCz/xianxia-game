import { withRootStore } from '../gameProvider';

export const Controls = withRootStore(({ gameClient }) => {
  return (
    <div>
      <button onClick={() => gameClient.aaa()}>Next tick</button>
    </div>
  );
});
