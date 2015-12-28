'use strict';
require('babel-register');
let argv = require('yargs').argv;
let path = require('path');
let _    = require('lodash');
let fs   = require('fs');

if(argv.i && argv.o) {
  // Get the execution directory
  let cwd = path.resolve('.');
  let inputFile = _.trimLeft(argv.i, './');
  let outputDir = _.trimRight(argv.o, '/');

  let data = require(`${cwd}/${inputFile}`);

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
  fs.writeFile(`${cwd}/${outputDir}/data.json`, JSON.stringify(data) , 'utf8');
}
