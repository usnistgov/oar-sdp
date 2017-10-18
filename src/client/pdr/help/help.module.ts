import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HelpComponent } from './help.component';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [HelpComponent],
    exports: [HelpComponent]
})

export class HelpModule { }
