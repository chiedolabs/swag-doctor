'use strict';
import Model from '../src/Model';

let User = Model.new([
  {param: 'id', description: '...', example: 'ae3432aeb35563245'},
  {param: 'name', description: '...', example: 'Jane Doe'},
  {
    param: 'email',
    description:'...',
    example: function() {
      // allows for use of generators
      return 'email@email.com';
    },
  },
  {param: 'username', description: '...', example: 'janedoe'},
  {param: 'password', description: '...', example: 'testtest'},
]);

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
  method: 'GET',
  group: 'User',
  description: 'Allows someone to create a user.',
  params: {
    body: User.select(['name', 'email', 'username', 'password']).asArray(),
  },
  responses: [
    {
      name: 'Success',
      status: 200,
      body: {
        user: User.select(['id','name', 'email', 'username']).asObject(),
      },
    },
    unauthorizedError,
    permissionsError,
  ],
};

let getUser = {
  name: 'Get user',
  method: 'GET',
  group: 'User',
  params: {
    url: User.select(['id']).asArray(),
    query: [],
  },
  headers: [ tokenHeader ],
};

let updateUser = {
  name: 'Update user',
  method: 'PUT',
  group: 'User',
};

export default {
  path: {
    '/users': [ createUser ],
    '/users/:id': [ getUser, updateUser ],
  },
};
