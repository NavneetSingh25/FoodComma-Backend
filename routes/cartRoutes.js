const express=require('express');
const {getCartByUser, modifyProductToCart, deleteProductsFromCart} = require('../controllers/cartController');
const { isLoggedIn } = require('../validation/authValidator');

const cartRouter=express.Router();

cartRouter.get('/',isLoggedIn,getCartByUser);
cartRouter.post('/:operation/:productId',isLoggedIn,modifyProductToCart);
cartRouter.delete('/products',isLoggedIn,deleteProductsFromCart);

module.exports=cartRouter;