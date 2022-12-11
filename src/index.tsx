import {h, render} from "preact";

// App Component
const App = () => (<div>
  <h1>Hello, EBUILD!</h1>
  <Panel />
  <Panel />
</div>)

// Panel Component
const Panel = () => <h2>I'm a Panel</h2>

document.addEventListener("DOMContentLoaded", () => {
  render(<App />, document.getElementById("root"));
});
