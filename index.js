const express=require("express");
const PORT=process.env.PORT || 3000;
const mongoose=require("mongoose");

const authRouter=require("./auth");
const productRouter=require("./ProductApi");
const userRouter=require("./userApi");
const app=express();
const DB="mongodb+srv://aditya:adi123@cluster0.pxaqtot.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json());
app.use(authRouter);
app.use(productRouter);
app.use(userRouter);

mongoose.connect(DB).then(()=>{
    console.log('connection successful');
}).catch((e) => {
    console.log(e);
});


app.listen(PORT,"0.0.0.0",() =>{
    console.log(`connected at port ${PORT}`);
});
