import { Route } from '@angular/router';
import { FaqComponent } from './index';
import { HeadbarComponent } from '../shared/headbar/index';


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
        component: HeadbarComponent,
        outlet: 'route1'
      }
    ]
  	}  
];
