const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// Middleware to hash passwords before saving to the database
router.use(async (req, res, next) => {
    if (req.body.password) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            req.body.password = hashedPassword;
        } catch (error) {
            return res.status(500).json({ error: 'Error hashing password' });
        }
    }
    next();
});

module.exports = router;
