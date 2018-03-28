import { join } from 'path';

import { SeedConfig } from './seed.config';

import { ExtendPackages } from './seed.config.interfaces';


/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {


  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

    FONTS_DEST = `${this.APP_DEST}/fonts`;

    FONTS_SRC = [
      `${this.APP_SRC}/libs/ultima-ng/layout/fonts/MaterialIcons**`,
      `${this.APP_SRC}/libs/font-awesome/fonts/**`,
      `${this.APP_SRC}/assets/fonts/**`,
      //'node_modules/bootstrap/dist/fonts/**'
    ];

  constructor() {
    super();
    this.APP_TITLE = '';
    this.GOOGLE_ANALYTICS_ID = 'UA-98270028-1';

      /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      {src: 'nanoscroller/bin/javascripts/jquery.nanoscroller.js', inject: 'libs'},
      {src: 'nanoscroller/bin/css/nanoscroller.css', inject: true},
      {src: 'lodash/lodash.min.js', inject: 'libs'},
      { src: 'primeng/resources/primeng.css', inject: true },
      {src: 'primeui/primeui-ng-all.min.js', inject: 'libs'},
      {src: 'jquery.auto-text-rotating/jquery.auto-text-rotating.min.js', inject: 'libs'},
      {src: 'bootstrap/dist/js/bootstrap.min.js', inject: 'libs'},
      {src: 'bootstrap/dist/css/bootstrap.css', inject: true},
      {src: 'jspdf/dist/jspdf.min.js', inject: 'libs'},
    // inject into css section
  ];


    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      {src: `${this.APP_SRC}/libs/ultima-ng/layout/js/ripple.js`, inject: true, vendor: false},
      {src: `${this.APP_SRC}/libs/ultima-ng/layout/js/nanoscroller.js`, inject: true, vendor: false},
       {src: `${this.APP_SRC}/libs/font-awesome/css/font-awesome.min.css`, inject: true, vendor: false},
      {src: `${this.APP_SRC}/css/main.css`, inject: true, vendor: false},
      {src: `${this.APP_SRC}/assets/css/uswds-sdp.css`, inject: true, vendor: false},
      {src: `${this.APP_SRC}/assets/theme/theme-indigo.css`, inject: true, vendor: false},
      {src: `${this.APP_SRC}/assets/layout/layout-indigo.css`, inject: true, vendor: false},
      {src: `${this.APP_SRC}/${this.BOOTSTRAP_DIR}/styles.layout.css`, inject: true, vendor: false},
      {src: `${this.APP_SRC}/${this.BOOTSTRAP_DIR}/styles.themes.css`, inject: true, vendor: false},





// {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    this.ROLLUP_INCLUDE_DIR = [
      ...this.ROLLUP_INCLUDE_DIR,
      //'node_modules/moment/**'
    ];

    this.ROLLUP_NAMED_EXPORTS = [
      ...this.ROLLUP_NAMED_EXPORTS,
      //{'node_modules/immutable/dist/immutable.js': [ 'Map' ]},
    ];

    // Add packages (e.g. ng2-translate)
     let additionalPackages: ExtendPackages[] = [{
       name: 'lodash',
       path: 'node_modules/lodash/lodash.js'
     },
       {
         name: 'jspdf',
         path: 'node_modules/jspdf/dist/jspdf.min.js'
       }
       ,
       {
         name: 'ng2-sticky',
         path: 'node_modules/ng2-sticky/dist/ng2-sticky.umd.js'
       },
       {
         name: 'ng2-utils',
         path: 'node_modules/ng2-utils/dist/ng2-utils.umd.js'
       },
       {
         name: 'auto-text-rotating',
         path: 'node_modules/jquery.auto-text-rotating/jquery.auto-text-rotating.min.js'
       },
       {
         name: 'primeng',
         path: 'node_modules/primeng',
         packageMeta: {
           defaultExtension: 'js'
         }
       }
     ];

    //
     this.addPackagesBundles(additionalPackages);
    /*
    // Add packages (e.g. lodash)
      let additionalPackages: ExtendPackages[] = [{
       name: 'lodash',
       path: `${this.APP_BASE}node_modules/lodash/lodash.js`,
       packageMeta: {
         main: 'index.js',
         defaultExtension: 'js'
       }
     }];

     let additionalPackages: ExtendPackages[] = [ { name: 'lodash', path:node_modules/lodash/lodash.js} ];
   this.addPackagesBundles(additionalPackages);
    */
    /* Add to or override NPM module configurations: */
    // this.PLUGIN_CONFIGS['browser-sync'] = { ghostMode: false };
  }

}
