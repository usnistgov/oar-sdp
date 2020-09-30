import { Routes, RouterModule } from '@angular/router';
import { AdvSearchComponent } from './adv-search.component';
import {CanDeactivateGuard} from '../can-deactivate/can-deactivate.guard';

export const AdvSearchRoutes: Routes = [

  {
    path: 'advanced',
    children: [
      {
        path: '',
        component: AdvSearchComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];
