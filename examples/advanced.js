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
  key: 'Authorization',
  description: 'This token is used to authenticate a user with a request. If it is not attached, there will be no user attached to the request. Note that the token must be prepended with "Bearer: "',
  resolve: 'Bearer: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI',
};

let createUserBody = ob.pick(user, ['name', 'email', 'username', 'password', 'books']);
createUserBody.name.optional = true;
user.name.optional = false;

let createUser = {
  name: 'Create user',
  method: 'POST',
  description: 'Allows someone to create a user.',
  params: {
    body: {user: {resolve: createUserBody}},
  },
  responses: [
    {
      name: 'Success',
      status: 200,
      body: {
        user: {
          description: 'The user',
          resolve: ob.pick(user, ['id','name', 'email', 'username', 'books', 'age']) },
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
    url: ob.pick(user, ['id']),
    query: [],
  },
  responses: [],
  headers: [ tokenHeader ],
  content: `
    <p>
    When you get a user, XYZ.
    </p>
  `,
};

let updateUser = {
  name: 'Update user',
  method: 'PUT',
  params: {
    url: ob.pick(user, ['id']),
    body: ob.pick(user, ['name','email','username']),
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
      content: `
        <h4>Stuff</h4>
        <p>
        Groovy
        </p>
      `,
    },
    '/users/:id': {
      actions: [ getUser, updateUser ],
    },
  },
};
