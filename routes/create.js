const express = require('express');
const router = express.Router();
const { getUserById } =  require('../db/queries/users');
const { addResource } =  require('../db/queries/resources');


// Come from routes: localhost/create

router.get('/', (req, res) => {
  const userId = req.session.user_id;

  //Stopping non logged in users from accessing create.
  if (!userId) {
    req.session["error_message"] = "Cannot create new resources. Please log in.";
    return res.redirect('/error');
  }

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

router.post('/', (req, res) => {
  const userId = req.session.user_id;
  const queryVars = {
    user_id: req.session.user_id,
    title: req.body.title,
    img_url: req.body.img_url,
    url: req.body.url,
    description: req.body.description,
    category: req.body.category};

  addResource(queryVars)
    .then(response => {
      console.log("Add a new resource:", response);
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
