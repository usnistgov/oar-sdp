import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPanelComponent } from './search-panel.component';
import { DataTableModule,OverlayPanelModule,DataListModule} from "primeng/primeng";
import { AutoCompleteModule } from 'primeng/primeng';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    OverlayPanelModule,
    DataListModule,
    AutoCompleteModule,
    RouterModule,
    FormsModule
  ],
  declarations: [SearchPanelComponent],
  exports: [SearchPanelComponent]
})
export class SearchPanelModule { }
