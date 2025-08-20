import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SearchPanelModule } from '../search-panel/search-panel.module';
import { TopicModule } from '../topic/topic.module';
import { PanelModule } from 'primeng/panel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SearchPanelModule,
    SelectButtonModule,  // Fixed: added missing comma here
    TopicModule,
    PanelModule,
    FormsModule         // Added: required for ngModel binding
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule { }