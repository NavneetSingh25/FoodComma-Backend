const express=require('express')
const serverConfig=require('./config/ServerConfig')
const connectDB=require('./config/dbConfig')
const bodyParser=require('body-parser')
const app=express()
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded());

app.post('/ping',(req,res)=>{
    console.log(req.body);
    return res.json({message:"pong"})
});

app.listen(3000,async ()=>{
    await connectDB();
    console.log(`Server started at ${serverConfig.PORT}`);
    
})