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


var whitelist = [],
    addressesToBlock = [];

args._.forEach(function(item){
  if (blockables[item]) {
    delete blockables[item];
    whitelist.push(item);
  }
});

_.forIn(blockables, function(blockable, key) {
  addressesToBlock = addressesToBlock.concat(blockable.addresses);
  
});

hostsEditor.block(addressesToBlock)
.then(function(result){
  if (whitelist.length > 0) {
    console.log(chalk.red('blocked everything except ' + chalk.green(whitelist.join(', ')))); 
  } 
  else {
    console.log(chalk.red('Now, let\'s work!'));  
  }
  
})
.error(function(err){
  console.log('something went wrong...');
})