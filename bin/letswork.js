#!/usr/bin/env node
"use strict";

var _ = require('lodash'),
    chalk = require("chalk"),

    Promise = require('bluebird'),
    hostile = require("hostile"),
    //addToHostFile = Promise.promisify(hostile.set),

    blockables = require('../blockables'),
    args = require('minimist')(process.argv.slice(2)),
    
    hostsEditor = require('../lib/hostseditor'),
    argumentHandler = require('../lib/argumenthandler');


//Check for --help --list
argumentHandler.check(args);


var whitelist = {},
    blacklist = blockables;

//check whitelisted blockables
args._.forEach(function(item){
  if (blacklist[item]) {    
    whitelist[item] = blacklist[item];
    delete blacklist[item];
  }
});

hostsEditor.block(blacklist)
  .then(hostsEditor.unblock(whitelist))
  .then(function(result){
    if (Object.keys(whitelist).length > 0) {
      console.log(chalk.red('blocked everything except ' + chalk.green(Object.keys(whitelist).join(', ')))); 
    } 
    else {
      console.log(chalk.red('Now, let\'s work!'));  
    }  
  })
  .error(function(err){
    console.log('something went wrong...');
  });
