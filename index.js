module.exports.token = {
  description: 'Authentication token for a user.',
  example: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9',
};

module.exports.id = { description: 'The id', example: () => 1};

module.exports.deletedResponse = {
  name: 'Success Response',
  status: 200,
  body: { description: 'The deleted entity', example: {deleted_id: 1}},
};

/*******************************************
 * ERRORS
 *******************************************/
module.exports.fieldErrors = {
  name: 'Field Errors',
  status: 400,
  body: {
    errors: {
      example: {
        field_one: {
          example: ['Field error one.', 'Field error two'],
          description: 'An array of messages about a user\'s errors for this field',
        },
        field_two: {
          example: ['Field error one.', 'Field error two'],
          description: 'An array of messages about a user\'s errors for this field',
        },
      },
    },
  },
};

module.exports.unauthorizedError = {
  name: 'Unauthorized Error',
  status: 401,
  body: {
    errors: {
      example: {
        unauthorized: {
          description: 'An array of messages stating that a user is not authorized',
          example: ['You are not authorized'],
        },
      },
    },
  },
};

module.exports.permissionsError = {
  name: 'Permissions Error',
  status: 403,
  body: {
    errors: {
      example: {
        permissions: {
          example: ['You do not have permissions to perform this action.'],
          description: 'An array of messages about a user\'s permission errors',
        },
      },
    },
  },
};

module.exports.notFoundError = {
  name: 'Not Found Error',
  status: 404,
  body: {
    errors: {
      example: {
        not_found: {
          description: 'An array of messages stating that a resource was not found',
          example: ['Not found'],
        },
      },
    },
  },
};


/*******************************************
 * HEADERS
 *******************************************/
module.exports.tokenHeader = {
  key: 'Authorization',
  description: 'This token is used to authenticate a user with a request. If it is not attached, there will be no user attached to the request. Note that the token must be prepended with "Bearer: "',
  example: 'Bearer: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI',
};
