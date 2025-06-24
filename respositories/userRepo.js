const User=require('../schema/userSchema');


    async function findUser(parameters){
        const response=await User.findOne({...parameters})
        return response;
    }

    async function CreateUser(userDetails){
        const response=await User.create(userDetails)
        return response;
    }


module.exports={
    findUser,
    CreateUser
};