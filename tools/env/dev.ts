import { EnvConfig } from './env-config.interface';

const DevConfig: EnvConfig = {
  ENV: 'DEV',
  API: 'http://testdata.nist.gov/rmm/',
  RMMAPI: 'http://testdata.nist.gov/rmm/records',
  SDPAPI: 'http://10.200.222.250/',
  PDRAPI: 'http://testdata.nist.gov/pdr/'
};

export = DevConfig;
