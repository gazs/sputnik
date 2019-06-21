import React from 'react';
import { getDownloadUrl } from './fortepan-api';

import './Onion.css';

export default ({fortepanObject, rotation, rightEyeX, rightEyeY}) => {
  const imageSrc = getDownloadUrl(fortepanObject.filename);

  return (
    <div className="onion">
      <img alt="left eye" className="left" src={imageSrc} />
      <img alt="right eye" className="right" src={imageSrc} style={{
        transform: `rotate(${rotation/100}deg) translate(${rightEyeX/10}%, ${rightEyeY/10}%)`
      }} />
    </div>
  );
}
