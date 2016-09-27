import { Route } from '@angular/router';
import { AboutComponent } from './index';
import { HeadbarComponent } from '../shared/headbar/index';

export const AboutRoutes: Route[] = [
    {
    path: 'about',
    children: [
      {
        path: '',
        component: AboutComponent
      },
      {
        path: '',
        component: HeadbarComponent,
        outlet: 'route1'
      }
    ]
  }
];
