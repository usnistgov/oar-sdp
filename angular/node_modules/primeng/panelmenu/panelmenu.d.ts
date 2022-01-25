import { ChangeDetectorRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from '@angular/router';
export declare class BasePanelMenuItem {
    private ref;
    constructor(ref: ChangeDetectorRef);
    handleClick(event: any, item: any): void;
}
export declare class PanelMenuSub extends BasePanelMenuItem {
    item: MenuItem;
    expanded: boolean;
    transitionOptions: string;
    root: boolean;
    constructor(ref: ChangeDetectorRef);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PanelMenuSub, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<PanelMenuSub, "p-panelMenuSub", never, { "item": "item"; "expanded": "expanded"; "transitionOptions": "transitionOptions"; "root": "root"; }, {}, never, never>;
}
export declare class PanelMenu extends BasePanelMenuItem {
    model: MenuItem[];
    style: any;
    styleClass: string;
    multiple: boolean;
    transitionOptions: string;
    animating: boolean;
    constructor(ref: ChangeDetectorRef);
    collapseAll(): void;
    handleClick(event: any, item: any): void;
    onToggleDone(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PanelMenu, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<PanelMenu, "p-panelMenu", never, { "multiple": "multiple"; "transitionOptions": "transitionOptions"; "model": "model"; "style": "style"; "styleClass": "styleClass"; }, {}, never, never>;
}
export declare class PanelMenuModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<PanelMenuModule, [typeof PanelMenu, typeof PanelMenuSub], [typeof ɵngcc1.CommonModule, typeof ɵngcc2.RouterModule], [typeof PanelMenu, typeof ɵngcc2.RouterModule]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<PanelMenuModule>;
}

//# sourceMappingURL=panelmenu.d.ts.map