import { ElementRef, AfterContentInit, EventEmitter, TemplateRef, QueryList, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/api";
export declare class OrganizationChartNode implements OnDestroy {
    cd: ChangeDetectorRef;
    node: TreeNode;
    root: boolean;
    first: boolean;
    last: boolean;
    chart: OrganizationChart;
    subscription: Subscription;
    constructor(chart: any, cd: ChangeDetectorRef);
    get leaf(): boolean;
    get colspan(): number;
    onNodeClick(event: Event, node: TreeNode): void;
    toggleNode(event: Event, node: TreeNode): void;
    isSelected(): boolean;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrganizationChartNode, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OrganizationChartNode, "[pOrganizationChartNode]", never, { "node": "node"; "root": "root"; "first": "first"; "last": "last"; }, {}, never, never>;
}
export declare class OrganizationChart implements AfterContentInit {
    el: ElementRef;
    cd: ChangeDetectorRef;
    value: TreeNode[];
    style: any;
    styleClass: string;
    selectionMode: string;
    preserveSpace: boolean;
    get selection(): any;
    set selection(val: any);
    selectionChange: EventEmitter<any>;
    onNodeSelect: EventEmitter<any>;
    onNodeUnselect: EventEmitter<any>;
    onNodeExpand: EventEmitter<any>;
    onNodeCollapse: EventEmitter<any>;
    templates: QueryList<any>;
    templateMap: any;
    private selectionSource;
    _selection: any;
    initialized: boolean;
    selectionSource$: import("rxjs").Observable<any>;
    constructor(el: ElementRef, cd: ChangeDetectorRef);
    get root(): TreeNode;
    ngAfterContentInit(): void;
    getTemplateForNode(node: TreeNode): TemplateRef<any>;
    onNodeClick(event: Event, node: TreeNode): void;
    findIndexInSelection(node: TreeNode): number;
    isSelected(node: TreeNode): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrganizationChart, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OrganizationChart, "p-organizationChart", never, { "value": "value"; "style": "style"; "styleClass": "styleClass"; "selectionMode": "selectionMode"; "preserveSpace": "preserveSpace"; "selection": "selection"; }, { "selectionChange": "selectionChange"; "onNodeSelect": "onNodeSelect"; "onNodeUnselect": "onNodeUnselect"; "onNodeExpand": "onNodeExpand"; "onNodeCollapse": "onNodeCollapse"; }, ["templates"], never>;
}
export declare class OrganizationChartModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<OrganizationChartModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<OrganizationChartModule, [typeof OrganizationChart, typeof OrganizationChartNode], [typeof i1.CommonModule], [typeof OrganizationChart, typeof i2.SharedModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<OrganizationChartModule>;
}
