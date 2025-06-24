const mongoose=require('mongoose')
const serverConfig=require('./ServerConfig')

async function connectDB(){
    try {
        await mongoose.connect(serverConfig.DB_URL);
        console.log('DB succesfully connected');
        
    } catch (error) {
        console.log('not able to connect DB');
        console.log(error);
        
        
    }
}

module.exports=connectDB;