import { Routes, RouterModule } from '@angular/router';
import { HeadbarComponent } from '../shared/headbar/index';
import { LandingPanelComponent } from './index';


export const LandingRoutes: Routes = [
  {
    path: 'landing',
    children: [
      {
        path: '',
        component: LandingPanelComponent
      }
    ]
  },
  {
    path: 'landing/:id',
    children: [
      {
        path: '',
        component: LandingPanelComponent
      }
    ]
  }
];
