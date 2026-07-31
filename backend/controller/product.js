const productModel = require('../model/product');
const addProduct = async(req,res)=> {
    try{
        const {productName,productCode,productType,description,status} = req.body;
         const existingProduct = await productModel.findOne({ productName });
          const existingProductCode = await productModel.findOne({ productCode });

          if (existingProduct && existingProductCode) {
                return res.status(400).json({
                    message: "Product or Product Code already exists"
                });
            }

            if (existingProduct) {
                return res.status(400).json({
                    message: "Product already exists"
                });
            }

            if (existingProductCode) {
                return res.status(400).json({
                    message: "Product Code already exists"
                });
            }

            const newProduct = new productModel({
                productName,
                productCode,
                productType,
                description,
                status
            })
            await newProduct.save();

        res.status(201).json({
            message: 'Product created successfully'
        });

        }
            catch(error){
            console.log(error);
        }
}

const getAllProducts = async(req,res)=> {

    try{
    const productData = await productModel.find({});

    return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: productData
        });
        }
        catch(error){
            console.log(error);
             return res.status(500).json({
            success: false,
            message: "Failed to fetch products"
        });
        }

}

module.exports = {addProduct,getAllProducts}