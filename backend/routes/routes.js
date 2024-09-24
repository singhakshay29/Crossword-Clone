const express = require("express");
const router = express.Router();
const {
  getbook,
  createbook,
  getOnebook,
  updatebook,
  deletebook
} = require("../controller/bookcontroller");

router.route("/").get(getbook);
router.route("/book/create").post(createbook);
router.route("/book/update").put(updatebook);
router.route("book/:_id").get(getOnebook).delete(deletebook);

module.exports = router;
