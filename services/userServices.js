const { findUser, CreateUser } = require("../respositories/userRepo");
const {createCart}=require('../respositories/cartRepo');
    

    async function registerUser(userDetails){

        const user=await findUser({
            email:userDetails.email,
            mobileNumber:userDetails.mobileNumber
        })

        if(user){
            throw{reason:'user already exists'}
        }

        const newuser=await CreateUser({
            email:userDetails.email,
            password:userDetails.password,
            firstName:userDetails.firstName,
            lastName:userDetails.lastName,
            mobileNumber:userDetails.mobileNumber
        })

        if(!newuser){
            throw{reason:'something went wrong'}
        }

        await createCart(newuser._id);

        return newuser;
    }


module.exports={registerUser};