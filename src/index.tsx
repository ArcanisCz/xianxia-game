import { createRoot } from 'react-dom/client';
import { makeObservable, observable, computed } from 'mobx';

class TodoList {
  @observable
  todos = [];

  @computed
  get unfinishedTodoCount() {
    return this.todos.filter(todo => !todo.finished).length;
  }
  constructor(todos) {
    this.todos = todos;
    makeObservable(this);
  }
}

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
