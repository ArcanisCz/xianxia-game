import css from './app.module.css';
import { Activities } from './ui/Activities';
import { Controls } from './ui/Controls';
import { Locations } from './ui/Locations';
import { Resources } from './ui/Resources';

export const App = () => {
  return (
    <div className={css.pokus}>
      <Activities />
      <hr />
      <Locations />
      <hr />
      <Resources />
      <hr />
      <Controls />
    </div>
  );
};
