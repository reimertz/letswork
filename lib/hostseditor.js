var Promise = require('bluebird'),
    hostile = require("hostile"),
    _ = require('lodash');

function hostsEditor(mode, address) {
  var resolver = Promise.pending();

  hostile[mode]('127.0.0.1', address, function (err) {
    if (err) {
      return resolver.reject(err);
    } 
    return resolver.resolve(address);
  })

  return resolver.promise;
}

function isObject(mode, addressObject) {
  var current = Promise.resolve();
      addressArray = _.chain(addressObject)
                      .values()
                      .flatten()
                      .value();


  return Promise.all(addressArray.map(function(address) { 
    return current = current.then(function() { 
      return hostsEditor(mode, address);
    });
  }))
}

function excecuter(mode, arg) {
  if(mode !== 'set' && mode !== 'remove') Promise.reject('wrong mode:' + mode);

  if(_.isString(arg)) return hostsEditor(mode, arg)
  if(_.isObject(arg)) return isObject(mode, arg)

  else return Promise.reject('wrong type: ' + type);
}


module.exports = {
  block: function(arg){
    return excecuter('set', arg);
  },
  unblock: function(arg) {
    return excecuter('remove', arg);
  }
}