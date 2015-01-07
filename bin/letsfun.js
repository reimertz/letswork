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


var whitelist = blockables,
    blacklist = {};

//check whitelisted blockables
args._.forEach(function(item){
  if (whitelist[item]) {    
    blacklist[item] = whitelist[item];
    delete whitelist[item];
  }
});

hostsEditor.unblock(whitelist)
  .then(hostsEditor.block(blacklist))
  .then(function(result){
    if (Object.keys(blacklist).length > 0) {
      console.log(chalk.green('unblocked everything except ' + chalk.red(Object.keys(blacklist).join(', ')))); 
    } 
    else {
      console.log(chalk.red('Free at last!'));  
    }  
  })
  .error(function(err){
    console.log('something went wrong...');
  });
