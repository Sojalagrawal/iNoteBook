import React,{useContext, useState} from 'react';
import noteContext from "../context/notes/noteContext";


export const AddNote = (props) => {
    const context=useContext(noteContext);
    const {addNote}=context;
    const [note,setNote]=useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""}); 
        props.showAlert("Added successfully","success");
    }
    const onChange=(e)=>{
      setNote({...note,[e.target.name]:e.target.value}) //purana wala note uske upar overwrite kringe acc to conditions ..bracket me jo h uska mtlb h jo bhi change horha h uski name jo h uski value ke equal hojaye 
    }
  return (
    <div>
        <div className='container my-3'>
       <h1>Add a Note</h1>
       <form className='my-3'>
         <div className="mb-3">
           <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
           <input type="text" name="title" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} value={note.title} minLength={5} required/>
         </div>
         <div className="mb-3">
           <label htmlFor="desription" className="form-label">Description</label>
           <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={note.description} minLength={5} required/>
         </div>
         <div className="mb-3">
           <label htmlFor="tag" className="form-label">Tag</label>
           <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag}/>
         </div>
         <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
       </form>
     </div>
    </div>
  )
}
