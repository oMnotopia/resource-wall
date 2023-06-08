const express = require('express');
const router  = express.Router();
const { getResources } = require('../db/queries/resources');

router.get('/', (req, res) => {
  const userId = req.session.user_id;
  getResources()
    .then(response1 => {
      const resource_id = (Math.floor((Math.random() * response1.length)) + 1);

      res.redirect(`/resources/${resource_id}`);
    });
});

module.exports = router;
