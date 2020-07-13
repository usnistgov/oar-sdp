import {Route} from '@angular/router';
import {HelpComponent} from './help.component';

export const HelpRoutes: Route[] = [
  {
    path: 'help/:section',
    children: [
      {
        path: '',
        component: HelpComponent
      }
    ]
  },
  {
    path: 'help',
    children: [
      {
        path: '',
        component: HelpComponent
      }
    ]
  },
  {
    path: 'help',
    component: HelpComponent
  }
];


