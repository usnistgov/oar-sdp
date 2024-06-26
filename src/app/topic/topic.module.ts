import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicComponent } from './topic.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardModule } from 'primeng/card';
@NgModule({
  declarations: [TopicComponent],
  imports: [
    CommonModule, NgbModule, CardModule
  ],
  exports: [TopicComponent]
})
export class TopicModule { }
