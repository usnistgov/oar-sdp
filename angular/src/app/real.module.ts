import { NgModule } from '@angular/core';
import { SEARCH_SERVICE } from './shared/search-service';
import { RealSearchService } from './shared/search-service/search-service.service.real';

@NgModule({
  providers: [
    { provide: SEARCH_SERVICE, useClass: RealSearchService }
  ]
})
export class RealModule {

}