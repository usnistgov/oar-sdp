import { Routes } from '@angular/router';
import { AboutRoutes } from './about/about.routes';
import { HomeRoutes } from './home/home.routes';
// import { FaqRoutes } from './faq/index';
import { ApiRoutes } from './api//api.routes';
import { HelpRoutes } from './help/help.routes';
import { PolicyRoutes } from './policy/policy.routes';
import { SearchRoutes } from './search/search.routes';
// MARK: 08/21/2024: Disabled for now until rework
// import { AdvSearchRoutes } from './adv-search/adv_search.routes';

export const routes = [
  ...HomeRoutes,
  ...AboutRoutes,
  // ...FaqRoutes,
  ...ApiRoutes,
  ...SearchRoutes,
  // MARK: 08/21/2024: Disabled for now until rework
  // ...AdvSearchRoutes,
  ...PolicyRoutes,
  ...HelpRoutes
];
