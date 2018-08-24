import {Route} from '@angular/router';
import {HelpComponent} from './index';
import {SearchTopBarComponent} from "../app.searchtopbar.component";


export const HelpRoutes: Route[] = [
  {
    path: 'help/:section',
    children: [
      {
        path: '',
        component: HelpComponent
      },
      {
        path: '',
        component: SearchTopBarComponent,
        outlet: 'route1'
      }
    ]
  }
];


