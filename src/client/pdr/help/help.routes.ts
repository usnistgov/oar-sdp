import { Route } from '@angular/router';
import { HelpComponent } from './index';

export const HelpRoutes: Route[] = [
    {
    path: 'help',
    children: [
      {
        path: '',
        component: HelpComponent
      }
    ]
  }
];
