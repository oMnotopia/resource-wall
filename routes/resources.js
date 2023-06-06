const express = require('express');
const router = express.Router();
const { getResources } = require('../db/queries/resources');
const { getResourceById } = require('../db/queries/resources');
const { getCommentsByResourceId } = require('../db/queries/comments');


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

  //Error checking

  //Create an array of promises
  const promiseVariable1 = getResourceById(resourceId);
  const promiseVariable2 = getCommentsByResourceId(resourceId);
  const promiseArray = [promiseVariable1, promiseVariable2];
  //use promise.all to handle promises
  Promise.all(promiseArray)
    //manipulate responses in .then
    .then(response => {
      //console.log(response);
      const response1 = response[0];
      const response2 = response[1];
      const templateVars = {
        likes: response1.like_count,
        rating: response1.average_rating,
        title: response1.title,
        url: response1.url,
        imgUrl: response1.img_url,
        description: response1.description,
        category: response1.category,
        comments: response2,
      };

      //render
      res.render('resource', templateVars);
    })
    //handle error with .catch
    .catch(err => {
      console.log(err.message);
    });
});


router.post('/:resourceid/:commentid', (req, res) => {
  //Error checking

  //Data manipulation
  const comment = {
    content: {
      text: req.body.text,
    }
  };

});

module.exports = router;
