import React from 'react';

import './Onion.css';

export default ({imageSrc, rotation, rightEyeX, rightEyeY}) => {

  return (
    <div className="onion">
      <img alt="left eye" className="left" src={imageSrc} />
      <img alt="right eye" className="right" src={imageSrc} style={{
        transform: `rotate(${rotation/100}deg) translate(${rightEyeX/10}%, ${rightEyeY/10}%)`
      }} />
    </div>
  );
}
