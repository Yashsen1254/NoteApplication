import React, { useState } from'react';
import noteContext from './noteContext';

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  //Fetch note
  const getNotes = async () => {
    const response = await fetch(`${host}/api/note/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1Yzk5MDU0M2E1YjMzYTk0MDMyM2MwIn0sImlhdCI6MTcxNzM0NDU0OH0.V0gUN6gtysuhC59QVDg4G-00Gx0REbERK8-MVZNH1i8"
      },
    });
    const json = await response.json();
    setNotes(json)
  }

  //add note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/note/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1Yzk5MDU0M2E1YjMzYTk0MDMyM2MwIn0sImlhdCI6MTcxNzM0NDU0OH0.V0gUN6gtysuhC59QVDg4G-00Gx0REbERK8-MVZNH1i8"
      },
       body: JSON.stringify({title, description, tag})
    });

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
  const deleteNote = (id) => {
    console.log("Delete note" + id);
    const newNotes = notes.filter(note => note._id!== id)
    setNotes(newNotes)
  }
  //edit note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/note/updatenotes/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1Yzk5MDU0M2E1YjMzYTk0MDMyM2MwIn0sImlhdCI6MTcxNzM0NDU0OH0.V0gUN6gtysuhC59QVDg4G-00Gx0REbERK8-MVZNH1i8"
      },
       body: JSON.stringify({title, description, tag})
    });

    
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if(element._id === id) {
        element.title = title
        element.description = description
        element.tag = tag
      }
    }
  }
  return(
  <noteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
    {props.children}
    </noteContext.Provider>  
  ) 
};

export default NoteState;