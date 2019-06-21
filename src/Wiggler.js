import React, { useState, useEffect, useRef } from 'react';
import { getDownloadUrl } from './fortepan-api';

import './Wiggler.css';

export default ({fortepanObject, rotation, rightEyeX, rightEyeY}) => {
  const ref = useRef();
  const [isEnlarged, setEnlarged] =  useState(false);

  const imageSrc = getDownloadUrl(fortepanObject.filename);

  useEffect(() => {
    window.a = ref.current.animate([
      {
        transform: `rotate(0deg)`, 
      },
      {
        transform: `rotate(${rotation/100}deg) translate(${rightEyeX/10}%, ${rightEyeY/10}%)`},
      {
        transform: `rotate(0deg)`
      },
    ], {
      duration: 300,
      easing: 'steps(2, start)',
      iterations: Infinity
    })
  })

  return (
    <div className="wiggler" onClick={() => setEnlarged(!isEnlarged)} style={isEnlarged ? {
      width: '100vh',
      position: 'absolute',
      top:0,
      bottom:0,
      right:0
    }: {}}>
      <img alt="wiggle stereoscopy" ref={ref} src={imageSrc} />
    </div>
  );
}
