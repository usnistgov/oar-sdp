import { Routes } from '@angular/router';
import { AboutRoutes } from './about/index';
import { HelpRoutes } from './help/index';

import { LandingRoutes } from './landing/index';

export const routes: Routes = [
...AboutRoutes,
...HelpRoutes,
...LandingRoutes
];
