import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import FortepanData from "../fortepan-data";


const Li = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 200px);
  grid-gap: 10px;
`

const Img = styled.img`
  width: 200px;
  height: 200px;
  object-fit:cover;
  object-position: left;
`

const Home = () => {
  return <Li>
    {FortepanData.slice(40).map(x =>
    <div key={x.filename}>
      <Link to={`${x.filename}/anaglyph`}>
        <Img alt={x.title} src={`http://fortepan.hu/_photo/display/${x.filename}.jpg`} />
      </Link>
    </div>
    )}
    </Li>
}

export default Home
