
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

var saleSchema = new mongoose.Schema({
    totalSales : {
        type : Number,
        required: true
    }
    
})


exports.Productdb = mongoose.model('productdb', schema);
exports.Salesdb = mongoose.model('salesdb', saleSchema);

// module.exports = Productdb;
// module.exports = Salesdb;
