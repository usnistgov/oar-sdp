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
      `${this.APP_SRC}/libs/ultima-ng/layout/fonts/**`,
      `${this.APP_SRC}/libs/font-awesome/fonts/**`,
    ];

  constructor() {
    super();
    this.APP_TITLE = 'NIST Science Data Portal';

      this.SYSTEM_CONFIG_DEV.paths['primeng'] =
      `${this.APP_BASE}node_modules/primeng/primeng`;

      this.SYSTEM_BUILDER_CONFIG.packages['primeng'] = {
          main: 'primeng.js',
          defaultExtension : 'js'
      };


      /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      {src: 'nanoscroller/bin/javascripts/jquery.nanoscroller.js', inject: 'libs'},
      {src: 'nanoscroller/bin/css/nanoscroller.css', inject: true},
      { src: 'primeng/resources/primeng.min.css', inject: true },
      {src: 'primeui/primeui-ng-all.min.js', inject: 'libs'},


      // inject into css section

  ];


    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      {src: `${this.APP_SRC}/assets/css/main.css`, inject: true, vendor: false},
      {src: `${this.APP_SRC}/libs/ultima-ng/layout/js/ripple.js`, inject: true, vendor: false},
      {src: `${this.APP_SRC}/libs/ultima-ng/layout/js/nanoscroller.js`, inject: true, vendor: false},
      {src: `${this.APP_SRC}/libs/ultima-ng/theme/theme-indigo.css`, inject: true, vendor: false},
      {src: `${this.APP_SRC}/libs/ultima-ng/layout/css/layout-indigo.css`, inject: true, vendor: false},
      {src: `${this.APP_SRC}/libs/font-awesome/css/font-awesome.min.css`, inject: true, vendor: false},

// {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];


    // Add packages (e.g. lodash)
      let additionalPackages: ExtendPackages[] = [{
       name: 'lodash',
       path: `${this.APP_BASE}node_modules/lodash/lodash.js`,
       packageMeta: {
         main: 'index.js',
         defaultExtension: 'js'
       }
     }];

   this.addPackagesBundles(additionalPackages);

    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });
  }

}
