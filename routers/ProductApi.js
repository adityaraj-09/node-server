const express= require("express");
const {Product} = require("../model/product");
const router=express.Router();
const auth=require("../middlewares/authMiddleware")

router.post("/api/addProduct",async (req,res) =>{
    
    try {
        const {userId,title,category,desc,price,location,isNegotiable,image} =req.body;

        let product=new Product({
            userId:req.body.userId,
            title:req.body.title,
            category:req.body.category,
            desc:req.body.desc,
            price:req.body.price,
            location:req.body.location,
            isNegotiable:req.body.isNegotiable,
            image:req.body.image
        })

        product=await product.save();
        res.status(200).json(product);

    } catch (error) {
         res.status(500).json({error:error.message});
    }

});


router.post("/api/deleteProduct",async (req,res)=>{
    try {
        const {id}=req.body;
    let product=await Product.findByIdAndDelete(id);
    res.status(200).json({msg:"deleted product "});
    } catch (error) {
        res.status(500).json({error:error.message});
    }

});
router.post("/api/editProduct/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const {title,userId,category,desc,price,location,isNegotiable,image} =req.body;
        const product=await Product.findById(id);

        product.title=title;
        product.userId=userId;
        product.category=category;
        product.desc=desc;
        product.price=price;
        product.location=location;
        product.isNegotiable=isNegotiable;
        product.image=image;

        updatedProduct=await product.save();

        res.status(200).json({msg:"product updated"});

    } catch (error) {
        res.status(500).json({error:error.message});
    }
})


router.get("/api/getProductById/:id",async (req,res)=>{
    try {
        const {id}=req.params;
        const product=await Product.findById(id);

        res.status(200).json(product);

    } catch (error) {
         res.status(500).json({error:error.message});
    }
})

router.get("/api/products",async (req,res)=>{
    try{
        const products=await Product.find();
        if(products){
            res.status(200).json(products);
        }else{
            res.status(400).json({msg:"no products"});
        }
        
        }
        catch (error){
        res.status(500).json({error:error.message});
        }
});
router.get("/api/products/:userId",async (req,res)=>{
    try{
        const {userId} =req.params;
        const products=await Product.find({
            userId:userId
        });
        if(products){
            res.status(200).json(products);
        }else{
            res.status(400).json({msg:"no product added by you"});
        }
       
        }
        catch (error){
        res.status(500).json({error:error.message});
        }
});



module.exports=router;