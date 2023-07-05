const express=require("express");
const User=require("../model/user");
const authRouter=express.Router();
const bcrypt=require("bcryptjs");
const auth=require("../middlewares/authMiddleware");

authRouter.post("/api/update-user",auth,async (req,res)=>{
    try {
        const {name,address,image,phone}=req.body;
        const existingUser=await User.findOne({
            email:email
           });

           if(!existingUser){
            return res.status(400).json({
                msg:"No user with this  email exists"
            });
           }
          
        
        existingUser.name=name;
        existingUser.address=address;
        existingUser.image=image;
        existingUser.phone=phone;

        let user=await existingUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
})


authRouter.post("/api/change-password",auth,async (req,res)=>{
    try {
        const {email,password,new_password}=req.body;

        let user=await User.findOne({
            email:email
           });

           if(!user){
            return res.status(400).json({
                msg:"No user with this  email exists"
            });
           }
    const isMatch = await bcrypt.compare(password, user.password);   
    const hash=await bcrypt.hash(new_password,8);

    if(isMatch){
        user.password=hash;
         user=await user.save();
        res.status(200).json(user);
    }else{
        res.status(400).json({
            msg:"password didn't match"
        });
    }


    } catch (error) {
        res.status(500).json({error:error.message});
    }
})

authRouter.post("/api/change-email",auth,async (req,res)=>{
    try {
        const {email,password,new_email}=req.body;

        let user=await User.findOne({
            email:email
           });

           if(!user){
            return res.status(400).json({
                msg:"No user with this  email exists"
            });
           }
    const isMatch = await bcrypt.compare(password, user.password);   
    

    if(isMatch){
        user.email=new_email;
         user=await user.save();
        res.status(200).json(user);
    }else{
        res.status(400).json({
            msg:"password didn't match"
        });
    }


    } catch (error) {
        res.status(500).json({error:error.message});
    }
})
module.exports=authRouter;