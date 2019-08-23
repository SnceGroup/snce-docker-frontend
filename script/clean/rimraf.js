const buildFolder = require('../helper').getBuildRootFolder();
const execCommand = require('../helper/exec-command');

const command = 'rimraf '+ buildFolder;
execCommand(command);