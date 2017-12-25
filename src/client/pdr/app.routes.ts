import { Routes } from '@angular/router';
import { AboutRoutes } from './about/index';
import { LandingRoutes } from './landing/index';
import { DatacartRoutes } from './datacart/index';

export const routes: Routes = [
...AboutRoutes,
...LandingRoutes,
...DatacartRoutes
];
