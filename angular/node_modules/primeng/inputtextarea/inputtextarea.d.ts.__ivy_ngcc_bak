import { ElementRef, EventEmitter, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { NgModel, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
export declare class InputTextarea implements OnInit, AfterViewInit, OnDestroy {
    el: ElementRef;
    ngModel: NgModel;
    control: NgControl;
    autoResize: boolean;
    onResize: EventEmitter<any>;
    filled: boolean;
    cachedScrollHeight: number;
    ngModelSubscription: Subscription;
    ngControlSubscription: Subscription;
    constructor(el: ElementRef, ngModel: NgModel, control: NgControl);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    onInput(e: any): void;
    updateFilledState(): void;
    onFocus(e: any): void;
    onBlur(e: any): void;
    resize(event?: Event): void;
    updateState(): void;
    ngOnDestroy(): void;
}
export declare class InputTextareaModule {
}
