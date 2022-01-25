import { OnInit, OnDestroy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { PrimeNGConfig } from 'primeng/api';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export declare class ScrollTop implements OnInit, OnDestroy {
    el: ElementRef;
    private cd;
    config: PrimeNGConfig;
    styleClass: string;
    style: any;
    target: string;
    threshold: number;
    icon: string;
    behavior: string;
    showTransitionOptions: string;
    hideTransitionOptions: string;
    scrollListener: any;
    visible: boolean;
    overlay: any;
    constructor(el: ElementRef, cd: ChangeDetectorRef, config: PrimeNGConfig);
    ngOnInit(): void;
    onClick(): void;
    onEnter(event: AnimationEvent): void;
    onLeave(event: AnimationEvent): void;
    checkVisibility(scrollY: any): void;
    bindParentScrollListener(): void;
    bindDocumentScrollListener(): void;
    unbindParentScrollListener(): void;
    unbindDocumentScrollListener(): void;
    containerClass(): {
        'p-scrolltop p-link p-component': boolean;
        'p-scrolltop-sticky': boolean;
    };
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScrollTop, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ScrollTop, "p-scrollTop", never, { "styleClass": "styleClass"; "style": "style"; "target": "target"; "threshold": "threshold"; "icon": "icon"; "behavior": "behavior"; "showTransitionOptions": "showTransitionOptions"; "hideTransitionOptions": "hideTransitionOptions"; }, {}, never, never>;
}
export declare class ScrollTopModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ScrollTopModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ScrollTopModule, [typeof ScrollTop], [typeof i1.CommonModule], [typeof ScrollTop]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ScrollTopModule>;
}
