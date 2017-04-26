import { EnvConfig } from './env-config.interface';

const ProdConfig: EnvConfig = {
  ENV: 'PROD',
  RMMAPI: 'http://testdata.nist.gov/rmm/',
  SDPAPI: 'http://testdata.nist.gov/sdp/',
  PDRAPI: 'http://testdata.nist.gov/pdr/',
  DISTAPI: 'http://localhost:8085/oar-rmm-service/records',
  METAPI:'http://localhost:8085/oar-rmm-service/records'
};

export = ProdConfig;
