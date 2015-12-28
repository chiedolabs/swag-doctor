'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = (function () {
  /*
   * @param {Object} params
   * @returns {void}
   */

  function Model(params) {
    _classCallCheck(this, Model);

    this.params = params;

    this.select = this.select.bind(this);
  }

  /*
   * Returns an array of params that match the given keys.
   * @param {Array} paramNames the param keys.
   * @returns {Array}
   */

  _createClass(Model, [{
    key: 'select',
    value: function select(paramNames) {
      var params = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = paramNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var paramName = _step.value;

          if (this.params[paramName] !== undefined) {
            params[paramName] = this.params[paramName];
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return new Model(params);
    }

    /*
     * Returns one instance of the model
     * @returns {Object}
     */

  }, {
    key: 'one',
    value: function one() {
      return this.params;
    }

    /*
     * Returns many instances of the model
     * @param {integer} count the number of instances to return
     * @returns {Array}
     */

  }, {
    key: 'many',
    value: function many() {
      var count = arguments.length <= 0 || arguments[0] === undefined ? 2 : arguments[0];

      var arr = [];

      for (var i = 0; i < count; i++) {
        arr.push(this.params);
      }

      return this.params;
    }
  }]);

  return Model;
})();