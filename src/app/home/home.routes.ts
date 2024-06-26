import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

export const HomeRoutes: Routes = [

  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'sdp',
        component: HomeComponent
      }
    ]
  }
];
