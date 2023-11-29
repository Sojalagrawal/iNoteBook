import React, { useContext, useEffect, useRef,useState } from 'react'
import noteContext from "../context/notes/noteContext";
import Noteitem from './Noteitem';
import { AddNote } from './AddNote';
import { useNavigate } from 'react-router-dom';


export default function Notes(props) {
  let navigate= useNavigate();

  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;


  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate("/login");
    }
    // eslint-disable-next-line
  },[]);


  const ref = useRef(null);
  const refClose = useRef(null);
  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})


  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag});
  }
  const handleClick=(e)=>{
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click(); 
    props.showAlert("Updated successfully","success");
  }
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value}) //purana wala note uske upar overwrite kringe acc to conditions ..bracket me jo h uska mtlb h jo bhi change horha h uski name jo h uski value ke equal hojaye 
  } 
  return (
    <div>
      <AddNote showAlert={props.showAlert} />
      <button ref={ref} style={{display:"none"}} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" name="etitle" className="form-control" id="etitle" aria-describedby="emailHelp" onChange={onChange}  value={note.etitle} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="edesription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag}/>
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Noe</button>
            </div>
          </div>
        </div>
      </div>

      <div className='container my-3'>
        <h2>Your Notes</h2>
        <div className="container">
            {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return <Noteitem note={note} updateNote={updateNote} key={note._id} showAlert={props.showAlert} />
        })}
      </div>
    </div>
  )
}
