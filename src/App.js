import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Anaglyph from "./pages/Anaglyph";
import Home from "./pages/Home";

const Editor = React.lazy(() => import("./pages/Editor"));

const App = () => {
    return (
        <Router>
          <Switch>
            <Route path="/:id/edit" component={({...props}) => 
              <React.Suspense fallback={<div>Loading</div>}>
                <Editor {...props} />
              </React.Suspense>
            } />
            <Route path="/:id" component={Anaglyph} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
    );
  }

export default App;
