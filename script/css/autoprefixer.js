var buildFolder = require('../helper').getBuildRootFolder();
var execCommand = require('../helper/exec-command');

var command = 'postcss --use autoprefixer --no-map -r '+ buildFolder +'/css/*.css';
execCommand(command);