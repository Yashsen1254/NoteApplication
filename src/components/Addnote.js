import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext";

const Addnote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setnote] = useState({title: "", description: "", tag: ""})

    const handelClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setnote({title: "", description: "", tag: ""})
    }

    const onChange = (e) => {
        setnote({...note, [e.target.name]: e.target.value})
    }
  return (
      <div className="container my-3">
      <h1>Add Notes</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name='title'
            aria-describedby="emailHelp"
            onChange={onChange}
            value={note.title}
            required
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name='description'
            onChange={onChange}
            value={note.description}
            required
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name='tag'
            onChange={onChange}
            value={note.tag}
          />
        </div>
        
        <button type="submit" className="btn btn-primary" onClick={handelClick} disabled={note.title.length<5 || note.description.length<5}>
          Add Note
        </button>
      </form>
      </div>
  )
}

export default Addnote
