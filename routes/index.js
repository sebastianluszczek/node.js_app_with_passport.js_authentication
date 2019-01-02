const express = require('express');
const router = express.Router();
const {
    ensureAuthenticated
} = require('../config/auth');


router.get('/', (req, res) => {
    res.render('pages/welcome')
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('pages/dashboard', {
        name: req.user.name
    })
});

module.exports = router;