import {Route} from '@angular/router';
import {HelpComponent} from './help.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

export const HelpRoutes: Route[] = [
  {
    path: 'help/:section',
    children: [
      {
        path: '',
        component: ContactUsComponent
      }
    ]
  },
  {
    path: 'help',
    children: [
      {
        path: '',
        component: ContactUsComponent
      }
    ]
  },
  {
    path: 'help',
    component: ContactUsComponent
  },
  {
    path: 'contactus',
    component: ContactUsComponent
  }
];


