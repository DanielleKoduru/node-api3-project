const express = require('express');
const { logger } = require("./middleware/middleware")
const userRouter = require("./users/users-router")

const server = express();

server.use(express.json())
server.use(logger)
server.use(userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
