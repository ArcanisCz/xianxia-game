import {createRoot} from 'react-dom/client';

const App = () => (<div>
  <h1>Hello, EBUILD!</h1>
  <Panel />
  <Panel />
</div>)

const Panel = () => <h2>I'm a Panel</h2>


const root = createRoot(
  document.getElementById('root')
);
root.render(<App />);
