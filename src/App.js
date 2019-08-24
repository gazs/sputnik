import React, { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Viewer from './Viewer';

const App = () => {
    return (
      <Router>
        <Route path="/:id?" component={Viewer} />
      </Router>
    )
}

export default App;
