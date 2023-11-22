import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search.component';


export const SearchRoutes: Routes = [
  {
    path: 'search',
    children: [
      {
        path: '',
        component: SearchComponent,
        data: { title: 'SDP Search Result' }
      }
    ]
  }
];
