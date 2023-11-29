const express=require("express");
const { body, validationResult } = require('express-validator');

const router=express.Router();
const fetchuser=require("../middleware/fetchUser");
const Notes=require("../models/Notes");

//Route 1:Get All The Notes using GET "/api/auth/getuser".Login required
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    const notes=await Notes.find({user:req.user.id});
    res.json(notes);
});



//Route 2:Add a new  Note using POST "/api/auth/addnote".Login required
router.post('/addnote',fetchuser,[
    body('title',"Enter a valid title").isLength({min:3}),
    body('description',"desciption must be atleast 5 characters").isLength({min:0})
],async (req,res)=>{
    try{
        const {title,description,tag}=req.body;
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const note=new Notes({
          title,description,tag,user:req.user.id
        });
        const saveNote=await note.save();
        res.json(saveNote);
    }catch(error){
        console.log(error.message);
        res.status(500).send("some error occured");
    };
});





//Route 3: Update an existing code using:PUT "/api/auth/updatenote".Login required
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag}=req.body;
    try{

        //create a new note
        const newNote={};
        if(title){
            newNote.title=title;
        }
        if(description){
            newNote.description=description;
        }
        if(tag){
            newNote.tag=tag;
        };
    
        //find the node to be updated and update it
        let note=await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not found");
        }
        if(note.user.toString()!== req.user.id){
            return res.status(404).send("Not allowed");
        }
    
        note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
        res.json(note);
        
    }catch(error){
        console.log(error.message);
        res.status(500).send("some error occured");
    };


});




//Route 3: delete an existing code using:DELETE "/api/auth/updatenote".Login required
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag}=req.body;
    try{

        //find the node to be deleted and delete it
        let note=await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not found");
        }
        //allow deletion if only userowns this Note
        if(note.user.toString()!== req.user.id){
            return res.status(404).send("Not allowed");
        }
    
        note=await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success":"Succesfully Deleted ",note:note});
        
    }catch(error){
        console.log(error.message);
        res.status(500).send("some error occured");
    };
    


});





module.exports=router
