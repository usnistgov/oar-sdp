import { Type, ComponentFactoryResolver, OnDestroy, ComponentRef, AfterViewInit, ChangeDetectorRef, Renderer2, NgZone, ElementRef } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { DynamicDialogContent } from './dynamicdialogcontent';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { DynamicDialogRef } from './dynamicdialog-ref';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from './dynamicdialogcontent';
import * as ɵngcc2 from '@angular/common';
export declare class DynamicDialogComponent implements AfterViewInit, OnDestroy {
    private componentFactoryResolver;
    private cd;
    renderer: Renderer2;
    config: DynamicDialogConfig;
    private dialogRef;
    zone: NgZone;
    visible: boolean;
    componentRef: ComponentRef<any>;
    mask: HTMLDivElement;
    insertionPoint: DynamicDialogContent;
    maskViewChild: ElementRef;
    childComponentType: Type<any>;
    container: HTMLDivElement;
    wrapper: HTMLElement;
    documentKeydownListener: any;
    documentEscapeListener: Function;
    maskClickListener: Function;
    transformOptions: string;
    constructor(componentFactoryResolver: ComponentFactoryResolver, cd: ChangeDetectorRef, renderer: Renderer2, config: DynamicDialogConfig, dialogRef: DynamicDialogRef, zone: NgZone);
    ngAfterViewInit(): void;
    loadChildComponent(componentType: Type<any>): void;
    moveOnTop(): void;
    onAnimationStart(event: AnimationEvent): void;
    onAnimationEnd(event: AnimationEvent): void;
    onContainerDestroy(): void;
    close(): void;
    hide(): void;
    enableModality(): void;
    disableModality(): void;
    onKeydown(event: KeyboardEvent): void;
    focus(): void;
    bindGlobalListeners(): void;
    unbindGlobalListeners(): void;
    bindDocumentKeydownListener(): void;
    unbindDocumentKeydownListener(): void;
    bindDocumentEscapeListener(): void;
    unbindDocumentEscapeListener(): void;
    unbindMaskClickListener(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<DynamicDialogComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<DynamicDialogComponent, "p-dynamicDialog", never, {}, {}, never, never>;
}
export declare class DynamicDialogModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<DynamicDialogModule, [typeof DynamicDialogComponent, typeof ɵngcc1.DynamicDialogContent], [typeof ɵngcc2.CommonModule], never>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<DynamicDialogModule>;
}

//# sourceMappingURL=dynamicdialog.d.ts.map