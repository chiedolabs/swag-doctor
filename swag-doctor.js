'use strict';
require('babel-register');
let argv   = require('yargs').argv;
let path   = require('path');
let _      = require('lodash');
let fs     = require('fs');
let ncp    = require('ncp').ncp;
let ejs    = require('ejs');

if(argv.i && argv.o) {
  // Get the execution directory
  let cwd = path.resolve('.');
  let inputFile = _.trimLeft(argv.i, './');
  let outputDir = _.trimRight(argv.o, '/');

  let data         = require(`${cwd}/${inputFile}`);
  let templateFile = fs.readFileSync(`${__dirname}/templates/index.ejs`).toString();
  let template     = ejs.compile(templateFile);
  let html         = template({
    swagDocData: data,
    js: 'static/js/react-bundle.js',
    css: 'static/css/style.css',
  });

  // Create the needed directories if they don't already exist
  let paths = outputDir.split('/');
  let dir = './';
  for (let i = 0; i < paths.length; i++) {
    dir = `${dir}/${paths[i]}`;
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
  }

  // Copy the react app from this package to the user's output dir
  ncp(`${__dirname}/dist/`, `${cwd}/${outputDir}/`, {clobber: true}, (err) => {
    if (err) {
      return console.error(err);
    }
    // Save the doc data file
    fs.writeFile(`${cwd}/${outputDir}/index.html`, html , 'utf8');
  });
}
