/* eslint-disable camelcase */
const express = require('express');
const router = express.Router();
const { getResources, getResourceById, getResourceByCategory } = require('../db/queries/resources');
const { getCommentsByResourceId, addComment} = require('../db/queries/comments');
const { getLikedResourcesByResourceId, getALikedResourceByUserId, addLike, deleteLike } = require('../db/queries/likes');
const { getRatingByResourceId, getARatedResourceByUserId, addRating, updateRating, deleteRating } = require('../db/queries/ratings');

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

router.get('/search/', (req, res) => {
  const category = req.query.category;
  const userId = req.session.user_id;
  getResourceByCategory(category)
    .then((response) => {
      const templateVars = {
        category: category,
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
  const promiseVariable3 = getALikedResourceByUserId(userId, resourceId);
  const promiseVariable4 = getARatedResourceByUserId(userId, resourceId);
  const promiseArray = [promiseVariable1, promiseVariable2, promiseVariable3, promiseVariable4];
  //use promise.all to handle promises
  Promise.all(promiseArray)
    //manipulate responses in .then
    .then(response => {
      console.log(response);
      let response4;
      const response1 = response[0];
      const response2 = response[1];
      const response3 = response[2];
      if (response[3] === undefined) {
        response4 = 0;
      } else {
        response4 = Math.round(response[3].rating);
      }


      
      
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
        hasUserLiked: response3,
        hasUserRated: response4,
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
  const userId = req.session.user_id;

  //Stopping non logged in users from liking resource.
  if (!userId) {
    req.session["error_message"] = "Cannot like resources. Please log in.";
    return res.redirect('/error');
  }

  getLikedResourcesByResourceId(req.params.resourceid)
    .then((data) => {
      res.json(data);
    });
});

router.post('/:resourceid/like', (req, res) => {
  const userId = req.session.user_id;
  const resource_id = req.params.resourceid;


  const templateVars = {
    user_id: userId,
    resource_id: resource_id,
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
  const userId = req.session.user_id;
  const resource_id = req.params.resourceid;
  //Error checking

  //Stopping non logged in users from liking resource.
  if (!userId) {
    req.session["error_message"] = "Cannot like resources. Please log in.";
    return res.redirect('/error');
  }

  const templateVars = {
    user_id: userId,
    resource_id: resource_id,
  };
  //Data manipulation
  deleteLike(templateVars)
    .then(() => {
      res.redirect(`/resources/${resource_id}`);
    })
    .catch(err => {
      console.log(err.message);
    });
});

router.get('/:resourceid/like/check', (req, res) => {
  const userId = req.session.user_id;
  const resource_id = req.params.resourceid;

  //Stopping non logged in users from liking resource.
  if (!userId) {
    req.session["error_message"] = "Cannot like resources. Please log in.";

    return res.redirect('/error');
  }

  getALikedResourceByUserId(userId, resource_id)
    .then((data) => {
      res.json(data);
    });
});

router.get('/:resourceid/rate', (req, res) => {
  getRatingByResourceId(req.params.resourceid)
    .then((data) => {
      res.send(data);
    });
});

router.post('/:resourceid/rate', (req, res) => {
  //Error checking
  const resource_id = req.params.resourceid;

  const rating = req.session.rating;

  const templateVars = {
    user_id: req.session.user_id,
    resource_id: resource_id,
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
