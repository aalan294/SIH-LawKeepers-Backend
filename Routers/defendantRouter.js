const express = require('express');
const router = express.Router();

router.route('/login')
    .post(require('../Controllers/defandantController').loginDefender)

module.exports = router