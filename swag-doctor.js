#! /usr/bin/env node
'use strict';
require('babel-register');
let argv   = require('yargs').argv;
let path   = require('path');
let _      = require('lodash');
let fs     = require('fs');
let ncp    = require('ncp').ncp;
let ejs    = require('ejs');
let ob     = require('objob');
let chalk = require('chalk');
let pjson = require('./package.json');

if(argv.i && argv.o) {
  // Get the execution directory
  let cwd = path.resolve('.');
  let inputFile = _.trimLeft(argv.i, './');
  let outputDir = _.trimRight(argv.o, '/');

  let data         = require(`${cwd}/${inputFile}`);
  let templateFile = fs.readFileSync(`${__dirname}/templates/index.ejs`).toString();
  let template     = ejs.compile(templateFile);
  // We need to make sure all the functions are evaluated
  data = ob.mapValues(data, (x) => {
    if(typeof x === 'function') {
      return x();
    } else {
      return x;
    }
  });

  data.timestamp = Date.now();
  data.version=pjson.version;
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
    fs.writeFile(`${cwd}/${outputDir}/index.html`, html , 'utf8', () => {
      let swagMessages = [
        'The swag is strong with you.',
        'Swaggity.',
        'That\'s right.',
        'Your swag is confirmed.',
        'You got what the doctor prescribed... Swag.',
        'Swag sandwhich.',
        'Swag is a state of mind.',
        'SWAG',
        'You asked for greatness. You got swag.',
        'Swag has been your recompense.',
        'Doctor Swag says groovy.',
        'Your level of swag is disturbing.',
        'Tastes like swag.',
        'Maybe we\'ll be mature and won\'t say swag.',
        'Swag. Swag. On you. Sitting by the fire while we\'re eating fondue.',
        'Our society needs to restablish a culture of swag.',
      ];
      let randMessage = swagMessages[Math.floor(Math.random() * swagMessages.length)];
      console.log(chalk.green('Docs generated: '  + randMessage));
    });
  });
}
