'use strict';
import ob from 'objob';
import faker from 'faker';

let book = {
  'id': { description: 'The id', example: 'ae3432aeb35563245', type: 'MongoID'},
  'name': {
    description: 'The name',
    example: () => {
      return faker.lorem.sentence();
    },
  },
};

let user = {
  'id': { description: 'The id', example: 'ae3432aeb35563245'},
  'name': { description: 'The name', example: 'Jane Doe'},
  'age': { description: 'The age', example: 24},
  'email':{
    description:'Email address',
    type: 'Email (String)',
    example: () => {
      return faker.internet.email();
    },
  },
  'username': { description: 'username', example: 'janedoe'},
  'password': { description: 'password', example: 'testtest'},
  'books': {
    description: 'All books',
    example: [book, book, book],
  },
};

let unauthorizedError = {
  name: 'Unauthorized Error',
  status: 401,
  body: {
    errors: {
      example: { unauthorized: 'You are not authorized'},
    },
  },
};

let permissionsError = {
  name: 'Permissions Error',
  status: 403,
  body: {
    errors: {
      example: {unauthorized: 'You do not have permissions to perform this action.'},
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
  example: 'Bearer: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI',
};

let createUserBody = ob.pick(user, ['name', 'email', 'username', 'password', 'books']);
createUserBody.name.optional = true;
user.name.optional = false;

let createUser = {
  name: 'Create user',
  method: 'POST',
  description: 'Allows someone to create a user.',
  params: {
    body: {user: {example: createUserBody}},
  },
  responses: [
    {
      name: 'Success',
      status: 200,
      body: {
        user: {
          description: 'The user',
          example: ob.pick(user, ['id','name', 'email', 'username', 'books', 'age']) },
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
    query: {
      misc: {
        description: 'Just an example query parameter',
      },
      misc2: {
        description: 'Another example query parameter',
      },
    },
  },
  responses: [],
  headers: [ tokenHeader ],
  description: `
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
  },
  responses: [],
};

module.exports = {
  name: 'Example API Documentation',
  description: 'This is an example of the documentation you can create with Swag Doctor.',
  paths: {
    '/users': {
      actions: [ createUser ],
      description: `
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
