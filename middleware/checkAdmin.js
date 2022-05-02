const jwt = require('jsonwebtoken');
// const { User } = require('../models/users');
const asyncHandler = require('express-async-handler');
const checkAuth = require('./checkAuth.js');
require('dotenv/config');

const checkAdmin = asyncHandler(checkAuth, async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('only admins are allowed to do this');
  }
});

module.exports = { checkAdmin };
