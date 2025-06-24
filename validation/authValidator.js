const { SECRET_KEY } = require("../config/ServerConfig")
const jwt=require('jsonwebtoken')

async function isLoggedIn(req,res,next){
    const token=req.cookies['authToken']
    if(!token){
        return res.status(401).json({
            success:false,
            data:{},
            message:'Not authenticated',
            error:'No auth token provided'
        })
    }

    try {
        const decoded=jwt.verify(token,SECRET_KEY);
        
        if(!decoded){
            throw{reason:'Unable to verify token'}
        }
        req.user={
        email:decoded.email,
        id:decoded.id,
        role:decoded.role
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            data:{},
            message:'not authenticated',
            error:'Invalid token'
        })
    }

}
async function isAdmin(req,res,next){
    const loggedInUser=req.user;
    if(loggedInUser.role==='ADMIN'){
        next();
    }else{
        return res.status(401).json({
        success:false,
        data:{},
        message:'You are not authorised to perform this action',
        error:{
            statusCode:401,
            reason:'Unauthorised action'
        }
    })

    }
    
}
6
module.exports={
    isLoggedIn,
    isAdmin
}