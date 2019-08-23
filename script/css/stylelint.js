var execCommand = require('../helper/exec-command');

var command = 'stylefmt -r "./src/scss/**/*.scss" && stylelint "./src/scss/**/*.scss" --syntax scss';
execCommand(command);