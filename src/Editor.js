import React from 'react';
import ResizableRect from 'react-resizable-rotatable-draggable'
import partial from 'lodash/partial';
import styled from 'styled-components';

import Wiggler from './Wiggler';

const Wrapper = styled.div`
position:relative;
top: 30px;
`

const Photo = styled.img`
width: 1200px;
`

class App extends React.Component {
  constructor() {
    super()
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

  handleResize = (which, style, isShiftKey, type) => {
    // type is a string and it shows which resize-handler you clicked
    // e.g. if you clicked top-right handler, then type is 'tr'
    let { top, left, width, height } = style
    top = Math.round(top)
    left = Math.round(left)
    width = Math.round(width)
    height = Math.round(height)
    this.setState({
      [which]: {
        top,
        left,
      },
      width,
      height
    })
  }

  handleRotate = (which, rotateAngle) => {
    this.setState({[which]: {
      ...this.state[which],
      rotateAngle
    }})
  }

  handleDrag = (which, deltaX, deltaY) => {
    this.setState({[which]: {
      ...this.state[which],
      left: this.state[which].left + deltaX,
      top: this.state[which].top + deltaY
    }})
  }
  showOverlay = () => {
    this.setState({ showOverlay: true })
  }
  hideOverlay = () => {
    this.setState({ showOverlay: false })
  }

  render() {
    const { width, height, left, right } = this.state;
    return (
    
      <div className="App">
      <Wrapper>
        {['left', 'right'].map(eye => 
          <ResizableRect
            key={eye}
            left={this.state[eye].left}
            top={this.state[eye].top}
            width={width}
            height={height}
            rotateAngle={this.state[eye].rotateAngle}
            zoomable='n, w, s, e, nw, ne, se, sw'
            onRotateStart={this.showOverlay}
            onRotateEnd={this.hideOverlay}
            onRotate={partial(this.handleRotate, eye)}
            onResizeStart={this.showOverlay}
            onResizeEnd={this.hideOverlay}
            onResize={partial(this.handleResize, eye)}
            onDragStart={this.showOverlay}
            onDragEnd={this.hideOverlay}
            onDrag={partial(this.handleDrag, eye)}
          />
        )}
        <Photo
          src="http://fortepan.hu/_photo/display/27283.jpg"
          />
        </Wrapper>
          <Wiggler fortepanObject={{filename: '27283'}}
            showOverlay={this.state.showOverlay}
            left={left}
            right={right}
            width={width}
            height={height}
          />
      </div >
    )
  }
}

export default App
