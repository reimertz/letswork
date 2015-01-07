var blockables = require('../blockables');

function printList() {
  console.log();
  console.log('Blockable homepages: '+ Object.keys(blockables));
}

module.exports = function(args) {
  if (args._.indexOf('list') > -1 || args.list || args.l 
    || (args.l && args.i && args.s && args.t)) {

    printList();
    process.exit();
  }
}


