import { ElementRef, EventEmitter, AfterViewInit, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NgModel, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export declare class InputTextarea implements OnInit, AfterViewInit, OnDestroy {
    el: ElementRef;
    ngModel: NgModel;
    control: NgControl;
    private cd;
    autoResize: boolean;
    onResize: EventEmitter<any>;
    filled: boolean;
    cachedScrollHeight: number;
    ngModelSubscription: Subscription;
    ngControlSubscription: Subscription;
    constructor(el: ElementRef, ngModel: NgModel, control: NgControl, cd: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    onInput(e: any): void;
    updateFilledState(): void;
    onFocus(e: any): void;
    onBlur(e: any): void;
    resize(event?: Event): void;
    updateState(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<InputTextarea, [null, { optional: true; }, { optional: true; }, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<InputTextarea, "[pInputTextarea]", never, { "autoResize": "autoResize"; }, { "onResize": "onResize"; }, never>;
}
export declare class InputTextareaModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<InputTextareaModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<InputTextareaModule, [typeof InputTextarea], [typeof i1.CommonModule], [typeof InputTextarea]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<InputTextareaModule>;
}
