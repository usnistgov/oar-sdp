import { EnvConfig } from './env-config.interface';

const ProdConfig: EnvConfig = {
  ENV: 'PROD',
  RMMAPI:  'http://localhost/rmmurl/'
};

export = ProdConfig;
