import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SearchfieldsListService } from './searchfields-list/index';
import { TaxonomyListService } from './taxonomy-list/index';
// import { SearchService } from './search-service/index';
import { FootbarComponent } from '../frame/footbar/index';
import { NameListService } from './name-list/name-list.service';

import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PanelModule } from 'primeng/panel';
import { PaginatorModule } from 'primeng/paginator';
import { CalendarModule } from 'primeng/calendar';

import { CommonService } from './common/common.service';
import { ConfirmService } from './confirm/confirm.service';

import { ComboBoxComponent } from './combobox/combo-box.component';
import { ComboBoxPipe } from './combobox/combo-box.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmationComponent } from './confirm/confirmation/confirmation.component';

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
    AutoCompleteModule,
    MultiSelectModule,
    PaginatorModule,
    DialogModule,
    CalendarModule,
    BrowserModule,
    FormsModule],
  declarations: [FootbarComponent, ComboBoxComponent, ComboBoxPipe,ConfirmationComponent],
  providers:[CommonService, ConfirmService],
  exports: [FootbarComponent,ComboBoxComponent, ComboBoxPipe,
    CommonModule, FormsModule, RouterModule,InputTextModule,DropdownModule,ButtonModule,
    SplitButtonModule,MenubarModule,PanelModule,AutoCompleteModule,
    MultiSelectModule,PaginatorModule,DialogModule,CalendarModule,TabViewModule,ConfirmationComponent],
    entryComponents: [ ConfirmationComponent ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      // providers: [NameListService,TaxonomyListService,SearchService,SearchfieldsListService,ConfirmationDialogService]
      providers: [NameListService,TaxonomyListService,SearchfieldsListService, ConfirmService]
    };
  }
}
