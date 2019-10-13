import React from 'react';
import Wiggler from './Wiggler';

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
  console.log('HI')

    return <>
          <Wiggler fortepanObject={{filename: this.props.match.params.id || 27587}}
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
