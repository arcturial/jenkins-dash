Jenkins Overview Dashboard
============

A easy-to-use Jenkins dashboard that provides some visibility on job statuses. Ideal for TV dashboards you can put up in the office.

![Example Dashboard](https://raw.githubusercontent.com/arcturial/jenkins-dash/master/example.jpg "Example Dashboard")

This example was generated off the public [NodeJS Jenkins server](http://jenkins.nodejs.org).

It keeps a "top 8" view of all Jobs in the queue and changes their priority based on their status and current progress.

## Usage

First you need to modify the `config.js` file to include the path of the Jenkins servers you want to monitor (you can include multiple).

Once you have modified this file, you can start the server by running `npm start` and then redirecting your browser to the hosted location.

## Making modifications

The dashboard uses [Gulp.js](http://gulpjs.com/) to manage assets and templates, any modification you make you need to change in the `asset` directory. In order for the assets to be compiled, you can run `gulp` or `node_modules/gulp/bin/gulp.js`. The default `gulp` command includes a `watch` operation that will compile any assets if a file in the `asset` folder changes.