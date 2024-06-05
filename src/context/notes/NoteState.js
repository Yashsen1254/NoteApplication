import React from'react';
import noteContext from './noteContext';

const NoteState = (props) => {
    const state = {
        "name" : "Yash",
        "class": "10"
    }
  return(
  <noteContext.Provider value={state}>
    {props.children}
    </noteContext.Provider>  
  ) 
};

export default NoteState;