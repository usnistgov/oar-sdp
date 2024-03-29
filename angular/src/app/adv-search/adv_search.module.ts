import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdvSearchComponent } from './adv-search.component';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SearchQueryService } from '../shared/search-query/index';
import { SearchPanelModule } from '../search-panel/search-panel.module';
import { ConfirmService } from '../shared/confirm/confirm.service';
// import { ConfirmationComponent } from '../shared/confirm/confirmation/confirmation.component';

@NgModule({
    imports: [
      CommonModule, 
      SharedModule,
      DropdownModule, 
      PanelModule,
      ConfirmDialogModule, 
      FileUploadModule, 
      InputTextModule, 
      MessageModule,
      SearchPanelModule,
      OverlayPanelModule],
    declarations: [AdvSearchComponent],
    exports: [AdvSearchComponent],
    providers: [ SearchQueryService,ConfirmationService,ConfirmService ]

})

export class AdvSearchModule { }
