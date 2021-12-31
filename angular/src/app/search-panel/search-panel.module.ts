import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPanelComponent } from './search-panel.component';
import { OverlayPanelModule} from 'primeng';
import { AutoCompleteModule } from 'primeng';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    OverlayPanelModule,
    AutoCompleteModule,
    RouterModule,
    FormsModule
  ],
  declarations: [SearchPanelComponent],
  exports: [SearchPanelComponent]
})
export class SearchPanelModule { }
