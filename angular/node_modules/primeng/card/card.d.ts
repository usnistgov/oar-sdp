import { ElementRef, TemplateRef, AfterContentInit, QueryList } from '@angular/core';
import { BlockableUI } from 'primeng/api';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/api";
export declare class Card implements AfterContentInit, BlockableUI {
    private el;
    header: string;
    subheader: string;
    style: any;
    styleClass: string;
    headerFacet: any;
    footerFacet: any;
    templates: QueryList<any>;
    headerTemplate: TemplateRef<any>;
    titleTemplate: TemplateRef<any>;
    subtitleTemplate: TemplateRef<any>;
    contentTemplate: TemplateRef<any>;
    footerTemplate: TemplateRef<any>;
    constructor(el: ElementRef);
    ngAfterContentInit(): void;
    getBlockableElement(): HTMLElement;
    static ɵfac: i0.ɵɵFactoryDeclaration<Card, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Card, "p-card", never, { "header": "header"; "subheader": "subheader"; "style": "style"; "styleClass": "styleClass"; }, {}, ["headerFacet", "footerFacet", "templates"], ["p-header", "*", "p-footer"]>;
}
export declare class CardModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<CardModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CardModule, [typeof Card], [typeof i1.CommonModule], [typeof Card, typeof i2.SharedModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CardModule>;
}
