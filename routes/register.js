const express = require('express');
const router  = express.Router();
const { addUser } = require('../db/queries/users');
const cookieSessions = require('cookie-session');

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const templateVars = {
    name,
    email,
    password,
  };

  //Checks if any of the fields are empty
  //Checks if email already exists

  //Add user to database
  addUser(templateVars);

  res.redirect('/resources');
});

module.exports = router;
