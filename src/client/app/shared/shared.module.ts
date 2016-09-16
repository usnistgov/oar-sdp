import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TaxonomyListService } from './taxonomy-list/index';
import { SearchService } from './search-service/index';
import { FootbarComponent } from './footbar/index';
import { HeadbarComponent } from './headbar/index';
import { NavbarComponent } from './navbar/index';

import {InputTextModule,DropdownModule,ButtonModule,SplitButtonModule,MenubarModule,
PanelModule,DataTableModule,DialogModule,AutoCompleteModule,MultiSelectModule,
PaginatorModule,CalendarModule,TabViewModule} from 'primeng/primeng';


/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule,InputTextModule,DropdownModule,ButtonModule,
  SplitButtonModule,MenubarModule,PanelModule,DataTableModule,AutoCompleteModule,
  MultiSelectModule,PaginatorModule,DialogModule,CalendarModule],
  declarations: [HeadbarComponent, FootbarComponent, NavbarComponent],
  exports: [HeadbarComponent, FootbarComponent,NavbarComponent,
    CommonModule, FormsModule, RouterModule,InputTextModule,DropdownModule,ButtonModule,
    SplitButtonModule,MenubarModule,PanelModule,DataTableModule,AutoCompleteModule,
    MultiSelectModule,PaginatorModule,DialogModule,CalendarModule,TabViewModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [TaxonomyListService,SearchService]
    };
  }
}
