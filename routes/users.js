/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getUserById } =  require('../db/queries/users');
const { getCreatedResources } =  require('../db/queries/resources');
const { getLikedResourcesByUserId } =  require('../db/queries/likes');


router.get('/:userid/created', (req, res) => {
  const userId = req.params.userid;
  getUserById(userId)
    .then(response1 => {
      const templateVars = {
        id: response1.id,
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
        name: response1.name,
        email: response1.email};
      getLikedResourcesByUserId(userId)
        .then(response2 => {
          templateVars['resources'] = response2;
          res.render('user_liked_resources', templateVars);
        });
    });
});

module.exports = router;
