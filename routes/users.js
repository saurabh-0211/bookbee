const { User } = require('../models/users');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv/config');
const checkAuth = require('../middleware/checkAuth');

//Auxillary function
//to check if semester is a numeric data and returns true if it is
function isNumeric(str) {
  if (typeof str != 'string') return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}

// posting new users
router.post('/register', async (req, res) => {
  //check for existing user before continuing
  const checkUser = await User.findOne({ email: req.body.email });
  if (checkUser) {
    return res.status(400).send('this email already exists');
  }

  if (!isNumeric(req.body.semester)) {
    return res.status(400).send('Bad request very very bad request');
  }

  let user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    stream: req.body.stream,
    branch: req.body.branch,
    semester: req.body.semester
  });

  user = await user.save();

  if (!user) {
    return res.status(404).send('sorry the user can not be created');
  }
  const token = generateToken(user._id);
  return res
    .status(200)
    .send({ user: user.email, token: token, msg: 'user registered successfully' });
});

// getting all users data from the database
router.get(`/`, async (req, res) => {
  const userList = await User.find().select('-passwordHash');

  if (!userList) {
    return res.status(500).json({ success: false });
  }
  return res.send(userList);
});

//getting a userdata from token
router.get('/user', checkAuth, async (req, res) => {
  const user = req.user;
  return res.send(user);
});

// getting a specific user data from the database
// router.get(`/:id`, async (req, res) => {
//   const user = await User.findById(req.params.id).select('-passwordHash');

//   if (!user) {
//     res.status(500).json({ message: 'given user id does not exist' });
//   }
//   res.send(user);
// });

// updating the user data if he/she wants to
router.put('/userUpdate', async (req, res) => {
  const theUser = req.user;
  const userExists = await User.findById(theUser._id);
  let newPassword;
  if (req.body.password) {
    newPassword = bcrypt.hashSync(req.body.password, 10);
  } else {
    newPassword = userExists.passwordHash;
  }
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      username: req.body.username,
      isAdmin: req.body.isAdmin,
      email: req.body.email,
      passwordHash: newPassword,
      stream: req.body.stream,
      branch: req.body.branch,
      semester: req.body.semester
    },
    { new: true }
  );
  if (!user) {
    return res.status(400).send('the user can not be updated');
  }
  return res.send('user update');
});

// login
router.post(`/login`, async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send('the user not found');
  }
  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = generateToken(user._id);
    return res.status(200).send({ user: user.email, token: token });
  } else {
    return res.status(400).send('wrong credentials');
  }
});

//Check Existing email and username
router.post(`/checkExisting`, async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const userName = await User.findOne({ username: req.body.username });

  if (user) {
    return res.status(400).send('yaad nhi kya yeh email already use kiya tha. Dusre ID se aa');
  }
  if (userName) {
    return res.status(409).send('sorry username already exists');
  } else {
    return res.status(200).send('good to go. you can register this user');
  }
});

// function to generate the jwt token for authorisation
const generateToken = (id) => {
  const secretKey = process.env.JWT_SECRET;
  return jwt.sign({ id }, secretKey, {
    expiresIn: '7d'
  });
};

module.exports = router;
