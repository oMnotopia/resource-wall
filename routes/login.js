const express = require('express');
const router  = express.Router();
const { getUserByLogin } = require('../db/queries/users');


router.get('/', (req, res) => {
  const templateVars = {
    user: req.params.user_id
  };
  res.render('login', templateVars);
});

router.post('/', (req, res) => {
  //Get login information
  const queryVars = {
    email: req.body.email,
    password: req.body.password,
  };

  //Calls function that returns sql data for user
  getUserByLogin(queryVars)
    .then(response => {
      if (response) {
        //Update cookie
        req.session["user_id"] = response.id;
        //Redirects to user's resources page
        res.redirect(`/resources`);
      }
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
