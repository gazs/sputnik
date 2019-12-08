import React from "react";
import { Link } from "react-router-dom";

import { getDownloadUrl } from "../fortepan-api";
import FortepanData from "../fortepan-data";

import Anaglyph from '../components/Anaglyph';


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
  }
  render() {
    const filename = this.props.match.params.id;

    const fortepanData = FortepanData.find(x => x.filename === filename);
    const imageSrc = getDownloadUrl(fortepanData.filename);

    return (
      <>
        <Anaglyph
          imageSrc={imageSrc}
          key={imageSrc}
          left={this.state.left}
          right={this.state.right}
          isWiggle={false}
        />
        <li>
          <Link to={`/`}>home</Link>
        </li>
        <li>
          <Link to={`/${this.props.match.params.id}/edit`}>edit</Link>
        </li>
        <li>
          <Link to={`/${this.props.match.params.id}/wiggle`}>wiggle</Link>
        </li>
        <li>
          <Link to={`/${this.props.match.params.id}/anaglyph`}>anaglyph</Link>
        </li>
      </>
    );
  }
}

export default App;
