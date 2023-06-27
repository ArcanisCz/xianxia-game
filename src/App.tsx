import css from './app.module.css';
import { Activities } from './ui/Activities';
import { Controls } from './ui/Controls';
import { Locations } from './ui/Locations';
import { Resources } from './ui/Resources';
import { Stage } from './ui/Stage';

export const App = () => {
  return (
    <div className={css.pokus}>
      <Activities />
      <hr />
      <Locations />
      <hr />
      <Resources />
      <hr />
      <Stage />
      <hr />
      <Controls />
    </div>
  );
};
