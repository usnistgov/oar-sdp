import { join } from 'path';

import { SeedConfig } from './seed.config';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

    FONTS_DEST = `${this.APP_DEST}/fonts`;
    FONTS_SRC = [
          `${this.APP_SRC}/libs/ultima-ng-1.0.1/layout/fonts/**`
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
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
        {src: 'primeui/primeui-ng-all.min.css', inject: true},
      {src: 'primeui/primeui-ng-all.min.js', inject: 'libs'},
      {src: 'font-awesome/css/font-awesome.min.css', inject: true},

      // inject into css section

  ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      {src: `${this.APP_SRC}/assets/js/charts.min.js`, inject: true, vendor: false},
      {src: `${this.APP_SRC}/assets/js/moment.js`, inject: true, vendor: false},
      {src: `${this.APP_SRC}/assets/js/fullcalendar.js`, inject: true, vendor: false},
      {src: `${this.APP_SRC}/assets/js/quill.min.js`, inject: true, vendor: false},
      {src: `${this.APP_SRC}/assets/js/jquery.deps.js`, inject: true, vendor: false},
      {src: `${this.APP_SRC}/assets/css/main.cssjquery.deps.js`, inject: true, vendor: false},

      {src: `${this.APP_SRC}/libs/ultima-ng-1.0.2/layout/js/layout.js`, inject: true, vendor: false},
      {src: `${this.APP_SRC}/libs/ultima-ng-1.0.2/layout/js/nanoscroller.js`, inject: true, vendor: false},
      {src: `${this.APP_SRC}/libs/ultima-ng-1.0.2/layout/js/ripple.js`, inject: true, vendor: false},
      {src: `${this.APP_SRC}/libs/ultima-ng-1.0.2/layout/js/swipe.js`, inject: true, vendor: false},
      {src: `${this.APP_SRC}/libs/ultima-ng-1.0.2/theme/theme-indigo.css`, inject: true, vendor: false},
      {src: `${this.APP_SRC}/libs/ultima-ng-1.0.2/layout/css/layout-indigo.css`, inject: true, vendor: false},
      {src: `${this.APP_SRC}/libs/ultima-ng-1.0.2/layout/css/animate.css`, inject: true, vendor: false},
      {src: `${this.APP_SRC}/libs/ultima-ng-1.0.2/layout/css/layout-indigo.scss`, inject: true, vendor: false},
      {src: `${this.APP_SRC}/libs/ultima-ng-1.0.2/sass/layout/_compact.scss`, inject: true, vendor: false},
      {src: `${this.APP_SRC}/libs/ultima-ng-1.0.2/sass/layout/_utils.scss`, inject: true, vendor: false},
      {src: `${this.APP_SRC}/libs/ultima-ng-1.0.2/sass/layout/_main.scss`, inject: true, vendor: false},
      {src: `${this.APP_SRC}/libs/ultima-ng-1.0.2/sass/theme/_theme.scss`, inject: true, vendor: false}

// {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });
  }

}
