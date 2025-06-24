const { getCart, deleteCart } = require("../respositories/cartRepo");
const { createNewOrder, getOrdersByUserId, getOrderById, updateOrderStatus } = require("../respositories/orderRepo");
const { findUser } = require("../respositories/userRepo");

async function createOrder(userId,paymentmethod){
    const cart= await getCart(userId);
    const user=await findUser({_id:cart.user});
    if(!cart){
        throw{reason:'cart not found'}
    }

    const orderObject={};

    if(cart.items.length===0){
        throw{reason:'cart is empty,please add some items to the cart'}
    }

    orderObject.user=cart.user;
    orderObject.items=cart.items.map(cartItem=>{
        return {product:cartItem.product._id, quantity:cartItem.quantity}
    })
    orderObject.status="ORDERED";
    orderObject.totalPrice=0;

    cart.items.forEach((cartItem)=>{
        orderObject.totalPrice+=cartItem.quantity*cartItem.product.price;
    })

    orderObject.address=user.address
    orderObject.paymentMethod=paymentmethod;

    const order=await createNewOrder(orderObject);
    if(!order){
        throw{reason:'order not created'}
    }

    await deleteCart(userId);

    return order;

}

async function getAllOrdersCreatedByUser(userId) {
    const orders = await getOrdersByUserId(userId);
    if(!orders) {
        throw{reason:'unable to get all orders'};
    }
    return orders;
}

async function getOrderDetailsById(orderId) {
    const order = await getOrderById(orderId);
    if(!order) {
        throw{reason:'unable to get all orders'};
    }
    return order;
}

async function updateOrder(orderId, status) {
    const order = await updateOrderStatus(orderId, status);
    if(!order) {
        throw{reason:'unable to update orders'};
    }
    return order;
}

module.exports = {
    createOrder,
    getAllOrdersCreatedByUser,
    getOrderDetailsById,
    updateOrder
}