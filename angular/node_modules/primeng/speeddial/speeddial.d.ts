import { ElementRef, TemplateRef, AfterContentInit, QueryList, EventEmitter, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/button";
import * as i3 from "primeng/ripple";
import * as i4 from "primeng/tooltip";
import * as i5 from "@angular/router";
import * as i6 from "primeng/api";
export declare class SpeedDial implements AfterViewInit, AfterContentInit, OnDestroy {
    private el;
    cd: ChangeDetectorRef;
    id: string;
    model: any[];
    get visible(): any;
    set visible(value: any);
    style: any;
    className: string;
    direction: string;
    transitionDelay: number;
    type: string;
    radius: number;
    mask: boolean;
    disabled: boolean;
    hideOnClickOutside: boolean;
    buttonStyle: any;
    buttonClassName: string;
    maskStyle: any;
    maskClassName: string;
    showIcon: string;
    hideIcon: string;
    rotateAnimation: boolean;
    onVisibleChange: EventEmitter<any>;
    visibleChange: EventEmitter<any>;
    onClick: EventEmitter<any>;
    onShow: EventEmitter<any>;
    onHide: EventEmitter<any>;
    container: ElementRef;
    list: ElementRef;
    templates: QueryList<any>;
    buttonTemplate: TemplateRef<any>;
    isItemClicked: boolean;
    _visible: boolean;
    documentClickListener: any;
    constructor(el: ElementRef, cd: ChangeDetectorRef);
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    show(): void;
    hide(): void;
    onButtonClick(event: any): void;
    onItemClick(e: any, item: any): void;
    calculatePointStyle(index: any): {
        left: string;
        top: string;
        bottom?: undefined;
        right?: undefined;
    } | {
        left: string;
        bottom: string;
        top?: undefined;
        right?: undefined;
    } | {
        right: string;
        top: string;
        left?: undefined;
        bottom?: undefined;
    } | {
        right: string;
        bottom: string;
        left?: undefined;
        top?: undefined;
    } | {
        left?: undefined;
        top?: undefined;
        bottom?: undefined;
        right?: undefined;
    };
    calculateTransitionDelay(index: any): number;
    containerClass(): {
        [x: string]: any;
        'p-speeddial-opened': any;
        'p-disabled': boolean;
    };
    buttonClass(): {
        [x: string]: boolean;
        'p-speeddial-button p-button-rounded': boolean;
        'p-speeddial-rotate': boolean;
    };
    get buttonIconClass(): string;
    getItemStyle(index: any): {
        left: string;
        top: string;
        bottom?: undefined;
        right?: undefined;
        transitionDelay: string;
    } | {
        left: string;
        bottom: string;
        top?: undefined;
        right?: undefined;
        transitionDelay: string;
    } | {
        right: string;
        top: string;
        left?: undefined;
        bottom?: undefined;
        transitionDelay: string;
    } | {
        right: string;
        bottom: string;
        left?: undefined;
        top?: undefined;
        transitionDelay: string;
    } | {
        left?: undefined;
        top?: undefined;
        bottom?: undefined;
        right?: undefined;
        transitionDelay: string;
    };
    isClickableRouterLink(item: MenuItem): boolean;
    isOutsideClicked(event: any): boolean;
    bindDocumentClickListener(): void;
    unbindDocumentClickListener(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SpeedDial, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SpeedDial, "p-speedDial", never, { "id": "id"; "model": "model"; "visible": "visible"; "style": "style"; "className": "className"; "direction": "direction"; "transitionDelay": "transitionDelay"; "type": "type"; "radius": "radius"; "mask": "mask"; "disabled": "disabled"; "hideOnClickOutside": "hideOnClickOutside"; "buttonStyle": "buttonStyle"; "buttonClassName": "buttonClassName"; "maskStyle": "maskStyle"; "maskClassName": "maskClassName"; "showIcon": "showIcon"; "hideIcon": "hideIcon"; "rotateAnimation": "rotateAnimation"; }, { "onVisibleChange": "onVisibleChange"; "visibleChange": "visibleChange"; "onClick": "onClick"; "onShow": "onShow"; "onHide": "onHide"; }, ["templates"], never>;
}
export declare class SpeedDialModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<SpeedDialModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<SpeedDialModule, [typeof SpeedDial], [typeof i1.CommonModule, typeof i2.ButtonModule, typeof i3.RippleModule, typeof i4.TooltipModule, typeof i5.RouterModule], [typeof SpeedDial, typeof i6.SharedModule, typeof i2.ButtonModule, typeof i4.TooltipModule, typeof i5.RouterModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<SpeedDialModule>;
}
