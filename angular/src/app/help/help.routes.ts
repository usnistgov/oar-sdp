import {Route} from '@angular/router';
import {HelpComponent} from './help.component';
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
  },
  {
    path: 'help',
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


