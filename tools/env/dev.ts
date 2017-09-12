import { EnvConfig } from './env-config.interface';

const DevConfig: EnvConfig = {
  ENV: 'DEV',
  RMMAPI: 'https://testdata.nist.gov/rmm/',
  SDPAPI: 'https://testdata.nist.gov/sdp/',
  PDRAPI: 'https://testdata.nist.gov/pdr/',
  DISTAPI: 'https://testdata.nist.gov/od/',
  METAPI: 'http://datapubtest.nist.gov/midas/',
  LANDING: 'https://testdata.nist.gov/rmm/'
};

export = DevConfig;
