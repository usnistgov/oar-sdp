import { ElementRef, TemplateRef, AfterContentInit, QueryList } from '@angular/core';
import { BlockableUI } from 'primeng/api';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from 'primeng/api';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Card, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<Card, "p-card", never, { "header": "header"; "subheader": "subheader"; "style": "style"; "styleClass": "styleClass"; }, {}, ["headerFacet", "footerFacet", "templates"], ["p-header", "*", "p-footer"]>;
}
export declare class CardModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<CardModule, [typeof Card], [typeof ɵngcc1.CommonModule], [typeof Card, typeof ɵngcc2.SharedModule]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<CardModule>;
}

//# sourceMappingURL=card.d.ts.map