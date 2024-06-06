import React, { useState } from'react';
import noteContext from './noteContext';

const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "665dd6906c8f48f6139d939af",
      "user": "665c990543a5b33a940323c0",
      "title": "demo title",
      "description": "demo descriptiom",
      "tag": "demo",
      "date": "2024-06-03T14:43:28.071Z",
      "__v": 0
    },
    {
      "_id": "665dd6906c8f48f6139d939ad",
      "user": "665c990543a5b33a940323c0",
      "title": "demo title",
      "description": "demo descriptiom",
      "tag": "demo",
      "date": "2024-06-03T14:43:28.071Z",
      "__v": 0
    },
    {
      "_id": "665dd6906c8f48f6139d939as",
      "user": "665c990543a5b33a940323c0",
      "title": "demo title",
      "description": "demo descriptiom",
      "tag": "demo",
      "date": "2024-06-03T14:43:28.071Z",
      "__v": 0
    },
    {
      "_id": "665dd6906c8f48f6139d939aa",
      "user": "665c990543a5b33a940323c0",
      "title": "demo title",
      "description": "demo descriptiom",
      "tag": "demo",
      "date": "2024-06-03T14:43:28.071Z",
      "__v": 0
    },
    
  ]
  const [notes, setNotes] = useState(notesInitial)

  //add note
  const addNote = (title, description, tag) => {
    const note = {
      "_id": "665dd6906c8f48f6139d93",
      "user": "665c990543a5b33a940323c0",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-06-03T14:43:28.071Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
  }
  //delete note
  const deleteNote = () => {

  }
  //edit note
  const editNote = () => {

  }
  return(
  <noteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
    {props.children}
    </noteContext.Provider>  
  ) 
};

export default NoteState;