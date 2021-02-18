const express = require('express');
const posts = require("./posts-model")
const { validateUserId, validateUser, validatePost } = require("../middleware/middleware")
const { post } = require('../users/users-router');

const router = express.Router();

router.get('/', (req, res, next) => {
  const options = {
    sortBy: req.query.sortby,
    limit: req.query.limit
  }
  posts.get(options)
    .then((users) => {
      res.status(200).json(users)
      next()
    })
    .catch((err) => {
      next(err)
    })
});

router.get('/:id', (req, res, next) => {
  post.getByID(req.params.id)
  .then((posts) => {
    res.status(200).json(posts)
    next()
  })
  .catch((err) => {
    next(err)
  })
});

module.exports = router
