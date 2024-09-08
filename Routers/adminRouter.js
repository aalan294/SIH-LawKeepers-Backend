const express = require('express');
const router = express.Router();

router.route('/judge/register')
    .post(require('../Controllers/adminController').registerJudge)
router.route('/lawyer/register')
    .post(require('../Controllers/adminController').registerLawyer)
router.route('/police/register')
    .post(require('../Controllers/adminController').registerPolice)
module.exports = router;