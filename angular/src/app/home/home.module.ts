import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SearchPanelModule } from '../search-panel/search-panel.module';
@NgModule({
  imports: [
    CommonModule,
    SearchPanelModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule { }
