import { OnDestroy, EventEmitter, Renderer2, ElementRef, ChangeDetectorRef, NgZone } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { AnimationEvent } from '@angular/animations';
export declare class OverlayPanel implements OnDestroy {
    el: ElementRef;
    domHandler: DomHandler;
    renderer: Renderer2;
    private cd;
    private zone;
    dismissable: boolean;
    showCloseIcon: boolean;
    style: any;
    styleClass: string;
    appendTo: any;
    autoZIndex: boolean;
    baseZIndex: number;
    showTransitionOptions: string;
    hideTransitionOptions: string;
    onShow: EventEmitter<any>;
    onHide: EventEmitter<any>;
    container: HTMLDivElement;
    visible: boolean;
    documentClickListener: any;
    selfClick: boolean;
    target: any;
    willHide: boolean;
    targetClickEvent: boolean;
    closeClick: boolean;
    documentResizeListener: any;
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer2, cd: ChangeDetectorRef, zone: NgZone);
    bindDocumentClickListener(): void;
    unbindDocumentClickListener(): void;
    toggle(event: any, target?: any): void;
    show(event: any, target?: any): void;
    hasTargetChanged(event: any, target: any): boolean;
    appendContainer(): void;
    restoreAppend(): void;
    onAnimationStart(event: AnimationEvent): void;
    hide(): void;
    onPanelClick(event: any): void;
    onCloseClick(event: any): void;
    onWindowResize(event: any): void;
    bindDocumentResizeListener(): void;
    unbindDocumentResizeListener(): void;
    onContainerDestroy(): void;
    ngOnDestroy(): void;
}
export declare class OverlayPanelModule {
}
