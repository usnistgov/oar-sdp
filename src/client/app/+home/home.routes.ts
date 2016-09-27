import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './index';
import { HomeHeadbarComponent } from '../shared/homeheadbar/index';

export const HomeRoutes: Routes = [

  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: '',
        component: HomeHeadbarComponent,
        outlet: 'route1'
      }
    ]
  }
];
