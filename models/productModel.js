const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required: [true,"Please enter the product name"]
        },
        quantity:{
            type:Number,
            required:true,
        },
        price:{
            type:Number,
            required:true,
        },
        image:{
            type:String,
            require:false,
        }

    },
    {
        timestamp:true
    }
)

const Product = mongoose.model('Product',productSchema);

module.exports=Product;