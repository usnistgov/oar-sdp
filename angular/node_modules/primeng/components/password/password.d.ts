import { ElementRef, OnDestroy, DoCheck, NgZone } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
export declare class Password implements OnDestroy, DoCheck {
    el: ElementRef;
    domHandler: DomHandler;
    zone: NgZone;
    promptLabel: string;
    weakLabel: string;
    mediumLabel: string;
    strongLabel: string;
    feedback: boolean;
    panel: HTMLDivElement;
    meter: any;
    info: any;
    filled: boolean;
    constructor(el: ElementRef, domHandler: DomHandler, zone: NgZone);
    ngDoCheck(): void;
    onInput(e: any): void;
    updateFilledState(): void;
    createPanel(): void;
    onFocus(e: any): void;
    onBlur(e: any): void;
    onKeyup(e: any): void;
    testStrength(str: string): number;
    normalize(x: any, y: any): number;
    readonly disabled: boolean;
    ngOnDestroy(): void;
}
export declare class PasswordModule {
}
