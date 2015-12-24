'use strict';

module.exports = class Model {
  /*
   * @param {Object} params
   * @returns {void}
   */
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
    let params = {};
    for (let paramName of paramNames) {
      if(this.params[paramName] !== undefined) {
        params[paramName] = this.params[paramName];
      }
    }

    return new Model(params);
  }

  /*
   * Returns one instance of the model
   * @returns {Object}
   */
  one() {
    return this.params;
  }

  /*
   * Returns many instances of the model
   * @param {integer} count the number of instances to return
   * @returns {Array}
   */
  many(count = 2) {
    let arr = [];

    for (let i = 0; i < count; i++) {
      arr.push(this.params);
    }

    return this.params;
  }
};
