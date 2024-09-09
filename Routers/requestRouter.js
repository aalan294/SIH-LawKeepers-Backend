const express = require('express');
const router = express.Router();

router.route('/lawyer')
    .post(require('../Controllers/requestController').newRequest)
router.route('/:lawyerId')
    .get(require('../Controllers/requestController').allRequests)
router.route('/:requestId')
    .put(require('../Controllers/requestController').updateRequest)
router.route('/accept/:lawyerId')
    .get(require('../Controllers/requestController').acceptRequests)

module.exports = router