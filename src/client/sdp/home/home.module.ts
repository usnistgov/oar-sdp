import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { DropdownModule } from 'primeng/primeng';


@NgModule({
    imports: [CommonModule, SharedModule,DropdownModule],
    declarations: [HomeComponent],
    exports: [HomeComponent]
 })

export class HomeModule { }
