import { EnvConfig } from './env-config.interface';

const DevConfig: EnvConfig = {
  ENV: 'DEV',
  RMMAPI: 'https://testdata.nist.gov/rmm/',
  SDPAPI: 'https://testdata.nist.gov/sdp/',
  PDRAPI: 'https://testdata.nist.gov/od/id/',
  DISTAPI: 'https://testdata.nist.gov/od/',
  METAPI: 'http://datapubtest.nist.gov/midas/',
  LANDING: 'external',
};

export = DevConfig;
