const fs = require('fs');
const path = require('path');
const async = require('async');
const AWS = require('aws-sdk');
const readdir = require('recursive-readdir');
var helper = require('../helper');
var buildFolder = helper.getBuildRootFolder();
require('dotenv').config();
const mime = require('mime-types');
const currentVersion = helper.getExecCommandOutput('cat MANIFEST').trim();
const versionId = helper.getExecCommandOutput('git rev-parse --short HEAD').trim();
const currentBranch = helper.getExecCommandOutput('git rev-parse --abbrev-ref HEAD').trim();
const timeStamp = new Date().getTime();
const { BUCKET, KEY, SECRET, BRAND } = process.env;
const rootFolder = path.resolve(__dirname, './');
const s3 = new AWS.S3({
  signatureVersion: 'v4',
  accessKeyId: KEY,
  secretAccessKey: SECRET,
});

function getFiles(dirPath) {
  return fs.existsSync(dirPath) ? readdir(dirPath) : [];
}
const releaseName = currentBranch + '-' + versionId + '-' + timeStamp;

async function deploy(upload) {
  if (!BUCKET || !KEY || !SECRET || !BRAND) {
    throw new Error('Missing data on env file. variables: [BUCKET, KEY, SECRET, BRAND]');
  }
  const filesToUpload = await getFiles(upload);
  return new Promise((resolve, reject) => {
    async.forEachOf(filesToUpload, async.asyncify(async (file) => {
      const Key = BRAND + '/' + file.replace('build/', releaseName + '/');
      console.log(`uploading: [${Key}]`);
      return new Promise((res, rej) => {
        s3.upload({
          Key,
          Bucket: BUCKET,
          Body: fs.readFileSync(file),
          CacheControl: 'max-age=0,no-cache,no-store,must-revalidate',
          ContentType: mime.lookup(file),
          ACL: 'public-read',
        }, (err) => {
          if (err) {
            return rej(new Error(err));
          }
          res({ result: true });
        });
      });
    }), (err) => {
      if (err) {
        return reject(new Error(err));
      }
      resolve({ result: true });
    });
  });
}

deploy(buildFolder)
  .then(() => {
    console.log('> Upload on S3 End');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });