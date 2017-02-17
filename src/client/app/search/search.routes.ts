import { Routes, RouterModule } from '@angular/router';
import { SearchPanelComponent } from './index';
import { HeadbarComponent } from '../shared/headbar/index';
import { SearchTopBarComponent } from '../app.searchtopbar.component';


export const SearchRoutes: Routes = [
  {
    path: 'search',
    children: [
      {
        path: '',
        component: SearchPanelComponent
      },
      {
        path: '',
        component: SearchTopBarComponent,
        outlet: 'route1'
      }
    ]
  },
  {
    path: 'search/:id',
    children: [
      {
        path: '',
        component: SearchPanelComponent
      },
      {
        path: '',
        component: SearchTopBarComponent,
        outlet: 'route1'
      }
    ]
  }
];
