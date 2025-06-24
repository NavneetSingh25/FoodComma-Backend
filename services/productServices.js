const cloudinary=require('../config/cloudinaryConfig')
const ProductRepository=require('../respositories/productRepo')
const fs=require('fs/promises')

async function createProduct(productDetails){
    const ImagePath=productDetails.imagePath
    if(ImagePath){
        try{
            const CloudinaryResponse=await cloudinary.uploader.upload(ImagePath);
            var productImage=CloudinaryResponse.secure_url;
            await fs.unlink(ImagePath);
        }catch(error){
            console.log(error);
            throw{reason:'not able to create product',statusCode:500}
        }
    }

    const product=await ProductRepository.createProduct({
        ...productDetails,
        productImage
    })

    if(!product){
        throw{reason:'not able to create product',statusCode:500};
    }

    return product;
}

async function getProductById(productId){
    const response=await ProductRepository.getProductById(productId);
    if(!response){
        throw{reason:'Not able to get product'}
    }
    return response;
}

async function deleteProductById(productId){
    const response=await ProductRepository.deleteProductById(productId);
    if(!response){
        throw{reason:'Can not delete product'}
    }
    return response;
}


module.exports={
    createProduct,
    getProductById,
    deleteProductById
}