import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SearchPanel } from './search.component';
import { TaxonomyListService } from '../shared/taxonomy-list/index';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [SearchPanel],
    exports: [SearchPanel],
    providers: [TaxonomyListService]
})

export class SearchModule { }
