import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './index';
import { HomeHeadbarComponent } from '../shared/homeheadbar/index';
import { TopBarComponent } from '../app.topbar.component';


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
        component: TopBarComponent,
        outlet: 'route1'
      }
    ]
  }
];
