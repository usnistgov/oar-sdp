# SDP Frontend Service

This directory provides the `sdp` software product, an [Angular](https://angular.io) which provides a browser-based interface for searching and browsing NIST data products.

This software is built on the Angular framework using Angular CLI and implemented primarily in Typescript. It is currently built on Angular 6.

## Prerequisites

- [node](https://nodejs.org/en/download/) version 8.9.4 or higher (10.9 is recommended).  This provides the `npm` build tool.

All other required modules can be installed automatically via the `npm` tool (by typing `npm install` in this directory).

You may be interested these related links:
 - [Get VS Code](https://code.visualstudio.com/download) (an IDE)
 - [Angular CLI](https://github.com/angular/angular-cli) version 1.6.8.
 
## Building the app from scratch

### Downloading this repository

```bash
# clone the repo
git clone https://github.com/usnistgov/oar-sdp.git

# change directory to repo
cd oar-sdp
cd angular
```

### Building the application

The `npm` tool is used to build, test, and run the Angular application.
To install the Typescript compiler and all required Javascript modules, type:

```bash
npm install
```
This only needs to be done once, unless dependencies (recorded in the `package.json` file) change.
To build the application, type
```bash
npm run build
```
## Running the tests

To run the unit tests and the integration tests (also refered to as _e2e tests_), type, respectively:
```bash
npm test
npm e2e
```
## Running the service

_Editor's note: Need some instruction on configuring the service._

This application can run via the following command:
```bash
npm start
```
This will serve the application via a local web server; one can use a browser to interact with it by accessing URLs based at `http://localhost:5555`.

## Further information

### Libraries

 - [bootstrap](https://github.com/twbs/bootstrap) - The most popular HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web.
 - [ng-bootstrap](https://ng-bootstrap.github.io) - Angular powered Bootstrap
 - [font-awesome 5.x](https://github.com/FortAwesome/Font-Awesome) - Get vector icons and social logos on your website with Font Awesome, the web’s most popular icon set and toolkit.
 
## Developing

### Code scaffolding

Run ng `generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

