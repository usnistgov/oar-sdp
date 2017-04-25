import { EnvConfig } from './env-config.interface';

const DevConfig: EnvConfig = {
  ENV: 'DEV',
  API: 'http://testdata.nist.gov/rmm/',
  RMMAPI: 'http://testdata.nist.gov/rmm/records',
  SDPAPI: 'http://10.200.222.250/',
  PDRAPI: 'http://testdata.nist.gov/pdr/'
  DISTAPI: 'http://localhost:8085/oar-rmm-service/records',
  METAPI:'http://localhost:8085/oar-rmm-service/records'
};

export = DevConfig;
