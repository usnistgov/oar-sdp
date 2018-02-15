import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SearchPanelComponent } from './search.component';
import { ReadMoreComponent } from './search.readmorecomponent';
import { HttpModule } from '@angular/http';

import { TaxonomyListService } from '../shared/taxonomy-list/index';
import { SearchFieldsListService } from '../shared/searchfields-list/index';
import {
  DropdownModule, AccordionModule, TreeModule, PanelMenuModule, AutoCompleteModule,
  MessagesModule, MultiSelectModule, DataTableModule, DataListModule,  OverlayPanelModule, CheckboxModule, TooltipModule
} from 'primeng/primeng';

@NgModule({
    imports: [HttpModule,CommonModule, SharedModule, AccordionModule,AutoCompleteModule,MessagesModule,MultiSelectModule,
      DropdownModule,DataTableModule, DataListModule,TreeModule, PanelMenuModule, OverlayPanelModule, CheckboxModule, TooltipModule],
    declarations: [SearchPanelComponent,ReadMoreComponent],
    exports: [SearchPanelComponent,ReadMoreComponent],
    providers: [TaxonomyListService, SearchFieldsListService ]
})

export class SearchModule { }
