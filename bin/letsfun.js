#!/usr/bin/env node
"use strict";

var args = require('minimist')(process.argv.slice(2)),
    commandHandler = require('../lib/commandhandler'),
    argumentHandler = require('../lib/argumenthandler');


//Check for --help --list
argumentHandler.check(args);

//execute letfun command
commandHandler.letsfun(args);
