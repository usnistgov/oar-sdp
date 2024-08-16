import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicComponent } from './topic.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { Chip, ChipModule } from 'primeng/chip';
@NgModule({
  declarations: [TopicComponent],
  imports: [
    CommonModule, NgbModule, CardModule, TooltipModule, ButtonModule, ChipModule
  ],
  exports: [TopicComponent]
})
export class TopicModule { }
