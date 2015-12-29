import * as _ from 'lodash';

module.exports.generateID = function(x){
  return x.replace(/\W+/g, '').toLowerCase();
};

module.exports.getType = function(field){
  if(typeof field.example === 'function') {
    return typeof field.example();
  } else {
    return typeof field.example;
  }
};

let swagObToJSON = function(x){
  let res = {};

  for(let i in x) {
    if(_.isObject(x[i])) {
      if(_.isFunction(x[i].example)) {
        res[i] = x[i].example();
      } else if(_.isString(x[i].example)) {
        res[i] = x[i].example;
      } else {
        res[i] = swagObToJSON(x[i]);
      }
    } else {
      res[i] = x[i];
    }
  }

  return res;
};
module.exports.swagObToJSON = swagObToJSON;
