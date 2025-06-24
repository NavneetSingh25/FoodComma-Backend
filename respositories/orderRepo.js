const Order=require('../schema/orderSchema')
async function createNewOrder(orderDetails){
    try {
        const response=await Order.create(orderDetails);
        return response;
    } catch (error) {
        console.log(error)
    }
}

async function getOrdersByUserId(userId) {
    try {
        const orders = await Order.find({user: userId}).populate('items.product');
        return orders;
    } catch(error) {
        console.log(error);
        
    }
}

async function getOrderById(orderId) {
    try {
        const order = await Order.findById(orderId).populate('items.product');
        return order;
    } catch(error) {
        console.log(error);
        
    }
}

async function updateOrderStatus(orderId, status) {
    try {
        const order = await Order.findByIdAndUpdate(orderId, {status: status}, {new:true});
        console.log(order);
        return order;
    } catch(error) {
        console.log(error);
        
    }
}


module.exports = {
    createNewOrder,
    getOrderById,
    getOrdersByUserId,
    updateOrderStatus
}