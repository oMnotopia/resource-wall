const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  console.log("IN ERROR PAGE");
  const templateVars = {
    user: req.session.user_id,
    errorMsg: req.session.error_message,
  };

  res.render('error', templateVars);
});


module.exports = router;
