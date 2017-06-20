import { Routes, RouterModule } from '@angular/router';
import { HeadbarComponent } from '../shared/headbar/index';
import { LandingPanelComponent } from './index';


export const LandingRoutes: Routes = [
  {
    path: ':id',
    children: [
      {
        path: '',
        component: LandingPanelComponent
      }
    ]
  },{
    path: '',
    children: [
      {
        path: '',
        component: LandingPanelComponent
      }
    ]
  }
];
