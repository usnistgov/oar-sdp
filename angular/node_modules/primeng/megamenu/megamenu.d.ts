import { ElementRef, Renderer2, ChangeDetectorRef, AfterContentInit, QueryList, TemplateRef } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from '@angular/router';
import * as ɵngcc3 from 'primeng/ripple';
export declare class MegaMenu implements AfterContentInit {
    el: ElementRef;
    renderer: Renderer2;
    cd: ChangeDetectorRef;
    model: MegaMenuItem[];
    style: any;
    styleClass: string;
    orientation: string;
    autoZIndex: boolean;
    baseZIndex: number;
    templates: QueryList<any>;
    activeItem: any;
    documentClickListener: any;
    startTemplate: TemplateRef<any>;
    endTemplate: TemplateRef<any>;
    constructor(el: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef);
    ngAfterContentInit(): void;
    onCategoryMouseEnter(event: any, menuitem: MegaMenuItem): void;
    onCategoryClick(event: any, item: MenuItem | MegaMenuItem): void;
    itemClick(event: any, item: MenuItem | MegaMenuItem): void;
    getColumnClass(menuitem: MegaMenuItem): any;
    bindDocumentClickListener(): void;
    unbindDocumentClickListener(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MegaMenu, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MegaMenu, "p-megaMenu", never, { "orientation": "orientation"; "autoZIndex": "autoZIndex"; "baseZIndex": "baseZIndex"; "model": "model"; "style": "style"; "styleClass": "styleClass"; }, {}, ["templates"], ["*"]>;
}
export declare class MegaMenuModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<MegaMenuModule, [typeof MegaMenu], [typeof ɵngcc1.CommonModule, typeof ɵngcc2.RouterModule, typeof ɵngcc3.RippleModule], [typeof MegaMenu, typeof ɵngcc2.RouterModule]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<MegaMenuModule>;
}

//# sourceMappingURL=megamenu.d.ts.map