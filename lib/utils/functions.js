'use strict';

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

module.exports.generateID = function (x) {
  return x.replace(/\W+/g, '').toLowerCase();
};

module.exports.getType = function (field) {
  if (typeof field.resolve === 'function') {
    return _typeof(field.resolve());
  } else {
    return _typeof(field.resolve);
  }
};

var resolveValue = function resolveValue(x) {
  var resolution = undefined;

  if (_.isArray(x)) {
    var y = [];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = x[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var z = _step.value;

        y.push(swagObToJSON(z));
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

    resolution = y;
  } else if (_.isObject(x)) {
    resolution = swagObToJSON(x);
  } else {
    resolution = x;
  };

  return resolution;
};

var swagObToJSON = function swagObToJSON(x) {
  var res = {};

  if (!_.isObject(x)) {
    return x;
  }

  for (var i in x) {
    if (_.isObject(x[i])) {
      if (_.isFunction(x[i].resolve)) {
        res[i] = resolveValue(x[i].resolve());
      } else {
        res[i] = resolveValue(x[i].resolve);
      }
    } else {
      res[i] = x[i];
    }
  }

  return res;
};
module.exports.swagObToJSON = swagObToJSON;