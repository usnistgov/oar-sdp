import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiComponent } from './api.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ApiComponent],
    exports: [ApiComponent]
})

export class ApiModule { }
