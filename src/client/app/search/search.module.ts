import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SearchPanelComponent } from './search.component';
import { TaxonomyListService } from '../shared/taxonomy-list/index';
import {SelectItem,AccordionModule} from 'primeng/primeng';


@NgModule({
    imports: [CommonModule, SharedModule, AccordionModule],
    declarations: [SearchPanelComponent],
    exports: [SearchPanelComponent],
    providers: [TaxonomyListService]
})

export class SearchModule { }
