import React, { useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import FortepanData from "../fortepan-data";

import './Home.css';



const Home = () => {
  const [page, setPage] = useState(0);

  return <><div className="grid">
    {FortepanData.slice(page*9, page*9+9).map(x =>
    <div key={x.filename}>
      <Link to={`${x.filename}`}>
        <img alt={x.title} src={`http://fortepan.hu/_photo/display/${x.filename}.jpg`} />
      </Link>
    </div>
    )}
    </div>
      <button onClick={() => setPage(page-1)}>prev</button>
      <button onClick={() => setPage(page+1)}>next</button>
      </>
}

export default Home
