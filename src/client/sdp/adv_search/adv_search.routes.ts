import { Routes, RouterModule } from '@angular/router';
import { AdvSearchComponent } from './index';
import { SearchTopBarComponent } from '../app.searchtopbar.component';
import {CanDeactivateGuard} from '../can-deactivate/can-deactivate.guard';

export const AdvSearchRoutes: Routes = [

  {
    path: 'advanced',
    children: [
      {
        path: '',
        component: AdvSearchComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: '',
        component: SearchTopBarComponent,
        outlet: 'route1'
      }
    ]
  }
];
