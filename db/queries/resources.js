const db = require('../connection');

// Get all resources
const getResources = () => {
  return db.query('SELECT * FROM resources;')
    .then(data => {
      return data.rows;
    });
};

// Get 1 resource by the resource_id
const getResourceById = (id) => {
  return db.query('SELECT * FROM resources WHERE id = $1', [id])
    .then((resource) => {
      return resource.rows[0];
    });
};

const updateResourceById = (id) => {};

const deleteResourceById = (id) => {};

// Get resources CREATED by a user_id
const getCreatedResources = (user_id) => {
  return db.query('SELECT * FROM resources WHERE user_id = $1', [user_id])
    .then((resources) => {
      return resources.rows;
    });
};

// Get resources LIKED by a user_id
const getLikedResources = (user_id) => {
  return db.query('SELECT * FROM resources WHERE id IN (SELECT resource_id FROM user_resources WHERE user_id = $1)', [user_id])
    .then((resources) => {
      return resources.rows;
    });
};

// Get resources that has category simlar to the input (using LIKE)
const getResourceByCategory = (category) => {
  return db.query('SELECT * FROM resources WHERE category LIKE "%$1%"', [category])
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
