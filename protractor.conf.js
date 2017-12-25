const config = {
  baseUrl: 'http://localhost:5555/',

  specs: [
    './dist/e2e/**/*.e2e-spec.js'
  ],

  exclude: [],

  // 'jasmine' by default will use the latest jasmine framework
  framework: 'jasmine',

  // allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    // showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    // defaultTimeoutInterval: 400000
  },

  directConnect: true,

  multicapabilities: [{
    browserName: 'chrome',
    chromeOptions: {
      args: ["--headless", "--disable-gpu", "--window-size=800x600" ,
      "--disable-web-security","--user-data-dir=~/.e2e-chrome-profile"]
     }
  }],

  onPrepare: function () {
    browser.ignoreSynchronization = false;
  },

};

// if (process.env.TRAVIS) {
//   config.multicapabilities.push({
//     browserName: 'firefox'
//   });
// }

exports.config = config;
