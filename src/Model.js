'use strict';
import * as _ from 'lodash';

class Convertible {
  /**
   * @param {Array} params
   * @returns {void}
   */
  constructor(params) {
    this.params = params;

    this.asArray = this.asArray.bind(this);
    this.asObject = this.asObject.bind(this);
  }

  asArray (){
    return this.params;
  }

  asObject(){
    // This should actually do the conversion from the array to an object.
    return {
      'bar': 'foo',
      'bar': 'foo',
    };
  }
}

module.exports = class Model {
  constructor(params) {
    this.params = params;

    this.select = this.select.bind(this);
  }

  /*
   * Returns an array of params that match the given keys.
   * @param {Array} paramNames the param keys.
   * @returns {Array}
   */
  select(paramNames) {
    let res = [];
    for (let paramName of paramNames) {
      let x = _.findWhere({param: paramName});
      if(x !== undefined) {
        res.push(x);
      }
    }

    // Need to implement a class that has asObject functions
    return new Convertible(res);
  }
};
