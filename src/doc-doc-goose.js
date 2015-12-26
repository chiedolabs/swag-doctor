'use strict';
require('babel-register');
let fs = require('fs')

let data = require('../examples/advanced.js');

let handlebars = require('handlebars');

let x = fs.readFileSync(`${__dirname}/templates/default.handlebars`).toString();
let template = handlebars.compile(x);
let html = template(data);

console.log(html);

