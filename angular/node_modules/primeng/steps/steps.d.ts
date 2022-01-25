import { EventEmitter, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from '@angular/router';
export declare class Steps implements OnInit, OnDestroy {
    private router;
    private route;
    private cd;
    activeIndex: number;
    model: MenuItem[];
    readonly: boolean;
    style: any;
    styleClass: string;
    activeIndexChange: EventEmitter<any>;
    constructor(router: Router, route: ActivatedRoute, cd: ChangeDetectorRef);
    subscription: Subscription;
    ngOnInit(): void;
    itemClick(event: Event, item: MenuItem, i: number): void;
    isClickableRouterLink(item: MenuItem): boolean;
    isActive(item: MenuItem, index: number): boolean;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Steps, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<Steps, "p-steps", never, { "activeIndex": "activeIndex"; "readonly": "readonly"; "model": "model"; "style": "style"; "styleClass": "styleClass"; }, { "activeIndexChange": "activeIndexChange"; }, never, never>;
}
export declare class StepsModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<StepsModule, [typeof Steps], [typeof ɵngcc1.CommonModule, typeof ɵngcc2.RouterModule], [typeof Steps, typeof ɵngcc2.RouterModule]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<StepsModule>;
}

//# sourceMappingURL=steps.d.ts.map