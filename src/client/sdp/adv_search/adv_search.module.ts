import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdvSearchComponent } from './adv_search.component';
import { DropdownModule } from 'primeng/primeng';
import { SearchQueryService } from '../shared/search-query/index';



@NgModule({
    imports: [CommonModule, SharedModule,DropdownModule],
    declarations: [AdvSearchComponent],
    exports: [AdvSearchComponent],
    providers: [ SearchQueryService ]

})

export class AdvSearchModule { }
