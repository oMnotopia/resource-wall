/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getUserById, updateUserProfile, updateUserNameOrEmail} =  require('../db/queries/users');
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
        email: response1.email,
        user: req.session.user_id};
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
        email: response1.email,
        user: req.session.user_id};
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
        userid: response.id,
        name: response.name,
        email: response.email,
        user: req.session.user_id,
      };
      res.render('user_profile', templateVars);
    });
});



router.post('/:userid/profile', (req, res) => {
  const queryVars = {
    id: req.session.user_id,
    name: req.body.name,
    email: req.body.email,
    oldPassword: req.body.oldPassword,
    newPassword: req.body.newPassword
  };

  if (queryVars.oldPassword && queryVars.newPassword) {
    getUserById(queryVars.id)
    .then(response => {
      if (response.password === queryVars.oldPassword) {
        updateUserProfile(queryVars)
          .then(response => {
            if (response) {
              res.redirect(`/users/${response.id}/created`);
            } 
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  } else {
    updateUserNameOrEmail(queryVars)
      .then(response => {
        res.redirect(`/users/${response.id}/created`);
      });
  }

});
  
module.exports = router;
