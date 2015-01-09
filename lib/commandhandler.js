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


function commandHandler(mode, arg){

  var ignoreList = {},
      resetMode = (mode === 'block') ? 'unblock' : 'block';

  args._.forEach(function(item){
    if (blockables[item]) {    
      ignoreList[item] = blockables[item];

      delete blockables[item];
    }
  });

  hostsEditor[resetMode](ignoreList).then(function(){
    hostsEditor[mode](blockables).then(function(){

      if (Object.keys(ignoreList).length > 0) {
        var firstColor = (mode === 'block') ? 'red' : 'green',
            secondColor = (firstColor === 'red') ? 'green' : 'red';

        console.log(chalk[firstColor](mode + 'ed everything except ' + chalk[secondColor](Object.keys(ignoreList).join(', ')))); 
      } 
      else if (mode === 'block'){
        console.log(chalk.red('Lets work!'));  
      }  
      else {
        console.log(chalk.green('Free at last!'));  
      }    
    })
  })
  .error(function(err){
    console.log('something went wrong...');
  });
  
}


function excecuter(mode, arg) {
  if(mode !== 'letsfun' && mode !== 'letswork') Promise.reject('wrong mode:' + mode);

  return commandHandler((mode === 'letswork') ? 'block' : 'unblock', arg);

}


module.exports = {
  letsfun: function(arg){
    return excecuter('letsfun', arg);
  },
  letswork: function(arg) {
    return excecuter('letswork', arg);
  }
}