import { ElementRef, AfterContentInit, QueryList, TemplateRef } from '@angular/core';
import { BlockableUI } from 'primeng/api';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
export declare class Toolbar implements AfterContentInit, BlockableUI {
    private el;
    style: any;
    styleClass: string;
    templates: QueryList<any>;
    leftTemplate: TemplateRef<any>;
    rightTemplate: TemplateRef<any>;
    constructor(el: ElementRef);
    getBlockableElement(): HTMLElement;
    ngAfterContentInit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Toolbar, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<Toolbar, "p-toolbar", never, { "style": "style"; "styleClass": "styleClass"; }, {}, ["templates"], ["*"]>;
}
export declare class ToolbarModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<ToolbarModule, [typeof Toolbar], [typeof ɵngcc1.CommonModule], [typeof Toolbar]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<ToolbarModule>;
}

//# sourceMappingURL=toolbar.d.ts.map