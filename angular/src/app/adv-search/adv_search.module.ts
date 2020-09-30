import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdvSearchComponent } from './adv-search.component';
import { DropdownModule, DataTableModule, PanelModule, ConfirmDialogModule, ConfirmationService, MessageModule, FileUploadModule, InputTextModule } from 'primeng/primeng';
import { SearchQueryService } from '../shared/search-query/index';
import { SearchPanelModule } from '../search-panel/search-panel.module';

@NgModule({
    imports: [
      CommonModule, 
      SharedModule,
      DropdownModule, 
      DataTableModule, 
      PanelModule,
      ConfirmDialogModule, 
      FileUploadModule, 
      InputTextModule, 
      MessageModule,
      SearchPanelModule],
    declarations: [AdvSearchComponent],
    exports: [AdvSearchComponent],
    providers: [ SearchQueryService,ConfirmationService ]

})

export class AdvSearchModule { }
