import { Route } from '@angular/router';
import { AboutComponent } from './index';

export const AboutRoutes: Route[] = [
    {
    path: 'about',
    children: [
      {
        path: '',
        component: AboutComponent
      }
    ]
  }
];
