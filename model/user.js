const mongoose= require("mongoose");
const userSchema=mongoose.Schema({
    name:{
        required:true,
        type:String,
        trim:true,

    },
    email:{
        required:true,
        type:String,
        trim:true,
        validate:{
            validator:(value) =>{
                const re=/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
                return value.match(re)
            },
            message:'Please enter valid email'
        },
    },
    password:{
        required:true,
        type:String, 
        validate:{
            validator:(value) =>{
                return value.length>6;
            },
            message:'Please enter valid email'
        },
    },
});

const User=mongoose.model( "user",userSchema);
module.exports=User;
