# oar-sdp

## How to start
This git project repository consists of two different angular projects 
1. For Science data portal
2. For Public data repository landing pages 

**Note** that this seed project requires node v4.x.x or higher and npm 2.14.7 or higher.

In order to start the projects use following instructions:


```bash
git clone https://github.com/usnistgov/oar-sdp.git
cd oar-sdp
#Make sure clean cache
npm cache clean
bower cache clean
# Make sure you have updated your npm isntallations (optional)
npm update
# install the project's dependencies
npm install gulp bower
# install the project's dependencies
npm install
# api document for the app
# npm run build.docs

# building different application just give --app parameter input as below
#To build SDP
npm run build.prod.aot -- --app sdp
#To build PDR
npm run build.prod.aot -- --app pdr

#If there are issues with certain modules like rxjs and build fails
#run-script then run build again
npm run-script postinstall  

#To start individual application
npm start -- --app sdp
npm start -- --app pdr

#default app is sdp
npm start
```

Some things to remember:
This project is used along with the various ODI projects and deployed in docker env, using code deploy. The env variable setting is done in unique so as to change it even after the project is built and without changing the code itself.
 Currently all the env variables values are stored in the 'env.js' file at src/client/assets/env.js
 To make sure these env variables are read properly by apps (e.g /sdp and /pdr), they are declared in 'environment.ts' at root of each application.
 To make sure the variables in 'environment.ts' get values fron env.js, the application needs to set a path to 'env.js', which is set up in index.html of each application as below.
 <script src="assets/env.js"></script> 
 This tag reads the values at runtime.


Testing PDR or SDP application.
There are two types of tests added in the package 
1. unit/integration test
2. e2e tests.
```
1. Unit tests/integration tests:
    #to run all the unit and integration tests in applications
    npm test
    # to check the code coverage
    npm run serve.coverage

2. e2e test
    # To run end to end tests, build application first specifyling app name
    and run following command speicifying app name in multi app projects
    npm run serve.e2e -- --app pdr
    # above command will start the mock server which provides data.
    # we do not need webdriver-start for e2e as mentioned in angular-seed

    # to run tests
    # This command will run protractor which uses above mockserver.
    npm run e2e

    ##imp note: to make sure e2e tests run properly, do not chage the RMM and LANDING variable values (urls) in the 'env.js'. Once you ready to use application with actual data change those to point to proper services. For ODI project this has been taken care of at the code deploy and env.js is generated as per server requirement. We are using it through docker scripts.
```
_Does not rely on any global dependencies._
