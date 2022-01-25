import { EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from '@angular/router';
export declare class Breadcrumb {
    model: MenuItem[];
    style: any;
    styleClass: string;
    home: MenuItem;
    onItemClick: EventEmitter<any>;
    itemClick(event: any, item: MenuItem): void;
    onHomeClick(event: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Breadcrumb, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<Breadcrumb, "p-breadcrumb", never, { "model": "model"; "style": "style"; "styleClass": "styleClass"; "home": "home"; }, { "onItemClick": "onItemClick"; }, never, never>;
}
export declare class BreadcrumbModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<BreadcrumbModule, [typeof Breadcrumb], [typeof ɵngcc1.CommonModule, typeof ɵngcc2.RouterModule], [typeof Breadcrumb, typeof ɵngcc2.RouterModule]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<BreadcrumbModule>;
}

//# sourceMappingURL=breadcrumb.d.ts.map