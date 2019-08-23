var helper = require('../helper');
var execCommand = require('../helper/exec-command');

const ORIGIN = '' ;

console.log("*** Frontend Release Start ***");
let currentVersion = helper.getExecCommandOutput('cat MANIFEST').trim();
console.log("> Current version: " + currentVersion);

// Upddate version
let parts = currentVersion.split(".");
parts[2] = parseInt(parts[2]) + 1;
let newVersion = parts.join('.');
const currentBranch = helper.getExecCommandOutput('git rev-parse --abbrev-ref HEAD').trim();
console.log("> Current branch: " + currentBranch);
if(currentBranch !== 'master'){
  newVersion = newVersion + '-' + currentBranch;
}
helper.getExecCommandOutput('echo ' + newVersion + ' > ./MANIFEST');
console.log("> New version: " + newVersion);

console.log("> Update repository libraries dependencies");
execCommand('npm install');
execCommand('npm run build:prod');
console.log("> Generate critical css");
execCommand('npm run build:critical');

console.log("> Upload on S3");
execCommand('npm run s3:upload');

console.log("> Tag new release");
execCommand('git checkout -b releasing');
execCommand('git add -f build MANIFEST');
execCommand('git commit -m "New "' + newVersion + '" release"');
execCommand('git tag -a ' + newVersion + ' -m "New "' + newVersion + '" release"');
execCommand('git push ' + ORIGIN + ' ' + newVersion);
execCommand('git checkout ' + currentBranch);
execCommand('git branch -D releasing');

console.log("> Update MANIFEST");
helper.getExecCommandOutput('echo ' + newVersion + ' > ./MANIFEST');
execCommand('git add MANIFEST');
execCommand('git commit -m "Updated release version"');
execCommand('git push ' + ORIGIN + ' ' + currentBranch);

console.log("*** Frontend Release End ***");

