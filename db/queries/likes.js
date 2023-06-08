const db = require('../connection');

//---------------------------------------------SELECT QUERIES---------------------------------------
// Get all resources LIKED by a user_id
const getLikedResourcesByUserId = (user_id) => {
  const query = 'SELECT re.*, likes.like_count, ratings.average_rating ' +
  'FROM resources re ' +
  'LEFT JOIN ( ' +
  '    SELECT resource_id, COUNT(*) AS like_count ' +
  '    FROM likes ' +
  '    GROUP BY resource_id ' +
  ') likes ON re.id = likes.resource_id ' +
  'LEFT JOIN ( ' +
  '    SELECT resource_id, ROUND(AVG(rating), 1) AS average_rating ' +
  '    FROM ratings ' +
  '    GROUP BY resource_id ' +
  ') ratings ON re.id = ratings.resource_id ' +
  'WHERE re.id IN (SELECT resource_id FROM likes WHERE likes.user_id = $1) ' +
  'ORDER BY re.id;';

  return db.query(query, [user_id])
    .then((resources) => {
      return resources.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getALikedResourceByUserId = (user_id, resource_id) => {
  const query = `
  SELECT * FROM likes
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

// Get number of likes for a resource_id
const getLikedResourcesByResourceId = (resource_id) => {
  const query = `
  SELECT COUNT(*) AS like_count, resource_id
  FROM likes
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
  getALikedResourceByUserId,
  getLikedResourcesByResourceId,
  addLike,
  deleteLike
};
