import { EnvConfig } from './env-config.interface';

const ProdConfig: EnvConfig = {
  ENV: 'PROD',
  RMMAPI:  'http://localhost/rmmurl/',
  SDPAPI:  'http://localhost/sdpurl/',
  PDRAPI:  'http://localhost/pdrurl/',
  DISTAPI: 'http://localhost/disturl/',
  METAPI:  'http://localhost/metaurl/',
  LANDING: 'http://localhost/rmmurl/'
};

export = ProdConfig;
