const ob        = require('objob');
const pluralize = require('pluralize');

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

/*******************************************
 * BASIC ACTION GENERATORS
 *******************************************/

/**
 * Returns a create action for an object
 * @param {object} config The config object
 * @returns {object}
 */
module.exports.create = (config) => {
  let object  = config.object;
  let name    = config.name;
  let omitIn  = config.omitIn || [];
  let omitOut = config.omitOut || [];

  // Making sure that the response body output is nested. Eg. if we're dealing with User Homes,
  // we'd end up with {user_homes: {...}}
  let formattedName = name.toLowerCase().split(' ').join('_');

  let bodyResponse = {};
  bodyResponse[formattedName] = {
    description: 'The ' + name,
    example: ob.omit(object, omitOut),
  };

  let bodyParams = {};
  bodyParams[formattedName] = {
    example: ob.omit(object, omitIn),
  };

  return {
    name: 'Create a new ' + name,
    method: 'POST',
    description: 'Allows someone to create a ' + name + '.',
    params: {
      body: bodyParams,
    },
    responses: [
      {
        name: 'Success',
        status: 200,
        body: bodyResponse,
      },
    ],
  };
};

/**
 * Returns an update action for an object
 * @param {object} config The config object
 * @returns {object}
 */
module.exports.update = (config) => {
  let object  = config.object;
  let name    = config.name;
  let omitIn  = config.omitIn || [];
  let omitOut = config.omitOut || [];
  let urlParams = config.urlParams;

  // Making sure that the response body output is nested. Eg. if we're dealing with User Homes,
  // we'd end up with {user_homes: {...}}
  let formattedName = name.toLowerCase().split(' ').join('_');

  let bodyResponse = {};
  bodyResponse[formattedName] = {
    description: 'The ' + name,
    example: ob.omit(object, omitOut),
  };

  let bodyParams = {};
  bodyParams[formattedName] = {
    example: ob.omit(object, omitIn),
  };

  let urlParamsObjectified = {};

  for(let urlParam of urlParams) {
    urlParamsObjectified[urlParam] = object[urlParam];
  }

  return {
    name: 'Update a given ' + name,
    method: 'PUT',
    description: 'Allows someone to update a given ' + name + '.',
    params: {
      body: bodyParams,
      url: urlParamsObjectified,
    },
    responses: [
      {
        name: 'Success',
        status: 200,
        body: bodyResponse,
      },
    ],
  };
};

/**
 * Returns a delete response for an object
 * @param {object} object The object to delete
 * @returns {object}
 */
module.exports.delete = (object) => {
};

/**
 * Returns a response for getting one of the object
 * @param {object} object The object to get
 * @returns {object}
 */
module.exports.getOne = (object) => {
};

/**
 * Returns a response for getting multiple of an object
 * @param {object} object The object to get multiple of
 * @returns {object}
 */
module.exports.getAll = (object) => {
};
