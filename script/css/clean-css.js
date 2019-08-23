var buildFolder = require('../helper').getBuildRootFolder();
var execCommand = require('../helper/exec-command');

var command = 'cleancss -o '+ buildFolder +'/css/* '+ buildFolder +'/css/*';
execCommand(command);