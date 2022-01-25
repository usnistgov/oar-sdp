import { EventEmitter, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
import * as i3 from "primeng/tooltip";
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
    static ɵfac: i0.ɵɵFactoryDeclaration<Steps, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Steps, "p-steps", never, { "activeIndex": "activeIndex"; "model": "model"; "readonly": "readonly"; "style": "style"; "styleClass": "styleClass"; }, { "activeIndexChange": "activeIndexChange"; }, never, never>;
}
export declare class StepsModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<StepsModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<StepsModule, [typeof Steps], [typeof i1.CommonModule, typeof i2.RouterModule, typeof i3.TooltipModule], [typeof Steps, typeof i2.RouterModule, typeof i3.TooltipModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<StepsModule>;
}
