import React, { useReducer, useEffect } from 'react';
import './App.css';
import Wiggler from './Wiggler';
import Onion from './Onion';
import List from './List';

const initialState = {
  fortepanObject: {
    filename: '27587'
  },
  rightEyeX: -500,
  rightEyeY: 0,
  rotation: 0
}

function reducer(state, action) {
  switch (action.type) {
    case 'fortepanObject':
      return {...state, fortepanObject: action.value};
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
      window.localStorage.setItem(state.fortepanObject.filename, JSON.stringify(state));
    },
    [state]
  );

  return (
    <>
    <div className="fl w-10 pa2 vh-100 overflow-y-scroll">
      <List onClick={x=>dispatch({type: 'fortepanObject', value: x})} />
    </div>
    <div className="fl w-70 pa2">
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
