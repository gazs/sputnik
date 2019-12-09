import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Viewer from "./pages/Viewer";
import Editor from "./pages/Editor";
import Anaglyph from "./pages/Anaglyph";
import Home from "./pages/Home";

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/:id/edit" component={Editor} />
            <Route path="/:id" component={Anaglyph} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
