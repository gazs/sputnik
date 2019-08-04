import React from 'react';
import { getDownloadUrl } from './fortepan-api';


export default ({fortepanObject, rotation, rightEyeX, rightEyeY}) => {
  const imageSrc = getDownloadUrl(fortepanObject.filename);

  return (
<svg viewBox="0 0 500 500">
  <defs>
    <image
      id="image"
      xlinkHref={imageSrc}
      width="200%"
      height="100%"
    />
    <filter id="red">
      <feColorMatrix type="matrix" values="1  0  0 0 0
                                           0  0  0 0 0
                                           0  0  0 0 0
                                           0  0  0 0 1" />
    </filter>
    <filter id="cyan">
      <feColorMatrix type="matrix" values="0  0  0 0 0
                                           0  1  0 0 0
                                           0  1  0 0 0
                                           0  0  0 0 1" />
    </filter>
    <clipPath id="left">
      <rect
        width="100%"
        height="100%"
        x="0"
        y="0"
      />
    </clipPath>
    <clipPath id="right">
      <rect
        width="100%"
        height="100%"
        x="500"
        y="0"
      />
    </clipPath>
  </defs>
  <use href="#image"
    filter="url(#red)"
    clipPath="url(#left)"
    />
  <use href="#image"
    transform={`translate(${rightEyeX} ${console.log(rightEyeY) || (rightEyeY/2)})`}
    style={{mixBlendMode: "screen"}}
    filter="url(#cyan)"
    clipPath="url(#right)"
    />
</svg>
  );
}
