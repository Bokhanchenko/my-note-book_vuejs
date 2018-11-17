const users = [{
  id: 0,
  name: 'admin',
  lastName: 'test last name',
  age: 18,
  role: 'admin'
}];

const navList = [
    {
      id: 0,
      title: 'Angular',
      asideList: [
        {
          id: 0,
          title: 'routing',
          content: 'angular routing'
        },
        {
          id: 1,
          title: 'components',
          content: 'angular components'
        }
      ]
    },
    {
      id: 1,
      title: 'React',
      asideList: [
        {
          id: 1,
          title: 'redux',
          content: 'React redux'
        },
        {
          id: 2,
          title: 'setState',
          content: 'React setState'
        }
      ]
    },
    {
      id: 2,
      title: 'Vue',
      asideList: [
        {
          id: 1,
          title: 'customEvents',
          content: 'Vue customEvents'
        },
        {
          id: 2,
          title: 'installation',
          content: 'Vue installation'
        }
      ]
    }
  ];

const checkAuth = (userData) => {
  const { login, password } = userData;
  const user = users.find(user => user.login === login);

  if (!user || user.password !== password) return Promise.reject(new Error('unknown user'));

  return Promise.resolve(user)
};

export default {
  user: users[0],
  navList,
}

