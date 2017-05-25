import { EnvConfig } from './env-config.interface';

const DevConfig: EnvConfig = {
  ENV: 'DEV',
  RMMAPI: 'http://testdata.nist.gov/rmm/',
  SDPAPI: 'http://testdata.nist.gov/sdp/',
  PDRAPI: 'http://testdata.nist.gov/pdr/',
  DISTAPI: 'http://testdata.nist.gov/oar-dist-service/',
  METAPI: 'http://testdata.nist.gov/meta/'
};

export = DevConfig;