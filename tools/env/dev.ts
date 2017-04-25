import { EnvConfig } from './env-config.interface';

const DevConfig: EnvConfig = {
  ENV: 'DEV',
  API: 'http://10.200.94.247:8082/',
  //RMMAPI: 'http://10.200.94.247:8082/oar-rmm-service/records',
  RMMAPI:'http://testdata.nist.gov/rmm/records',
  SDPAPI: 'http://localhost:5556/#/',
  DISTAPI: 'http://localhost:8085/oar-rmm-service/records',
  METAPI:'http://localhost:8085/oar-rmm-service/records'
};

export = DevConfig;
