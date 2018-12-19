const db = require('../psql');
const topics = require('./topics');

const createArticle = (userId, title) => db.query(
    'INSERT INTO articles (title, "userId") VALUES ($1, $2) RETURNING id, title',
    [title, userId]
  )
  .then(({ rows }) => rows[0] ? rows[0] : { error: 'Article did not created' })
  .catch(D);

const getArticles = (userId) => db.query(
    'SELECT title, id FROM articles WHERE "userId"=$1',
    [userId]
  )
  .then(({ rows }) => rows)
  .catch(D);


const updateArticle = (id, title) => db.query(
    'UPDATE articles SET title=$2, "updateDate"=now() WHERE id=$1 RETURNING id, title',
    [id, title]
  )
  .then(({ rows }) => rows[0])
  .catch(D);

const removeArticle = (id) => db.query(
    'DELETE FROM articles WHERE id=$1 RETURNING id',
    [id]
  )
  .then(() => topics.removeByArticleId(id))
  .then(() => id)
  .catch(D);

module.exports = {
  createArticle,
  getArticles,
  updateArticle,
  removeArticle,
};