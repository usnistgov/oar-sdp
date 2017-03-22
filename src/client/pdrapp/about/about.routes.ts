import { Route } from '@angular/router';
import { AboutComponent } from './index';
import { HeadbarComponent } from '../shared/headbar/index';
import { SearchTopBarComponent } from '../app.searchtopbar.component';


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
        component: SearchTopBarComponent,
        outlet: 'route1'
      }
    ]
  }
];
