import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import FortepanData from "../fortepan-data";

import './Home.css';



const Home = () => {
  return <div className="grid">
    {FortepanData.slice(480).map(x =>
    <div key={x.filename}>
      <Link to={`${x.filename}`}>
        <img alt={x.title} src={`http://fortepan.hu/_photo/display/${x.filename}.jpg`} />
      </Link>
    </div>
    )}
    </div>
}

export default Home
