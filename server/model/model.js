
const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    quantity : {
        type:Number,
        required:true
    },
    price : {
        type:Number,
        required: true
    },
    supplier : {
        type : String,
        required: true
    }
})

const Productdb = mongoose.model('productdb', schema);

module.exports = Productdb;
