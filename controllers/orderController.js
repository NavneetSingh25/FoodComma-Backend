const { createOrder, updateOrder, getAllOrdersCreatedByUser, getOrderDetailsById }=require('../services/orderService')
async function createNewOrder(req,res){
    try {
        const order=await createOrder(req.user.id,req.body.paymentMethod);
        
        if(order){return res.status(200).json({
            success:true,
            data:order,
            message:'successfully created the order',
            error:{}
        })
    }
    } catch (error) {
        return res.json({
            success:false,
            data:[],
            message:'Unable to create order ',
            error:error
        })
    }
}

async function getAllOrdersByUser(req, res) {
    try {
        const order = await getAllOrdersCreatedByUser(req.user.id);
        return res.status(200).json({
            success: true,
            message: "Successfully fetched the orders",
            error: {},
            data: order
        })
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}

async function getOrder(req, res) {
    try {
        const order = await getOrderDetailsById(req.params.orderId);
        return res.status(200).json({
            success: true,
            message: "Successfully fetched the orders",
            error: {},
            data: order
        })
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}

async function cancelOrder(req, res) {
    try {
        const order = await updateOrder(req.params.orderId, "CANCELLED");
        return res.status(200).json({
            success: true,
            message: "Successfully fetched the orders",
            error: {},
            data: order
        })
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}

async function changeOrderStatus(req, res) {
    try {
        const order = await updateOrder(req.params.orderId, req.body.status);
        return res.status(200).json({
            success: true,
            message: "Successfully fetched the orders",
            error: {},
            data: order
        })
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}


module.exports = {
    createNewOrder,
    changeOrderStatus,
    cancelOrder,
    getOrder,
    getAllOrdersByUser
}