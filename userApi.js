const express=require("express");
const User=require("./model/user");
const authRouter=express.Router();
const bcrypt=require("bcryptjs");

authRouter.post("/api/update-user",async (req,res)=>{
    try {
        const {name,new_email,old_email,password,address}=req.body;
        const existingUser=await User.findOne({
            email:old_email
           });

           if(!existingUser){
            return res.status(400).json({
                msg:"No user with this  email exists"
            });
           }
           const hash=await bcrypt.hash(password,8);
        
        existingUser.name=name;
        existingUser.email=new_email;
        existingUser.password=hash;
        existingUser.address=address;

        user=await existingUser.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
})

module.exports=authRouter;