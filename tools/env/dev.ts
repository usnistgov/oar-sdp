import { EnvConfig } from './env-config.interface';

const DevConfig: EnvConfig = {
  ENV: 'DEV',
  RMMAPI: 'https://oardev.nist.gov/rmm/',
  SDPAPI: 'https://oardev.nist.gov/sdp/',
  PDRAPI: 'https://oardev.nist.gov/od/id/',
  DISTAPI: 'https://oardev.nist.gov/od/',
  METAPI: 'http://datapubtest.nist.gov/midas/',
  LANDING: 'external'
};

export = DevConfig;
