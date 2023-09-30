const mongoose = require('mongoose');
const { Schema } = mongoose;
const productSchema = Schema({
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    category: String
});

module.exports = mongoose.model('product', productSchema, 'product');