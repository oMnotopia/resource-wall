const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

// Requires a user object {name, email, password}. Id is auto-generated.
const addUser = (user) => {
  return db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;', [user.name, user.email, user.password])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Requires a user object {id, name, email, password}
const updateUserById = (user) => {
  return db.query('UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *;', [user.name, user.email, user.password, user.id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};


module.exports = {
  getUsers,
  addUser,
  updateUserById
};
