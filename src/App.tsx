import css from './app.module.css';
import { Activities } from './ui/Activities';
import { Locations } from './ui/Locations';

export const App = () => {
  return (
    <div className={css.pokus}>
      <Activities />
      <hr/>
      <Locations />
    </div>
  );
};
