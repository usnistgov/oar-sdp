import { Routes, RouterModule } from '@angular/router';
import { HeadbarComponent } from '../shared/headbar/index';
import { LandingPanelComponent } from './index';
import { NoidComponent } from './noid.component';

export const LandingRoutes: Routes = [
  {
    path: 'id/:id',
    children: [
      {
        path: '',
        component: LandingPanelComponent
      }
    ]
  },{
    path: 'id/ark:/88434/:id',
    children: [
      {
        path: '',
        component: LandingPanelComponent
      }
    ]
  },{
    path: 'id',
    children: [
      {
        path: '',
        component: NoidComponent
      }
    ]
  }
];
