import { EventEmitter, ElementRef, AfterContentInit, QueryList, TemplateRef } from '@angular/core';
import { BlockableUI } from 'primeng/api';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from 'primeng/ripple';
import * as ɵngcc3 from 'primeng/api';
export declare class Fieldset implements AfterContentInit, BlockableUI {
    private el;
    legend: string;
    toggleable: boolean;
    collapsed: boolean;
    collapsedChange: EventEmitter<any>;
    onBeforeToggle: EventEmitter<any>;
    onAfterToggle: EventEmitter<any>;
    style: any;
    styleClass: string;
    transitionOptions: string;
    templates: QueryList<any>;
    animating: boolean;
    headerTemplate: TemplateRef<any>;
    contentTemplate: TemplateRef<any>;
    constructor(el: ElementRef);
    id: string;
    ngAfterContentInit(): void;
    toggle(event: any): boolean;
    expand(event: any): void;
    collapse(event: any): void;
    getBlockableElement(): HTMLElement;
    onToggleDone(event: Event): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Fieldset, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<Fieldset, "p-fieldset", never, { "collapsed": "collapsed"; "transitionOptions": "transitionOptions"; "legend": "legend"; "toggleable": "toggleable"; "style": "style"; "styleClass": "styleClass"; }, { "collapsedChange": "collapsedChange"; "onBeforeToggle": "onBeforeToggle"; "onAfterToggle": "onAfterToggle"; }, ["templates"], ["p-header", "*"]>;
}
export declare class FieldsetModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<FieldsetModule, [typeof Fieldset], [typeof ɵngcc1.CommonModule, typeof ɵngcc2.RippleModule], [typeof Fieldset, typeof ɵngcc3.SharedModule]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<FieldsetModule>;
}

//# sourceMappingURL=fieldset.d.ts.map