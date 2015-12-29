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

let swagObToJSON = function(x){
  let res = {};

  for(let i in x) {
    if(_.isObject(x[i])) {
      if(_.isFunction(x[i].resolve)) {
        res[i] = x[i].resolve();
      } else if(_.isString(x[i].resolve)) {
        res[i] = x[i].resolve;
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
