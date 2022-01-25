import { AfterViewInit, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export declare class Ripple implements AfterViewInit, OnDestroy {
    el: ElementRef;
    zone: NgZone;
    config: PrimeNGConfig;
    constructor(el: ElementRef, zone: NgZone, config: PrimeNGConfig);
    animationListener: any;
    mouseDownListener: any;
    ngAfterViewInit(): void;
    onMouseDown(event: MouseEvent): void;
    getInk(): any;
    resetInk(): void;
    onAnimationEnd(event: any): void;
    create(): void;
    remove(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Ripple, [null, null, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<Ripple, "[pRipple]", never, {}, {}, never>;
}
export declare class RippleModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<RippleModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RippleModule, [typeof Ripple], [typeof i1.CommonModule], [typeof Ripple]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RippleModule>;
}
