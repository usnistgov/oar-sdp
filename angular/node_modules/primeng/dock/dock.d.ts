import { ElementRef, TemplateRef, AfterContentInit, QueryList, ChangeDetectorRef } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
import * as i3 from "primeng/ripple";
import * as i4 from "primeng/tooltip";
import * as i5 from "primeng/api";
export declare class Dock implements AfterContentInit {
    private el;
    cd: ChangeDetectorRef;
    id: string;
    style: any;
    styleClass: string;
    model: any[];
    position: string;
    templates: QueryList<any>;
    itemTemplate: TemplateRef<any>;
    currentIndex: number;
    constructor(el: ElementRef, cd: ChangeDetectorRef);
    ngAfterContentInit(): void;
    onListMouseLeave(): void;
    onItemMouseEnter(index: any): void;
    onItemClick(e: any, item: any): void;
    get containerClass(): {
        [x: string]: boolean;
    };
    isClickableRouterLink(item: any): boolean;
    itemClass(index: any): {
        'p-dock-item': boolean;
        'p-dock-item-second-prev': boolean;
        'p-dock-item-prev': boolean;
        'p-dock-item-current': boolean;
        'p-dock-item-next': boolean;
        'p-dock-item-second-next': boolean;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<Dock, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Dock, "p-dock", never, { "id": "id"; "style": "style"; "styleClass": "styleClass"; "model": "model"; "position": "position"; }, {}, ["templates"], never>;
}
export declare class DockModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<DockModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<DockModule, [typeof Dock], [typeof i1.CommonModule, typeof i2.RouterModule, typeof i3.RippleModule, typeof i4.TooltipModule], [typeof Dock, typeof i5.SharedModule, typeof i4.TooltipModule, typeof i2.RouterModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<DockModule>;
}
