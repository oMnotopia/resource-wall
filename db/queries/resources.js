const db = require('../connection');

//---------------------------------------------SELECT QUERIES---------------------------------------
// Get all resources with like_count and average_rating. Ordered by resource id
const getResources = () => {
  const query = 'SELECT re.*, COUNT(l.id) AS like_count, ROUND(AVG(ra.rating), 1) AS average_rating FROM resources re ' +
    'LEFT JOIN likes l ON re.id = l.resource_id ' +
    'LEFT JOIN ratings ra ON re.id = ra.resource_id ' +
    'GROUP BY re.id ' +
    'ORDER BY re.id;';
  return db.query(query)
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Get 1 resource by the resource_id with like_count and average_rating. Requires resource_id.
const getResourceById = (resource_id) => {
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
  'WHERE re.id = $1 ' +
  'ORDER BY re.id;';
  
  return db.query(query, [resource_id])
    .then((resource) => {
      return resource.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Get resources CREATED by a user_id, with the Likes count of each resource.
const getCreatedResources = (user_id) => {
  const query = 'SELECT re.*, COUNT(l.id) AS like_count, ROUND(AVG(ra.rating), 1) AS average_rating FROM resources re ' +
    'LEFT JOIN likes l ON re.id = l.resource_id ' +
    'LEFT JOIN ratings ra ON re.id = ra.resource_id ' +
    'WHERE re.user_id = $1 ' +
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

// Get resources LIKED by a user_id
// refer to likes.js

// Get resources that has category simlar to the input (using LIKE).
const getResourceByCategory = (category) => {
  const query = "SELECT re.*, COUNT(l.id) AS like_count, ROUND(AVG(ra.rating), 1) AS average_rating FROM resources re " +
    "LEFT JOIN likes l ON re.id = l.resource_id " +
    "LEFT JOIN ratings ra ON re.id = ra.resource_id " +
    "WHERE category LIKE '%$1%' " +
    "GROUP BY re.id " +
    "ORDER BY re.id;";
  return db.query(query, [category])
    .then((resources) => {
      return resources.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//---------------------------------------------INSERT QUERIES---------------------------------------
// NEED TO ACCOUNT FOR WHEN THE RESOURCE OBJECT DOES NOT OR DOES HAVE THE IMG_URL
// Add 1 resource. Requires a resource object {user_id, title, url, description, category}.
const addResource = (resource) => {
  const query = 'INSERT INTO resources (user_id, title, url, description, category) VALUES ($1, $2, $3, $4, $5) RETURNING *;';
  return db.query(query, [resource.user_id, resource.title, resource.url, resource.description, resource.category])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//---------------------------------------------UPDATE QUERIES---------------------------------------
// on hold

//---------------------------------------------DELETE QUERIES---------------------------------------
// Delete 1 resource. Require the resource_id.
const deleteResourceById = (resource_id) => {
  const query = 'DELETE FROM resources WHERE id = $1';
  return db.query(query, [resource_id])
    .then(() => {
      console.log('A resource has been deleted.');
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {
  getResources,
  getResourceById,
  getCreatedResources,
  getResourceByCategory,
  addResource,
  deleteResourceById
};
