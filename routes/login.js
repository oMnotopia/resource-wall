const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
  //Get login information
  const userEmail = req.params.email;
  const userPassword = req.params.password;

  //Need error checking for missing fields

  //Checks that email and password match existing user in database

  //Calls function that returns sql data for user

  //Redirects to user's resources page
  res.redirect(`/resources/${1/*user id*/}`);
});

module.exports = router;
