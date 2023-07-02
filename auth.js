const express=require("express");
const User=require("./model/user");
const authRouter=express.Router();
const bcrypt=require("bcryptjs");
var salt=bcrypt.genSalt(10);

authRouter.post("/api/signup",async (req,res)=>{
  try {
    const {name,email,password}=req.body;
  const existingUser=await User.findOne({
    email:email
   });

   if(existingUser){
    return res.status(400).json({
        msg:"User with same email already exists"
    });
   }
   

   const hash=await bcrypt.hash(password,8);

   let user= new User({
     name:req.body.name,
     email:req.body.email,
     password: hash,
     
   });
   user=await user.save();
   res.json(user);
  } catch (error) {
    res.status(500).json({error:error.message});
  }
});

authRouter.get("/api/users",async(req,res)=>{
  try{
    const users=await User.find()
    res.json(users);

  }
  catch(error){
    res.status(500).json({error:error.message});
  }
})





module.exports=authRouter;