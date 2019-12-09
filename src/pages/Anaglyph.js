import React from "react";
import { Link } from "react-router-dom";

import { getDownloadUrl } from "../fortepan-api";
import FortepanData from "../fortepan-data";
import defaultAlignments from '../alignments.json';

import Layout from './Layout';
import Anaglyph from '../components/Anaglyph';

import './Anaglyph.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    const savedStateJson = localStorage.getItem(this.props.match.params.id);
    if (savedStateJson) {
      this.state = {
        ...JSON.parse(savedStateJson)
      };
    } else if (defaultAlignments[this.props.match.params.id]) {
      this.state = JSON.parse(defaultAlignments[this.props.match.params.id])
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
    const currentIndex = FortepanData.indexOf(fortepanData)


    const imageSrc = getDownloadUrl(fortepanData.filename);

    return (
      <Layout>
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
          <Link to={`/${filename}/edit`}>edit</Link>
          <div>year: {fortepanData.year}</div>
          <div>Country: {fortepanData.country}</div>
          <div>City: {fortepanData.city}</div>
          <div>Donor: {fortepanData.donor}</div>
          {fortepanData.label.split('| ').map(label => <span key={label}>{label} /  </span>)}
          <div>
          <a href={`http://fortepan.hu/?image_id=${filename}`}>fortepan</a>

          <div className="nav">
            {currentIndex > 1 && <Link to={`/${FortepanData[currentIndex-1].filename}`}>previous</Link> }
            {currentIndex < FortepanData.length && <Link to={`/${FortepanData[currentIndex+1].filename}`}>next</Link> }
          </div>
          </div>
        </div>
      </div>

      </Layout>
    );
  }
}

export default App;
