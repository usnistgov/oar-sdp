import { ElementRef, DoCheck, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export declare class InputText implements DoCheck, AfterViewInit {
    el: ElementRef;
    ngModel: NgModel;
    private cd;
    filled: boolean;
    constructor(el: ElementRef, ngModel: NgModel, cd: ChangeDetectorRef);
    ngAfterViewInit(): void;
    ngDoCheck(): void;
    onInput(e: any): void;
    updateFilledState(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<InputText, [null, { optional: true; }, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<InputText, "[pInputText]", never, {}, {}, never>;
}
export declare class InputTextModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<InputTextModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<InputTextModule, [typeof InputText], [typeof i1.CommonModule], [typeof InputText]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<InputTextModule>;
}
