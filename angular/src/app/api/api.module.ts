import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiComponent } from './api.component';
import { PanelModule } from 'primeng/panel';
import { BreadcrumbModule } from 'primeng/breadcrumb'
import { ButtonModule } from 'primeng/button';
@NgModule({
    imports: [CommonModule, PanelModule, BreadcrumbModule, ButtonModule],
    declarations: [ApiComponent],
    exports: [ApiComponent]
})

export class ApiModule { }
