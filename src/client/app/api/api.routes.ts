import { Route } from '@angular/router';
import { ApiComponent } from './index';
import { HeadbarComponent } from '../shared/headbar/index';
import { AppSearchTopBar } from '../app.searchtopbar.component';

export const ApiRoutes: Route[] = [
  {
    path: 'api',
    children: [
      {
        path: '',
        component: ApiComponent
      },
      {
        path: '',
        component: AppSearchTopBar,
        outlet: 'route1'
      }
    ]
  }
];
