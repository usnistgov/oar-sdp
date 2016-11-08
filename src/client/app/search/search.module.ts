import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SearchPanelComponent } from './search.component';
import { TaxonomyListService } from '../shared/taxonomy-list/index';
import { SearchFieldsListService } from '../shared/searchfields-list/index';
import {DropdownModule,AccordionModule,AutoCompleteModule,MessagesModule,MultiSelectModule} from 'primeng/primeng';


@NgModule({
    imports: [CommonModule, SharedModule, AccordionModule,AutoCompleteModule,MessagesModule,MultiSelectModule,DropdownModule],
    declarations: [SearchPanelComponent],
    exports: [SearchPanelComponent],
    providers: [TaxonomyListService, SearchFieldsListService]
})

export class SearchModule { }
