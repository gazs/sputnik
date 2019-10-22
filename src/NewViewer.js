import React from 'react';
import Wiggler from './Wiggler';
import { Link } from 'react-router-dom'


import FortepanData from './bla';

class Viewer extends React.Component {
  constructor(props) {
    super(props)
    const savedStateJson = localStorage.getItem(props.match.params.id || 27587)
    if (savedStateJson) {
      this.state = JSON.parse(savedStateJson)
    } else {
      this.state = {
        showOverlay: false,
        width: 600,
        height: 600,
        left: {
          top: 0,
          left: 0,
          rotateAngle: 0
        },
        right: {
          top: 0,
          left: 600,
          rotateAngle: 0
        },
      }
    }
  }
  render() {
    const fortepanData = FortepanData.find(x => x.filename === this.props.match.params.id)

    return <>
      <h1>{fortepanData.title}</h1>
      <Link to={`/${this.props.match.params.id}/edit`}>edit</Link>
      <Link to={`/${this.props.match.params.id}/anaglyph`}>anaglyph</Link>
          <Wiggler fortepanObject={fortepanData}
            showOverlay={false}
            left={this.state.left}
            right={this.state.right}
            width={this.state.width}
            height={this.state.height}
          />
    </>
  }
}

export default Viewer;
