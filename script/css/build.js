var isProduction = require('../helper').isProductionBuild();
var execCommand = require('../helper/exec-command');

var command = 'npm run scss && npm run autoprefixer';

if(isProduction) {
  command = 'npm run stylelint && npm run scss && npm run autoprefixer';
  command = command + ' && npm run clean-css';
}

execCommand(command);