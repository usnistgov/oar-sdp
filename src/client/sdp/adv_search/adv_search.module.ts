import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdvSearchComponent } from './adv_search.component';
import { DropdownModule, DataTableModule, PanelModule, ConfirmDialogModule, ConfirmationService, MessageModule, FileUploadModule } from 'primeng/primeng';
import { SearchQueryService } from '../shared/search-query/index';





@NgModule({
    imports: [CommonModule, SharedModule,DropdownModule, DataTableModule, PanelModule,ConfirmDialogModule, FileUploadModule],
    declarations: [AdvSearchComponent],
    exports: [AdvSearchComponent],
    providers: [ SearchQueryService,ConfirmationService ]

})

export class AdvSearchModule { }
