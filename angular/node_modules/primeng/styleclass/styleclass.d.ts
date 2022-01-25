import { ElementRef, Renderer2, OnDestroy, AfterViewInit } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export declare class StyleClass implements AfterViewInit, OnDestroy {
    el: ElementRef;
    renderer: Renderer2;
    constructor(el: ElementRef, renderer: Renderer2);
    selector: string;
    enterClass: string;
    enterActiveClass: string;
    enterToClass: string;
    leaveClass: string;
    leaveActiveClass: string;
    leaveToClass: string;
    hideOnOutsideClick: boolean;
    toggleClass: string;
    eventListener: Function;
    documentListener: Function;
    target: HTMLElement;
    enterListener: Function;
    leaveListener: Function;
    animating: boolean;
    ngAfterViewInit(): void;
    enter(): void;
    leave(): void;
    resolveTarget(): any;
    bindDocumentListener(): void;
    unbindDocumentListener(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<StyleClass, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<StyleClass, "[pStyleClass]", never, { "selector": "pStyleClass"; "enterClass": "enterClass"; "enterActiveClass": "enterActiveClass"; "enterToClass": "enterToClass"; "leaveClass": "leaveClass"; "leaveActiveClass": "leaveActiveClass"; "leaveToClass": "leaveToClass"; "hideOnOutsideClick": "hideOnOutsideClick"; "toggleClass": "toggleClass"; }, {}, never>;
}
export declare class StyleClassModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<StyleClassModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<StyleClassModule, [typeof StyleClass], [typeof i1.CommonModule], [typeof StyleClass]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<StyleClassModule>;
}
