const users = require('./models/users');
const articles = require('./models/articles');
const topics = require('./models/topics');

const socketEvents = (socket) => {
  try {

    // ============== USERS

    socket.on('userGet', async (id) => {
      const user = await users.getUser(id);
      socket.emit('userGet', user)
    });

    // =============== ARTICLES

    socket.on('articleCreate', async ({ userId, title }) => {
      const art = await articles.createArticle(userId, title);
      socket.emit('articleCreate', art)
    });

    socket.on('articlesGetByUser', async ({ userId }) => {
      const art = await articles.getArticles(userId);
      socket.emit('articlesGetByUser', art)
    });

    socket.on('articleRemove', async ({ id }) => {
      const articleId = await articles.removeArticle(id);
      socket.emit('articleRemove', articleId)
    });

    socket.on('articleUpdate', async ({ id, title }) => {
      const art = await articles.updateArticle(id, title);
      socket.emit('articleUpdate', art)
    });

    //================= TOPICS

    socket.on('topicsGet', async (articleId) => {
      const items = await topics.getTopics(articleId);
      socket.emit('topicsGet', items)
    });

    socket.on('topicGet', async (topicId) => {
      const item = await topics.getTopic(topicId);
      socket.emit('topicGet', item)
    });

    socket.on('topicCreate', async ({ articleId, title }) => {
      const item = await topics.createTopic(articleId, title);
      socket.emit('topicCreate', item)
    });

    socket.on('topicRemove', async (id) => {
      const art = await topics.removeTopic(id);
      socket.emit('topicRemove', art)
    });

    socket.on('topicUpdate', async ({ id, title }) => {
      const art = await topics.updateTopic(id, title);
      socket.emit('topicUpdate', art)
    });

    socket.on('topicUpdateContent', async ({ id, content }) => {
      const art = await topics.updateContent(id, content);
      socket.emit('topicUpdateContent', art)
    });
  } catch (e) {
    D(e)
  }
};

module.exports = socketEvents;
