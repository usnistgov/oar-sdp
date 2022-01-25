import { Component, ViewEncapsulation, ChangeDetectionStrategy, Inject, forwardRef, ChangeDetectorRef, Input, EventEmitter, ElementRef, Output, ContentChildren, NgModule } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { Subject } from 'rxjs';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';

const _c0 = ["pOrganizationChartNode", ""];
function OrganizationChartNode_tbody_0_div_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div");
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(ctx_r1.node.label);
} }
function OrganizationChartNode_tbody_0_div_5_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
const _c1 = function (a0) { return { $implicit: a0 }; };
function OrganizationChartNode_tbody_0_div_5_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div");
    ɵngcc0.ɵɵtemplate(1, OrganizationChartNode_tbody_0_div_5_ng_container_1_Template, 1, 0, "ng-container", 7);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r2.chart.getTemplateForNode(ctx_r2.node))("ngTemplateOutletContext", ɵngcc0.ɵɵpureFunction1(2, _c1, ctx_r2.node));
} }
const _c2 = function (a0, a1) { return { "pi-chevron-down": a0, "pi-chevron-up": a1 }; };
function OrganizationChartNode_tbody_0_a_6_Template(rf, ctx) { if (rf & 1) {
    const _r9 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "a", 8);
    ɵngcc0.ɵɵlistener("click", function OrganizationChartNode_tbody_0_a_6_Template_a_click_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r8 = ɵngcc0.ɵɵnextContext(2); return ctx_r8.toggleNode($event, ctx_r8.node); })("keydown.enter", function OrganizationChartNode_tbody_0_a_6_Template_a_keydown_enter_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r10 = ɵngcc0.ɵɵnextContext(2); return ctx_r10.toggleNode($event, ctx_r10.node); });
    ɵngcc0.ɵɵelement(1, "i", 9);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction2(1, _c2, ctx_r3.node.expanded, !ctx_r3.node.expanded));
} }
function OrganizationChartNode_tbody_0_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainerStart(0);
    ɵngcc0.ɵɵelementStart(1, "td");
    ɵngcc0.ɵɵelement(2, "div", 4);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r4 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵattribute("colspan", ctx_r4.colspan);
} }
const _c3 = function (a0) { return { "p-organizationchart-line-top": a0 }; };
function OrganizationChartNode_tbody_0_ng_container_12_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "td", 11);
    ɵngcc0.ɵɵtext(1, "\u00A0");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(2, "td", 12);
    ɵngcc0.ɵɵtext(3, "\u00A0");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const first_r13 = ctx.first;
    const last_r14 = ctx.last;
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(2, _c3, !first_r13));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(4, _c3, !last_r14));
} }
function OrganizationChartNode_tbody_0_ng_container_12_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainerStart(0);
    ɵngcc0.ɵɵtemplate(1, OrganizationChartNode_tbody_0_ng_container_12_ng_template_1_Template, 4, 6, "ng-template", 10);
    ɵngcc0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r5 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", ctx_r5.node.children);
} }
function OrganizationChartNode_tbody_0_td_14_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "td", 13);
    ɵngcc0.ɵɵelement(1, "table", 14);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const child_r15 = ctx.$implicit;
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("node", child_r15);
} }
const _c4 = function (a1, a2) { return { "p-organizationchart-node-content": true, "p-organizationchart-selectable-node": a1, "p-highlight": a2 }; };
function OrganizationChartNode_tbody_0_Template(rf, ctx) { if (rf & 1) {
    const _r17 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "tbody");
    ɵngcc0.ɵɵelementStart(1, "tr");
    ɵngcc0.ɵɵelementStart(2, "td");
    ɵngcc0.ɵɵelementStart(3, "div", 1);
    ɵngcc0.ɵɵlistener("click", function OrganizationChartNode_tbody_0_Template_div_click_3_listener($event) { ɵngcc0.ɵɵrestoreView(_r17); const ctx_r16 = ɵngcc0.ɵɵnextContext(); return ctx_r16.onNodeClick($event, ctx_r16.node); });
    ɵngcc0.ɵɵtemplate(4, OrganizationChartNode_tbody_0_div_4_Template, 2, 1, "div", 0);
    ɵngcc0.ɵɵtemplate(5, OrganizationChartNode_tbody_0_div_5_Template, 2, 4, "div", 0);
    ɵngcc0.ɵɵtemplate(6, OrganizationChartNode_tbody_0_a_6_Template, 2, 4, "a", 2);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(7, "tr", 3);
    ɵngcc0.ɵɵelementStart(8, "td");
    ɵngcc0.ɵɵelement(9, "div", 4);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(10, "tr", 3);
    ɵngcc0.ɵɵtemplate(11, OrganizationChartNode_tbody_0_ng_container_11_Template, 3, 1, "ng-container", 0);
    ɵngcc0.ɵɵtemplate(12, OrganizationChartNode_tbody_0_ng_container_12_Template, 2, 1, "ng-container", 0);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(13, "tr", 5);
    ɵngcc0.ɵɵtemplate(14, OrganizationChartNode_tbody_0_td_14_Template, 2, 1, "td", 6);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵattribute("colspan", ctx_r0.colspan);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵclassMap(ctx_r0.node.styleClass);
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction2(17, _c4, ctx_r0.chart.selectionMode && ctx_r0.node.selectable !== false, ctx_r0.isSelected()));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", !ctx_r0.chart.getTemplateForNode(ctx_r0.node));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r0.chart.getTemplateForNode(ctx_r0.node));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", !ctx_r0.leaf);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngClass", !ctx_r0.leaf && ctx_r0.node.expanded ? "p-organizationchart-node-visible" : "p-organizationchart-node-hidden")("@childState", "in");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵattribute("colspan", ctx_r0.colspan);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngClass", !ctx_r0.leaf && ctx_r0.node.expanded ? "p-organizationchart-node-visible" : "p-organizationchart-node-hidden")("@childState", "in");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r0.node.children && ctx_r0.node.children.length === 1);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r0.node.children && ctx_r0.node.children.length > 1);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngClass", !ctx_r0.leaf && ctx_r0.node.expanded ? "p-organizationchart-node-visible" : "p-organizationchart-node-hidden")("@childState", "in");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", ctx_r0.node.children);
} }
function OrganizationChart_table_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "table", 2);
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("node", ctx_r0.root);
} }
const _c5 = function (a1) { return { "p-organizationchart p-component": true, "p-organizationchart-preservespace": a1 }; };
class OrganizationChartNode {
    constructor(chart, cd) {
        this.cd = cd;
        this.chart = chart;
        this.subscription = this.chart.selectionSource$.subscribe(() => {
            this.cd.markForCheck();
        });
    }
    get leaf() {
        return this.node.leaf == false ? false : !(this.node.children && this.node.children.length);
    }
    get colspan() {
        return (this.node.children && this.node.children.length) ? this.node.children.length * 2 : null;
    }
    onNodeClick(event, node) {
        this.chart.onNodeClick(event, node);
    }
    toggleNode(event, node) {
        node.expanded = !node.expanded;
        if (node.expanded)
            this.chart.onNodeExpand.emit({ originalEvent: event, node: this.node });
        else
            this.chart.onNodeCollapse.emit({ originalEvent: event, node: this.node });
        event.preventDefault();
    }
    isSelected() {
        return this.chart.isSelected(this.node);
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
OrganizationChartNode.ɵfac = function OrganizationChartNode_Factory(t) { return new (t || OrganizationChartNode)(ɵngcc0.ɵɵdirectiveInject(forwardRef(() => OrganizationChart)), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef)); };
OrganizationChartNode.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: OrganizationChartNode, selectors: [["", "pOrganizationChartNode", ""]], inputs: { node: "node", root: "root", first: "first", last: "last" }, attrs: _c0, decls: 1, vars: 1, consts: [[4, "ngIf"], [3, "ngClass", "click"], ["tabindex", "0", "class", "p-node-toggler", 3, "click", "keydown.enter", 4, "ngIf"], [1, "p-organizationchart-lines", 3, "ngClass"], [1, "p-organizationchart-line-down"], [1, "p-organizationchart-nodes", 3, "ngClass"], ["colspan", "2", 4, "ngFor", "ngForOf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["tabindex", "0", 1, "p-node-toggler", 3, "click", "keydown.enter"], [1, "p-node-toggler-icon", "pi", 3, "ngClass"], ["ngFor", "", 3, "ngForOf"], [1, "p-organizationchart-line-left", 3, "ngClass"], [1, "p-organizationchart-line-right", 3, "ngClass"], ["colspan", "2"], ["pOrganizationChartNode", "", 1, "p-organizationchart-table", 3, "node"]], template: function OrganizationChartNode_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, OrganizationChartNode_tbody_0_Template, 15, 20, "tbody", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ctx.node);
    } }, directives: [ɵngcc1.NgIf, ɵngcc1.NgClass, ɵngcc1.NgForOf, ɵngcc1.NgTemplateOutlet, OrganizationChartNode], styles: [".p-organizationchart-table{border-collapse:separate;border-spacing:0;margin:0 auto}.p-organizationchart-table>tbody>tr>td{padding:0 .75rem;text-align:center;vertical-align:top}.p-organizationchart-node-content{display:inline-block;position:relative}.p-organizationchart-node-content .p-node-toggler{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;bottom:-.75rem;cursor:pointer;height:1.5rem;left:50%;margin-left:-.75rem;position:absolute;user-select:none;width:1.5rem;z-index:2}.p-organizationchart-node-content .p-node-toggler .p-node-toggler-icon{position:relative;top:.25rem}.p-organizationchart-line-down{height:20px;margin:0 auto;width:1px}.p-organizationchart-line-left,.p-organizationchart-line-right{border-radius:0}.p-organizationchart-selectable-node{cursor:pointer}.p-organizationchart .p-organizationchart-node-hidden{display:none}.p-organizationchart-preservespace .p-organizationchart-node-hidden{display:inherit;visibility:hidden}"], encapsulation: 2, data: { animation: [
            trigger('childState', [
                state('in', style({ opacity: 1 })),
                transition('void => *', [
                    style({ opacity: 0 }),
                    animate(150)
                ]),
                transition('* => void', [
                    animate(150, style({ opacity: 0 }))
                ])
            ])
        ] }, changeDetection: 0 });
