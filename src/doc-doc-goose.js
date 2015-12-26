'use strict';
require('babel-register');
let argv = require('yargs').argv;
let path= require('path');

let cwd = path.resolve('.');

if(argv.i && argv.o) {
  let fs         = require('fs');
  let handlebars = require('handlebars');
  let data       = require(`${cwd}/${argv.i}`);

  // parse the HTML using the data
  let templateFile = fs.readFileSync(`${__dirname}/templates/default.handlebars`).toString();
  let template     = handlebars.compile(templateFile);
  let html         = template(data);

  //save the file
  fs.writeFile(`${cwd}/${argv.o}/index.html`, html, 'utf8');
}
