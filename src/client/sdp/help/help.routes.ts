import { Route } from '@angular/router';
import { HelpComponent } from './index';
import { HeadbarComponent } from '../shared/headbar/index';
import { SearchTopBarComponent } from '../app.searchtopbar.component';


export const HelpRoutes: Route[] = [
  {
    path: 'help',
    children: [
      {
        path: '',
        component: HelpComponent,
      },
      {
        path: '',
        component: SearchTopBarComponent,
        outlet: 'route1'
      }
    ]
  }
];
