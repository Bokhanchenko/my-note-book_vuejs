const db = require('../psql');

const getUserByLogin = (login) => db.query(
    'SELECT id FROM users WHERE login=$1',
    [login]
  )
  .then(({ rows }) => rows.map(it => it.id));

const createUser = async ({ login, firstName, lastName, password }) => {
  const existedUser = await getUserByLogin(login);

  if (existedUser.length > 0) return { error: 'The username already exist.', data: existedUser};

  return db.query(
      'INSERT INTO users (login, "firstName", "lastName", password) VALUES ($1, $2, $3, $4) RETURNING id, login',
      [login, firstName, lastName, password]
    )
    .then(({ rows }) => ({ user: rows[0] }))
    .catch(D);
};

const checkUser = ({ login, password }) => db.query(
    'SELECT id, login FROM users WHERE login=$1 AND password=$2',
    [login, password]
  )
  .then(({ rows }) => rows.length === 0
    ? { error: 'The username and / or password is incorrect.' }
    : { user: rows[0] }
    )
  .catch(D);


const getUser = async (id) => db.query(
    'SELECT id, login, FROM users WHERE id=$1',
    [id]
  )
  .then(({ rows }) => rows[0]
    ? rows[0]
    : { error: 'There is no user' }
    )
  .catch(err => console.log('getUser', err));

module.exports = {
  createUser,
  checkUser,
  getUser,
};
