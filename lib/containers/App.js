'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

var _Main = require('../components/Main');

var _Main2 = _interopRequireDefault(_Main);

var _SideNav = require('../components/SideNav');

var _SideNav2 = _interopRequireDefault(_SideNav);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  App: {
    displayName: 'App'
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'src/containers/App.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'src/containers/App.js',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
  };
}

var data = undefined;
// In development, load with commonjs for hot reloading benefits
if (process.env.NODE_ENV === 'development') {
  data = require('../../examples/advanced');
} else {
  data = window.swagDocData;
}

var App = _wrapComponent('App')((function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react3.default.createElement(
        _reactBootstrap.Grid,
        { className: 'pull-left' },
        _react3.default.createElement(
          _reactBootstrap.Row,
          { className: 'main' },
          _react3.default.createElement(
            _reactBootstrap.Col,
            { xs: 3, md: 3, className: 'side-nav' },
            _react3.default.createElement(_SideNav2.default, { paths: data.paths })
          ),
          _react3.default.createElement(
            _reactBootstrap.Col,
            { xs: 9, md: 9, className: 'viewer' },
            _react3.default.createElement(
              'h1',
              null,
              data.name
            ),
            _react3.default.createElement(
              'p',
              null,
              data.description
            ),
            _react3.default.createElement(_Main2.default, { paths: data.paths })
          )
        )
      );
    }
  }]);

  return App;
})(_react2.Component));

;
exports.default = App;
module.exports = exports['default'];