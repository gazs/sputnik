import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const Wrapper = styled.div`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  overflow: hidden;
  position:relative;
  border: 1px solid #ddd;
`

const LeftEye = styled.img`
  /* pixel width & height of original image */
  width: 1200px; 
  height: ${props => (+props.fortepanObject.height / +props.fortepanObject.width) * 1200}px;
  position: absolute;
  max-width: initial;

  transform-origin: ${props => props.width / 2}px ${props => props.height/2}px;
  transform:
    rotate(${props => props.rotateAngle}deg)
    translateX(${props => -1 * props.left}px)
    translateY(${props => -1 * props.top}px);
`

const rightEye = keyframes`
  50% {
    opacity: 0;
  }
`

const RightEye = styled(LeftEye)`
  ${props => !props.showOverlay ? css`
    animation: ${rightEye} 0.3s infinite;
  ` : `opacity: 0.5;` }


  transform:
    rotate(${props => props.rotateAngle}deg)
    translateX(${props => -1 * props.left}px)
    translateY(${props => -1 * props.top}px);
`

export default ({fortepanObject, left, right, width, height, showOverlay}) => {

  const imageSrc = `http://fortepan.hu/_photo/display/${fortepanObject.filename}.jpg`
  

  return (
    <Wrapper width={width} height={height}>
      <LeftEye alt="wiggle stereoscopy left"
        src={imageSrc}
        left={left.left}
        top={left.top}
        width={width}
        height={height}
        fortepanObject={fortepanObject}
        rotateAngle={left.rotateAngle}
        />
      <RightEye alt="wiggle stereoscopy right" src={imageSrc}
        showOverlay={showOverlay}
        left={right.left}
        top={right.top}
        width={width}
        height={height}
        fortepanObject={fortepanObject}
        rotateAngle={right.rotateAngle}
      />
    </Wrapper>
  );
}
