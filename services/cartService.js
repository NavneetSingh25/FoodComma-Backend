const {getCart, deleteCart}=require('../respositories/cartRepo');
const {getProductById}=require('../respositories/productRepo')
async function getCartByUserId(userId){
    try {
        const cart=await getCart(userId);
        return cart;
    } catch (error) {
        console.log(error);
    }
}

async function modifyCart(userId,productId,shouldAdd=true){
    const quantityValue=(shouldAdd==true)?1:-1;
    const cart=await getCartByUserId(userId);
    const product=await getProductById(productId);
    if(!product){
        throw{reason:'Unable to fetch product'};
    }

    if(!product.inStock){
        throw{reason:'Bad Request'}
    }


    let found = false;
    cart.items.forEach(item=>{
        if(item.product._id==productId){
            if(shouldAdd){
                if(product.quantity>=item.quantity+1){
                item.quantity+=quantityValue;
            }else{
                throw{reason:'item not avalable'};
                }
            }else{
                if(item.quantity>0){
                    item.quantity+=quantityValue;
                    if(item.quantity==0){
                        cart.items=cart.items.filter(item=>item.product._id!=productId);
                        found=true;
                        return;
                    }
                }else{
                    throw{reason:'item not avalable'};
                }
            }
            
            found=true;
        }
    })

    if(!found){
        if(shouldAdd){
            cart.items.push({
                product: productId,
                quantity:1
            })
        }else{
            throw{reason:'cart not found'}
        }
    }

    await cart.save();
    await product.save();

    
    return cart;
}

async function deletecart(userId){
    const cart=await deleteCart(userId);
    console.log(cart,'cart');
    return cart;
}

module.exports={getCartByUserId,modifyCart,deletecart}