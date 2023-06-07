const express = require('express');
const router = express.Router();
const { getResources } = require('../db/queries/resources');
const { getResourceById } = require('../db/queries/resources');
const { getCommentsByResourceId } = require('../db/queries/comments');
const { addComment } = require('../db/queries/comments');


router.get('/', (req, res) => {
  const userId = req.session.user_id;
  getResources()
    .then(response => {
      const templateVars = {
        resources: response,
        user: userId,
      };
      res.render('resources', templateVars);
    });
});

router.get('/:resourceid', (req, res) => {
  const resourceId = req.params.resourceid;
  const userId = req.session.user_id;
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
        user: userId
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
  const data = req.body.text;
  console.log(req);

  addComment(data)
    .then(response => {
      console.log(response);
    });
});

module.exports = router;
