import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPanelComponent } from './search-panel.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';

@NgModule({
  imports: [
    CommonModule,
    OverlayPanelModule,
    AutoCompleteModule,
    RouterModule,
    FormsModule,
    ToastModule
  ],
  declarations: [SearchPanelComponent],
  exports: [SearchPanelComponent]
})
export class SearchPanelModule { }
