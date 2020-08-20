import {Route} from '@angular/router';
import {HelpComponent} from './help.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

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
  },
  {
    path: 'contactus',
    component: ContactUsComponent
  }
];


