import { AfterViewInit, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Ripple, [null, null, { optional: true; }]>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<Ripple, "[pRipple]", never, {}, {}, never>;
}
export declare class RippleModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<RippleModule, [typeof Ripple], [typeof ɵngcc1.CommonModule], [typeof Ripple]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<RippleModule>;
}

//# sourceMappingURL=ripple.d.ts.map