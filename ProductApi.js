const express=require("express");
const Product = require("./model/product");
const router=express.Router();

router.post("/api/addProduct",async (req,res) =>{
    try {
        const {userId,title,desc,price,location,isNegotiable,image} =req.body;

        let product=new Product({
            userId:req.body.userId,
            title:req.body.title,
            desc:req.body.desc,
            price:req.body.price,
            location:req.body.location,
            isNegotiable:req.body.isNegotiable,
            image:req.body.image
        })

        product=await product.save();
        res.json(product);

    } catch (error) {
         res.status(500).json({error:error.message});
    }

});

router.get("/api/products",async (req,res)=>{
 try{
 const products=await Product.find();
 res.json(products);
 }
 catch (error){
 res.status(500).json({error:error.message});
 }
});



module.exports=router;