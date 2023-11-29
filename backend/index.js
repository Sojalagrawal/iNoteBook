const connectToMongo=require('./db');
const express = require("express");
const app=express();
const cors=require('cors');
connectToMongo();


app.use(cors());
//for req.body
app.use(express.json());

//Available Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));



app.get("/",function(req,res){
    res.send("home");
});

app.listen(5000,function(){
     console.log("Server started on port 5000");
});