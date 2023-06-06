/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const cookieSessions = require('cookie-session');
const { getUserById, updateUserById} =  require('../db/queries/users');
const { getCreatedResources } =  require('../db/queries/resources');
const { getLikedResourcesByUserId } =  require('../db/queries/likes');


router.get('/:userid/created', (req, res) => {
  const userId = req.params.userid;
  getUserById(userId)
    .then(response1 => {
      const templateVars = {
        id: response1.id,
        initial: response1.name[0],
        name: response1.name,
        email: response1.email};
      getCreatedResources(userId)
        .then(response2 => {
          templateVars['resources'] = response2;
          res.render('user_created_resources', templateVars);
        });
    });
});
  
router.get('/:userid/liked', (req, res) => {
  const userId = req.params.userid;
  getUserById(userId)
    .then(response1 => {
      const templateVars = {
        id: response1.id,
        initial: response1.name[0],
        name: response1.name,
        email: response1.email};
      getLikedResourcesByUserId(userId)
        .then(response2 => {
          templateVars['resources'] = response2;
          res.render('user_liked_resources', templateVars);
        });
    });
});

router.get('/:userid/profile', (req, res) => {
  const userId = req.params.userid;
  getUserById(userId)
    .then(response => {
      const templateVars = {
        initial: response.name[0],
        name: response.name,
        email: response.email,
        password: response.password
      };
      res.render('user_profile', templateVars);
    });
});



router.post('/:userid/profile', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const templateVars = {
    name,
    email,
    oldPassword,
    newPassword
  };

  //Checks if any of the fields are empty
  //Checks if email already exists

  //Add user to database
  updateUserById(templateVars);

  res.redirect('/resources');
});

module.exports = router;



module.exports = router;
