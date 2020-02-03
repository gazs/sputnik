import React, { useState } from "react";
import { Link } from "react-router-dom";

import Layout from "./Layout";

import FortepanData from "../fortepan-data";

import "./Home.css";

const Home = () => {
  const [page, setPage] = useState(0);

  return (
    <Layout>
      <div className="grid">
        {FortepanData
        .filter(x => !localStorage.getItem(x.filename))
        .slice(page * 9, page * 9 + 9)
        .map(x => {
          const isCalibrated = !!localStorage.getItem(x.filename);
          return <div key={x.filename} className={`${isCalibrated ? 'calibrated' : 'uncalibrated'}`}>
            <Link to={`${x.filename}`}>
              <img
                alt={x.title}
                src={`http://fortepan.hu/_photo/display/${x.filename}.jpg`}
              />
            </Link>
          </div>
        })})}
      </div>
      <button onClick={() => setPage(page - 1)}>prev</button>
      <button onClick={() => setPage(page + 1)}>next</button>
    </Layout>
  );
};

export default Home;
