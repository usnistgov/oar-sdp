import { ElementRef, OnDestroy, EventEmitter, Renderer2, ChangeDetectorRef } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { ControlValueAccessor } from '@angular/forms';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
export declare const COLORPICKER_VALUE_ACCESSOR: any;
export declare class ColorPicker implements ControlValueAccessor, OnDestroy {
    el: ElementRef;
    renderer: Renderer2;
    cd: ChangeDetectorRef;
    style: any;
    styleClass: string;
    inline: boolean;
    format: string;
    appendTo: string;
    disabled: boolean;
    tabindex: string;
    inputId: string;
    autoZIndex: boolean;
    baseZIndex: number;
    showTransitionOptions: string;
    hideTransitionOptions: string;
    onChange: EventEmitter<any>;
    containerViewChild: ElementRef;
    inputViewChild: ElementRef;
    value: any;
    inputBgColor: string;
    shown: boolean;
    overlayVisible: boolean;
    defaultColor: string;
    onModelChange: Function;
    onModelTouched: Function;
    documentClickListener: Function;
    documentResizeListener: any;
    documentMousemoveListener: Function;
    documentMouseupListener: Function;
    documentHueMoveListener: Function;
    scrollHandler: any;
    selfClick: boolean;
    colorDragging: boolean;
    hueDragging: boolean;
    overlay: HTMLDivElement;
    colorSelectorViewChild: ElementRef;
    colorHandleViewChild: ElementRef;
    hueViewChild: ElementRef;
    hueHandleViewChild: ElementRef;
    constructor(el: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef);
    set colorSelector(element: ElementRef);
    set colorHandle(element: ElementRef);
    set hue(element: ElementRef);
    set hueHandle(element: ElementRef);
    onHueMousedown(event: MouseEvent): void;
    pickHue(event: MouseEvent): void;
    onColorMousedown(event: MouseEvent): void;
    pickColor(event: MouseEvent): void;
    getValueToUpdate(): any;
    updateModel(): void;
    writeValue(value: any): void;
    updateColorSelector(): void;
    updateUI(): void;
    onInputFocus(): void;
    show(): void;
    onOverlayAnimationStart(event: AnimationEvent): void;
    appendOverlay(): void;
    restoreOverlayAppend(): void;
    alignOverlay(): void;
    hide(): void;
    onInputClick(): void;
    togglePanel(): void;
    onInputKeydown(event: KeyboardEvent): void;
    onPanelClick(): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    bindDocumentClickListener(): void;
    unbindDocumentClickListener(): void;
    bindDocumentMousemoveListener(): void;
    unbindDocumentMousemoveListener(): void;
    bindDocumentMouseupListener(): void;
    unbindDocumentMouseupListener(): void;
    bindDocumentResizeListener(): void;
    unbindDocumentResizeListener(): void;
    onWindowResize(): void;
    bindScrollListener(): void;
    unbindScrollListener(): void;
    validateHSB(hsb: any): {
        h: number;
        s: number;
        b: number;
    };
    validateRGB(rgb: any): {
        r: number;
        g: number;
        b: number;
    };
    validateHEX(hex: any): any;
    HEXtoRGB(hex: any): {
        r: number;
        g: number;
        b: number;
    };
    HEXtoHSB(hex: any): {
        h: number;
        s: number;
        b: number;
    };
    RGBtoHSB(rgb: any): {
        h: number;
        s: number;
        b: number;
    };
    HSBtoRGB(hsb: any): {
        r: number;
        g: number;
        b: number;
    };
    RGBtoHEX(rgb: any): string;
    HSBtoHEX(hsb: any): string;
    onOverlayHide(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ColorPicker, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<ColorPicker, "p-colorPicker", never, { "format": "format"; "autoZIndex": "autoZIndex"; "baseZIndex": "baseZIndex"; "showTransitionOptions": "showTransitionOptions"; "hideTransitionOptions": "hideTransitionOptions"; "disabled": "disabled"; "style": "style"; "styleClass": "styleClass"; "inline": "inline"; "appendTo": "appendTo"; "tabindex": "tabindex"; "inputId": "inputId"; }, { "onChange": "onChange"; }, never, never>;
}
export declare class ColorPickerModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<ColorPickerModule, [typeof ColorPicker], [typeof ɵngcc1.CommonModule], [typeof ColorPicker]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<ColorPickerModule>;
}

//# sourceMappingURL=colorpicker.d.ts.map