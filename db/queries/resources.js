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

const getResourceByUserId = (user_id) => {
  return db.query('SELECT * FROM resources WHERE user_id = $1', [user_id])
    .then((resources) => {
      return resources.rows;
    });
};

const getResourceByCategory = (category) => {
  return db.query('SELECT * FROM resources WHERE category = $1', [category])
    .then((resources) => {
      return resources.rows;
    });
};

module.exports = { 
  getResources,
  getResourceById,
  getResourceByUserId,
  getResourceByCategory
};
