import React, { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Viewer from './NewViewer';
import Editor from './Editor';
import Anaglyph from './Anaglyph';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentImage: 0
    }
  }
  render() {
  const images = [
    27283,
    93371,
    27587
  ]
  const filename = images[this.state.currentImage]
  return <>
      <Router>
        <Route path="/:id/edit" component={Editor} />
        <Route path="/:id/wiggle" component={Viewer} />
        <Route path="/:id/anaglyph" component={Anaglyph} />
      </Router>
  </>
  }
}

export default App;
