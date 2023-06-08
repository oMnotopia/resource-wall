const db = require('../connection');

//---------------------------------------------SELECT QUERIES---------------------------------------
// Get average rating of a resource.
const getRatingByResourceId = (resource_id) => {
  const query = `
  SELECT resource_id, ROUND(AVG(rating), 1) AS average_rating
  FROM ratings
  WHERE resource_id = $1
  GROUP BY resource_id
  ;`;

  return db.query(query, [resource_id])
    .then((resources) => {
      return resources.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getARatedResourceByUserId = (user_id, resource_id) => {
  const query = `
  SELECT * FROM ratings
  WHERE user_id = $1
  AND resource_id = $2
  ;`;

  return db.query(query, [user_id, resource_id])
    .then((resource) => {
      return resource.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};


//---------------------------------------------INSERT QUERIES---------------------------------------
// Add a rating. Requires a rating object {user_id, resource_id, rating}
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

const updateRating = (rating) => {
  const query = 'UPDATE ratings SET rating = $3 WHERE user_id = $1 AND resource_id = $2 RETURNING *;';
  return db.query(query, [rating.user_id, rating.resource_id, rating.rating])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//---------------------------------------------DELETE QUERIES---------------------------------------
// Delete a rating by a user. Requires a rating object {user_id, resource_id}
const deleteRating = (rating) => {
  const query = 'DELETE FROM ratings WHERE user_id = $1 AND resource_id = $2;';
  return db.query(query, [rating.user_id, rating.resource_id])
    .then(() => {
      console.log('A rating has been deleted.');
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {
  getARatedResourceByUserId,
  getRatingByResourceId,
  addRating,
  updateRating,
  deleteRating
};
