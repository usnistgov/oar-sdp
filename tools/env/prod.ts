import { EnvConfig } from './env-config.interface';

const ProdConfig: EnvConfig = {
  ENV: 'PROD',
  RMMAPI: 'http://testdata.nist.gov/rmm/',
  SDPAPI: 'http://testdata.nist.gov/sdp/',
  PDRAPI: 'http://testdata.nist.gov/pdr/',
  DISTAPI: 'http://testdata.nist.gov/od/',
  METAPI:'http://testdata.nist.gov/meta/'
};

export = ProdConfig;
