import { NgModule,Inject,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DatacartComponent } from '../datacart/datacart.component';


import {
  DropdownModule, AccordionModule, ButtonModule, TreeTableModule, PanelMenuModule, MenuItem, TreeNode, AutoCompleteModule,
  MessagesModule, MultiSelectModule, DataTableModule, DataListModule, ContextMenuModule,
  MenuModule, OverlayPanelModule, FieldsetModule, PanelModule, DialogModule, ProgressSpinnerModule
} from 'primeng/primeng';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CartService} from './cart.service';


@NgModule({
  imports: [CommonModule, AccordionModule,AutoCompleteModule,MessagesModule,MultiSelectModule,
    DropdownModule,DataTableModule, DataListModule,TreeTableModule, PanelMenuModule,DialogModule,
    ContextMenuModule,MenuModule,OverlayPanelModule,
    FieldsetModule, PanelModule,BrowserAnimationsModule, FormsModule,ProgressSpinnerModule, ButtonModule],
  declarations: [DatacartComponent ],
  exports: [DatacartComponent],
  providers: [CartService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA]

})

export class DatacartModule { }
