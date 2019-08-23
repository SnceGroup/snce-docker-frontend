var execCommand = require('../helper/exec-command');

var command = 'npm run imagemin && npm run svg-sprite';
execCommand(command);