/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getUserById } =  require('../db/queries/users');

router.get('/:userid', (req, res) => {
  const userId = req.params.userid;
  getUserById(userId)
    .then(response => {
      const templateVars = {
        name: response.name,
        email: response.email,
      };

      res.render('user_resources', templateVars);
    });
});

module.exports = router;
