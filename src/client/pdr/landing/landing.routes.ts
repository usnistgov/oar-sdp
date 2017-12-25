import { Routes, RouterModule } from '@angular/router';
import { HeadbarComponent } from '../shared/headbar/index';
import { LandingPanelComponent } from './index';
import { NoidComponent } from './noid.component';
import { NerdmComponent } from './nerdm.component';
import { SearchResolve } from './search-service.resolve';
export const LandingRoutes: Routes = [
  {
    path: 'id/:id',
    children: [
      {
        path: '',
        component: LandingPanelComponent,
        resolve: {
          searchService: SearchResolve
        }
      }
    ]
  },{
    path: 'id/ark:/88434/:id',
    children: [
      {
        path: '',
        component: LandingPanelComponent,
        resolve: {
          searchService: SearchResolve
        }
      }
    ]
  },{
    path: 'id',
    children: [
      {
        path: '',
        component: NoidComponent,

      }
    ]
  }
  ,{
    path: 'nerdm',
    children: [
      {
        path: '',
        component: NerdmComponent
      }
    ]
  }
];
