const db = require('../connection');

// Get all resources: return all resources with the Likes count, Order by resource_id
const getResources = () => {
  return db.query('SELECT r.id, r.url, r.rating, r.comments, r.category, COUNT(ur.user_id) AS Likes FROM resources r LEFT JOIN user_resources ur ON r.id = ur.resource_id GROUP BY r.id ORDER BY r.id;')
    .then(data => {
      return data.rows;
    });
};

// Get 1 resource by the resource_id
const getResourceById = (id) => {
  return db.query('SELECT * FROM resources WHERE id = $1;', [id])
    .then((resource) => {
      return resource.rows[0];
    });
};

const updateResourceById = (id) => {};

const deleteResourceById = (id) => {};

// Get resources CREATED by a user_id
const getCreatedResources = (user_id) => {
  return db.query('SELECT * FROM resources WHERE user_id = $1;', [user_id])
    .then((resources) => {
      return resources.rows;
    });
};

// Get resources LIKED by a user_id
const getLikedResources = (user_id) => {
  return db.query('SELECT * FROM resources WHERE id IN (SELECT resource_id FROM user_resources WHERE user_id = $1);', [user_id])
    .then((resources) => {
      return resources.rows;
    });
};

// Get resources that has category simlar to the input (using LIKE)
const getResourceByCategory = (category) => {
  return db.query('SELECT * FROM resources WHERE category LIKE "%$1%";', [category])
    .then((resources) => {
      return resources.rows;
    });
};

module.exports = { 
  getResources,
  getResourceById,
  getCreatedResources,
  getLikedResources,
  getResourceByCategory
};
