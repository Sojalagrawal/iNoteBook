require('dotenv').config()
const express=require("express");
const User=require("../models/User")
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt=require("bcryptjs");
const jwt = require('jsonwebtoken');
const fetchuser=require("../middleware/fetchUser");

const JWT_SECRET = process.env.SECRET; 

//Route 1: Create a User using POST "/api/auth/".Doesn't require Auth 
router.post('/createuser',[
    body('name',"Enter a valid name").isLength({min:3}),
    body('email',"Enter a valid email").isEmail(),
    body('password',"Password must be atleast 5 characters").isLength({min:5})
    ],
    async(req,res)=>{
        let success=false;
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({success,errors:errors.array()});
        }


    // const user=User(req.body);
    // user.save();
    // res.send(req.body);

    // User.create({
    //     name:req.body.name,
    //     password:req.body.password,
    //     email:req.body.email
    // }).then((user)=>res.json(user))
    // .catch(err=>{console.log(err)
    //    res.json({error:"please enter a unique value for email"})});
    // })



    //Check whether the user with this email exists already or not
    try{
        let user=await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({error:"Sorry a userwith this email already exists"});
        }
        const salt=await bcrypt.genSalt(10);
        secPass=await bcrypt.hash(req.body.password,salt);
        
        user=await User.create({
                name:req.body.name,
                password:secPass,
                email:req.body.email
        });
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET);
        success=true;
        res.json({success,authtoken});
    }catch(error){
        console.log(error.message);
        res.status(500).send("some error occured");
    }
    
});




//Route 2:Authentiate a user using:POST "/api/auth/login"-no login required
router.post('/login',[
    body('email',"Enter a valid email").isEmail(),
    body('password',"Password cannot be blank").exists(),
],
    async(req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        const {email,password}=req.body;
        try{
            let success=true;
            let user=await User.findOne({email});   //(email:email)
            if(!user){
                success=false;
                return res.status(400).json({errors:"Please try to login with correct credentials"});
            }
            const passwordCompare=await bcrypt.compare(password,user.password);
            if(!passwordCompare){
                success=false;
                return res.status(400).json({errors:"Please try to login with correct credentials"});

            }
            const data={
                user:{
                    id:user.id
                }
            }
            const authtoken=jwt.sign(data,JWT_SECRET);
            res.json({success,authtoken});

            
        }catch(error){
            console.log(error.message);
            res.status(500).send("some internal server error occured");
        }


});




//Route 3:Get user login details: POST "/api/auth/getUser" - Login required
router.post('/getUser',fetchuser,async(req,res)=>{
    
    try{    
        userId=req.user.id;
        const user=await User.findById(userId).select("-password");
        res.send(user);
    }catch(error){
        console.log(error.message);
        res.status(500).send("some error occured");
    }
});

module.exports=router;
