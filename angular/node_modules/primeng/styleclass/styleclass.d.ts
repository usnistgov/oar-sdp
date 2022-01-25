import { ElementRef, Renderer2, OnDestroy, AfterViewInit } from '@angular/core';
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
}
export declare class StyleClassModule {
}
