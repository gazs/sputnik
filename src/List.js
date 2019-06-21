import React, { useState, useEffect } from 'react';


import { getSearchUrl, getThumbnailUrl } from './fortepan-api';


const search = async (q) => {
  const url = getSearchUrl({q});
  const response = await fetch(url);
  const { fields, data } = await response.json();
  const fortepanArrayToObj = (array) => array.reduce((acc, value, i) => ({...acc, [fields[i]]: value}), {});
  return data.map(fortepanArrayToObj);
}





export default ({query="sztereófotó", onClick}) => {
  const [results, setResults] = useState([])

  useEffect(() => {
    search(query).then(setResults)
  }, [query])

  return (
    <div>
        {results.map(x => 
          <div key={x.filename} onClick={e => onClick(x)}><img alt={x.title} src={getThumbnailUrl(x.filename)}/></div>
        )}
    </div>
  );
}
