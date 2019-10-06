import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { getDownloadUrl } from './fortepan-api';

const Wrapper = styled.div`
  height: 600px;
  width: 600px;
  overflow: hidden;
  position:relative;
`

const LeftEye = styled.img`
  width: ${props => props.width * 2}px;
  height: ${props => props.height}px;
  position: absolute;
  max-width: initial;

  transform-origin: ${props => props.width / 2}px ${props => props.height/2}px;
  transform:
    rotate(${props => props.rotateAngle}deg)
    translateX(${props => props.left}px)
    translateY(${props => props.top}px);
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
    translateY(${props => props.top}px);
`

export default ({fortepanObject, left, right, width, height, showOverlay}) => {

  const imageSrc = getDownloadUrl(fortepanObject.filename);

  return (
    <Wrapper>
      <LeftEye alt="wiggle stereoscopy left"
        src={imageSrc}
        left={left.left}
        top={left.top}
        width={width}
        height={height}
        rotateAngle={left.rotateAngle}
        />
      <RightEye alt="wiggle stereoscopy right" src={imageSrc}
        showOverlay={showOverlay}
        left={right.left}
        top={right.top}
        width={width}
        height={height}
        rotateAngle={right.rotateAngle}
      
      />
    </Wrapper>
  );
}
