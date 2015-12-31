'use strict';
import ob from 'objob';
import faker from 'faker';

let book = {
  'id': { description: 'The id', resolve: 'ae3432aeb35563245'},
  'name': {
    description: 'The name',
    resolve: () => {
      return faker.lorem.sentence();
    },
  },
};

let user = {
  'id': { description: 'The id', resolve: 'ae3432aeb35563245'},
  'name': { description: 'The name', resolve: 'Jane Doe'},
  'age': { description: 'The age', resolve: 24},
  'email':{
    description:'Email address',
    resolve: () => {
      return faker.internet.email();
    },
  },
  'username': { description: 'username', resolve: 'janedoe'},
  'password': { description: 'password', resolve: 'testtest'},
  'books': {
    description: 'All books',
    resolve: [book, book, book],
  },
};

let unauthorizedError = {
  name: 'Unauthorized Error',
  status: 401,
  body: {
    errors: {
      resolve: { unauthorized: 'You are not authorized'},
    },
  },
};

let permissionsError = {
  name: 'Permissions Error',
  status: 403,
  body: {
    errors: {
      resolve: {unauthorized: 'You do not have permissions to perform this action.'},
    },
  },
};

let notFoundError = {
  name: 'Not found',
  status: 404,
  body: 'Not found',
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
    body: ob(user).select(['name', 'email', 'username', 'password']),
  },
  responses: [
    {
      name: 'Success',
      status: 200,
      body: {
        user: {
          description: 'The user',
          resolve: ob(user).select(['id','name', 'email', 'username', 'books', 'age']) },
      },
    },
    unauthorizedError,
    permissionsError,
    notFoundError,
  ],
};

let getUser = {
  name: 'Get user',
  method: 'GET',
  params: {
    url: ob(user).select(['id']),
    query: [],
  },
  responses: [],
  headers: [ tokenHeader ],
};

let updateUser = {
  name: 'Update user',
  method: 'PUT',
  params: {
    url: ob(user).select(['id']),
    body: ob(user).select(['name','email','username']),
    query: [],
  },
  responses: [],
};

module.exports = {
  name: 'Example API Documentation',
  description: 'This is an example of the documentation you can create with Swag Doctor.',
  paths: {
    '/users': {
      actions: [ createUser ],
    },
    '/users/:id': {
      actions: [ getUser, updateUser ],
    },
  },
};
