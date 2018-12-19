const db = require('../psql');

const createTopic = (articleId, title) => db.query(
    'INSERT INTO topics ("articleId", title) VALUES ($1, $2) RETURNING id, title',
    [articleId, title]
  )
  .then(({ rows }) => rows[0])
  .catch(D);

const getTopics = (articleId) => db.query(
    'SELECT id, title FROM topics WHERE "articleId"=$1',
    [articleId]
  )
  .then(({ rows }) => rows)
  .catch(D);

const getTopic = (topicId) => db.query(
    'SELECT * FROM topics WHERE id=$1',
    [topicId]
  )
  .then(({ rows }) => rows[0])
  .catch(D);

const updateTopic = (id, title) => db.query(
    'UPDATE topics SET title=$2, "updateDate"=now() WHERE id=$1 RETURNING id,title',
    [id, title]
  )
  .then(({ rows }) => rows[0])
  .catch(D);

const removeTopic = (id) => db.query(
    'DELETE FROM topics WHERE id=$1 RETURNING id',
    [id]
  )
  .then(() => id)
  .catch(D);

const removeByArticleId = (articleId) => db.query(
    'DELETE FROM topics WHERE id=$1 RETURNING id',
    [articleId]
  )
  .then(({ rows }) => rows[0] ? rows[0].id : articleId)
  .catch(D);

const updateContent = (topicId, content) => db.query(
    'UPDATE topics SET content=$2, "updateDate"=now() WHERE id=$1 RETURNING id',
    [topicId, content]
  )
  .then(({ rows }) => rows[0] ? rows[0].id : { error: 'Error in updateContent' })
  .catch(D);

module.exports = {
  createTopic,
  getTopics,
  getTopic,
  updateTopic,
  updateContent,
  removeTopic,
  removeByArticleId,
};
