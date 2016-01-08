import * as _ from 'lodash';

/*
 * Generates an ID for use on the HTML page, given a string
 *
 * @param {string} x The string to convert to an ID
 * @return {string}
 */
export let generateID = function(x){
  return x.replace(/\W+/g, '').toLowerCase();
};


/*
 * Figures out the type for a given field
 *
 * @param {object} field The field object
 * @param {function|string} field.example The value that the field examples to
 * @param {string} [field.type] A specified type
 * @return {string}
 */
export let inferType = function(field){
  if(field.type) {
    return field.type;
  } else if(typeof field.example === 'function') {
    return typeof field.example();
  } else {
    return typeof field.example;
  }
};

/*
 * Given a value, example it to it's corresponding value from its
 * example function.
 *
 * @param {any} x
 * @return {any}
 */
export let exampleValue = function(x){
  let resolution;

  if(_.isArray(x)) {
    let y = [];

    for(let z of x) {
      y.push(modelToJSON(z));
    }

    resolution = y;
  } else if(_.isObject(x)) {
    resolution = modelToJSON(x);
  } else {
    resolution = x;
  };

  return resolution;
};

/*
 * Takes a swag doctor model and convert it to it's corresponing json object.
 * This uses recursion via exampleValue, so I hope you brought your swag.
 * @param {any} x
 * @return {object}
 */
export let modelToJSON = function(x){
  let res = {};

  // If x is not an object, this is the base case where it just returns that
  // value and exits the recursion.
  if(!_.isObject(x)) {
    return x;
  }

  // Recursion logic.
  for(let i in x) {
    if(_.isObject(x[i])) {
      if(_.isFunction(x[i].example)) {
        res[i] = exampleValue(x[i].example());
      }  else {
        res[i] = exampleValue(x[i].example);
      }
    } else {
      res[i] = x[i];
    }
  }

  return res;
};
