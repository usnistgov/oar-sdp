import { EnvConfig } from './env-config.interface';

const ProdConfig: EnvConfig = {
  ENV: 'PROD',
  RMMAPI: process.env.RMMURL,
  SDPAPI: process.env.SDPURL,
  PDRAPI: process.env.PDRURL,
  DISTAPI: process.env.DISTURL,
  METAPI: process.env.METAURL,
  LANDING: process.env.LANDING
};

export = ProdConfig;
