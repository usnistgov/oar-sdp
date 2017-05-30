import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LandingPanelComponent } from './landing.component';
import {Collaspe} from './collapse.directive';
import { DescriptionComponent } from './description.component';
import { MetadataComponent } from './metadata.component';
import { SimilarsComponent } from './similars.component';
import { FileDetailsComponent } from './filedetails.component';
import { Ng2StickyModule } from 'ng2-sticky';
import { DropdownModule, AccordionModule, TreeModule,PanelMenuModule,MenuItem, TreeNode, AutoCompleteModule,
  MessagesModule, MultiSelectModule, DataTableModule, DataListModule,
  MenuModule,OverlayPanelModule } from 'primeng/primeng';

import { BrowserModule,Title } from '@angular/platform-browser';

@NgModule({
    imports: [CommonModule, SharedModule, AccordionModule,AutoCompleteModule,MessagesModule,MultiSelectModule,
      DropdownModule,DataTableModule, DataListModule,TreeModule, PanelMenuModule,MenuModule,OverlayPanelModule,
      Ng2StickyModule],
    declarations: [LandingPanelComponent,Collaspe,MetadataComponent,SimilarsComponent,FileDetailsComponent,DescriptionComponent ],
    exports: [LandingPanelComponent],
    providers: [Title]
    
})

export class LandingModule { }
