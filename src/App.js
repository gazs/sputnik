import React, { useReducer, useEffect } from 'react';
import './App.css';
import Wiggler from './Wiggler';
import Onion from './Onion';
import List from './List';

import { getDownloadUrl } from './fortepan-api';

const initialState = {
  imageSrc: 'http://fortepan.hu/_photo/download/fortepan_27587.jpg',
  rightEyeX: -507,
  rightEyeY: 4.8,
  rotation: 17
}

function reducer(state, action) {
  switch (action.type) {
    case 'imageSrc':
      return {...state, imageSrc: action.value};
    case 'rightEyeX':
      return {...state, rightEyeX: action.value};
    case 'rightEyeY':
      return {...state, rightEyeY: action.value};
    case 'rotation':
      return {...state, rotation: action.value};
    default:
      return state;
  }
}

function App() {
  const [ state, dispatch ] = useReducer(reducer, initialState);


  useEffect(
    () => {
      window.localStorage.setItem(state.imageSrc, JSON.stringify(state));
    },
    [state]
  );

  return (
    <>
    <div className="fl w-10 pa2 vh-100 overflow-y-scroll">
      <List onClick={x=>dispatch({type: 'imageSrc', value: getDownloadUrl(x.filename)})} />
    </div>
    <div className="fl w-70 pa2">
    <label>src <input type="text" value={state.imageSrc} onChange={x=>dispatch({type: 'imageSrc', value: x.target.value})} /></label>
    <label>X <input type="number" value={state.rightEyeX} onChange={x=>dispatch({type: 'rightEyeX', value: x.target.valueAsNumber})} /></label>
    <label>Y <input type="number" value={state.rightEyeY} onChange={x=>dispatch({type: 'rightEyeY', value: x.target.valueAsNumber})} /></label>
    <label>rotation  <input type="number" value={state.rotation} onChange={x=>dispatch({type: 'rotation', value: x.target.valueAsNumber})} /></label>
      <Onion {...state} />
    </div>
    <div className="fl w-20 pa2">
      <Wiggler {...state}/>
    </div>
    </>
  );
}

export default App;
