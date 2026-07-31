const mongoose = require('mongoose');
const productModel = new mongoose.Schema({
    productName:{
        type:String,
        required:true,
        unique:true
    },
    productCode:{
        type:String,
        required:true,
         unique:true
        
    },
    productType:{
        type:String,
        required:true,
        
    },
    description:{
        type:String
    },
    status:{
        type:Boolean,
          default: true
    }
})

module.exports =  mongoose.model('Product',productModel);