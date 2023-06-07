/* eslint-disable camelcase */
const express = require('express');
const router = express.Router();
const { getResources, getResourceById } = require('../db/queries/resources');
const { getCommentsByResourceId, addComment} = require('../db/queries/comments');
const { getLikedResourcesByResourceId, addLike, deleteLike } = require('../db/queries/likes');
const { addRating, deleteRating } = require('../db/queries/ratings');

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
        user: userId,
        resourceid: resourceId,
      };

      //render
      res.render('resource', templateVars);
    })
    //handle error with .catch
    .catch(err => {
      console.log(err.message);
    });
});

router.get('/:resourceid/like', (req, res) => {
  getLikedResourcesByResourceId(req.params.resourceid)
    .then((data) => {
      res.json(data);
    });
});

router.post('/:resourceid/like', (req, res) => {
  //Error checking
  const templateVars = {
    user_id: req.session.user_id,
    resource_id: req.params.resourceid,
  };

  //Data manipulation
  addLike(templateVars)
    .then(() => {
      res.send();
    })
    .catch(err => {
      console.log(err.message);
    });
});

router.post('/:resourceid/like/remove', (req, res) => {
  //Error checking
  const templateVars = {
    user_id: req.session.user_id,
    resource_id: req.params.resourceid,
  };
  //Data manipulation
  deleteLike(templateVars)
    .then(() => {
      res.redirect(`/resources/${req.params.resourceid}`);
    })
    .catch(err => {
      console.log(err.message);
    });
});

router.post('/:resourceid/rate', (req, res) => {
  //Error checking
  const templateVars = {
    user_id: req.session.user_id,
    resource_id: req.params.resourceid,
    rating: req.body.data,
  };
  //Data manipulation
  addRating(templateVars)
    .then(() => {
      res.redirect(`/resources/${req.params.resourceid}`);
    })
    .catch(err => {
      console.log(err.message);
    });
});

router.post('/:resourceid/rate/remove', (req, res) => {
  //Error checking
  const templateVars = {
    user_id: req.session.user_id,
    resource_id: req.params.resourceid,
  };
  //Data manipulation
  deleteRating(templateVars)
    .then(() => {
      res.redirect(`/resources/${req.params.resourceid}`);
    })
    .catch(err => {
      console.log(err.message);
    });
});


router.post('/:resourceid/:commentid', (req, res) => {
  //Error checking

  //Data manipulationa
  const templateVars = {
    user_id: req.session.user_id,
    resource_id: req.params.resourceid,
    comment: req.body.text,
  };

  addComment(templateVars)
    .then(() => {
      res.redirect(`/resources/${req.params.resourceid}`);
    })
    .catch(err => {
      console.log(err.message);
    });
});



module.exports = router;
