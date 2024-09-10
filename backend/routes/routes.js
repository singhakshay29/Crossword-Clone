const express = require("express");
const router = express.Router();
const { getbook , createbook , getOnebook , updatebook , deletebook } = require("../controller/bookcontroller");


router.route('/').get(getbook)
router.route('/create').post(createbook);
router.route('/update').put(updatebook)
router.route('/:_id').get(getOnebook).delete(deletebook);

module.exports = router;