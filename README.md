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
# Make sure you have updated your npm isntallations 
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

#To start individual application
npm start -- --app sdp
npm start -- --app pdr

#default app is sdp
npm start
```

_Does not rely on any global dependencies._

