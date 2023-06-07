const express = require('express');
const router  = express.Router();
const { addUser } = require('../db/queries/users');

router.get('/', (req, res) => {
  const templateVars = {
    user: req.params.user_id
  };
  res.render('register', templateVars);
});

router.post('/', (req, res) => {
  const templateVars = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  //Checks if email already exists

  //Add user to database
  addUser(templateVars);

  res.redirect('/resources');
});

module.exports = router;
