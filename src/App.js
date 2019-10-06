import React, { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Viewer from './Viewer';
import Editor from './Editor';

const App = () => {
    return (
      <Router>
        <Route path="/editor" component={Editor} />
        <Route path="/photo/:id?" component={Viewer} />
      </Router>
    )
}

export default App;
