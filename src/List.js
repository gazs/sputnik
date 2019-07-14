import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


import { getSearchUrl, getThumbnailUrl } from './fortepan-api';


const search = async (q, offset) => {
  const url = getSearchUrl({q, offset});
  const response = await fetch(url);
  const { resultInfo, fields, data } = await response.json();
  const fortepanArrayToObj = (array) => array.reduce((acc, value, i) => ({...acc, [fields[i]]: value}), {});
  return {
    resultInfo,
    results: data.map(fortepanArrayToObj)
  }
}





export default ({query="sztereófotó", onClick}) => {
  const [results, setResults] = useState({results: [], resultInfo: {}})

  useEffect(() => {
    search(query).then(setResults)
  }, [query])

  console.log(results);

  const paginate = (offset) => {
    search(query, offset).then(setResults)
  }

  return (
    <>
    <div>
        {results.results.map(x =>
          <div className="fortepan-item" key={x.filename}>
            <Link to={`/${x.filename}`}>
              <img alt={x.title} title={x.title} src={getThumbnailUrl(x.filename)}/>
            </Link>
          </div>
        )}
    </div>

    {results.resultInfo.offset + results.resultInfo.current < results.resultInfo.all && <button onClick={() => paginate(results.resultInfo.offset + 100)}>more</button>}
    </>
  );
}
