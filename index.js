const express=require('express')
const serverConfig=require('./config/ServerConfig')
const connectDB=require('./config/dbConfig')
const bodyParser=require('body-parser')
const userRouter = require('./routes/userRoutes')
const cartRouter = require('./routes/cartRoutes')
const authRouter = require('./routes/authRoutes')
const cookieParser=require('cookie-parser')
const { isLoggedIn } = require('./validation/authValidator')
const uploader = require('./middlewares/multerMiddleware')
const cloudinary=require('./config/cloudinaryConfig')
const fs=require('fs/promises')
const productRouter = require('./routes/productRoute')
const orderRouter = require('./routes/orderRoutes')

const app=express()
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use('/users',userRouter);
app.use('/carts',cartRouter);
app.use('/auth',authRouter)
app.use('/product',productRouter);
app.use('/orders',orderRouter)


app.post('/photo',uploader.single('incomingfile'),async (req,res)=>{
    const result=await cloudinary.uploader.upload(req.file.path)
    console.log(result)
    await fs.unlink(req.file.path)
    return res.json({message:'ok'});
})

app.get('/ping',(req,res)=>{
    console.log(req.body);
    console.log(req.cookies);
    return res.json({message:"pong"})
});

app.listen(3000,async ()=>{
    await connectDB();
    console.log(`Server started at ${serverConfig.PORT}`);
    
})