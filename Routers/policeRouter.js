const express = require('express');
const router = express.Router();

router.route('/login')
    .post(require('../Controllers/policeController').loginPolice)
router.route('/new-case')
    .post(require('../Controllers/caseController').createCase)

module.exports = router