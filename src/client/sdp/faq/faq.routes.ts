import { Route } from '@angular/router';
import { FaqComponent } from './index';
import { SearchTopBarComponent } from '../app.searchtopbar.component';


export const FaqRoutes: Route[] = [
  {
    path: 'faq',
    children: [
      {
        path: '',
        component: FaqComponent
      },
      {
        path: '',
        component: SearchTopBarComponent,
        outlet: 'route1'
      }
    ]
  }
];
