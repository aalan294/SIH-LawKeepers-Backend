const express = require('express');
const router = express.Router();

router.route('/login')
    .post(require('../Controllers/judgeController').judgeLogin)
router.route('/case')
    .get(require('../Controllers/judgeController').judgeRequests)

module.exports = router