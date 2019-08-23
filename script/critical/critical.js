var critical = require('critical');
var helper = require('../helper');
const path = require('path');
var buildFolder = helper.getBuildRootFolder();
const glob = require('glob');
const fullPath = path.join(buildFolder, '', '*.html');
const criticalWidth = 1300;
const criticalHeight = 900;

glob(fullPath, function (err, files) {
  if (err) {
    throw err;
  }
  files.forEach(function(file) {
    const filename = file.split('/').pop().replace('.html', '');
    console.log("Generate critical for: " + filename);
    critical.generate({
      inline: false,
      base: buildFolder,
      src: filename + '.html',
      dest: 'css/critical/' + filename + '.css',
      width: criticalWidth,
      height: criticalHeight,
    });
  });
});