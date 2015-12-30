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

var _reactBootstrap = require('react-bootstrap');

var _functions = require('../utils/functions');

var _Parameters = require('./Parameters');

var _Parameters2 = _interopRequireDefault(_Parameters);

var _jsonString = require('json-string');

var _jsonString2 = _interopRequireDefault(_jsonString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Action: {
    displayName: 'Action'
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'src/components/Action.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'src/components/Action.js',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
  };
}

var Action = _wrapComponent('Action')((_temp = _class = (function (_Component) {
  _inherits(Action, _Component);

  function Action() {
    _classCallCheck(this, Action);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Action).apply(this, arguments));
  }

  _createClass(Action, [{
    key: 'render',
    value: function render() {
      var action = this.props.action;

      var bodyParams = undefined;
      var urlParams = undefined;
      var bodyParamsOutput = undefined;
      var urlParamsOutput = undefined;

      if (action.params) {
        if (action.params.body) {
          bodyParams = action.params.body;
        }

        if (action.params.url) {
          urlParams = action.params.url;
        }
      }

      if (urlParams) {
        urlParamsOutput = _react3.default.createElement(
          'div',
          null,
          _react3.default.createElement(
            'h4',
            null,
            'URL Parameters'
          ),
          _react3.default.createElement(_Parameters2.default, { parameters: urlParams, type: false })
        );
      }

      if (bodyParams) {
        bodyParamsOutput = _react3.default.createElement(
          'div',
          null,
          _react3.default.createElement(
            'h4',
            null,
            'Body Parameters'
          ),
          _react3.default.createElement(_Parameters2.default, { parameters: bodyParams })
        );
      }

      // Need to generate the json response output from the json object here
      // so I can use it later.
      var responsesOutput = action.responses.map(function (response) {
        return _react3.default.createElement(
          'div',
          { key: response.status },
          _react3.default.createElement(
            'h4',
            null,
            response.name,
            ' (status: ',
            response.status,
            ')'
          ),
          _react3.default.createElement(
            'h5',
            null,
            'Fields:'
          ),
          _react3.default.createElement(
            'h5',
            null,
            'Example:'
          ),
          _react3.default.createElement(
            'pre',
            null,
            '' + (0, _jsonString2.default)((0, _functions.swagObToJSON)(response.body))
          )
        );
      });

      return _react3.default.createElement(
        'div',
        null,
        _react3.default.createElement(
          _reactBootstrap.Button,
          { bsStyle: 'success', className: 'pull-left' },
          action.method
        ),
        _react3.default.createElement(
          'h3',
          { id: '' + (0, _functions.generateID)(action.name) },
          ' ',
          action.name
        ),
        _react3.default.createElement('br', null),
        urlParamsOutput,
        bodyParamsOutput,
        _react3.default.createElement(
          'div',
          null,
          responsesOutput
        )
      );
    }
  }]);

  return Action;
})(_react2.Component), _class.propTypes = {
  action: _react2.PropTypes.object
}, _temp));

;
exports.default = Action;
module.exports = exports['default'];