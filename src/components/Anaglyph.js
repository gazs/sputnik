import React from "react";

const Anaglyph = ({ imageSrc, left, right, width, height, isWiggle }) => {


  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: "block", margin: "0 auto", background: "black" }}
    >
      <defs>
        <image id="image" xlinkHref={imageSrc} width="1200" />
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
          <rect x={left.left} y={left.top} width={width} height={height} 
           transform={`rotate(${left.rotateAngle} ${left.left+width/2} ${left.top+height/2})`}/>
        </clipPath>
        <clipPath id="right">
          <rect x={right.left} y={right.top} width={width} height={width}
           transform={`rotate(${left.rotateAngle} ${right.left+width/2} ${right.top+height/2})`}/>
          />
        </clipPath>
      </defs>
      <use
        href="#image"
        {...(!isWiggle && { filter: "url(#red)" })}
        clipPath="url(#left)"
        transform={`translate(-${left.left} -${left.top}) `}
      >
      </use>
      <use
        href="#image"
        {...(!isWiggle && {
          style: { mixBlendMode: "screen" },
          filter: "url(#cyan)"
        })}
        clipPath="url(#right)"
        transform={`translate(-${right.left} -${right.top})`}
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
};

export default Anaglyph;
