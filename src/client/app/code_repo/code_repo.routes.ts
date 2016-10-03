import { Route } from '@angular/router';
import { CodeRepoComponent } from './index';
import { HeadbarComponent } from '../shared/headbar/index';


export const CodeRepoRoutes: Route[] = [

	{
    path: 'code_repo',
    children: [
      {
        path: '',
        component: CodeRepoComponent
      },
      {
        path: '',
        component: HeadbarComponent,
        outlet: 'route1'
      }
    ]
  	}
];
