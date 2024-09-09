const express = require('express');
const router = express.Router();

router.route('/login')
    .post(require('../Controllers/lawyerController').login)

module.exports = router