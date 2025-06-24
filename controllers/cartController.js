const {getCartByUserId, modifyCart, deletecart}=require('../services/cartService')

async function getCartByUser(req,res){
    try {
        const cart=await getCartByUserId(req.user.id);
        
        if(cart){return res.status(200).json({
            success:true,
            data:cart,
            message:'successfully fetched the cart',
            error:{}
        })
    }
    } catch (error) {
        return res.json({
            success:false,
            data:[],
            message:'Unable to fetch the cart',
            error:error
        })
    }
    
    
}

async function modifyProductToCart(req,res){
    try {
        const cart=await modifyCart(req.user.id,req.params.productId,req.params.operation=="add");
        console.log(cart,'cart');
        if(cart){ 
            return res.status(200).json({
            success:true,
            data:cart,
            message:'successfully fetched the cart',
            error:{}
        })
    }
    } catch (error) {
        return res.json({
            success:false,
            data:[],
            message:'unable to fetch the cart',
            error:error
        })
    }
    
    
}

async function deleteProductsFromCart(req,res){
    try {
        const cart=await deletecart(req.user.id);
        if(cart){ 
            return res.status(200).json({
            success:true,
            data:cart,
            message:'successfully deleted products the cart',
            error:{}
        })
    }
    } catch (error) {
        return res.json({
            success:false,
            data:[],
            message:'unable to delete the products from cart',
            error:error
        })
    }
    
    
}


module.exports={
    getCartByUser,
    modifyProductToCart,
    deleteProductsFromCart
};