import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search.component';
import { ReadMoreComponent } from './search.readmorecomponent';
import { HttpClientModule } from '@angular/common/http';

import { TaxonomyListService } from '../shared/taxonomy-list/index';
import { SearchfieldsListService } from '../shared/searchfields-list/index';
import { SearchQueryService } from '../shared/search-query/index';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import {
  DropdownModule, AccordionModule, TreeModule, PanelMenuModule, AutoCompleteModule,
  MessagesModule,MessageModule, DialogModule, InputTextareaModule, ProgressSpinnerModule, InputTextModule, MultiSelectModule, DataTableModule, DataListModule,  OverlayPanelModule, CheckboxModule, TooltipModule
} from 'primeng/primeng';
import { SearchPanelModule } from '../search-panel/search-panel.module';
import { FiltersComponent } from './filters/filters.component';
import { ResultsComponent } from './results/results.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
    imports: [
      HttpClientModule,
      CommonModule, 
      SharedModule, 
      AccordionModule,
      AutoCompleteModule,
      MessagesModule,
      MessageModule, 
      MultiSelectModule,
      DropdownModule,
      DataTableModule, 
      DataListModule,
      TreeModule, 
      DialogModule, 
      InputTextModule, 
      PanelMenuModule, 
      OverlayPanelModule, 
      CheckboxModule, 
      TooltipModule, 
      ProgressSpinnerModule, 
      NgxPaginationModule,
      InputTextareaModule,
      SearchPanelModule],
    declarations: [SearchComponent,ReadMoreComponent, FiltersComponent, ResultsComponent, PaginationComponent],
    exports: [SearchComponent,ReadMoreComponent],
    providers: [TaxonomyListService, SearchfieldsListService, SearchQueryService ]
})

export class SearchModule { }
