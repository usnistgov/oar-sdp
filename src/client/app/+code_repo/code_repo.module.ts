import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeRepoComponent } from './code_repo.component';

@NgModule({
    imports: [CommonModule],
    declarations: [CodeRepoComponent],
    exports: [CodeRepoComponent]
})

export class CodeRepoModule { }
