import { Routes } from '@angular/router';
import { AboutRoutes } from './about/index';
import { HomeRoutes } from './home/index';
import { FaqRoutes } from './faq/index';
import { ApiRoutes } from './api/index';
import { CodeRepoRoutes } from './code_repo/index';
import { SearchRoutes } from './search/index';
import { AdvSearchRoutes } from './adv_search/index';


export const routes: Routes = [
...HomeRoutes,
...AboutRoutes,
...FaqRoutes,
...ApiRoutes,
...CodeRepoRoutes,
...SearchRoutes,
...AdvSearchRoutes
];
