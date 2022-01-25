import { AfterViewInit, OnDestroy, ElementRef, ChangeDetectorRef, QueryList, TemplateRef } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
export declare class BlockUI implements AfterViewInit, OnDestroy {
    el: ElementRef;
    cd: ChangeDetectorRef;
    target: any;
    autoZIndex: boolean;
    baseZIndex: number;
    styleClass: string;
    templates: QueryList<any>;
    mask: ElementRef;
    _blocked: boolean;
    contentTemplate: TemplateRef<any>;
    constructor(el: ElementRef, cd: ChangeDetectorRef);
    get blocked(): boolean;
    set blocked(val: boolean);
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    block(): void;
    unblock(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<BlockUI, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<BlockUI, "p-blockUI", never, { "autoZIndex": "autoZIndex"; "baseZIndex": "baseZIndex"; "blocked": "blocked"; "target": "target"; "styleClass": "styleClass"; }, {}, ["templates"], ["*"]>;
}
export declare class BlockUIModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<BlockUIModule, [typeof BlockUI], [typeof ɵngcc1.CommonModule], [typeof BlockUI]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<BlockUIModule>;
}

//# sourceMappingURL=blockui.d.ts.map