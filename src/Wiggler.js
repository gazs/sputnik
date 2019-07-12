import React, { useState, useEffect, useRef } from 'react';
import { getDownloadUrl } from './fortepan-api';

import './Wiggler.css';

export default ({fortepanObject, rotation, rightEyeX, rightEyeY}) => {
  const ref = useRef();
  const [isEnlarged, setEnlarged] =  useState(false);

  const imageSrc = getDownloadUrl(fortepanObject.filename);

  const rightStyle = {
    transform: `rotate(${rotation/100}deg) translate(${rightEyeX/10}%, ${rightEyeY/10}%)`
  }

  return (
    <div className="wiggler" onClick={() => setEnlarged(!isEnlarged)} style={isEnlarged ? {
      width: '100vh',
      position: 'absolute',
      top:0,
      bottom:0,
      right:0
    }: {}}>
      <img alt="wiggle stereoscopy left" className="left" src={imageSrc} />
      <img alt="wiggle stereoscopy right" className="right" src={imageSrc} style={rightStyle}/>
    </div>
  );
}
