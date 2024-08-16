import { Route } from '@angular/router';
import { AboutComponent } from './about.component';


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
