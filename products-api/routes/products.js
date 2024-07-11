const express = require('express');
const Product = require('../models/product');
const auth = require('../middleware/auth');

module.exports = (io) => {
    const router = express.Router();

    // Get all products
    router.get('/', async (req, res) => {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // Get one product
    router.get('/:id', auth, async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.json(product);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // Create a product
    router.post('/', auth, async (req, res) => {
        const productData = {
            _id: req.body._id,
            name: req.body.name,
            type: req.body.type,
            price: req.body.price,
            rating: req.body.rating,
            warranty_years: req.body.warranty_years,
            available: req.body.available
        };

        const product = new Product(productData);

        try {
            const newProduct = await product.save();
            io.emit('productAdded', newProduct);  // Notify clients
            res.status(201).json(newProduct);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    // Update a product
    router.patch('/:id', auth, async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['_id', 'name', 'type', 'price', 'warranty_years', 'available', '__v'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' });
        }

        try {
            const product = await Product.findById(req.params.id);

            if (!product) {
                return res.status(404).send({ error: 'Product not found' });
            }

            updates.forEach((update) => {
                product[update] = req.body[update];
            });

            await product.save();
            res.send(product);
        } catch (e) {
            res.status(400).send(e);
        }
    });

    // Rate a product
    router.patch('/:id/rate', auth, async (req, res) => {
        const productId = req.params.id;
        const { rating } = req.body;

        try {
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).send({ error: 'Product not found' });
            }

            const userRating = product.ratings.find(r => r.user.toString() === req.user._id.toString());

            if (userRating) {
                userRating.rating = rating;
            } else {
                product.ratings.push({ user: req.user._id, rating });
            }

            await product.save();

            res.send(product);
        } catch (error) {
            res.status(400).send(error);
        }
    });

    // Delete a product
    router.delete('/:id', auth, async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).send({ error: 'Product not found' });
            }
            await Product.deleteOne({ _id: req.params.id });
            res.send({ message: 'Product deleted successfully' });
        } catch (err) {
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });

    return router;
};
