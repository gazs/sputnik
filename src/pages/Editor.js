import React from "react";
import { Link } from "react-router-dom";
import ResizableRect from "react-resizable-rotatable-draggable";
import partial from "lodash/partial";
import styled from "styled-components";

import FortepanData from "../fortepan-data";

import Wiggler from "../components/Wiggler";

const Wrapper = styled.div`
  position: relative;
  top: 30px;
  width: 1200px;
  max-height: 600px;
`;

const Photo = styled.img`
  width: 1200px;
  height: auto;
  border: 1px solid #666;
`;

class Editor extends React.Component {
  constructor(props) {
    super(props);
    const savedStateJson = localStorage.getItem(props.filename);
    if (savedStateJson) {
      this.state = {
        ...JSON.parse(savedStateJson),
        showOverlay: false
      };
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
        }
      };
    }
  }

  setStateAndSave(state) {
    this.setState(state, () =>
      localStorage.setItem(this.props.filename, JSON.stringify(this.state))
    );
  }

  handleResize = (which, style, isShiftKey, type) => {
    // type is a string and it shows which resize-handler you clicked
    // e.g. if you clicked top-right handler, then type is 'tr'
    let { top, left, width, height } = style;
    top = Math.round(top);
    left = Math.round(left);
    width = Math.round(width);
    height = Math.round(height);
    this.setStateAndSave({
      [which]: {
        ...this.state[which],
        top,
        left
      },
      width,
      height
    });
  };

  handleRotate = (which, rotateAngle) => {
    this.setStateAndSave({
      [which]: {
        ...this.state[which],
        rotateAngle
      }
    });
  };

  handleDrag = (which, deltaX, deltaY) => {
    this.setStateAndSave({
      [which]: {
        ...this.state[which],
        left: this.state[which].left + deltaX,
        top: this.state[which].top + deltaY
      }
    });
  };
  showOverlay = () => {
    this.setState({ showOverlay: true });
  };
  hideOverlay = () => {
    this.setState({ showOverlay: false });
  };

  render() {
    const { width, height, left, right } = this.state;
    const fortepanData = FortepanData.find(
      x => x.filename === this.props.filename
    );
    console.log(fortepanData);
    return (
      <div className="App">
        <Wrapper>
          {["left", "right"].map(eye => (
            <ResizableRect
              key={eye}
              left={this.state[eye].left}
              top={this.state[eye].top}
              width={width}
              height={height}
              rotateAngle={this.state[eye].rotateAngle}
              zoomable="n, w, s, e, nw, ne, se, sw"
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
          ))}
          <Photo
            src={`http://fortepan.hu/_photo/display/${this.props.filename}.jpg`}
          />

        </Wrapper>
          <div>
            {["left", "right"].map(which => (
              <div>
                <b>{which}</b>
                {["left", "top", "width", "height", "rotateAngle"].map(i => (
                  <label key={`${which}-${i}`}>
                    {i}
                    <input
                      type="number"
                      step={i === "rotateAngle" ? "0.2" : "1"}
                      value={this.state[which][i]}
                      onChange={e => {
                        this.setStateAndSave({
                          [which]: {
                            ...this.state[which],
                            [i]: e.target.valueAsNumber
                          }
                        });
                      }}
                    />
                  </label>
                ))}
              </div>
            ))}
          </div>
        <Wiggler
          fortepanObject={fortepanData}
          showOverlay={this.state.showOverlay}
          left={left}
          right={right}
          width={width}
          height={height}
        />
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    const filename = this.props.match.params.id;

    return (
      <>
        <Link to={`/${this.props.match.params.id}/wiggle`}>wiggle</Link>
        <Link to={`/${this.props.match.params.id}/anaglyph`}>anaglyph</Link>
        <Editor filename={filename} key={filename} />
      </>
    );
  }
}

export default App;