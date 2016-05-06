#! /usr/bin/env node
'use strict';
require('babel-register');
let argv   = require('yargs').argv;
let path   = require('path');
let _      = require('lodash');
let fs     = require('fs');
let ncp    = require('ncp').ncp;
let ejs    = require('ejs');
let chalk = require('chalk');
let pjson = require('./package.json');
// Get the execution directory
let cwd = path.resolve('.');

let templateFile = fs.readFileSync(`${__dirname}/templates/index.ejs`).toString();
let template     = ejs.compile(templateFile);

let outputDir = _.trimEnd(argv.o, '/');

const generateDocs = (data, key) => {

  let html         = template({
    swagDocData: data,
    js: 'static/js/react-bundle.js',
    css: 'static/css/style.css',
  });

  // Save the doc data file
  fs.writeFile(`${cwd}/${outputDir}/${key.toLowerCase()}.html`, html , 'utf8', () => {
  });
};

if(argv.i && argv.o) {
  let inputFile = _.trimStart(argv.i, './');

  let data         = require(`${cwd}/${inputFile}`);

  data.timestamp = Date.now();
  data.version=pjson.version;

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

    // Split between multiple files if the multi flag is passed
    if(argv.multi) {
      let links = '';
      // Make individual docs pages
      for(let key in data.groups) {
        let onePageData = Object.assign({}, data);
        onePageData.groups = {};
        onePageData.groups[key] = data.groups[key];

        generateDocs(onePageData, key);
        links += `<li class="list-group-item"><a href="${key}.html"><div class="panel-heading">${key}</div></a></li>`;
      }

      // Make Index doc
      generateDocs({
        name: data.name,
        description: `${data.description}<br/><br/>This is the index page for all the documentation<br/><br/> <ul class="list-group">${links}</ul>`,
        timestamp: Date.now(),
        version: pjson.version,
      }, 'index');
    } else if(argv.group) {
    // Just do one group as opposed to everything
      let onePageData = Object.assign({}, data);
      onePageData.groups = {};
      onePageData.groups[argv.group] = data.groups[argv.group];

      generateDocs(onePageData, argv.group);
    } else {
      generateDocs(data, 'index');
    }

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
}
