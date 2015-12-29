'use strict';
import ob from 'objob';

let user = {
  'id': { description: '...', resolve: 'ae3432aeb35563245'},
  'name': { description: '...', resolve: 'Jane Doe'},
  'email':{
    description:'...',
    resolve: () => {
      // allows for use of generators
      return 'email@email.com';
    },
  },
  'username': { description: '...', resolve: 'janedoe'},
  'password': { description: '...', resolve: 'testtest'},
};

let unauthorizedError = {
  name: 'Unauthorized Error',
  status: 401,
  body: {
    errors: {
      unauthorized: 'You are not authorized',
    },
  },
};

let permissionsError = {
  name: 'Permissions Error',
  status: 403,
  body: {
    errors: {
      unauthorized: 'You do not have permissions to perform this action.',
    },
  },
};

let tokenHeader = {
  name: 'Authentication Token',
  header: 'Authorization',
  value: 'Bearer: 3838473948',
  description: 'This token is used to authenticate a user with a request. If it is not attached, there will be no user attached to the request. Note that the token must be prepended with "Bearer: "',
};

let createUser = {
  name: 'Create user',
  method: 'POST',
  description: 'Allows someone to create a user.',
  params: {
    body: ob(user).with(['name', 'email', 'username', 'password']),
  },
  responses: [
    {
      name: 'Success',
      status: 200,
      body: {
        user: ob(user).with(['id','name', 'email', 'username']),
      },
    },
    unauthorizedError,
    permissionsError,
  ],
};

let getUser = {
  name: 'Get user',
  method: 'GET',
  params: {
    url: ob(user).with(['id']),
    query: [],
  },
  responses: [],
  headers: [ tokenHeader ],
};

let updateUser = {
  name: 'Update user',
  method: 'PUT',
  params: {
    url: ob(user).with(['id']),
    body: ob(user).with(['name','email','username']),
    query: [],
  },
  responses: [],
};

module.exports = {
  name: 'resolve API Documentation',
  description: 'This is an resolve of the documentation you can create with Swaglet',
  paths: {
    '/users': {
      actions: [ createUser ],
    },
    '/users/:id': {
      actions: [ getUser, updateUser ],
    },
  },
};
