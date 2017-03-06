import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './index';
import { HomeHeadbarComponent } from '../shared/homeheadbar/index';
import { SearchTopBarComponent } from '../app.searchtopbar.component';


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
        component: SearchTopBarComponent,
        outlet: 'route1'
      }
    ]
  }
];
