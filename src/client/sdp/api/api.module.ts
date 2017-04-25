import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiComponent } from './api.component';
import {BreadcrumbModule,MenuItem} from 'primeng/primeng';

@NgModule({
    imports: [CommonModule],
    declarations: [ApiComponent],
    exports: [ApiComponent]
})

export class ApiModule { }
