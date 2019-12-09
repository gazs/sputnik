import React from "react";
import { Link } from "react-router-dom";

import { getDownloadUrl } from "../fortepan-api";
import FortepanData from "../fortepan-data";

import Anaglyph from '../components/Anaglyph';

import './Anaglyph.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    const savedStateJson = localStorage.getItem(this.props.match.params.id);
    console.log(props.filename, savedStateJson);
    if (savedStateJson) {
      this.state = {
        ...JSON.parse(savedStateJson)
      };
    } else {
      this.state = {
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

    this.state.isWiggle = false;
    this.state.isFullScreen = true;
  }
  render() {
    const filename = this.props.match.params.id;

    const fortepanData = FortepanData.find(x => x.filename === filename);
    const imageSrc = getDownloadUrl(fortepanData.filename);

    return (
      <>
      <Link to={`/`}>home</Link>
      <div className="anaglyph-viewer">
        <div className={`image ${this.state.isFullScreen ? 'fullscreen' : ''}`}>
          <Anaglyph
            imageSrc={imageSrc}
            key={imageSrc}
            left={this.state.left}
            right={this.state.right}
            isWiggle={this.state.isWiggle}
            width={this.state.width}
            height={this.state.height}
          />
        </div>
        <div className="info">
          <label>
            <input type="checkbox" value={this.state.isWiggle} onChange={() => this.setState({...this.state, isWiggle: !this.state.isWiggle})} />
            wiggle
          </label>
          <h1>{fortepanData.title}</h1>
          <div>year: {fortepanData.year}</div>
          <div>Country: {fortepanData.country}</div>
          <div>City: {fortepanData.city}</div>
          <div>Donor: {fortepanData.donor}</div>
          <Link to={`/${filename}/edit`}>edit</Link>
        </div>
      </div>

      </>
    );
  }
}

export default App;
