const express = require('express');
const posts = require("./posts-model")
const { validateUserId, validateUser } = require("../middleware/middleware")


const router = express.Router();

router.get('/', (req, res) => {
  // DO YOUR MAGIC
});

router.get('/:id', (req, res) => {
  // DO YOUR MAGIC
});

// do not forget to export the router
module.exports = router
