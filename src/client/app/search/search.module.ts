import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SearchPanelComponent } from './search.component';
import { TaxonomyListService } from '../shared/taxonomy-list/index';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [SearchPanelComponent],
    exports: [SearchPanelComponent],
    providers: [TaxonomyListService]
})

export class SearchModule { }
