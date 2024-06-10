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
    const note = await response.json();
    setNotes(notes.concat(note))
  }

  //delete note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/note/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1Yzk5MDU0M2E1YjMzYTk0MDMyM2MwIn0sImlhdCI6MTcxNzM0NDU0OH0.V0gUN6gtysuhC59QVDg4G-00Gx0REbERK8-MVZNH1i8"
      },
    });
    const json = await response.json();
    setNotes(json)

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
    const json = await response.json();
    let newNotes = JSON.parse(JSON.stringify(notes))
    for(let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id === id) {
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag
        break;
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