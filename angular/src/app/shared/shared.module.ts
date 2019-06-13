import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SearchfieldsListService } from './searchfields-list/index';
import { TaxonomyListService } from './taxonomy-list/index';
// import { SearchService } from './search-service/index';
import { FootbarComponent } from './footbar/index';
import { NameListService } from './name-list/name-list.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { InputTextModule, DropdownModule, ButtonModule, SplitButtonModule, MenubarModule,
 PanelModule, DataTableModule, DialogModule, AutoCompleteModule, MultiSelectModule,
 PaginatorModule, CalendarModule, TabViewModule } from 'primeng/primeng';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule, 
    RouterModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    SplitButtonModule,
    MenubarModule,
    PanelModule,
    DataTableModule,
    AutoCompleteModule,
    MultiSelectModule,
    PaginatorModule,
    DialogModule,
    CalendarModule,
    NgbModule.forRoot()],
  declarations: [FootbarComponent],
  providers:[],
  exports: [FootbarComponent,
    CommonModule, FormsModule, RouterModule,InputTextModule,DropdownModule,ButtonModule,
    SplitButtonModule,MenubarModule,PanelModule,DataTableModule,AutoCompleteModule,
    MultiSelectModule,PaginatorModule,DialogModule,CalendarModule,TabViewModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      // providers: [NameListService,TaxonomyListService,SearchService,SearchfieldsListService,ConfirmationDialogService]
      providers: [NameListService,TaxonomyListService,SearchfieldsListService,ConfirmationDialogService]
    };
  }
}
