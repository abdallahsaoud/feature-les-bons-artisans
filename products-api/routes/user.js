const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');


    const router = express.Router();

    // Inscription
    router.post('/signup', async (req, res) => {
        const user = new User(req.body);
        try {
            await user.save();
            const token = await user.generateAuthToken();
            res.status(201).send({ user, token });
        } catch (err) {
            res.status(400).send(err);
        }
    });

    // Connexion
    router.post('/login', async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).send({ error: 'Unable to login' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).send({ error: 'Unable to login' });
            }
            const token = await user.generateAuthToken();
            res.send({ user, token });
        } catch (err) {
            res.status(400).send();
        }
    });

    module.exports = router;
