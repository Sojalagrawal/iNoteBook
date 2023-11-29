
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{
  const host="http://localhost:5000"
    const notesInitial=[];
    const [notes,setNotes]=useState(notesInitial);

  //get all notes

  const getNotes=async()=>{
    //TODO:Api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
    });
    const json=await response.json();
    setNotes(json);

  }











  //Add a note
    const addNote=async(title,description,tag)=>{
      //TODO:Api call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("token")
        },
        body: JSON.stringify({title,description,tag}), 
        
      });
      const json= await response.json(); 
      setNotes(notes.concat(json));
    }


  //Delete a note
  const deleteNote=async(id)=>{
      //TODO:Api call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("token")
        },
      });
      const json= await response.json(); 
      console.log(json);
      const newNotes=notes.filter((note)=>{return note._id!==id});
      setNotes(newNotes);

    }


  //Edit a note
  const editNote=async(id,title,description,tag)=>{
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
      body: JSON.stringify({title,description,tag}), 
    });
    const json= await response.json(); 
    console.log(json);
    //my method
    // getNotes();



    //it doesn't work as we cant change state (notes) like this
    // for(let index=0;index<notes.length;index++){
    //   const element=notes[index];
    //   if(element._id===id){
    //     notes[index].title=title;
    //     notes[index].description=description;
    //     notes[index].tag=tag;

    //   }
    //   break;
    // }
    // setNotes(notes);






  //create new copy of notes
  let newNotes=JSON.parse(JSON.stringify(notes));
  for(let index=0;index<notes.length;index++){
      const element=notes[index];
      if(element._id===id){
        newNotes[index].title=title;
        newNotes[index].description=description;
        newNotes[index].tag=tag;

      }
      break;
    }
    setNotes(newNotes);





  }
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>  
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;