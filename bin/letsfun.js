#!/usr/bin/env node
"use strict";

var _ = require('lodash'),
    chalk = require("chalk"),
    
    blockables = require('../blockables'),
    args = require('minimist')(process.argv.slice(2)),
    
    hostsEditor = require('../lib/hostseditor'),
    argumentHandler = require('../lib/argumenthandler');

argumentHandler.check(args);

var blacklist = [],
		addressesToUnBlock = [];

args._.forEach(function(item){
  if(blockables[item]) {
    delete blockables[item];
    blacklist.push(item);
  }
});

_.forIn(blockables, function(blockable, key) {
  addressesToUnBlock = addressesToUnBlock.concat(blockable.addresses);
  
});

hostsEditor.unblock(addressesToUnBlock)
.then(function(result){
	if(blacklist.length > 0) {
		console.log(chalk.green('unblocked everything except ') + chalk.red(blacklist.join(', '))); 
	} else {
		console.log(chalk.green('You are free again!'));	
	}
  
})
.error(function(err){
  console.log('something went wrong...');
})