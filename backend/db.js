const mongoose=require("mongoose");
const mongoURI="mongodb://127.0.0.1:27017/inoteDB";

const connectToMongo=()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/inoteDB",{useNewUrlParser:true});
    console.log("connected");
}

module.exports=connectToMongo