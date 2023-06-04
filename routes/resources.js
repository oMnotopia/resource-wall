const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('resources');
});

router.get('/:userid', (req, res) => {

  const templateVars = {
    username: "clayton persinger",
    email: "persinger.clayton@gmail.com",
  };

  res.render('user_resources', templateVars);
});

module.exports = router;
