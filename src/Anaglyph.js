import React from 'react';
import { Link } from 'react-router-dom'
import { getDownloadUrl } from './fortepan-api';
import FortepanData from './bla';


export class Anaglyph extends React.Component {
  constructor(props) {
    super(props)
    const savedStateJson = localStorage.getItem(props.filename)
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
        },
      }
    }
  }
  render() {
  const fortepanData = FortepanData.find(x => x.filename === this.props.filename)
  const imageSrc = getDownloadUrl(fortepanData.filename);

  const leftEyeX = this.state.left.left / 1200 * 1000;
  const leftEyeY = this.state.left.top / 1200 * 1000;

  const rightEyeX = this.state.right.left / 1200 * 1000;
  const rightEyeY = this.state.right.top / 1200 * 1000;

  const isWiggle = false //true;

  return (
<svg viewBox="0 0 500 500" height="90vh" style={{display: 'block', margin: '0 auto'}}>
  <defs>
    <image
      id="image"
      xlinkHref={imageSrc}
      width="200%"
      height="100%"
    />
    <filter id="red">
      <feColorMatrix type="matrix" values="1  0  0 0 0
                                           0  0  0 0 0
                                           0  0  0 0 0
                                           0  0  0 0 1" />
    </filter>
    <filter id="cyan">
      <feColorMatrix type="matrix" values="0  0  0 0 0
                                           0  1  0 0 0
                                           0  1  0 0 0
                                           0  0  0 0 1" />
    </filter>
    <clipPath id="left">
      <rect
        width="100%"
        height="100%"
        x="0"
        y="0"
      />
    </clipPath>
    <clipPath id="right">
      <rect
        width="100%"
        height="100%"
        x="500"
        y="0"
      />
    </clipPath>
  </defs>
  <use href="#image"
    transform={`translate(${-1 * leftEyeX} ${(-1 * leftEyeY)})`}
    {...(!isWiggle && {filter: "url(#red)"})}
    clipPath="url(#left)"
    />
  <use href="#image"
    transform={`translate(${-1 * rightEyeX} ${(-1 * rightEyeY)})`}
    {...(!isWiggle && {
      style:{mixBlendMode: "screen"},
      filter:"url(#cyan)"
    })}
    clipPath="url(#right)"
    >
    {isWiggle && 
    <animate attributeName="opacity"
      values="0;1;0" dur="0.3s"
      repeatCount="indefinite"/>
    }
    </use>
</svg>
  );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const filename = this.props.match.params.id;

    return <>
      <li><Link to={`/${this.props.match.params.id}/edit`}>edit</Link></li>
      <li><Link to={`/${this.props.match.params.id}/wiggle`}>wiggle</Link></li>
      <Anaglyph filename={filename} key={filename} isWiggle={false}/>
    </>
  }
}

export default App
