const users = [
  {
    id: 0,
    login: 'Kay',
    firstName: 'Dm',
    lastName: 'Kayan',
    password: '123',
    createData: Date.now(),
    updateDate: Date.now(),
    lastConfirmation: Date.now(),
    role: 'admin',
  }
];

const articles = [
  {
    id: 0,
    userId: 0,
    title: 'Angular',
    createDate: new Date(),
    updateDate: new Date(),
    meta: {},
  },
  {
    id: 1,
    userId: 0,
    title: 'React',
    createDate: new Date(),
    updateDate: new Date(),
    meta: {},
  },
  {
    id: 2,
    userId: 0,
    title: 'Vue',
    createDate: new Date(),
    updateDate: new Date(),
    meta: {},
  },
];

const topics = [
  {
    id: 0,
    articleId: 0,
    title: 'routing 0',
    createDate: new Date(),
    updateDate: new Date(),
    meta: {},
    content: 'Angular routing 0'
  },
  {
    id: 1,
    articleId: 0,
    title: 'components 0',
    createDate: new Date(),
    updateDate: new Date(),
    meta: {},
    content: 'Angular component'
  },
  {
    id: 2,
    articleId: 1,
    title: 'routing 1',
    createDate: new Date(),
    updateDate: new Date(),
    meta: {},
    content: 'React routing'
  },
  {
    id: 3,
    articleId: 1,
    title: 'components 1',
    createDate: new Date(),
    updateDate: new Date(),
    meta: {},
    content: 'React components'
  },
  {
    id: 4,
    articleId: 2,
    title: 'routing 2',
    createDate: new Date(),
    updateDate: new Date(),
    meta: {},
    content: 'Vue routing'
  },
  {
    id: 5,
    articleId: 2,
    title: 'components 2',
    createDate: new Date(),
    updateDate: new Date(),
    meta: {},
    content: 'Vue components'
  }
];

const checkAuth = (userData) => {
  const { login, password } = userData;
  const user = users.find(user => user.login === login);

  if (!user || user.password !== password) return Promise.reject(new Error('unknown user'));

  return Promise.resolve(user)
};

const getUser = (id) => {
  return new Promise((res, rej) => {
    const user = users.find(user => user.id === id);

    return user
      ? res(user)
      : rej(new Error('NO USER'))
  })
};

const getArticles = (userId) => {
  return new Promise((res, rej) => {
    const list = articles.filter((article) => article.userId === userId);

    return list.length > 0
      ? res(list)
      : rej(new Error('NO ARTICLES'))
  })
};

const getTopics = (articleId) => {
  return new Promise((res, rej) => {
    const list = topics.filter((topic) => topic.articleId === articleId)
      .map(({ id, title }) => ({ id, title }));

    return list.length > 0
      ? res(list)
      : res([]) //rej(new Error('NO TOPICS'))
  })
};

const getTopic = (topicId) => {
  return new Promise((res, rej) => {
    const topic = topics.find(({ id }) => id === topicId);

    return topic
      ? res({
        id: topic.id,
        content: topic.content
      })
      : rej(new Error('NO TOPIC'))
  })
};

const createTopic = (articleId, title) => {
  return new Promise((res, rej) => {
    try {
      const topic = {
        id: Date.now(),
        articleId,
        title,
        createDate: new Date(),
        updateDate: new Date(),
        meta: {},
        content: ''
      };

      topics.push(topic);

      return res({
        id: topic.id,
        title: topic.title,
      })
    } catch (e) {
      return rej(new Error('ERROR CREATE TOPIC'))
    }
  });
};

const removeTopic = (id) => {
  return new Promise((res, rej) => {
    const index = topics.findIndex(topic => topic.id === id );

    return index > -1
      ? res(topics.splice(index, 1)[0].id)
      : rej(new Error('THERE IS NO ARTICLES'))
  })
};

const createArticle = (userId, title) => {
  return new Promise((res, rej) => {
    try {
      const article = {
        id: Date.now(),
        userId: userId,
        title,
        createDate: new Date(),
        updateDate: new Date(),
        meta: {},
      };

      articles.push(article);

      return res({
        id: article.id,
        title: article.title,
      })
    } catch (e) {
      return rej(new Error('ERROR CREATE ARTICLES'))
    }
  });
};

const removeArticle = (id) => {
  return new Promise((res, rej) => {
    const index = articles.findIndex(article => article.id === id );

    if (index > -1) {
      const newTopics = topics.filter(topic => topic.articleId !== id);
      topics.length = 0;
      topics.push(...newTopics);

      return res(articles.splice(index, 1)[0].id)
    } else {
      return rej(new Error('THERE IS NO ARTICLES'))
    }
  })
};

const updateTopic = (id, title) => {
  return new Promise((res, rej) => {
    const topic = topics.find(topic => topic.id === id);

    if (topic) {
      topic.title = title;
      return res({ id, title })
    } else {
      rej(new Error('THERE NO TOPIC'));
    }
  })
};

const updateArticle = (id, title) => {
  return new Promise((res, rej) => {
    const article = articles.find(article => article.id === id);

    if (article) {
      article.title = title;
      return res({ id, title })
    } else {
      rej(new Error('THERE NO TOPIC'));
    }
  })
};

const updateContent = (topicId, content) => {
  return new Promise((res, rej) => {
    const topic = topics.find(({ id }) => id === topicId);

    if (topic) {
      topic.content = content;
      return res(topicId)
    } else {
      return rej(new Error('THERE NO CONTENT'))
    }
  });
};

export default {
  getUser,
  getArticles,
  getTopics,
  getTopic,
  createArticle,
  updateArticle,
  removeArticle,
  createTopic,
  updateTopic,
  removeTopic,
  updateContent,
}

