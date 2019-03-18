import { Route } from '@angular/router';
import { PolicyComponent } from './policy.component';
import { SearchTopBarComponent } from '../app.searchtopbar.component';


export const PolicyRoutes: Route[] = [
  {
    path: 'policy',
    children: [
      {
        path: '',
        component: PolicyComponent,
      },
      {
        path: '',
        component: SearchTopBarComponent,
        outlet: 'route1'
      }
    ]
  }
];
