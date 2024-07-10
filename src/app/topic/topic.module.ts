import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicComponent } from './topic.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
@NgModule({
  declarations: [TopicComponent],
  imports: [
    CommonModule, NgbModule, CardModule, TooltipModule, ButtonModule
  ],
  exports: [TopicComponent]
})
export class TopicModule { }
