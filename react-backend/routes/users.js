const db = require("../db/queries");
const express = require("express");
const router = express.Router();

// All paths start with '/users'

/* GET users listing. */
router.get("/", db.getAllUsers);
router.post("/new", db.createUser);
router.patch("/:id/edit", db.updateSingleUser);
router.get("/:username/edit", db.getSingleUser);

module.exports = router;
