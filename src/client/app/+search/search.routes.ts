import { Routes, RouterModule } from '@angular/router';
import {SearchPanelComponent } from './index';
import { HeadbarComponent } from '../shared/headbar/index';


export const SearchRoutes: Routes = [

  {
    path: 'search',
    children: [
      {
        path: '',
        component: SearchPanelComponent
      },
      {
        path: '',
        component: HeadbarComponent,
        outlet: 'route1'
      }
    ]
  }

];
