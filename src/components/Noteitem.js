import React,{useContext}from 'react';
import noteContext from "../context/notes/noteContext";


const Noteitem = (props) => {
  const context=useContext(noteContext);
  const {note,updateNote}=props;
  const {deleteNote}=context;

  return (
        <div className="card" style={{width: "18rem",display:"inline-block",margin:"10px 10px 0px 0px"}}>
           <div className="card-body">
            <div className="d-flex align-items-center">

             <h5 className="card-title">{note.title}</h5>
             <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("Deleted successfully","success");}}></i>
    
             <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note);}}></i>
            </div>
             <p className="card-text">{note.description}</p>
           </div>
        </div>

  )
}

export default Noteitem