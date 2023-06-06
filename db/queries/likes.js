const db = require('../connection');

//---------------------------------------------SELECT QUERIES---------------------------------------
// Get all resources LIKED by a user_id
const getLikedResourcesByUserId = (user_id) => {
  const query = 'SELECT re.*, COUNT(l.id) AS like_count, ROUND(AVG(ra.rating), 1) AS average_rating FROM resources re ' +
    'LEFT JOIN likes l ON re.id = l.resource_id ' +
    'LEFT JOIN ratings ra ON re.id = ra.resource_id ' +
    'WHERE l.user_id = $1 ' +
    'GROUP BY re.id ' +
    'ORDER BY re.id;';
  return db.query(query, [user_id])
    .then((resources) => {
      return resources.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//---------------------------------------------INSERT QUERIES---------------------------------------
// Add a like by a user. Requires a Like object {user_id, resource_id}
const addLike = (like) => {
  const query = 'INSERT INTO likes (user_id, resource_id ) VALUES ($1, $2) RETURNING *;';
  return db.query(query, [like.user_id, like.resource_id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//---------------------------------------------DELETE QUERIES---------------------------------------
// Delete a like by a user. Requires a Like object {user_id, resource_id}
const deleteLike = (like) => {
  const query = 'DELETE FROM likes WHERE user_id = $1 AND resource_id = $2;';
  return db.query(query, [like.user_id, like.resource_id])
    .then(() => {
      console.log('A like has been deleted.');
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {
  getLikedResourcesByUserId,
  addLike,
  deleteLike
};
