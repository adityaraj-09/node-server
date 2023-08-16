const express=require("express");
const PORT=process.env.PORT || 3000;
const cors=require('cors');
const mongoose=require("mongoose");
const path=require("path");

const authRouter=require("./auth");
const productRouter=require("./routers/ProductApi");
const userRouter=require("./routers/userApi");
const cartRouter=require("./routers/addCartApi");
const orderRouter=require("./routers/oderApi");
const app=express();
const DB="mongodb+srv://aditya:adi123@cluster0.pxaqtot.mongodb.net/?retryWrites=true&w=majority";

app.use(cors())
app.use(express.json())
app.use(authRouter);
app.use(express.static(path.join(__dirname, 'public')));
app.use(productRouter);
app.use(userRouter);
app.use(cartRouter);
app.use(orderRouter);

app.get("/api",(req,res)=>{
  res.send("Hello world!,I am Aditya from IIT Delhi")
})

mongoose.connect(DB).then(()=>{
    console.log('connection successful to mongodb');
}).catch((e) => {
    console.log(e);
});


app.listen(PORT,"0.0.0.0",() =>{
    console.log(`connected at port ${PORT}`);
});
