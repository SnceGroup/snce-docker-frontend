# Snce Docker-npm Frontend

## Requirements

 - [Node.js](https://nodejs.org) (tested with v10.10.0)

## Installation

 - Clone the repository.
 - Create `.env` file
 - Setup docker `docker-compose up -d`
 - Install dependencies: `docker/npm install`.
 - Run `docker/npm run build:prod`
 - Check on  [Localhost](http://localhost:8777)

## Commands
Available commands to execute with `docker/npm run <command>`.

### Build

| Command | Tasks | Notes |
| --- | --- | --- |
| build:css:dev | stylefmt, stylelint, scss, autoprefixer | CSS not minified. Source comments available. |
| build:css:prod | stylefmt, stylelint, scss, autoprefixer, clean-css | CSS minified. |
| build:html:dev | twig | |
| build:html:prod | twig | |
| build:images:dev | svg-sprite | Images are not minified. Folder is symlinked to build dev folder. |
| build:images:prod | imagemin, svg-sprite | |
| build:js:dev | webpack | |
| build:js:prod | webpack | |
| build:fonts:dev | symlink font to build-dev | |
| build:fonts:prod | copy fonts to build | |
| build:dev | rimraf, build:images:dev, build:css:dev, build:js:dev, build:html:dev, build:fonts:dev | Clean build dev folder and run all dev build tasks. |
| build:prod | rimraf, build:images:prod, build:css:prod, build:js:prod, build:html:prod, build:fonts:prod  | Clean build prod folder and run all prod build tasks. |
| build:critical | NODE_ENV=prod node ./script/critical/critical.js  | Generate critical css for full template. |
| s3:upload | NODE_ENV=prod node script/aws/sw3-upload.js  | Upload build folder to S3 bucket |
| release | NODE_ENV=prod node ./script/release/release.js  | Release command |


### Watch

| Command | Tasks | Notes |
| --- | --- | --- |
| watch:js | webpack | Run webpack in watch mode. |
| watch | browser-sync, build:css:dev, build:html:dev | Watch for scss and twig files changes and run relative build dev tasks. |
