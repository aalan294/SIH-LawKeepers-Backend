const express = require('express');
const router = express.Router();

router.route('/login')
    .post(require('../Controllers/defandantController').loginDefender)

router.route('/law-list')
    .get(require('../Controllers/lawyerController').getAllLawyers)

module.exports = router