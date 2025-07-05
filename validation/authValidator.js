const { SECRET_KEY, COOKIE_SECURE } = require("../config/ServerConfig")
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
        if(token.name==="TokenExpiredError"){
            res.cookie("authToken","",{
            httpOnly:true,
            secure:COOKIE_SECURE,
            maxAge:7*24*60*60*1000
        })
            return res.status(200).json({
            success:true,
            message:'logged out successfully',
            data:{},
            error:{}
    });
        }
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

module.exports={
    isLoggedIn,
    isAdmin
}