OrganizationChartNode.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => OrganizationChart),] }] },
    { type: ChangeDetectorRef }
];
OrganizationChartNode.propDecorators = {
    node: [{ type: Input }],
    root: [{ type: Input }],
    first: [{ type: Input }],
    last: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(OrganizationChartNode, [{
        type: Component,
        args: [{
                selector: '[pOrganizationChartNode]',
                template: `
        <tbody *ngIf="node">
            <tr>
                <td [attr.colspan]="colspan">
                    <div [class]="node.styleClass" [ngClass]="{'p-organizationchart-node-content': true, 'p-organizationchart-selectable-node': chart.selectionMode && node.selectable !== false,'p-highlight':isSelected()}"
                        (click)="onNodeClick($event,node)">
                        <div *ngIf="!chart.getTemplateForNode(node)">{{node.label}}</div>
                        <div *ngIf="chart.getTemplateForNode(node)">
                            <ng-container *ngTemplateOutlet="chart.getTemplateForNode(node); context: {$implicit: node}"></ng-container>
                        </div>
                        <a *ngIf="!leaf" tabindex="0" class="p-node-toggler" (click)="toggleNode($event, node)" (keydown.enter)="toggleNode($event, node)">
                            <i class="p-node-toggler-icon pi" [ngClass]="{'pi-chevron-down': node.expanded, 'pi-chevron-up': !node.expanded}"></i>
                        </a>
                    </div>
                </td>
            </tr>
            <tr [ngClass]="!leaf&&node.expanded ? 'p-organizationchart-node-visible' : 'p-organizationchart-node-hidden'" class="p-organizationchart-lines" [@childState]="'in'">
                <td [attr.colspan]="colspan">
                    <div class="p-organizationchart-line-down"></div>
                </td>
            </tr>
            <tr [ngClass]="!leaf&&node.expanded ? 'p-organizationchart-node-visible' : 'p-organizationchart-node-hidden'" class="p-organizationchart-lines" [@childState]="'in'">
                <ng-container *ngIf="node.children && node.children.length === 1">
                    <td [attr.colspan]="colspan">
                        <div class="p-organizationchart-line-down"></div>
                    </td>
                </ng-container>
                <ng-container *ngIf="node.children && node.children.length > 1">
                    <ng-template ngFor let-child [ngForOf]="node.children" let-first="first" let-last="last">
                        <td class="p-organizationchart-line-left" [ngClass]="{'p-organizationchart-line-top':!first}">&nbsp;</td>
                        <td class="p-organizationchart-line-right" [ngClass]="{'p-organizationchart-line-top':!last}">&nbsp;</td>
                    </ng-template>
                </ng-container>
            </tr>
            <tr [ngClass]="!leaf&&node.expanded ? 'p-organizationchart-node-visible' : 'p-organizationchart-node-hidden'" class="p-organizationchart-nodes" [@childState]="'in'">
                <td *ngFor="let child of node.children" colspan="2">
                    <table class="p-organizationchart-table" pOrganizationChartNode [node]="child"></table>
                </td>
            </tr>
        </tbody>
    `,
                animations: [
                    trigger('childState', [
                        state('in', style({ opacity: 1 })),
                        transition('void => *', [
                            style({ opacity: 0 }),
                            animate(150)
                        ]),
                        transition('* => void', [
                            animate(150, style({ opacity: 0 }))
                        ])
                    ])
                ],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".p-organizationchart-table{border-collapse:separate;border-spacing:0;margin:0 auto}.p-organizationchart-table>tbody>tr>td{padding:0 .75rem;text-align:center;vertical-align:top}.p-organizationchart-node-content{display:inline-block;position:relative}.p-organizationchart-node-content .p-node-toggler{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;bottom:-.75rem;cursor:pointer;height:1.5rem;left:50%;margin-left:-.75rem;position:absolute;user-select:none;width:1.5rem;z-index:2}.p-organizationchart-node-content .p-node-toggler .p-node-toggler-icon{position:relative;top:.25rem}.p-organizationchart-line-down{height:20px;margin:0 auto;width:1px}.p-organizationchart-line-left,.p-organizationchart-line-right{border-radius:0}.p-organizationchart-selectable-node{cursor:pointer}.p-organizationchart .p-organizationchart-node-hidden{display:none}.p-organizationchart-preservespace .p-organizationchart-node-hidden{display:inherit;visibility:hidden}"]
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [forwardRef(() => OrganizationChart)]
            }] }, { type: ɵngcc0.ChangeDetectorRef }]; }, { node: [{
            type: Input
        }], root: [{
            type: Input
        }], first: [{
            type: Input
        }], last: [{
            type: Input
        }] }); })();
