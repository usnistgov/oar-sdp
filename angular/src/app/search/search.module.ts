import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SearchPanelComponent } from './search.component';
import { ReadMoreComponent } from './search.readmorecomponent';
import { HttpModule } from '@angular/http';

import { TaxonomyListService } from '../shared/taxonomy-list/index';
import { SearchfieldsListService } from '../shared/searchfields-list/index';
import { SearchQueryService } from '../shared/search-query/index';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import {
  DropdownModule, AccordionModule, TreeModule, PanelMenuModule, AutoCompleteModule,
  MessagesModule,MessageModule, DialogModule, InputTextareaModule, ProgressSpinnerModule, InputTextModule, MultiSelectModule, DataTableModule, DataListModule,  OverlayPanelModule, CheckboxModule, TooltipModule
} from 'primeng/primeng';

@NgModule({
    imports: [HttpModule,CommonModule, SharedModule, AccordionModule,AutoCompleteModule,MessagesModule,MessageModule, MultiSelectModule,
      DropdownModule,DataTableModule, DataListModule,TreeModule, DialogModule, InputTextModule, PanelMenuModule, OverlayPanelModule, CheckboxModule, TooltipModule, ProgressSpinnerModule, NgxPaginationModule,InputTextareaModule],
    declarations: [SearchPanelComponent,ReadMoreComponent],
    exports: [SearchPanelComponent,ReadMoreComponent],
    providers: [TaxonomyListService, SearchfieldsListService, SearchQueryService ]
})

export class SearchModule { }
