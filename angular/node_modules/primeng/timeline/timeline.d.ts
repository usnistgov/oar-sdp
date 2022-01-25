import { ElementRef, AfterContentInit, QueryList, TemplateRef } from '@angular/core';
import { BlockableUI } from 'primeng/api';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/api";
export declare class Timeline implements AfterContentInit, BlockableUI {
    private el;
    value: any[];
    style: any;
    styleClass: string;
    align: string;
    layout: string;
    templates: QueryList<any>;
    contentTemplate: TemplateRef<any>;
    oppositeTemplate: TemplateRef<any>;
    markerTemplate: TemplateRef<any>;
    constructor(el: ElementRef);
    getBlockableElement(): HTMLElement;
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Timeline, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Timeline, "p-timeline", never, { "value": "value"; "style": "style"; "styleClass": "styleClass"; "align": "align"; "layout": "layout"; }, {}, ["templates"], never>;
}
export declare class TimelineModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<TimelineModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<TimelineModule, [typeof Timeline], [typeof i1.CommonModule], [typeof Timeline, typeof i2.SharedModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<TimelineModule>;
}
