import { createRoot } from 'react-dom/client';

const App = () => (
  <div>
    <h1>Hello, ESBUILD!</h1>
    <Panel />
    <Panel />
  </div>
);

const Panel = () => <h2>Im a Panel</h2>;

const root = createRoot(document.getElementById('root'));

root.render(<App />);
