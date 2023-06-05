const db = require('../connection');


const getResources = () => {
  return db.query('SELECT * FROM resources;')
    .then(data => {
      return data.rows;
    });
};

const getResourceById = (id) => {
  return db.query('SELECT * FROM resources WHERE id = $1', [id])
    .then((resource) => {
      return resource.rows[0];
    });
};

const updateResourceById = (id) => {};

const deleteResourceById = (id) => {};

// for Created Resources
const getCreatedResources = (user_id) => {
  return db.query('SELECT * FROM resources WHERE user_id = $1', [user_id])
    .then((resources) => {
      return resources.rows;
    });
};

const getLikedResources = (user_id) => {
  // return db.query('SELECT * FROM resources WHERE id IN ', [user_id])
  //   .then((resources) => {
  //     return resources.rows;
  //   });
};

//need another for like

const getResourceByCategory = (category) => {
  return db.query('SELECT * FROM resources WHERE category = $1', [category])
    .then((resources) => {
      return resources.rows;
    });
};

module.exports = { 
  getResources,
  getResourceById,
  getCreatedResources,
  getResourceByCategory
};
