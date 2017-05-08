import { Routes } from '@angular/router';
import { AboutRoutes } from './about/index';
import { HomeRoutes } from './home/index';
import { FaqRoutes } from './faq/index';
import { ApiRoutes } from './api/index';
import { HelpRoutes } from './help/index';
import { PolicyRoutes } from './policy/index';
import { SearchRoutes } from './search/index';
import { AdvSearchRoutes } from './adv_search/index';


export const routes: Routes = [
...HomeRoutes,
...AboutRoutes,
...FaqRoutes,
...ApiRoutes,
...SearchRoutes,
...AdvSearchRoutes,
...PolicyRoutes,
...HelpRoutes,
];
