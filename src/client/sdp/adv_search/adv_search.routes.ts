import { Routes, RouterModule } from '@angular/router';
import { AdvSearchComponent } from './index';
import { HomeHeadbarComponent } from '../shared/homeheadbar/index';
import { SearchTopBarComponent } from '../app.searchtopbar.component';


export const AdvSearchRoutes: Routes = [

  {
    path: 'advanced',
    children: [
      {
        path: '',
        component: AdvSearchComponent
      },
      {
        path: '',
        component: SearchTopBarComponent,
        outlet: 'route1'
      }
    ]
  }
];
