const users = require("../users/users-model")
// const posts = require("../posts/posts-model")

function logger() {
  return (req, res, next) => {
    const time = new Date().toISOString()
    console.log(`${time} ${req.method} ${req.url}`)
    next()
  }
}

function validateUserId() {
  return (req, res, next) => {
    users.findById(req.params.id)
      .then((user) => {
        if (user) {
          req.user = user
          next()
        } else {
          res.status(404).json({
            message: "User not found",
          })
        }
      })
  }
}

function validateUser() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ message: "missing user data" })
    } else if (!req.body.text) {
      return res.status(400).json({ message: "missing required name field" })
    }
    next()
  }
}

function validatePost() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ message: "missing post data" })
    } else if (!req.body.text) {
      return res.status(400).json({ message: "missing required text field" })
    }
    next()
  }
}

module.exports = { logger, validateUserId, validateUser, validatePost }