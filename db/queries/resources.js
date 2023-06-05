const db = require('../connection');

//---------------------------------------------SELECT QUERIES---------------------------------------
// Get all resources: return all resources with the Likes count of each resource, Order by resource_id
const getResources = () => {
  const query = 'SELECT r.id, r.url, r.rating, r.comments, r.category, COUNT(ur.user_id) AS Likes ' +
    'FROM resources r LEFT JOIN user_resources ur ON r.id = ur.resource_id GROUP BY r.id ORDER BY r.id;';
  return db.query(query)
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Get 1 resource by the resource_id with the Likes count of the resource
const getResourceById = (id) => {
  const query = 'SELECT r.*, COUNT(ur.user_id) AS Likes ' +
    'FROM resources r LEFT JOIN user_resources ur ON r.id = ur.resource_id WHERE r.id = $1 GROUP BY r.id;';
  return db.query(query, [id])
    .then((resource) => {
      return resource.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Get resources CREATED by a user_id, with the Likes count of each resource
const getCreatedResources = (user_id) => {
  const query = 'SELECT r.*, COUNT(ur.user_id) AS Likes ' +
    'FROM resources r LEFT JOIN user_resources ur ON r.id = ur.resource_id WHERE r.user_id = $1 ' +
    'GROUP BY r.id ORDER BY r.id;';
  return db.query(query, [user_id])
    .then((resources) => {
      return resources.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Get resources LIKED by a user_id
const getLikedResources = (user_id) => {
  const query = 'SELECT r.*, COUNT(ur.resource_id) AS Likes ' +
    'FROM resources r LEFT JOIN user_resources ur ON r.id = ur.resource_id ' +
    'WHERE r.id IN (SELECT resource_id FROM user_resources WHERE user_id = $1) GROUP BY r.id;';
  return db.query(query, [user_id])
    .then((resources) => {
      return resources.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Get resources that has category simlar to the input (using LIKE)
const getResourceByCategory = (category) => {
  const query = "SELECT r.*, COUNT(ur.user_id) AS Likes " +
  "FROM resources r LEFT JOIN user_resources ur ON r.id = ur.resource_id WHERE category LIKE '%$1%' " +
  "GROUP BY r.id ORDER BY r.id;";
  return db.query(query, [category])
    .then((resources) => {
      return resources.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//---------------------------------------------INSERT QUERIES---------------------------------------
const addResource = (resource) => {};

//---------------------------------------------UPDATE QUERIES---------------------------------------

//---------------------------------------------DELETE QUERIES---------------------------------------


const updateResourceById = (id) => {};

const deleteResourceById = (id) => {};

module.exports = {
  getResources,
  getResourceById,
  getCreatedResources,
  getLikedResources,
  getResourceByCategory
};
