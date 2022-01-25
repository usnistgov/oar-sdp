import { EventEmitter, ElementRef, QueryList, TemplateRef, AfterContentInit } from '@angular/core';
import { BlockableUI } from 'primeng/api';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/api";
import * as i3 from "primeng/ripple";
export declare class Panel implements AfterContentInit, BlockableUI {
    private el;
    toggleable: boolean;
    header: string;
    collapsed: boolean;
    style: any;
    styleClass: string;
    expandIcon: string;
    collapseIcon: string;
    showHeader: boolean;
    toggler: string;
    collapsedChange: EventEmitter<any>;
    onBeforeToggle: EventEmitter<any>;
    onAfterToggle: EventEmitter<any>;
    transitionOptions: string;
    footerFacet: any;
    templates: QueryList<any>;
    iconTemplate: TemplateRef<any>;
    animating: boolean;
    headerTemplate: TemplateRef<any>;
    contentTemplate: TemplateRef<any>;
    footerTemplate: TemplateRef<any>;
    id: string;
    constructor(el: ElementRef);
    ngAfterContentInit(): void;
    onHeaderClick(event: Event): void;
    onIconClick(event: Event): void;
    toggle(event: Event): boolean;
    expand(event: any): void;
    collapse(event: any): void;
    getBlockableElement(): HTMLElement;
    onToggleDone(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Panel, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Panel, "p-panel", never, { "toggleable": "toggleable"; "header": "header"; "collapsed": "collapsed"; "style": "style"; "styleClass": "styleClass"; "expandIcon": "expandIcon"; "collapseIcon": "collapseIcon"; "showHeader": "showHeader"; "toggler": "toggler"; "transitionOptions": "transitionOptions"; }, { "collapsedChange": "collapsedChange"; "onBeforeToggle": "onBeforeToggle"; "onAfterToggle": "onAfterToggle"; }, ["footerFacet", "templates"], ["p-header", "*", "p-footer"]>;
}
export declare class PanelModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<PanelModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<PanelModule, [typeof Panel], [typeof i1.CommonModule, typeof i2.SharedModule, typeof i3.RippleModule], [typeof Panel, typeof i2.SharedModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<PanelModule>;
}
