'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _class, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redboxReact2 = require('redbox-react');

var _redboxReact3 = _interopRequireDefault(_redboxReact2);

var _reactTransformCatchErrors3 = require('react-transform-catch-errors');

var _reactTransformCatchErrors4 = _interopRequireDefault(_reactTransformCatchErrors3);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _reactTransformHmr3 = require('react-transform-hmr');

var _reactTransformHmr4 = _interopRequireDefault(_reactTransformHmr3);

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _reactBootstrap = require('react-bootstrap');

var _functions = require('../utils/functions');

var _objob = require('objob');

var _objob2 = _interopRequireDefault(_objob);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  SideNav: {
    displayName: 'SideNav'
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'src/components/SideNav.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'src/components/SideNav.js',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
  };
}

var SideNav = _wrapComponent('SideNav')((_temp = _class = (function (_Component) {
  _inherits(SideNav, _Component);

  function SideNav() {
    _classCallCheck(this, SideNav);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SideNav).apply(this, arguments));
  }

  _createClass(SideNav, [{
    key: 'render',
    value: function render() {
      var paths = this.props.paths;

      var routes = (0, _objob2.default)(paths).keys();

      var sidenavOutput = _.map(routes, function (route) {
        var subnavOutput = _.map(paths[route].actions, function (action) {
          return _react3.default.createElement(
            _reactBootstrap.NavItem,
            { key: action.name, href: '#' + (0, _functions.generateID)(action.name) },
            action.name
          );
        });

        return _react3.default.createElement(
          _reactBootstrap.Nav,
          { stacked: true, key: route },
          _react3.default.createElement(
            _reactBootstrap.NavItem,
            { href: '#' + (0, _functions.generateID)(route), className: 'nav-header' },
            route
          ),
          subnavOutput
        );
      });

      return _react3.default.createElement(
        _reactBootstrap.Row,
        null,
        sidenavOutput
      );
    }
  }]);

  return SideNav;
})(_react2.Component), _class.propTypes = {
  paths: _react2.PropTypes.object
}, _temp));

;
exports.default = SideNav;
module.exports = exports['default'];