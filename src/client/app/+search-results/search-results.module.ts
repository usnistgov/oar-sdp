import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SearchResultsComponent } from './search-results.component';
import { TaxonomyListService } from '../shared/taxonomy-list/index';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [SearchResultsComponent],
    exports: [SearchResultsComponent],
    providers: [TaxonomyListService]
})

export class SearchResultsModule { }
