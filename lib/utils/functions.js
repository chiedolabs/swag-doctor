'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

module.exports.generateID = function (x) {
  return x.replace(/\W+/g, '').toLowerCase();
};

module.exports.getType = function (field) {
  if (typeof field.example === 'function') {
    return _typeof(field.example());
  } else {
    return _typeof(field.example);
  }
};