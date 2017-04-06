import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdvSearchComponent } from './adv_search.component';
import { DropdownModule } from 'primeng/primeng';

@NgModule({
    imports: [CommonModule, SharedModule,DropdownModule],
    declarations: [AdvSearchComponent],
    exports: [AdvSearchComponent]
 })

export class AdvSearchModule { }
