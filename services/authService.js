const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const { findUser } = require('../respositories/userRepo')
const { SECRET_KEY, EXPIRES_IN } = require('../config/ServerConfig')



async function loginUser(authDetails){
    const email=authDetails.email
    const plainPassword=authDetails.password

    const user=await findUser({email})
    console.log('user',user);

    if(!user){
        throw{message:'no user found with given details',stausCode:404};
        
    }

    const ispasswordvalidated=await bcrypt.compare(plainPassword,user.password)

    if(!ispasswordvalidated){
        throw{message:'invalid password',statusCode:401}

    }

    const userRole=user.role?user.role:'USER';

    const token=jwt.sign({email:user.email,id:user._id,role:userRole},SECRET_KEY,{
        expiresIn:EXPIRES_IN
    });

    return token;
}

module.exports=loginUser