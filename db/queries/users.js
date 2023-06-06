const db = require('../connection');

//---------------------------------------------SELECT QUERIES---------------------------------------
const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

// Get the user Id if email and password match. Requires a login object {email, password}
const GetUserByLogin = (login) => {
  return db.query('SELECT * FROM users WHERE email = $1 AND password = $2;', [login.email, login.password])
    .then((resource) => {
      return resource.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Get 1 specific user info. Requires user_id
const getUserById = (user_id) => {
  return db.query('SELECT * FROM users WHERE id = $1;', [user_id])
    .then((resource) => {
      return resource.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//---------------------------------------------INSERT QUERIES---------------------------------------
// Add 1 user (registration). Requires a user object {name, email, password}. Id is auto-generated.
const addUser = (user) => {
  return db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;', [user.name, user.email, user.password])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//---------------------------------------------UPDATE QUERIES---------------------------------------
// Update a user info. Requires a user object {id, name, email, password}
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
  GetUserByLogin,
  getUserById,
  addUser,
  updateUserById
};
