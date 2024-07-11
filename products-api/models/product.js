const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    rating: {
        type: Number,
        required: false
    }
});

const productSchema = new mongoose.Schema({
    _id: { 
        type: Number,
        required: true 
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    warranty_years: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    ratings: [ratingSchema]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
