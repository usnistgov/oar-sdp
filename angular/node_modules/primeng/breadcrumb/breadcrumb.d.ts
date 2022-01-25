import { EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
import * as i3 from "primeng/tooltip";
export declare class Breadcrumb {
    model: MenuItem[];
    style: any;
    styleClass: string;
    home: MenuItem;
    homeAriaLabel: string;
    onItemClick: EventEmitter<any>;
    itemClick(event: any, item: MenuItem): void;
    onHomeClick(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Breadcrumb, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Breadcrumb, "p-breadcrumb", never, { "model": "model"; "style": "style"; "styleClass": "styleClass"; "home": "home"; "homeAriaLabel": "homeAriaLabel"; }, { "onItemClick": "onItemClick"; }, never, never>;
}
export declare class BreadcrumbModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BreadcrumbModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BreadcrumbModule, [typeof Breadcrumb], [typeof i1.CommonModule, typeof i2.RouterModule, typeof i3.TooltipModule], [typeof Breadcrumb, typeof i2.RouterModule, typeof i3.TooltipModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BreadcrumbModule>;
}
