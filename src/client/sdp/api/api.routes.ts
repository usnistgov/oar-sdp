import { Route } from '@angular/router';
import { ApiComponent } from './index';
import { SearchTopBarComponent } from '../app.searchtopbar.component';

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
        component: SearchTopBarComponent,
        outlet: 'route1'
      }
    ]
  }
];
