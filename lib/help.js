var blockables = require('../blockables');

function printHelp() {
  console.log();
  console.log('Usage:   letswork              -- block all');
  console.log('         letswork <whitelist>  -- to allow certain homepages for work-related tasks ;)');
  console.log('         letswork --list --l   -- shows list of blockable homepages');
  console.log('         letswork --help --h   -- shows this help');
  
  console.log();
  console.log('Usage:   letsfun              -- unblock all');
  console.log('         letsfun <blacklist>  -- keep some blocked');
  console.log('         letsfun -h --h       -- shows this help');
  console.log();
  console.log('where  <whitelist||blacklist> is one of:');
  console.log('  '+ Object.keys(blockables));
  console.log();
  console.log('Example: letswork twitter      -- keeps twitter unblocked');
  console.log('         letsfun facebook   -- keeps facebook blocked');
}

module.exports = function(args) {
  if (args._.indexOf('help') > -1 || args.help || args.h 
    || (args.h && args.e && args.l && args.p) ) {

    printHelp();
    process.exit();

  }
}