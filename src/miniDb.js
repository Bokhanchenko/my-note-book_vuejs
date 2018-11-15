const user = {
    id: 0,
    name: 'test name',
    lastName: 'test last name',
    age: 18,
    role: 'admin'
  };

const navList = [
    {
      id: 0,
      title: 'Angular',
      asideList: [
        {
          id: 0,
          title: 'routing'
        },
        {
          id: 1,
          title: 'components'
        }
      ]
    },
    {
      id: 1,
      title: 'React',
      asideList: [
        {
          id: 1,
          title: 'redux'
        },
        {
          id: 2,
          title: 'setState'
        }
      ]
    },
    {
      id: 2,
      title: 'Vue',
      asideList: [
        {
          id: 1,
          title: 'customEvents'
        },
        {
          id: 2,
          title: 'installation'
        }
      ]
    }
  ];

export default {
  user,
  navList,
}

