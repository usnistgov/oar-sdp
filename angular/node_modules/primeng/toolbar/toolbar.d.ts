import { ElementRef, AfterContentInit, QueryList, TemplateRef } from '@angular/core';
import { BlockableUI } from 'primeng/api';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
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
    static ɵfac: i0.ɵɵFactoryDeclaration<Toolbar, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Toolbar, "p-toolbar", never, { "style": "style"; "styleClass": "styleClass"; }, {}, ["templates"], ["*"]>;
}
export declare class ToolbarModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ToolbarModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ToolbarModule, [typeof Toolbar], [typeof i1.CommonModule], [typeof Toolbar]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ToolbarModule>;
}
