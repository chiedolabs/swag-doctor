'use strict';
require('babel-register');
let fs         = require('fs');
let handlebars = require('handlebars');
let data       = require('../examples/advanced.js');


// parse the HTML using the data
let templateFile = fs.readFileSync(`${__dirname}/templates/default.handlebars`).toString();
let template     = handlebars.compile(templateFile);
let html         = template(data);

//save the file
console.log(html);
