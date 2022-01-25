import { EventEmitter, ElementRef, QueryList, TemplateRef, AfterContentInit } from '@angular/core';
import { BlockableUI } from 'primeng/api';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from 'primeng/api';
import * as ɵngcc3 from 'primeng/ripple';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Panel, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<Panel, "p-panel", never, { "collapsed": "collapsed"; "expandIcon": "expandIcon"; "collapseIcon": "collapseIcon"; "showHeader": "showHeader"; "toggler": "toggler"; "transitionOptions": "transitionOptions"; "toggleable": "toggleable"; "header": "header"; "style": "style"; "styleClass": "styleClass"; }, { "collapsedChange": "collapsedChange"; "onBeforeToggle": "onBeforeToggle"; "onAfterToggle": "onAfterToggle"; }, ["footerFacet", "templates"], ["p-header", "*", "p-footer"]>;
}
export declare class PanelModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<PanelModule, [typeof Panel], [typeof ɵngcc1.CommonModule, typeof ɵngcc2.SharedModule, typeof ɵngcc3.RippleModule], [typeof Panel, typeof ɵngcc2.SharedModule]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<PanelModule>;
}

//# sourceMappingURL=panel.d.ts.map