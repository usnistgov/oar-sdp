// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { RealModule } from '../app/real.module';
import { Config } from '../app/shared/config-service/config';

export const environment = {
    production: false,
    possiblyMockModule: RealModule,
    config_url: "assets/environment.json"
};

export const default_config: Config = {
    "SERVERBASE": "http://localhost:4000/",
    "RMMAPI": "http://localhost:4000/rmm/",
    "GACODE": "not-set",
    "APPVERSION": "debug"
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
