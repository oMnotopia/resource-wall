const db = require('../connection');

//---------------------------------------------SELECT QUERIES---------------------------------------
// Get all comments of a resource_id. Requires resource_id => return user name as name, and their comment.
const getCommentsByResourceId = (resource_id) => {
  const query = 'SELECT u.name, c.comment FROM comments c LEFT JOIN users u ON u.id = c.user_id WHERE resource_id = $1';
  return db.query(query, [resource_id])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//---------------------------------------------INSERT QUERIES---------------------------------------
// Add a comment. Requires a comment object {user_id, resource_id, comment}
const addComment = (comment) => {
  const query = 'INSERT INTO comments (user_id, resource_id, comment) VALUES ($1, $2, $3) RETURNING *;';
  return db.query(query, [comment.user_id, comment.resource_id, comment.comment])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//---------------------------------------------UPDATE QUERIES---------------------------------------

//---------------------------------------------DELETE QUERIES---------------------------------------
// Delete a comment by a user. Requires a comment object {user_id, resource_id}
const deleteComment = (comment) => {
  const query = 'DELETE FROM comments WHERE user_id = $1 AND resource_id = $2;';
  return db.query(query, [comments.user_id, comments.resource_id])
    .then(() => {
      console.log('A comment has been deleted.');
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {
  getCommentsByResourceId,
  addComment,
  deleteComment
};
