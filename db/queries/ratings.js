const db = require('../connection');

//---------------------------------------------SELECT QUERIES---------------------------------------

//---------------------------------------------INSERT QUERIES---------------------------------------
// Add a rating.
const addRating = (rating) => {
  const query = 'INSERT INTO ratings (user_id, resource_id, rating) VALUES ($1, $2, $3) RETURNING *;';
  return db.query(query, [rating.user_id, rating.resource_id, rating.rating])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//---------------------------------------------UPDATE QUERIES---------------------------------------

//---------------------------------------------DELETE QUERIES---------------------------------------
// Delete a like by a user. Requires a Like object {user_id, resource_id}
const deleteRating = (rating) => {
  const query = 'DELETE FROM ratings WHERE user_id = $1 AND resource_id = $2;';
  return db.query(query, [like.user_id, like.resource_id])
    .then(() => {
      console.log('A rating has been deleted.');
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {
  addRating,
  deleteRating
};
