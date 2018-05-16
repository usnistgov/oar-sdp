import { NgModule,Inject,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { LandingPanelComponent } from './landing.component';
import { DescriptionComponent } from './description.component';
import { MetadataComponent } from './metadata.component';
import { FileDetailsComponent } from './filedetails.component';
import { Ng2StickyModule } from 'ng2-sticky';
import { Collaspe } from './collapse.directive';
import { SanitizeHtmlDirective } from './sanitizeHtml.directive';
import { KeyValuePipe } from './keyvalue.pipe';
import { MetadataView } from './metadataview.component';
import { NoidComponent } from './noid.component';
import { NerdmComponent } from './nerdm.component';
import { ErrorComponent,UserErrorComponent } from './error.component';
import { SearchService } from '../shared/search-service/index';
import { SearchResolve } from './search-service.resolve';

import { DropdownModule, AccordionModule, TreeModule,PanelMenuModule,MenuItem, TreeNode, AutoCompleteModule,
  MessagesModule, MultiSelectModule, DataTableModule, DataListModule,ContextMenuModule,
  MenuModule,OverlayPanelModule, FieldsetModule, PanelModule ,DialogModule} from 'primeng/primeng';

import { BrowserModule,Title,DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports: [CommonModule, SharedModule, AccordionModule,AutoCompleteModule,MessagesModule,MultiSelectModule,
    DropdownModule,DataTableModule, DataListModule,TreeModule, PanelMenuModule,DialogModule,
    ContextMenuModule,MenuModule,OverlayPanelModule,
    Ng2StickyModule, FieldsetModule, PanelModule,BrowserAnimationsModule, FormsModule],
  declarations: [LandingPanelComponent,Collaspe,MetadataComponent,FileDetailsComponent,
    DescriptionComponent, SanitizeHtmlDirective, KeyValuePipe, MetadataView, NoidComponent,NerdmComponent,
    ErrorComponent,UserErrorComponent ],
  exports: [LandingPanelComponent],
  providers: [Title, SearchService,SearchResolve
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA]

})

export class LandingModule { }

