import { Route } from '@angular/router';
import { ApiComponent } from './index';
import { HeadbarComponent } from '../shared/headbar/index';

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
        component: HeadbarComponent,
        outlet: 'route1'
      }
    ]
  	}
];
