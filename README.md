Jenkins Overview Dashboard
============

A easy-to-use [Jenkins](http://jenkins-ci.org/) dashboard that provides some visibility on job statuses. Ideal for TV dashboards you can put up in the office.

![Example Dashboard](https://raw.githubusercontent.com/arcturial/jenkins-dash/master/example.jpg "Example Dashboard")

This example was generated off the public [NodeJS Jenkins server](http://jenkins.nodejs.org).

It keeps a "top 8" view of all Jobs in the queue and changes their priority based on their status and current progress.

## Usage

1. Run `npm install` to install any required dependencies.
2. Modify the `config.js` file to include the Jenkins servers you want to monitor.
3. Start the application by running `npm start`

## Making modifications

The dashboard uses [Gulp.js](http://gulpjs.com/) to manage assets and templates, any modification you make you need to change in the `asset` directory. In order for the assets to be compiled, you can run `gulp` or `node_modules/gulp/bin/gulp.js`. The default `gulp` command includes a `watch` operation that will compile any assets if a file in the `asset` folder changes.