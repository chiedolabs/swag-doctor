'use strict';
require('babel-register');

let data = require('../examples/advanced.js');

let handlebars = require('handlebars');

let template = handlebars.compile(`
{{#each paths}}
    Key: {{@key}} Value = {{this}}
{{/each}}
`);
let html = template(data);

console.log(html);
