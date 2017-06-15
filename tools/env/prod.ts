import { EnvConfig } from './env-config.interface';

const ProdConfig: EnvConfig = {
  ENV: 'PROD',
  RMMAPI: 'https://testdata.nist.gov/rmm/',
  SDPAPI: 'https://testdata.nist.gov/sdp/',
  PDRAPI: 'https://testdata.nist.gov/pdr/',
  DISTAPI: 'https://testdata.nist.gov/od/',
  METAPI:'https://testdata.nist.gov/meta/',
  LANDING: 'internal'
};

export = ProdConfig;
