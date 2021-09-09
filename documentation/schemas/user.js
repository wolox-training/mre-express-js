module.exports = {
  name: {
    type: 'string',
    example: 'miguelangel'
  },
  lastName: {
    type: 'string',
    example: 'rendon'
  },
  email: {
    type: 'string',
    example: 'tom.engels@wolox.ar'
  },
  password: {
    type: 'string',
    example: '12313324'
  },
  User: {
    type: 'object',
    properties: {
      name: {
        $ref: '#/components/schemas/username'
      },
      lastName: {
        $ref: '#/components/schemas/lastName'
      },
      email: {
        $ref: '#/components/schemas/userEmail'
      },
      password: {
        $ref: '#/components/schemas/password'
      }
    }
  },
  Users: {
    type: 'object',
    properties: {
      users: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/User'
        }
      }
    }
  }
};
