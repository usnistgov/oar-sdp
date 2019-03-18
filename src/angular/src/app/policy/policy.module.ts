import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyComponent } from './policy.component';

@NgModule({
    imports: [CommonModule],
    declarations: [PolicyComponent],
    exports: [PolicyComponent]
})

export class PolicyModule { }
