var buildFolder = require('../helper').getBuildRootFolder();
var execCommand = require('../helper/exec-command');

var command = 'node-sass --output-style expanded --source-comments -o '+ buildFolder +'/css ./src/scss';
execCommand(command);