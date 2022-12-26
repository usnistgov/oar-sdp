import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicComponent } from './topic.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [TopicComponent],
  imports: [
    CommonModule, NgbModule
  ],
  exports: [TopicComponent]
})
export class TopicModule { }
