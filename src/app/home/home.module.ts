import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SearchPanelModule } from '../search-panel/search-panel.module';
import { TopicModule } from '../topic/topic.module';


@NgModule({
  imports: [
    CommonModule,
    SearchPanelModule,
    TopicModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule { }
