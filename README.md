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
libraries and create the deployable apps

```bash
git clone https://github.com/usnistgov/oar-sdp.git   # Retrieve from GitHub
cd oar-sdp
npm update         # Not necessary unless you have built this package previously
npm install        # Install required modules
npm install gulp
nodejs node_modules/gulp/bin/gulp build.bundle.rxjs

npm run build.prod.aot -- --app pdr     # to build the PDR Landing Page Service
npm run build.prod.aot -- --app sdp     # to build the SDP
npm run build.docs                      # to build the API documentation
```

The build products are written under the `dist/prod` directory.

# Running Unit and End-to-end Tests

Once the app prerequisites are installed (as described in the previous
section), unit and end-to-end (e2e) tests can be run.  Unit tests run
completely non-interactively; however, e2e tests run by launching and
displaying a browser.

_Note that both unit and e2e tests require that Chrome be installed_
(see prerequisites above).

To run unit tests, type the following:

```bash
npm test
```

If all tests pass, the output will display the following:
```

```

An analysis of test coverage can be done after the unit tests via:
```bash
npm run serve.coverage
```

To run the e2e tests, one needs to first build the full application
and then launch the app through `npm`'s internal server.  Afteward,
the tests can be executed:

```bash
npm run build.prod.aot -- --app pdr     # build the app (pdr)
npm run serve.e2e -- --app pdr          # launch the server
npm run e2e                             # run the tests
```

*Note*:  to make sure e2e tests run properly, do not chage the RMM and LANDING variable values (urls) in the 'env.js'. Once you ready to use application with actual data change those to point to proper services. For ODI project this has been taken care of at the code deploy and env.js is generated as per server requirement.

