import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SearchPanelModule } from '../search-panel/search-panel.module';
import { TopicModule } from '../topic/topic.module';
import { PanelModule } from 'primeng/panel';

@NgModule({
  imports: [
    CommonModule,
    SearchPanelModule,
    TopicModule,
    PanelModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule { }
