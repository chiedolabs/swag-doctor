import * as _ from 'lodash';

module.exports.generateID = function(x){
  return x.replace(/\W+/g, '').toLowerCase();
};

module.exports.getType = function(field){
  if(typeof field.resolve === 'function') {
    return typeof field.resolve();
  } else {
    return typeof field.resolve;
  }
};

let resolveValue = function(x){
  let resolution;

  if(_.isArray(x)) {
    let y = [];

    for(let z of x) {
      y.push(swagObToJSON(z));
    }

    resolution = y;
  } else if(_.isObject(x)) {
    resolution = swagObToJSON(x);
  } else {
    resolution = x;
  };

  return resolution;
};

let swagObToJSON = function(x){
  let res = {};

  if(!_.isObject(x)) {
    return x;
  }

  for(let i in x) {
    if(_.isObject(x[i])) {
      if(_.isFunction(x[i].resolve)) {
        res[i] = resolveValue(x[i].resolve());
      }  else {
        res[i] = resolveValue(x[i].resolve);
      }
    } else {
      res[i] = x[i];
    }
  }

  return res;
};
module.exports.swagObToJSON = swagObToJSON;
let flatten = function(x, prefix=''){
  let res = {};

  if(_.isObject(x)){

    for(let i in x) {
      let tmpPrefix;
      if(prefix === '') {
        tmpPrefix = `${i}`;
      } else {
        tmpPrefix = `${prefix}.${i}`;
      }

      if(_.isArray(x[i])) {
        tmpPrefix = tmpPrefix + '[]';
      }

      res[tmpPrefix] = x[i];
      res = {...res, ...flatten(x[i], tmpPrefix)};
    }
  }

  return res;
};

module.exports.swagObToFieldOb = function(x){
  return flatten(x);
};
