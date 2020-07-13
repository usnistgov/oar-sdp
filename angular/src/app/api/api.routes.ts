import { Route } from '@angular/router';
import { ApiComponent } from './api.component';
 
export const ApiRoutes: Route[] = [
  {
    path: 'api',
    children: [
      {
        path: '',
        component: ApiComponent
      }
    ]
  }
];
