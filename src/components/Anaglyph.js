import React from 'react';

const Anaglyph = ({imageSrc, left, right, isWiggle}) => {

    const leftEyeX = (left.left / 1200) * 1000;
    const leftEyeY = (left.top / 1200) * 1000;

    const rightEyeX = (right.left / 1200) * 1000;
    const rightEyeY = (right.top / 1200) * 1000;

    return (
      <svg
        viewBox="0 0 500 500"
        height="90vh"
        style={{ display: "block", margin: "0 auto", background: "black" }}
      >
        <defs>
          <image id="image" xlinkHref={imageSrc} width="200%" height="100%" />
          <filter id="red">
            <feColorMatrix
              type="matrix"
              values="1  0  0 0 0
                                           0  0  0 0 0
                                           0  0  0 0 0
                                           0  0  0 0 1"
            />
          </filter>
          <filter id="cyan">
            <feColorMatrix
              type="matrix"
              values="0  0  0 0 0
                                           0  1  0 0 0
                                           0  1  0 0 0
                                           0  0  0 0 1"
            />
          </filter>
          <clipPath id="left">
            <rect width="100%" height="100%" x="0" y="0" />
          </clipPath>
          <clipPath id="right">
            <rect width="100%" height="100%" x="500" y="0" />
          </clipPath>
        </defs>
        <use
          href="#image"
          transform={`translate(${-1 * leftEyeX} ${-1 * leftEyeY})`}
          {...(!isWiggle && { filter: "url(#red)" })}
          clipPath="url(#left)"
        />
        <use
          href="#image"
          transform={`translate(${-1 * rightEyeX} ${-1 * rightEyeY})`}
          {...(!isWiggle && {
            style: { mixBlendMode: "screen" },
            filter: "url(#cyan)"
          })}
          clipPath="url(#right)"
        >
          {isWiggle && (
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="0.3s"
              repeatCount="indefinite"
            />
          )}
        </use>
      </svg>
    );
}

export default Anaglyph;
