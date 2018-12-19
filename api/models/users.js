const db = require('../psql');

const getUser = async (id) => db.query(
    'SELECT * FROM users WHERE id=$1',
    [id]
  )
  .then(({ rows }) => rows[0] ? rows[0] : { error: 'There is no user' })
  .catch(err => console.log('getUser', err));

// const checkAuth = (userData) => {
//   const { login, password } = userData;
//   const user = users.find(user => user.login === login);
//
//   if (!user || user.password !== password) return Promise.reject(new Error('unknown user'));
//
//   return Promise.resolve(user)
// };

module.exports = {
  getUser,
};
