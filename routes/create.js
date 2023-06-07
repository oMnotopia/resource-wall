const express = require('express');
const router = express.Router();
const { getUserById } =  require('../db/queries/users');


// Come from routes: localhost/create

router.get('/', (req, res) => {
  const userId = req.session.user_id;
  getUserById(userId)
    .then(response => {
      const templateVars = {
        id: response.id,
        initial: response.name[0],
        name: response.name,
        email: response.email,
        user: userId,
      };

      res.render('create', templateVars);
    })
});

module.exports = router;
