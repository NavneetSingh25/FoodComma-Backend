const { COOKIE_SECURE } = require('../config/ServerConfig');
const loginUser=require('../services/authService')


async function logout(req,res){
    res.clearCookie("authToken", {
    httpOnly: true,
    secure: COOKIE_SECURE,
    sameSite: "strict",
    });
    return res.status(200).json({
        success:true,
        message:'logged out successfully',
        data:{},
        error:{}
    });
}

async function login(req,res) {


    try {
        const loginpayload=req.body
        const response=await loginUser(loginpayload)
        console.log(response);
        
        res.cookie("authToken",response.token,{
            httpOnly:true,
            secure:COOKIE_SECURE,
            sameSite:'None',
            maxAge:7*24*60*60*1000
        })
        
        return res.json({
        message:'successfully logged In',
        success:true,
        data:{
            userRole:response.userRole,
            userData:response.userData
        },
        error:{}
    })
    } catch (error) {
        return res.json({
        error:error,
        success:false,
        data:{},
    })
    }
}

module.exports={login,logout}