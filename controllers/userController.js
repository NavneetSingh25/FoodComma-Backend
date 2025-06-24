const { registerUser } = require("../services/userServices");

async function createUser(req,res){
    console.log('create user controller called');
    console.log(req.body);


    try{

    const response= await registerUser(req.body)
    
    return res.json({
        message:'successfully created',
        success:true,
        data:response,
        error:{}
    })
}catch(error){
    return res.json({
        error:error,
        success:false,
        data:{},
        error:error
    })
}
    
}

module.exports=createUser;