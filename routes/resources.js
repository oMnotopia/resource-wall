const express = require('express');
const router = express.Router();
const resourceQueries = require('../db/queries/resources');


router.get('/', (req, res) => {

  resourceQueries.getResources()
    .then(response => {
      const templateVars = {
        resources: response,
      };
      res.render('resources', templateVars);
    });

});

router.get('/:userid', (req, res) => {
  const templateVars = {
    username: "clayton",
    email: "persinger.clayton@gmail.com",
  };

  res.render('user_resources', templateVars);
});

module.exports = router;
