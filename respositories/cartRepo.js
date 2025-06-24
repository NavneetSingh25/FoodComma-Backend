const cart=require('../schema/cartSchema');

async function createCart(userId){
    try {
        const newCart=await cart.create({
            user:userId
        })
        return newCart;
    } catch (error) {
        console.log(error);
        
    }
}

async function getCart(userId){
    try {
        const newCart=await cart.findOne({
            user:userId
        }).populate('items.product');
        return newCart
    } catch (error) {
        console.log(error);
        
    }
}

async function deleteCart(userId){
    const Cart=await cart.findOne({
        user:userId
    });
    console.log(Cart,'Cart');

    if(!Cart){
        throw{reason:'Cart not found'}
    }

    Cart.items=[];
    await Cart.save();
    return Cart;
}

module.exports={
    createCart,
    getCart,
    deleteCart
};