class OrganizationChart {
    constructor(el, cd) {
        this.el = el;
        this.cd = cd;
        this.preserveSpace = true;
        this.selectionChange = new EventEmitter();
        this.onNodeSelect = new EventEmitter();
        this.onNodeUnselect = new EventEmitter();
        this.onNodeExpand = new EventEmitter();
        this.onNodeCollapse = new EventEmitter();
        this.selectionSource = new Subject();
        this.selectionSource$ = this.selectionSource.asObservable();
    }
    get selection() {
        return this._selection;
    }
    set selection(val) {
        this._selection = val;
        if (this.initialized)
            this.selectionSource.next();
    }
    get root() {
        return this.value && this.value.length ? this.value[0] : null;
    }
    ngAfterContentInit() {
        if (this.templates.length) {
            this.templateMap = {};
        }
        this.templates.forEach((item) => {
            this.templateMap[item.getType()] = item.template;
        });
        this.initialized = true;
    }
    getTemplateForNode(node) {
        if (this.templateMap)
            return node.type ? this.templateMap[node.type] : this.templateMap['default'];
        else
            return null;
    }
    onNodeClick(event, node) {
        let eventTarget = event.target;
        if (eventTarget.className && (eventTarget.className.indexOf('p-node-toggler') !== -1 || eventTarget.className.indexOf('p-node-toggler-icon') !== -1)) {
            return;
        }
        else if (this.selectionMode) {
            if (node.selectable === false) {
                return;
            }
            let index = this.findIndexInSelection(node);
            let selected = (index >= 0);
            if (this.selectionMode === 'single') {
                if (selected) {
                    this.selection = null;
                    this.onNodeUnselect.emit({ originalEvent: event, node: node });
                }
                else {
                    this.selection = node;
                    this.onNodeSelect.emit({ originalEvent: event, node: node });
                }
            }
            else if (this.selectionMode === 'multiple') {
                if (selected) {
                    this.selection = this.selection.filter((val, i) => i != index);
                    this.onNodeUnselect.emit({ originalEvent: event, node: node });
                }
                else {
                    this.selection = [...this.selection || [], node];
                    this.onNodeSelect.emit({ originalEvent: event, node: node });
                }
            }
            this.selectionChange.emit(this.selection);
            this.selectionSource.next();
        }
    }
    findIndexInSelection(node) {
        let index = -1;
        if (this.selectionMode && this.selection) {
            if (this.selectionMode === 'single') {
                index = (this.selection == node) ? 0 : -1;
            }
            else if (this.selectionMode === 'multiple') {
                for (let i = 0; i < this.selection.length; i++) {
                    if (this.selection[i] == node) {
                        index = i;
                        break;
                    }
                }
            }
        }
        return index;
    }
    isSelected(node) {
        return this.findIndexInSelection(node) != -1;
    }
}
OrganizationChart.ɵfac = function OrganizationChart_Factory(t) { return new (t || OrganizationChart)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef)); };
OrganizationChart.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: OrganizationChart, selectors: [["p-organizationChart"]], contentQueries: function OrganizationChart_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵngcc0.ɵɵcontentQuery(dirIndex, PrimeTemplate, false);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.templates = _t);
    } }, inputs: { preserveSpace: "preserveSpace", selection: "selection", value: "value", style: "style", styleClass: "styleClass", selectionMode: "selectionMode" }, outputs: { selectionChange: "selectionChange", onNodeSelect: "onNodeSelect", onNodeUnselect: "onNodeUnselect", onNodeExpand: "onNodeExpand", onNodeCollapse: "onNodeCollapse" }, decls: 2, vars: 7, consts: [[3, "ngStyle", "ngClass"], ["class", "p-organizationchart-table", "pOrganizationChartNode", "", 3, "node", 4, "ngIf"], ["pOrganizationChartNode", "", 1, "p-organizationchart-table", 3, "node"]], template: function OrganizationChart_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵtemplate(1, OrganizationChart_table_1_Template, 1, 1, "table", 1);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵclassMap(ctx.styleClass);
        ɵngcc0.ɵɵproperty("ngStyle", ctx.style)("ngClass", ɵngcc0.ɵɵpureFunction1(5, _c5, ctx.preserveSpace));
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.root);
    } }, directives: [ɵngcc1.NgStyle, ɵngcc1.NgClass, ɵngcc1.NgIf, OrganizationChartNode], encapsulation: 2, changeDetection: 0 });
