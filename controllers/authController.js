const loginUser=require('../services/authService')


async function logout(req,res){
    res.cookie("authToken","");
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
        
        res.cookie("authToken",response,{
            httpOnly:true,
            secure:false,
            maxAge:7*24*60*60*1000
        })
        
        return res.json({
        message:'successfully created',
        success:true,
        data:{},
        error:{}
    })
    } catch (error) {
        return res.json({
        error:error,
        success:false,
        data:{},
        error:error
    })
    }
}

module.exports={login,logout}