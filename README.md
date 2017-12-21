# oar-sdp

This package provides two OAR web applications built on AngularJS:

1. For Science Data Portal (SDP)
2. For Public Data Repository (PDR) landing page service 

## Prerequisites

* node 4.x.x or higher
* npm 2.14.7 or higher

The `npm` tool installs all necessary prerequite Javascript
libraries.

To run unit and end-to-end (e2e) tests, one also needs to have Chrome
installed.

All prerequisites needed for building and testing can be install
automatically via the tools provided in the `docker` directory; see
the [docker/README.md](docker/README.md) file for details.  

## Building the oar-sdp apps

The SDP and PDR-LPS apps can be built by first obtaining the source
from GitHub.  `npm` is then used to install required Javascript
libraries and create the deployable apps.  You first obtains the
source code and installs the libraries:

```bash
git clone https://github.com/usnistgov/oar-sdp.git   # Retrieve from GitHub
cd oar-sdp
npm update         # Not necessary unless you have built this package previously
npm install        # Install required modules
```

To build one of the actual software products, you should next execute
one of the following commands:
```bash
npm run build.prod.aot -- --app pdr     # to build the PDR Landing Page Service
npm run build.prod.aot -- --app sdp     # to build the SDP
```

The application files are written under the `dist/prod` directory.  To
install the app, just copy the contents of `dist/prod` into a
directory that is accessible by a web server.  

Note that both commands above will overwrite files produced in
previous builds, regardless of what product is being built; thus, to
build both products, you need to execute one command, copy out the
files from the `dist/prod` directory, and then execute the build
command for the other product.  

## Running Unit and End-to-end Tests

Once the app prerequisites are installed (as described in the previous
section), unit and end-to-end (e2e) tests can be run.  Unit tests run
completely non-interactively; however, e2e tests run by launching and
displaying a browser.

_Note that both unit and e2e tests require that Chrome be installed_
(see prerequisites above).

### Unit Tests

To run unit tests, type the following:

```bash
npm test
```

If all tests pass, the output will end with the following message:
```
SUMMARY:
✔ 30 tests completed
```

If there are any failures, that same output will look something like
this:
```
SUMMARY:
✔ 28 tests completed
✖ 2 test failed

FAILED TESTS:
  Landing Component
    ✖ should return one record per landing page
...
```

__Caveats__:
* Currently an additional exception gets displayed with the message,
`Error: Could not find source map for: "dist/dev/assets/env.js"`; this
is ignorable.
* An output terminal that does not support full unicode characters may not
display the check (✔) and x (✖) characters.  

An analysis of test coverage can be done after the unit tests via:
```bash
npm run serve.coverage
```

### End-to-end (e2e) Tests

At this time, the e2e tests can only be run interactively under a (Mac
or Linux) windowing system; this is because it launches and displays a
browser to conduct its tests.  The user, however, does not need to
interact with that browser (which closes when the tests are
complete).  It also requires two terminal windows, one to launch a
server and one to actually run the tests.  

You must test the pdr and sdp apps separately.  The first step is to
build the app.  Next, you launches a "mock server"--a web server for
the app that runs on your local machine.  That is, assuming we are
testing the PDR app first, you would run in the first terminal:

```bash
npm run build.prod.aot -- --app pdr     # build the app (pdr)
npm run serve.e2e -- --app pdr          # launch the server
```

When a message appears saying, `[Browsersync] Serving files from:
dist/empty/`,  the server is ready.  You can then run the tests in a
second terminal:

```bash
npm run e2e -- --specs='./dist/e2e/specs/pdr/**/*.e2e-spec.js'
```

With this, a browser window will appear and different views of the app
will flash by as the tests are executed.  (Chrome will show a message
below the URL bar, "Chrome is being controlled by automated test
software".)  When the tests are finished (passed or failed), the
browser window will go away.  At this point, the server can be
shutdown by typing `Control-C` in the terminal where you launched it.  

To test the sdp app, run the above commands except substitute "pdr" everywhere
with "sdp".  

*Note*:  to make sure e2e tests run properly, do not chage the RMM and LANDING variable values (urls) in the 'env.js'. Once you ready to use application with actual data change those to point to proper services. For ODI project this has been taken care of at the code deploy and env.js is generated as per server requirement.

If all tests pass, the output will end with the following message:
```
......

6 specs, 0 failures
Finished in 11.985 seconds

[15:03:39] I/launcher - 0 instance(s) of WebDriver still running
[15:03:39] I/launcher - chrome #01 passed
```

If there are any failures, that same output will look something like
this:
```
F......F

Failures:
...

8 specs, 2 failures
Finished in 2.865 seconds

[15:10:03] I/launcher - 0 instance(s) of WebDriver still running
[15:10:03] I/launcher - chrome #01 failed 2 test(s)
[15:10:03] I/launcher - overall: 2 failed spec(s)
[15:10:03] E/launcher - Process exited with error code 1
...
```


## Deploying an App

The build command (described above) writes the application in the
`dist/prod` directory.  To deploy the application, the contents of
this directory should be copied into a directory used by a web server
for serving content to browsers.  Typically, the URLs configured into
the file, `dist/prod/assets/env.js` usually need to be edited before
deploying.

## Notes on running in the NIST environment

*Note:*  In NIST production, the SDP and PDR apps are normally run via
docker containers which edit the `env.js` file based on the deployment
environment.  In detail:

*  All the env variables values for sdp/pdr project, are stored in the 'env.js' file at src/client/assets/env.js

*  To make sure these env variables are read properly by apps (e.g /sdp and /pdr), they are declared in 'environment.ts' at root of each application.

*  To make sure the variables in `environment.ts` get values fron `env.js`, the application needs to set a path to `env.js`, which is set up in the `index.html` file for each application as below.
```
 <script src="assets/env.js"></script>
```
This tag causes the values to be read at runtime.

## Developing the Apps

When developing, one builds the app slightly differently and serves it
to a local browser using the `npm` development tool:

```bash
npm run build.dev.aot -- --app pdr     # to develop the PDR Landing Page Service
npm start -- --app pdr
```

Here we built the application using the `run` command argument,
"build._dev_.oat" instead of "build.prod.oat".  The `start` command
serves the application through `npm`'s built-in webserver.  To
interact with the application, use a local browser to access
"http://localhost/".  `sdp` should be substituted for `pdr` when
developing the science data portal app.

