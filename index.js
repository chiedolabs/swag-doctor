'use strict';

const ob        = require('objob');
const pluralize = require('pluralize');
const _         = require('lodash');

const indefinite_article = (word) => {
  switch (word.toLowerCase().substring(0, 1)) {
    case 'a':
      return 'an';
    case 'e':
      return 'an';
    case 'i':
      return 'an';
    case 'o':
      return 'an';
    case 'u':
      return 'an';
    default:
      return 'a';
      break;
  }
};

module.exports.token = {
  description: 'Authentication token for a user.',
  example: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9',
};

module.exports.id = { description: 'The id', example: () => 1};

module.exports.deletedResponse = {
  name: 'Success Response',
  status: 200,
  body: { deleted_id: {description: 'The id of the deleted entity', example: 1}},
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
  let moreDescription = config.moreDescription || '';

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
    name: `Create a new ${name}`,
    method: 'POST',
    description: `Allows someone to create a ${name}. ${moreDescription}`,
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
  let urlParams = config.urlParams || [];
  let moreDescription = config.moreDescription || '';

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

  let params = {body: bodyParams};
  if(_.isEmpty(urlParamsObjectified) === false) {
    params['url'] = urlParamsObjectified;
  }

  return {
    name: `Update ${indefinite_article(name)} ${name}`,
    method: 'PUT',
    description: `Allows someone to update ${indefinite_article(name)} ${name}. ${moreDescription}`,
    params: params,
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
 * Returns a delete action for an object
 * @param {object} config The config object
 * @returns {object}
 */
module.exports.destroy = (config) => {
  let name = config.name;
  let moreDescription = config.moreDescription || '';

  return {
    name: `Delete ${indefinite_article(name)} ${name}`,
    method: 'DELETE',
    description: `Allows someone to delete ${indefinite_article(name)} ${name}. ${moreDescription}`,
    params: {
      url: {id: module.exports.id},
    },
    responses: [module.exports.deletedResponse],
  };
};

/**
 * Returns an action forreturning one object
 * @param {object} config The config object
 * @returns {object}
 */
module.exports.getOne = (config) => {
  let object  = config.object;
  let name    = config.name;
  let omitOut = config.omitOut || [];
  let urlParams = config.urlParams || [];
  let moreDescription = config.moreDescription || '';

  // Making sure that the response body output is nested. Eg. if we're dealing with User Homes,
  // we'd end up with {user_homes: {...}}
  let formattedName = name.toLowerCase().split(' ').join('_');

  let bodyResponse = {};
  bodyResponse[formattedName] = {
    description: 'The ' + name,
    example: ob.omit(object, omitOut),
  };

  let urlParamsObjectified = {};

  for(let urlParam of urlParams) {
    urlParamsObjectified[urlParam] = object[urlParam];
  }

  let params = {};
  if(_.isEmpty(urlParamsObjectified) === false) {
    params['url'] = urlParamsObjectified;
  }

  return {
    name: `Get ${indefinite_article(name)} ${name}`,
    method: 'GET',
    description: `Allows someone to get ${indefinite_article(name)} ${name}. ${moreDescription}`,
    params: params,
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
 * Returns an action for returning many objects
 * @param {object} config The config object
 * @returns {object}
 */
module.exports.getMany = (config) => {
  let object  = config.object;
  let name    = config.name;
  let omitOut = config.omitOut || [];
  let urlParams = config.urlParams || [];
  let moreDescription = config.moreDescription || '';

  // allow the user to override the default description
  let description = config.description || `Allows someone to get many ${pluralize(name)}. ${moreDescription}`;

  // Making sure that the response body output is nested. Eg. if we're dealing with User Homes,
  // we'd end up with {user_homes: {...}}
  let formattedName = pluralize(name).toLowerCase().split(' ').join('_');

  let bodyResponse = {};
  bodyResponse[formattedName] = {
    description: 'The ' + pluralize(name),
    example: [ob.omit(object, omitOut), ob.omit(object, omitOut)],
  };

  let urlParamsObjectified = {};

  for(let urlParam of urlParams) {
    urlParamsObjectified[urlParam] = object[urlParam];
  }

  let params = {};
  if(_.isEmpty(urlParamsObjectified) === false) {
    params['url'] = urlParamsObjectified;
  }

  return {
    name: `Get many ${pluralize(name)}`,
    method: 'GET',
    description: description,
    params: params,
    responses: [
      {
        name: 'Success',
        status: 200,
        body: bodyResponse,
      },
    ],
  };
};

