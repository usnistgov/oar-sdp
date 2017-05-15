import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LandingPanelComponent } from './landing.component';
import {Collaspe} from './collapse.directive';
import { MetadataComponent } from './metadata.component';
import { SimilarsComponent } from './similars.component';
import { DropdownModule, AccordionModule, TreeModule,PanelMenuModule,MenuItem, TreeNode, AutoCompleteModule,
  MessagesModule, MultiSelectModule, DataTableModule, DataListModule,MenuModule } from 'primeng/primeng';

import { BrowserModule,Title } from '@angular/platform-browser';



@NgModule({
    imports: [CommonModule, SharedModule, AccordionModule,AutoCompleteModule,MessagesModule,MultiSelectModule,
      DropdownModule,DataTableModule, DataListModule,TreeModule, PanelMenuModule,MenuModule],
    declarations: [LandingPanelComponent,Collaspe,MetadataComponent,SimilarsComponent ],
    exports: [LandingPanelComponent],
    providers: [Title]
    
})

export class LandingModule { }
