const express = require('express');
const router  = express.Router();
const { getUsers } = require('../db/queries/users');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
  //Get login information
  const userEmail = req.body.email;
  const userPassword = req.body.password;


  //Calls function that returns sql data for user
  getUsers()
    .then(response => {
      console.log(response)
      for (const user of response) {
        //Checks that email and password match existing user in database
        if (user.email === userEmail && user.password === userPassword) {
          //Redirects to user's resources page
          res.redirect(`/users/${user.id}/liked`);
        }
        //****NEED an error message for if email or password doesnt match */
      }
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
