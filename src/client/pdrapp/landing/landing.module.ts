import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LandingPanelComponent } from './landing.component';
import {Collaspe} from './collapse.directive';

import { DropdownModule, AccordionModule, TreeModule,PanelMenuModule,MenuItem, TreeNode, AutoCompleteModule,
  MessagesModule, MultiSelectModule, DataTableModule, DataListModule,MenuModule } from 'primeng/primeng';


@NgModule({
    imports: [CommonModule, SharedModule, AccordionModule,AutoCompleteModule,MessagesModule,MultiSelectModule,
      DropdownModule,DataTableModule, DataListModule,TreeModule, PanelMenuModule,MenuModule],
    declarations: [LandingPanelComponent,Collaspe],
    exports: [LandingPanelComponent],
    providers: []
    
})

export class LandingModule { }
