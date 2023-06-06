const express = require('express');
const router = express.Router();
const { getResources } = require('../db/queries/resources');
const { getResourceById } = require('../db/queries/resources');


router.get('/', (req, res) => {

  getResources()
    .then(response => {
      const templateVars = {
        resources: response,
      };
      res.render('resources', templateVars);
    });

});

router.get('/:resourceid', (req, res) => {
  const resourceId = req.params.resourceid;
  getResourceById(resourceId)
    .then(response => {
      const templateVars = {
        likes: response.like_count,
        rating: response.average_rating,
        title: response.title,
        url: response.url,
        imgUrl: response.img_url,
        description: response.description,
        category: response.category,
      };
      res.render('resource', templateVars);
    });


});

module.exports = router;
