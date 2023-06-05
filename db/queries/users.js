const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const addUsers = () => {};

//email, name, maybe password
const updateUsers = () => {};


module.exports = { 
  getUsers,
  addUsers,
  updateUsers
};
