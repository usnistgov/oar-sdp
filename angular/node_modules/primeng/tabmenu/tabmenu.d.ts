import { QueryList, AfterContentInit, AfterViewInit, AfterViewChecked, TemplateRef, ElementRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from '@angular/router';
import * as ɵngcc3 from 'primeng/api';
import * as ɵngcc4 from 'primeng/ripple';
export declare class TabMenu implements AfterContentInit, AfterViewInit, AfterViewChecked {
    model: MenuItem[];
    activeItem: MenuItem;
    popup: boolean;
    style: any;
    styleClass: string;
    navbar: ElementRef;
    inkbar: ElementRef;
    templates: QueryList<any>;
    itemTemplate: TemplateRef<any>;
    tabChanged: boolean;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    itemClick(event: Event, item: MenuItem): void;
    updateInkBar(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<TabMenu, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<TabMenu, "p-tabMenu", never, { "activeItem": "activeItem"; "model": "model"; "popup": "popup"; "style": "style"; "styleClass": "styleClass"; }, {}, ["templates"], never>;
}
export declare class TabMenuModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<TabMenuModule, [typeof TabMenu], [typeof ɵngcc1.CommonModule, typeof ɵngcc2.RouterModule, typeof ɵngcc3.SharedModule, typeof ɵngcc4.RippleModule], [typeof TabMenu, typeof ɵngcc2.RouterModule, typeof ɵngcc3.SharedModule]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<TabMenuModule>;
}

//# sourceMappingURL=tabmenu.d.ts.map