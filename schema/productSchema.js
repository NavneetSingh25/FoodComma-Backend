const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:[true,"product name is required"],
        minLength:[5,"product name must be atleat 5 letters long"],
        trim:true
    },

    description:{
        type:String,
        minLength:[5,"description must be atleat 5 letters long"]
    },

    productImage:{
        type:String
    },

    price:{
        type:Number,
        required:[true,"price is required"]
    },

    category:{
        type:String,
        enum:['veg','non-veg','drinks','sides'],
        default:'veg'
    },

    quantity: {
                type: Number,
                required: true,
                default: `10`
            },

    inStock:{
        type:Boolean,
        required:[true,"stock status is required"],
        default:true,
    }

},{
    timeStamps:true
});

const product=mongoose.model('product',productSchema);
module.exports=product;