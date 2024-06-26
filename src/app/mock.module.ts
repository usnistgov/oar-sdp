import { NgModule } from '@angular/core';
import { SEARCH_SERVICE } from './shared/search-service';
import { MockSearchService } from './shared/search-service/search-service.service.mock';

@NgModule({
  providers: [
    { provide: SEARCH_SERVICE, useClass: MockSearchService }
  ]
})
export class MockModule {

}