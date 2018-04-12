import { Routes, RouterModule } from '@angular/router';
import { HeadbarComponent } from '../shared/headbar/index';
import { DatacartComponent } from '../datacart/datacart.component';
export const DatacartRoutes: Routes = [
  {
    path: 'datacart',
    children: [
      {
        path: '',
        component: DatacartComponent
      }
    ]
  }
];
