import { Route } from '@angular/router';
import { PolicyComponent } from './policy.component';

export const PolicyRoutes: Route[] = [
  {
    path: 'policy',
    children: [
      {
        path: '',
        component: PolicyComponent,
      }
    ]
  }
];
