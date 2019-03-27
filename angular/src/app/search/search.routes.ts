import { Routes, RouterModule } from '@angular/router';
import { SearchPanelComponent } from './search.component';
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
  }
];
