import { EnvConfig } from './env-config.interface';

const DevConfig: EnvConfig = {
  ENV: 'DEV',
  API: 'http://localhost:8082/oar-rmm-service/',
  RMMAPI: 'http://localhost:8082/oar-rmm-service/records',
  SDPAPI: 'http://10.200.222.250/'
};

export = DevConfig;
