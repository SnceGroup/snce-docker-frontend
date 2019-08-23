const buildFolder = require('../helper').getBuildRootFolder();
const fs = require('fs');
const glob = require('glob');
const helper = require('../helper');
const path = require('path');
var symlinkOrCopySync = require('symlink-or-copy').sync;
var isProduction = helper.isProductionBuild();
var ncp = require('ncp').ncp;

const fontDir = path.join(__dirname, '..', '..', 'src', 'fonts');
const data = path.join(fontDir, '.', '*');

helper.createBuildRootFolderIfNotAvailable();

glob(data, function (err, files) {
  if (err) {
      throw err;
  }
  if(isProduction) {
    ncp(fontDir, buildFolder +'/fonts', function (err) {
      if (err) {
        return console.error(err);
      }
      console.log('Fonts copy!');
    });
  }
  else {
    ncp(fontDir, buildFolder +'/fonts', function (err) {
      if (err) {
        return console.error(err);
      }
      console.log('Fonts copy!');
    });
  }
});