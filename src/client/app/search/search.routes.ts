import { Routes, RouterModule } from '@angular/router';
import { SearchPanelComponent } from './index';
import { HeadbarComponent } from '../shared/headbar/index';
import { AppSearchTopBar } from '../app.searchtopbar.component';


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
        component: AppSearchTopBar,
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
        component: AppSearchTopBar,
        outlet: 'route1'
      }
    ]
  }
];
