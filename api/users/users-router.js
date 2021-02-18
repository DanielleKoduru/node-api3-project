const express = require('express');
const users = require("./users-model")
const posts = require("../posts/posts-model")
// const {userParams, whereNotExists } = require("../../data/db-config")
const { validateUserId, validateUser, validatePost } = require("../middleware/middleware")


const router = express.Router();

router.get('/users', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  const options = {
    sortBy: req.query.sortby,
    limit: req.query.limit
  }
  users.get(options)
  .then((users) => {
    res.status(200).json(users)
    next()
  })
  .catch(next) 
});

router.get('/users/:id', validateUserId(), (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user)
});

router.post('/users', validateUser(), (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  users.insert(req.body)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch(next) 
});

router.put('/user/:id', validateUser(), validateUserId(), (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  users.update(req.params.id, req.body)
  .then((user) => {
    res.status(200).json(user)
  })
  .catch(next)
});

router.delete('/users/:id', validateUserId(), (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  users.remove(req.params.id)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch(next)
});

router.get('/:id/posts', validateUserId(), (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  posts.getUserPosts(req.params.id)
    .then((post) => {
      if (post){res.status(200).json(post)
      } else {
        res.status(404).json({message:"user has no posts"})
      }
    })
    .catch(next)
});

router.post('/users/:id/posts', validateUserId(), validatePost(), (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  posts.insert(req.body)
    .then((post) => {
      res.status(200).json(post)
    })
    .catch(() => {
      res.status(500).json({message: "Server Error"})
    })
});

// do not forget to export the router
module.exports = router