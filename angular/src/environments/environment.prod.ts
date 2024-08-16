import { RealModule } from '../app/real.module';
import { Config } from '../app/shared/config-service/config';

export const environment = {
  production: true,
  possiblyMockModule: RealModule,
  config_url: "assets/environment.json"
};

export const default_config: Config = {
    "SERVERBASE": "http://localhost:5555/",
    "GACODE": "not-set",
    "APPVERSION": "not-set"
}

