const express=require("express");
const User=require("./model/user");
const authRouter=express.Router();

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

   let user= new User({
     name:req.body.name,
     email:req.body.email,
     password:req.body.password,
     
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