import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SearchPanelComponent } from './search.component';
import { ReadMoreComponent } from './search.readmorecomponent';

import { TaxonomyListService } from '../shared/taxonomy-list/index';
import { SearchFieldsListService } from '../shared/searchfields-list/index';
import { DropdownModule, AccordionModule, TreeModule,PanelMenuModule,MenuItem, TreeNode, AutoCompleteModule,
  MessagesModule, MultiSelectModule, DataTableModule, DataListModule } from 'primeng/primeng';


@NgModule({
    imports: [CommonModule, SharedModule, AccordionModule,AutoCompleteModule,MessagesModule,MultiSelectModule,
      DropdownModule,DataTableModule, DataListModule,TreeModule, PanelMenuModule],
    declarations: [SearchPanelComponent,ReadMoreComponent],
    exports: [SearchPanelComponent,ReadMoreComponent],
    providers: [TaxonomyListService, SearchFieldsListService]
})

export class SearchModule { }
