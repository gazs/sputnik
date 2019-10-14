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
  <a href={`/editor/${images[this.state.currentImage-1]}`}>prev</a>

    {filename}

  <a href={`/editor/${images[this.state.currentImage+1]}`}>next</a>
      <Router>
        <Route path="/editor/:id?" component={Editor} />
        <Route path="/photo/:id?" component={Viewer} />
        <Route path="/anaglyph/:id?" component={Anaglyph} />
      </Router>
  </>
  }
}

export default App;
