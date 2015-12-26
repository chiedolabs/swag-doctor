'use strict';
require('babel-register');
let argv = require('yargs').argv;
let path = require('path');
let _    = require('lodash');
let fs   = require('fs');
let ejs  = require('ejs');

if(argv.i && argv.o) {
  // Get the execution directory
  let cwd = path.resolve('.');
  let inputFile = _.trimLeft(argv.i, './');
  let outputDir = _.trimRight(argv.o, '/');

  let data = require(`${cwd}/${inputFile}`);

  // Parse the HTML using the data
  let templateFile = fs.readFileSync(`${__dirname}/templates/index.ejs`).toString();
  let template     = ejs.compile(templateFile);
  let html         = template(data);

  // Create the needed directories if they don't already exist
  let paths = outputDir.split('/');
  let dir = './';
  for (let i = 0; i < paths.length; i++) {
    dir = `${dir}/${paths[i]}`;
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
  }

  // Save the docs
  fs.writeFile(`${cwd}/${outputDir}/index.html`, html, 'utf8');
}