OrganizationChart.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
OrganizationChart.propDecorators = {
    value: [{ type: Input }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    selectionMode: [{ type: Input }],
    preserveSpace: [{ type: Input }],
    selection: [{ type: Input }],
    selectionChange: [{ type: Output }],
    onNodeSelect: [{ type: Output }],
    onNodeUnselect: [{ type: Output }],
    onNodeExpand: [{ type: Output }],
    onNodeCollapse: [{ type: Output }],
    templates: [{ type: ContentChildren, args: [PrimeTemplate,] }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(OrganizationChart, [{
        type: Component,
        args: [{
                selector: 'p-organizationChart',
                template: `
        <div [ngStyle]="style" [class]="styleClass" [ngClass]="{'p-organizationchart p-component': true, 'p-organizationchart-preservespace': preserveSpace}">
            <table class="p-organizationchart-table" pOrganizationChartNode [node]="root" *ngIf="root"></table>
        </div>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc0.ChangeDetectorRef }]; }, { preserveSpace: [{
            type: Input
        }], selectionChange: [{
            type: Output
        }], onNodeSelect: [{
            type: Output
        }], onNodeUnselect: [{
            type: Output
        }], onNodeExpand: [{
            type: Output
        }], onNodeCollapse: [{
            type: Output
        }], selection: [{
            type: Input
        }], value: [{
            type: Input
        }], style: [{
            type: Input
        }], styleClass: [{
            type: Input
        }], selectionMode: [{
            type: Input
        }], templates: [{
            type: ContentChildren,
            args: [PrimeTemplate]
        }] }); })();
class OrganizationChartModule {
}
OrganizationChartModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: OrganizationChartModule });
OrganizationChartModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function OrganizationChartModule_Factory(t) { return new (t || OrganizationChartModule)(); }, imports: [[CommonModule], SharedModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(OrganizationChartModule, { declarations: function () { return [OrganizationChart, OrganizationChartNode]; }, imports: function () { return [CommonModule]; }, exports: function () { return [OrganizationChart, SharedModule]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(OrganizationChartModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                exports: [OrganizationChart, SharedModule],
                declarations: [OrganizationChart, OrganizationChartNode]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { OrganizationChart, OrganizationChartModule, OrganizationChartNode };

//# sourceMappingURL=primeng-organizationchart.js.map