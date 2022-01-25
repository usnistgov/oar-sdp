import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, ChangeDetectorRef, Input, Output, ViewChild, ContentChildren, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { RippleModule } from 'primeng/ripple';
import { FilterUtils, ObjectUtils } from 'primeng/utils';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from 'primeng/button';
import * as ɵngcc3 from 'primeng/ripple';

const _c0 = ["sourcelist"];
const _c1 = ["targetlist"];
const _c2 = ["sourceFilter"];
const _c3 = ["targetFilter"];
function PickList_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r13 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 18);
    ɵngcc0.ɵɵelementStart(1, "button", 19);
    ɵngcc0.ɵɵlistener("click", function PickList_div_1_Template_button_click_1_listener() { ɵngcc0.ɵɵrestoreView(_r13); const ctx_r12 = ɵngcc0.ɵɵnextContext(); const _r3 = ɵngcc0.ɵɵreference(6); return ctx_r12.moveUp(_r3, ctx_r12.source, ctx_r12.selectedItemsSource, ctx_r12.onSourceReorder); });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(2, "button", 20);
    ɵngcc0.ɵɵlistener("click", function PickList_div_1_Template_button_click_2_listener() { ɵngcc0.ɵɵrestoreView(_r13); const ctx_r14 = ɵngcc0.ɵɵnextContext(); const _r3 = ɵngcc0.ɵɵreference(6); return ctx_r14.moveTop(_r3, ctx_r14.source, ctx_r14.selectedItemsSource, ctx_r14.onSourceReorder); });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(3, "button", 21);
    ɵngcc0.ɵɵlistener("click", function PickList_div_1_Template_button_click_3_listener() { ɵngcc0.ɵɵrestoreView(_r13); const ctx_r15 = ɵngcc0.ɵɵnextContext(); const _r3 = ɵngcc0.ɵɵreference(6); return ctx_r15.moveDown(_r3, ctx_r15.source, ctx_r15.selectedItemsSource, ctx_r15.onSourceReorder); });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(4, "button", 22);
    ɵngcc0.ɵɵlistener("click", function PickList_div_1_Template_button_click_4_listener() { ɵngcc0.ɵɵrestoreView(_r13); const ctx_r16 = ɵngcc0.ɵɵnextContext(); const _r3 = ɵngcc0.ɵɵreference(6); return ctx_r16.moveBottom(_r3, ctx_r16.source, ctx_r16.selectedItemsSource, ctx_r16.onSourceReorder); });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("disabled", ctx_r0.disabled);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("disabled", ctx_r0.disabled);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("disabled", ctx_r0.disabled);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("disabled", ctx_r0.disabled);
} }
function PickList_div_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 23);
    ɵngcc0.ɵɵelementStart(1, "div", 24);
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(ctx_r1.sourceHeader);
} }
function PickList_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r19 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 25);
    ɵngcc0.ɵɵelementStart(1, "div", 26);
    ɵngcc0.ɵɵelementStart(2, "input", 27, 28);
    ɵngcc0.ɵɵlistener("keyup", function PickList_div_4_Template_input_keyup_2_listener($event) { ɵngcc0.ɵɵrestoreView(_r19); const ctx_r18 = ɵngcc0.ɵɵnextContext(); return ctx_r18.onFilter($event, ctx_r18.source, ctx_r18.SOURCE_LIST); });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelement(4, "span", 29);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("disabled", ctx_r2.disabled);
    ɵngcc0.ɵɵattribute("placeholder", ctx_r2.sourceFilterPlaceholder)("aria-label", ctx_r2.ariaSourceFilterLabel);
} }
const _c4 = function (a0) { return { "p-picklist-droppoint-highlight": a0 }; };
function PickList_ng_template_7_li_0_Template(rf, ctx) { if (rf & 1) {
    const _r27 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "li", 34);
    ɵngcc0.ɵɵlistener("dragover", function PickList_ng_template_7_li_0_Template_li_dragover_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r27); const i_r21 = ɵngcc0.ɵɵnextContext().index; const ctx_r26 = ɵngcc0.ɵɵnextContext(); return ctx_r26.onDragOver($event, i_r21, ctx_r26.SOURCE_LIST); })("drop", function PickList_ng_template_7_li_0_Template_li_drop_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r27); const i_r21 = ɵngcc0.ɵɵnextContext().index; const ctx_r29 = ɵngcc0.ɵɵnextContext(); return ctx_r29.onDrop($event, i_r21, ctx_r29.SOURCE_LIST); })("dragleave", function PickList_ng_template_7_li_0_Template_li_dragleave_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r27); const ctx_r31 = ɵngcc0.ɵɵnextContext(2); return ctx_r31.onDragLeave($event, ctx_r31.SOURCE_LIST); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r32 = ɵngcc0.ɵɵnextContext();
    const item_r20 = ctx_r32.$implicit;
    const i_r21 = ctx_r32.index;
    const ctx_r23 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵstyleProp("display", ctx_r23.isItemVisible(item_r20, ctx_r23.SOURCE_LIST) ? "block" : "none");
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(3, _c4, i_r21 === ctx_r23.dragOverItemIndexSource));
} }
function PickList_ng_template_7_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
function PickList_ng_template_7_li_3_Template(rf, ctx) { if (rf & 1) {
    const _r34 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "li", 34);
    ɵngcc0.ɵɵlistener("dragover", function PickList_ng_template_7_li_3_Template_li_dragover_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r34); const i_r21 = ɵngcc0.ɵɵnextContext().index; const ctx_r33 = ɵngcc0.ɵɵnextContext(); return ctx_r33.onDragOver($event, i_r21 + 1, ctx_r33.SOURCE_LIST); })("drop", function PickList_ng_template_7_li_3_Template_li_drop_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r34); const i_r21 = ɵngcc0.ɵɵnextContext().index; const ctx_r36 = ɵngcc0.ɵɵnextContext(); return ctx_r36.onDrop($event, i_r21 + 1, ctx_r36.SOURCE_LIST); })("dragleave", function PickList_ng_template_7_li_3_Template_li_dragleave_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r34); const ctx_r38 = ɵngcc0.ɵɵnextContext(2); return ctx_r38.onDragLeave($event, ctx_r38.SOURCE_LIST); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r21 = ɵngcc0.ɵɵnextContext().index;
    const ctx_r25 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(1, _c4, i_r21 + 1 === ctx_r25.dragOverItemIndexSource));
} }
const _c5 = function (a1, a2) { return { "p-picklist-item": true, "p-highlight": a1, "p-disabled": a2 }; };
const _c6 = function (a0, a1) { return { $implicit: a0, index: a1 }; };
function PickList_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    const _r41 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵtemplate(0, PickList_ng_template_7_li_0_Template, 1, 5, "li", 30);
    ɵngcc0.ɵɵelementStart(1, "li", 31);
    ɵngcc0.ɵɵlistener("click", function PickList_ng_template_7_Template_li_click_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r41); const item_r20 = ctx.$implicit; const ctx_r40 = ɵngcc0.ɵɵnextContext(); return ctx_r40.onItemClick($event, item_r20, ctx_r40.selectedItemsSource, ctx_r40.onSourceSelect); })("dblclick", function PickList_ng_template_7_Template_li_dblclick_1_listener() { ɵngcc0.ɵɵrestoreView(_r41); const ctx_r42 = ɵngcc0.ɵɵnextContext(); return ctx_r42.onSourceItemDblClick(); })("touchend", function PickList_ng_template_7_Template_li_touchend_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r41); const ctx_r43 = ɵngcc0.ɵɵnextContext(); return ctx_r43.onItemTouchEnd($event); })("keydown", function PickList_ng_template_7_Template_li_keydown_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r41); const item_r20 = ctx.$implicit; const ctx_r44 = ɵngcc0.ɵɵnextContext(); return ctx_r44.onItemKeydown($event, item_r20, ctx_r44.selectedItemsSource, ctx_r44.onSourceSelect); })("dragstart", function PickList_ng_template_7_Template_li_dragstart_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r41); const i_r21 = ctx.index; const ctx_r45 = ɵngcc0.ɵɵnextContext(); return ctx_r45.onDragStart($event, i_r21, ctx_r45.SOURCE_LIST); })("dragend", function PickList_ng_template_7_Template_li_dragend_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r41); const ctx_r46 = ɵngcc0.ɵɵnextContext(); return ctx_r46.onDragEnd($event); });
    ɵngcc0.ɵɵtemplate(2, PickList_ng_template_7_ng_container_2_Template, 1, 0, "ng-container", 32);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(3, PickList_ng_template_7_li_3_Template, 1, 3, "li", 33);
} if (rf & 2) {
    const item_r20 = ctx.$implicit;
    const i_r21 = ctx.index;
    const l_r22 = ctx.last;
    const ctx_r4 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngIf", ctx_r4.dragdrop);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵstyleProp("display", ctx_r4.isItemVisible(item_r20, ctx_r4.SOURCE_LIST) ? "block" : "none");
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction2(9, _c5, ctx_r4.isSelected(item_r20, ctx_r4.selectedItemsSource), ctx_r4.disabled));
    ɵngcc0.ɵɵattribute("aria-selected", ctx_r4.isSelected(item_r20, ctx_r4.selectedItemsSource))("draggable", ctx_r4.dragdrop);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r4.itemTemplate)("ngTemplateOutletContext", ɵngcc0.ɵɵpureFunction2(12, _c6, item_r20, i_r21));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r4.dragdrop && l_r22);
} }
function PickList_ng_container_8_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
function PickList_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainerStart(0);
    ɵngcc0.ɵɵelementStart(1, "li", 35);
    ɵngcc0.ɵɵtemplate(2, PickList_ng_container_8_ng_container_2_Template, 1, 0, "ng-container", 36);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r5 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r5.emptyMessageSourceTemplate);
} }
function PickList_div_15_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 24);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r48 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(ctx_r48.targetHeader);
} }
function PickList_div_15_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 23);
    ɵngcc0.ɵɵtemplate(1, PickList_div_15_div_1_Template, 2, 1, "div", 37);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r6.targetHeader);
} }
function PickList_div_16_Template(rf, ctx) { if (rf & 1) {
    const _r51 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 25);
    ɵngcc0.ɵɵelementStart(1, "div", 26);
    ɵngcc0.ɵɵelementStart(2, "input", 27, 38);
    ɵngcc0.ɵɵlistener("keyup", function PickList_div_16_Template_input_keyup_2_listener($event) { ɵngcc0.ɵɵrestoreView(_r51); const ctx_r50 = ɵngcc0.ɵɵnextContext(); return ctx_r50.onFilter($event, ctx_r50.target, ctx_r50.TARGET_LIST); });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelement(4, "span", 29);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("disabled", ctx_r7.disabled);
    ɵngcc0.ɵɵattribute("placeholder", ctx_r7.targetFilterPlaceholder)("aria-label", ctx_r7.ariaTargetFilterLabel);
} }
function PickList_ng_template_19_li_0_Template(rf, ctx) { if (rf & 1) {
    const _r59 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "li", 34);
    ɵngcc0.ɵɵlistener("dragover", function PickList_ng_template_19_li_0_Template_li_dragover_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r59); const i_r53 = ɵngcc0.ɵɵnextContext().index; const ctx_r58 = ɵngcc0.ɵɵnextContext(); return ctx_r58.onDragOver($event, i_r53, ctx_r58.TARGET_LIST); })("drop", function PickList_ng_template_19_li_0_Template_li_drop_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r59); const i_r53 = ɵngcc0.ɵɵnextContext().index; const ctx_r61 = ɵngcc0.ɵɵnextContext(); return ctx_r61.onDrop($event, i_r53, ctx_r61.TARGET_LIST); })("dragleave", function PickList_ng_template_19_li_0_Template_li_dragleave_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r59); const ctx_r63 = ɵngcc0.ɵɵnextContext(2); return ctx_r63.onDragLeave($event, ctx_r63.TARGET_LIST); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r64 = ɵngcc0.ɵɵnextContext();
    const item_r52 = ctx_r64.$implicit;
    const i_r53 = ctx_r64.index;
    const ctx_r55 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵstyleProp("display", ctx_r55.isItemVisible(item_r52, ctx_r55.TARGET_LIST) ? "block" : "none");
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(3, _c4, i_r53 === ctx_r55.dragOverItemIndexTarget));
} }
function PickList_ng_template_19_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
function PickList_ng_template_19_li_3_Template(rf, ctx) { if (rf & 1) {
    const _r66 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "li", 34);
    ɵngcc0.ɵɵlistener("dragover", function PickList_ng_template_19_li_3_Template_li_dragover_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r66); const i_r53 = ɵngcc0.ɵɵnextContext().index; const ctx_r65 = ɵngcc0.ɵɵnextContext(); return ctx_r65.onDragOver($event, i_r53 + 1, ctx_r65.TARGET_LIST); })("drop", function PickList_ng_template_19_li_3_Template_li_drop_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r66); const i_r53 = ɵngcc0.ɵɵnextContext().index; const ctx_r68 = ɵngcc0.ɵɵnextContext(); return ctx_r68.onDrop($event, i_r53 + 1, ctx_r68.TARGET_LIST); })("dragleave", function PickList_ng_template_19_li_3_Template_li_dragleave_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r66); const ctx_r70 = ɵngcc0.ɵɵnextContext(2); return ctx_r70.onDragLeave($event, ctx_r70.TARGET_LIST); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r53 = ɵngcc0.ɵɵnextContext().index;
    const ctx_r57 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(1, _c4, i_r53 + 1 === ctx_r57.dragOverItemIndexTarget));
} }
function PickList_ng_template_19_Template(rf, ctx) { if (rf & 1) {
    const _r73 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵtemplate(0, PickList_ng_template_19_li_0_Template, 1, 5, "li", 30);
    ɵngcc0.ɵɵelementStart(1, "li", 31);
    ɵngcc0.ɵɵlistener("click", function PickList_ng_template_19_Template_li_click_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r73); const item_r52 = ctx.$implicit; const ctx_r72 = ɵngcc0.ɵɵnextContext(); return ctx_r72.onItemClick($event, item_r52, ctx_r72.selectedItemsTarget, ctx_r72.onTargetSelect); })("dblclick", function PickList_ng_template_19_Template_li_dblclick_1_listener() { ɵngcc0.ɵɵrestoreView(_r73); const ctx_r74 = ɵngcc0.ɵɵnextContext(); return ctx_r74.onTargetItemDblClick(); })("touchend", function PickList_ng_template_19_Template_li_touchend_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r73); const ctx_r75 = ɵngcc0.ɵɵnextContext(); return ctx_r75.onItemTouchEnd($event); })("keydown", function PickList_ng_template_19_Template_li_keydown_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r73); const item_r52 = ctx.$implicit; const ctx_r76 = ɵngcc0.ɵɵnextContext(); return ctx_r76.onItemKeydown($event, item_r52, ctx_r76.selectedItemsTarget, ctx_r76.onTargetSelect); })("dragstart", function PickList_ng_template_19_Template_li_dragstart_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r73); const i_r53 = ctx.index; const ctx_r77 = ɵngcc0.ɵɵnextContext(); return ctx_r77.onDragStart($event, i_r53, ctx_r77.TARGET_LIST); })("dragend", function PickList_ng_template_19_Template_li_dragend_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r73); const ctx_r78 = ɵngcc0.ɵɵnextContext(); return ctx_r78.onDragEnd($event); });
    ɵngcc0.ɵɵtemplate(2, PickList_ng_template_19_ng_container_2_Template, 1, 0, "ng-container", 32);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(3, PickList_ng_template_19_li_3_Template, 1, 3, "li", 33);
} if (rf & 2) {
    const item_r52 = ctx.$implicit;
    const i_r53 = ctx.index;
    const l_r54 = ctx.last;
    const ctx_r9 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngIf", ctx_r9.dragdrop);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵstyleProp("display", ctx_r9.isItemVisible(item_r52, ctx_r9.TARGET_LIST) ? "block" : "none");
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction2(9, _c5, ctx_r9.isSelected(item_r52, ctx_r9.selectedItemsTarget), ctx_r9.disabled));
    ɵngcc0.ɵɵattribute("aria-selected", ctx_r9.isSelected(item_r52, ctx_r9.selectedItemsTarget))("draggable", ctx_r9.dragdrop);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r9.itemTemplate)("ngTemplateOutletContext", ɵngcc0.ɵɵpureFunction2(12, _c6, item_r52, i_r53));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r9.dragdrop && l_r54);
} }
function PickList_ng_container_20_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
function PickList_ng_container_20_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainerStart(0);
    ɵngcc0.ɵɵelementStart(1, "li", 35);
    ɵngcc0.ɵɵtemplate(2, PickList_ng_container_20_ng_container_2_Template, 1, 0, "ng-container", 36);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r10 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r10.emptyMessageTargetTemplate);
} }
function PickList_div_21_Template(rf, ctx) { if (rf & 1) {
    const _r81 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 39);
    ɵngcc0.ɵɵelementStart(1, "button", 19);
    ɵngcc0.ɵɵlistener("click", function PickList_div_21_Template_button_click_1_listener() { ɵngcc0.ɵɵrestoreView(_r81); const ctx_r80 = ɵngcc0.ɵɵnextContext(); const _r8 = ɵngcc0.ɵɵreference(18); return ctx_r80.moveUp(_r8, ctx_r80.target, ctx_r80.selectedItemsTarget, ctx_r80.onTargetReorder); });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(2, "button", 20);
    ɵngcc0.ɵɵlistener("click", function PickList_div_21_Template_button_click_2_listener() { ɵngcc0.ɵɵrestoreView(_r81); const ctx_r82 = ɵngcc0.ɵɵnextContext(); const _r8 = ɵngcc0.ɵɵreference(18); return ctx_r82.moveTop(_r8, ctx_r82.target, ctx_r82.selectedItemsTarget, ctx_r82.onTargetReorder); });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(3, "button", 21);
    ɵngcc0.ɵɵlistener("click", function PickList_div_21_Template_button_click_3_listener() { ɵngcc0.ɵɵrestoreView(_r81); const ctx_r83 = ɵngcc0.ɵɵnextContext(); const _r8 = ɵngcc0.ɵɵreference(18); return ctx_r83.moveDown(_r8, ctx_r83.target, ctx_r83.selectedItemsTarget, ctx_r83.onTargetReorder); });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(4, "button", 22);
    ɵngcc0.ɵɵlistener("click", function PickList_div_21_Template_button_click_4_listener() { ɵngcc0.ɵɵrestoreView(_r81); const ctx_r84 = ɵngcc0.ɵɵnextContext(); const _r8 = ɵngcc0.ɵɵreference(18); return ctx_r84.moveBottom(_r8, ctx_r84.target, ctx_r84.selectedItemsTarget, ctx_r84.onTargetReorder); });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r11 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("disabled", ctx_r11.disabled);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("disabled", ctx_r11.disabled);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("disabled", ctx_r11.disabled);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("disabled", ctx_r11.disabled);
} }
const _c7 = function (a0) { return { "p-picklist-list-highlight": a0 }; };
class PickList {
    constructor(el, cd) {
        this.el = el;
        this.cd = cd;
        this.trackBy = (index, item) => item;
        this.showSourceFilter = true;
        this.showTargetFilter = true;
        this.metaKeySelection = true;
        this.showSourceControls = true;
        this.showTargetControls = true;
        this.disabled = false;
        this.filterMatchMode = "contains";
        this.onMoveToSource = new EventEmitter();
        this.onMoveAllToSource = new EventEmitter();
        this.onMoveAllToTarget = new EventEmitter();
        this.onMoveToTarget = new EventEmitter();
        this.onSourceReorder = new EventEmitter();
        this.onTargetReorder = new EventEmitter();
        this.onSourceSelect = new EventEmitter();
        this.onTargetSelect = new EventEmitter();
        this.onSourceFilter = new EventEmitter();
        this.onTargetFilter = new EventEmitter();
        this.selectedItemsSource = [];
        this.selectedItemsTarget = [];
        this.SOURCE_LIST = -1;
        this.TARGET_LIST = 1;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                case 'emptymessagesource':
                    this.emptyMessageSourceTemplate = item.template;
                    break;
                case 'emptymessagetarget':
                    this.emptyMessageTargetTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    ngAfterViewChecked() {
        if (this.movedUp || this.movedDown) {
            let listItems = DomHandler.find(this.reorderedListElement, 'li.p-highlight');
            let listItem;
            if (this.movedUp)
                listItem = listItems[0];
            else
                listItem = listItems[listItems.length - 1];
            DomHandler.scrollInView(this.reorderedListElement, listItem);
            this.movedUp = false;
            this.movedDown = false;
            this.reorderedListElement = null;
        }
    }
    onItemClick(event, item, selectedItems, callback) {
        if (this.disabled) {
            return;
        }
        let index = this.findIndexInSelection(item, selectedItems);
        let selected = (index != -1);
        let metaSelection = this.itemTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            let metaKey = (event.metaKey || event.ctrlKey || event.shiftKey);
            if (selected && metaKey) {
                selectedItems.splice(index, 1);
            }
            else {
                if (!metaKey) {
                    selectedItems.length = 0;
                }
                selectedItems.push(item);
            }
        }
        else {
            if (selected)
                selectedItems.splice(index, 1);
            else
                selectedItems.push(item);
        }
        callback.emit({ originalEvent: event, items: selectedItems });
        this.itemTouched = false;
    }
    onSourceItemDblClick() {
        if (this.disabled) {
            return;
        }
        this.moveRight();
    }
    onTargetItemDblClick() {
        if (this.disabled) {
            return;
        }
        this.moveLeft();
    }
    onFilter(event, data, listType) {
        let query = event.target.value.trim().toLocaleLowerCase(this.filterLocale);
        this.filter(query, data, listType);
    }
    filter(query, data, listType) {
        let searchFields = this.filterBy.split(',');
        if (listType === this.SOURCE_LIST) {
            this.filterValueSource = query;
            this.visibleOptionsSource = FilterUtils.filter(data, searchFields, this.filterValueSource, this.filterMatchMode, this.filterLocale);
            this.onSourceFilter.emit({ query: this.filterValueSource, value: this.visibleOptionsSource });
        }
        else if (listType === this.TARGET_LIST) {
            this.filterValueTarget = query;
            this.visibleOptionsTarget = FilterUtils.filter(data, searchFields, this.filterValueTarget, this.filterMatchMode, this.filterLocale);
            this.onTargetFilter.emit({ query: this.filterValueTarget, value: this.visibleOptionsTarget });
        }
    }
    isItemVisible(item, listType) {
        if (listType == this.SOURCE_LIST)
            return this.isVisibleInList(this.visibleOptionsSource, item, this.filterValueSource);
        else
            return this.isVisibleInList(this.visibleOptionsTarget, item, this.filterValueTarget);
    }
    isVisibleInList(data, item, filterValue) {
        if (filterValue && filterValue.trim().length) {
            for (let i = 0; i < data.length; i++) {
                if (item == data[i]) {
                    return true;
                }
            }
        }
        else {
            return true;
        }
    }
    onItemTouchEnd(event) {
        if (this.disabled) {
            return;
        }
        this.itemTouched = true;
    }
    sortByIndexInList(items, list) {
        return items.sort((item1, item2) => this.findIndexInList(item1, list) - this.findIndexInList(item2, list));
    }
    moveUp(listElement, list, selectedItems, callback) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = 0; i < selectedItems.length; i++) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex = this.findIndexInList(selectedItem, list);
                if (selectedItemIndex != 0) {
                    let movedItem = list[selectedItemIndex];
                    let temp = list[selectedItemIndex - 1];
                    list[selectedItemIndex - 1] = movedItem;
                    list[selectedItemIndex] = temp;
                }
                else {
                    break;
                }
            }
            this.movedUp = true;
            this.reorderedListElement = listElement;
            callback.emit({ items: selectedItems });
        }
    }
    moveTop(listElement, list, selectedItems, callback) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = 0; i < selectedItems.length; i++) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex = this.findIndexInList(selectedItem, list);
                if (selectedItemIndex != 0) {
                    let movedItem = list.splice(selectedItemIndex, 1)[0];
                    list.unshift(movedItem);
                }
                else {
                    break;
                }
            }
            listElement.scrollTop = 0;
            callback.emit({ items: selectedItems });
        }
    }
    moveDown(listElement, list, selectedItems, callback) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = selectedItems.length - 1; i >= 0; i--) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex = this.findIndexInList(selectedItem, list);
                if (selectedItemIndex != (list.length - 1)) {
                    let movedItem = list[selectedItemIndex];
                    let temp = list[selectedItemIndex + 1];
                    list[selectedItemIndex + 1] = movedItem;
                    list[selectedItemIndex] = temp;
                }
                else {
                    break;
                }
            }
            this.movedDown = true;
            this.reorderedListElement = listElement;
            callback.emit({ items: selectedItems });
        }
    }
    moveBottom(listElement, list, selectedItems, callback) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = selectedItems.length - 1; i >= 0; i--) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex = this.findIndexInList(selectedItem, list);
                if (selectedItemIndex != (list.length - 1)) {
                    let movedItem = list.splice(selectedItemIndex, 1)[0];
                    list.push(movedItem);
                }
                else {
                    break;
                }
            }
            listElement.scrollTop = listElement.scrollHeight;
            callback.emit({ items: selectedItems });
        }
    }
    moveRight() {
        if (this.selectedItemsSource && this.selectedItemsSource.length) {
            for (let i = 0; i < this.selectedItemsSource.length; i++) {
                let selectedItem = this.selectedItemsSource[i];
                if (this.findIndexInList(selectedItem, this.target) == -1) {
                    this.target.push(this.source.splice(this.findIndexInList(selectedItem, this.source), 1)[0]);
                }
            }
            this.onMoveToTarget.emit({
                items: this.selectedItemsSource
            });
            this.selectedItemsSource = [];
            if (this.filterValueTarget) {
                this.filter(this.filterValueTarget, this.target, this.TARGET_LIST);
            }
        }
    }
    moveAllRight() {
        if (this.source) {
            let movedItems = [];
            for (let i = 0; i < this.source.length; i++) {
                if (this.isItemVisible(this.source[i], this.SOURCE_LIST)) {
                    let removedItem = this.source.splice(i, 1)[0];
                    this.target.push(removedItem);
                    movedItems.push(removedItem);
                    i--;
                }
            }
            this.onMoveToTarget.emit({
                items: movedItems
            });
            this.onMoveAllToTarget.emit({
                items: movedItems
            });
            this.selectedItemsSource = [];
            if (this.filterValueTarget) {
                this.filter(this.filterValueTarget, this.target, this.TARGET_LIST);
            }
        }
    }
    moveLeft() {
        if (this.selectedItemsTarget && this.selectedItemsTarget.length) {
            for (let i = 0; i < this.selectedItemsTarget.length; i++) {
                let selectedItem = this.selectedItemsTarget[i];
                if (this.findIndexInList(selectedItem, this.source) == -1) {
                    this.source.push(this.target.splice(this.findIndexInList(selectedItem, this.target), 1)[0]);
                }
            }
            this.onMoveToSource.emit({
                items: this.selectedItemsTarget
            });
            this.selectedItemsTarget = [];
            if (this.filterValueSource) {
                this.filter(this.filterValueSource, this.source, this.SOURCE_LIST);
            }
        }
    }
    moveAllLeft() {
        if (this.target) {
            let movedItems = [];
            for (let i = 0; i < this.target.length; i++) {
                if (this.isItemVisible(this.target[i], this.TARGET_LIST)) {
                    let removedItem = this.target.splice(i, 1)[0];
                    this.source.push(removedItem);
                    movedItems.push(removedItem);
                    i--;
                }
            }
            this.onMoveToSource.emit({
                items: movedItems
            });
            this.onMoveAllToSource.emit({
                items: movedItems
            });
            this.selectedItemsTarget = [];
            if (this.filterValueSource) {
                this.filter(this.filterValueSource, this.source, this.SOURCE_LIST);
            }
        }
    }
    isSelected(item, selectedItems) {
        return this.findIndexInSelection(item, selectedItems) != -1;
    }
    findIndexInSelection(item, selectedItems) {
        return this.findIndexInList(item, selectedItems);
    }
    findIndexInList(item, list) {
        let index = -1;
        if (list) {
            for (let i = 0; i < list.length; i++) {
                if (list[i] == item) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }
    onDragStart(event, index, listType) {
        event.dataTransfer.setData('text', 'b'); // For firefox
        event.target.blur();
        this.dragging = true;
        this.fromListType = listType;
        if (listType === this.SOURCE_LIST)
            this.draggedItemIndexSource = index;
        else
            this.draggedItemIndexTarget = index;
    }
    onDragOver(event, index, listType) {
        if (this.dragging) {
            if (listType == this.SOURCE_LIST) {
                if (this.draggedItemIndexSource !== index && this.draggedItemIndexSource + 1 !== index || (this.fromListType === this.TARGET_LIST)) {
                    this.dragOverItemIndexSource = index;
                    event.preventDefault();
                }
            }
            else {
                if (this.draggedItemIndexTarget !== index && this.draggedItemIndexTarget + 1 !== index || (this.fromListType === this.SOURCE_LIST)) {
                    this.dragOverItemIndexTarget = index;
                    event.preventDefault();
                }
            }
            this.onListItemDroppoint = true;
        }
    }
    onDragLeave(event, listType) {
        this.dragOverItemIndexSource = null;
        this.dragOverItemIndexTarget = null;
        this.onListItemDroppoint = false;
    }
    onDrop(event, index, listType) {
        if (this.onListItemDroppoint) {
            if (listType === this.SOURCE_LIST) {
                if (this.fromListType === this.TARGET_LIST) {
                    this.insert(this.draggedItemIndexTarget, this.target, index, this.source, this.onMoveToSource);
                }
                else {
                    ObjectUtils.reorderArray(this.source, this.draggedItemIndexSource, (this.draggedItemIndexSource > index) ? index : (index === 0) ? 0 : index - 1);
                    this.onSourceReorder.emit({ items: this.source[this.draggedItemIndexSource] });
                }
                this.dragOverItemIndexSource = null;
            }
            else {
                if (this.fromListType === this.SOURCE_LIST) {
                    this.insert(this.draggedItemIndexSource, this.source, index, this.target, this.onMoveToTarget);
                }
                else {
                    ObjectUtils.reorderArray(this.target, this.draggedItemIndexTarget, (this.draggedItemIndexTarget > index) ? index : (index === 0) ? 0 : index - 1);
                    this.onTargetReorder.emit({ items: this.target[this.draggedItemIndexTarget] });
                }
                this.dragOverItemIndexTarget = null;
            }
            this.listHighlightTarget = false;
            this.listHighlightSource = false;
            event.preventDefault();
        }
    }
    onDragEnd(event) {
        this.dragging = false;
    }
    onListDrop(event, listType) {
        if (!this.onListItemDroppoint) {
            if (listType === this.SOURCE_LIST) {
                if (this.fromListType === this.TARGET_LIST) {
                    this.insert(this.draggedItemIndexTarget, this.target, null, this.source, this.onMoveToSource);
                }
            }
            else {
                if (this.fromListType === this.SOURCE_LIST) {
                    this.insert(this.draggedItemIndexSource, this.source, null, this.target, this.onMoveToTarget);
                }
            }
            this.listHighlightTarget = false;
            this.listHighlightSource = false;
            event.preventDefault();
        }
    }
    insert(fromIndex, fromList, toIndex, toList, callback) {
        const elementtomove = fromList[fromIndex];
        if (toIndex === null)
            toList.push(fromList.splice(fromIndex, 1)[0]);
        else
            toList.splice(toIndex, 0, fromList.splice(fromIndex, 1)[0]);
        callback.emit({
            items: [elementtomove]
        });
    }
    onListMouseMove(event, listType) {
        if (this.dragging) {
            let moveListType = (listType == 0 ? this.listViewSourceChild : this.listViewTargetChild);
            let offsetY = moveListType.nativeElement.getBoundingClientRect().top + document.body.scrollTop;
            let bottomDiff = (offsetY + moveListType.nativeElement.clientHeight) - event.pageY;
            let topDiff = (event.pageY - offsetY);
            if (bottomDiff < 25 && bottomDiff > 0)
                moveListType.nativeElement.scrollTop += 15;
            else if (topDiff < 25 && topDiff > 0)
                moveListType.nativeElement.scrollTop -= 15;
            if (listType === this.SOURCE_LIST) {
                if (this.fromListType === this.TARGET_LIST)
                    this.listHighlightSource = true;
            }
            else {
                if (this.fromListType === this.SOURCE_LIST)
                    this.listHighlightTarget = true;
            }
            event.preventDefault();
        }
    }
    onListDragLeave() {
        this.listHighlightTarget = false;
        this.listHighlightSource = false;
    }
    resetFilter() {
        this.visibleOptionsSource = null;
        this.filterValueSource = null;
        this.visibleOptionsTarget = null;
        this.filterValueTarget = null;
        this.sourceFilterViewChild.nativeElement.value = '';
        this.targetFilterViewChild.nativeElement.value = '';
    }
    onItemKeydown(event, item, selectedItems, callback) {
        let listItem = event.currentTarget;
        switch (event.which) {
            //down
            case 40:
                var nextItem = this.findNextItem(listItem);
                if (nextItem) {
                    nextItem.focus();
                }
                event.preventDefault();
                break;
            //up
            case 38:
                var prevItem = this.findPrevItem(listItem);
                if (prevItem) {
                    prevItem.focus();
                }
                event.preventDefault();
                break;
            //enter
            case 13:
                this.onItemClick(event, item, selectedItems, callback);
                event.preventDefault();
                break;
        }
    }
    findNextItem(item) {
        let nextItem = item.nextElementSibling;
        if (nextItem)
            return !DomHandler.hasClass(nextItem, 'p-picklist-item') || DomHandler.isHidden(nextItem) ? this.findNextItem(nextItem) : nextItem;
        else
            return null;
    }
    findPrevItem(item) {
        let prevItem = item.previousElementSibling;
        if (prevItem)
            return !DomHandler.hasClass(prevItem, 'p-picklist-item') || DomHandler.isHidden(prevItem) ? this.findPrevItem(prevItem) : prevItem;
        else
            return null;
    }
}
PickList.ɵfac = function PickList_Factory(t) { return new (t || PickList)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef)); };
PickList.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: PickList, selectors: [["p-pickList"]], contentQueries: function PickList_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵngcc0.ɵɵcontentQuery(dirIndex, PrimeTemplate, false);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.templates = _t);
    } }, viewQuery: function PickList_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵviewQuery(_c0, true);
        ɵngcc0.ɵɵviewQuery(_c1, true);
        ɵngcc0.ɵɵviewQuery(_c2, true);
        ɵngcc0.ɵɵviewQuery(_c3, true);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.listViewSourceChild = _t.first);
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.listViewTargetChild = _t.first);
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.sourceFilterViewChild = _t.first);
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.targetFilterViewChild = _t.first);
    } }, inputs: { trackBy: "trackBy", showSourceFilter: "showSourceFilter", showTargetFilter: "showTargetFilter", metaKeySelection: "metaKeySelection", showSourceControls: "showSourceControls", showTargetControls: "showTargetControls", disabled: "disabled", filterMatchMode: "filterMatchMode", source: "source", target: "target", sourceHeader: "sourceHeader", targetHeader: "targetHeader", responsive: "responsive", filterBy: "filterBy", filterLocale: "filterLocale", sourceTrackBy: "sourceTrackBy", targetTrackBy: "targetTrackBy", dragdrop: "dragdrop", style: "style", styleClass: "styleClass", sourceStyle: "sourceStyle", targetStyle: "targetStyle", sourceFilterPlaceholder: "sourceFilterPlaceholder", targetFilterPlaceholder: "targetFilterPlaceholder", ariaSourceFilterLabel: "ariaSourceFilterLabel", ariaTargetFilterLabel: "ariaTargetFilterLabel" }, outputs: { onMoveToSource: "onMoveToSource", onMoveAllToSource: "onMoveAllToSource", onMoveAllToTarget: "onMoveAllToTarget", onMoveToTarget: "onMoveToTarget", onSourceReorder: "onSourceReorder", onTargetReorder: "onTargetReorder", onSourceSelect: "onSourceSelect", onTargetSelect: "onTargetSelect", onSourceFilter: "onSourceFilter", onTargetFilter: "onTargetFilter" }, decls: 22, vars: 28, consts: [[3, "ngStyle", "ngClass"], ["class", "p-picklist-buttons p-picklist-source-controls", 4, "ngIf"], [1, "p-picklist-list-wrapper", "p-picklist-source-wrapper"], ["class", "p-picklist-header", 4, "ngIf"], ["class", "p-picklist-filter-container", 4, "ngIf"], ["role", "listbox", "aria-multiselectable", "multiple", 1, "p-picklist-list", "p-picklist-source", 3, "ngClass", "ngStyle", "dragover", "dragleave", "drop"], ["sourcelist", ""], ["ngFor", "", 3, "ngForOf", "ngForTrackBy"], [4, "ngIf"], [1, "p-picklist-buttons", "p-picklist-transfer-buttons"], ["type", "button", "pButton", "", "pRipple", "", "icon", "pi pi-angle-right", 3, "disabled", "click"], ["type", "button", "pButton", "", "pRipple", "", "icon", "pi pi-angle-double-right", 3, "disabled", "click"], ["type", "button", "pButton", "", "pRipple", "", "icon", "pi pi-angle-left", 3, "disabled", "click"], ["type", "button", "pButton", "", "pRipple", "", "icon", "pi pi-angle-double-left", 3, "disabled", "click"], [1, "p-picklist-list-wrapper", "p-picklist-target-wrapper"], ["role", "listbox", "aria-multiselectable", "multiple", 1, "p-picklist-list", "p-picklist-target", 3, "ngClass", "ngStyle", "dragover", "dragleave", "drop"], ["targetlist", ""], ["class", "p-picklist-buttons p-picklist-target-controls", 4, "ngIf"], [1, "p-picklist-buttons", "p-picklist-source-controls"], ["type", "button", "pButton", "", "pRipple", "", "icon", "pi pi-angle-up", 3, "disabled", "click"], ["type", "button", "pButton", "", "pRipple", "", "icon", "pi pi-angle-double-up", 3, "disabled", "click"], ["type", "button", "pButton", "", "pRipple", "", "icon", "pi pi-angle-down", 3, "disabled", "click"], ["type", "button", "pButton", "", "pRipple", "", "icon", "pi pi-angle-double-down", 3, "disabled", "click"], [1, "p-picklist-header"], [1, "p-picklist-title"], [1, "p-picklist-filter-container"], [1, "p-picklist-filter"], ["type", "text", "role", "textbox", 1, "p-picklist-filter-input", "p-inputtext", "p-component", 3, "disabled", "keyup"], ["sourceFilter", ""], [1, "p-picklist-filter-icon", "pi", "pi-search"], ["class", "p-picklist-droppoint", 3, "ngClass", "display", "dragover", "drop", "dragleave", 4, "ngIf"], ["pRipple", "", "tabindex", "0", "role", "option", 3, "ngClass", "click", "dblclick", "touchend", "keydown", "dragstart", "dragend"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["class", "p-picklist-droppoint", 3, "ngClass", "dragover", "drop", "dragleave", 4, "ngIf"], [1, "p-picklist-droppoint", 3, "ngClass", "dragover", "drop", "dragleave"], [1, "p-picklist-empty-message"], [4, "ngTemplateOutlet"], ["class", "p-picklist-title", 4, "ngIf"], ["targetFilter", ""], [1, "p-picklist-buttons", "p-picklist-target-controls"]], template: function PickList_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵtemplate(1, PickList_div_1_Template, 5, 4, "div", 1);
        ɵngcc0.ɵɵelementStart(2, "div", 2);
        ɵngcc0.ɵɵtemplate(3, PickList_div_3_Template, 3, 1, "div", 3);
        ɵngcc0.ɵɵtemplate(4, PickList_div_4_Template, 5, 3, "div", 4);
        ɵngcc0.ɵɵelementStart(5, "ul", 5, 6);
        ɵngcc0.ɵɵlistener("dragover", function PickList_Template_ul_dragover_5_listener($event) { return ctx.onListMouseMove($event, ctx.SOURCE_LIST); })("dragleave", function PickList_Template_ul_dragleave_5_listener() { return ctx.onListDragLeave(); })("drop", function PickList_Template_ul_drop_5_listener($event) { return ctx.onListDrop($event, ctx.SOURCE_LIST); });
        ɵngcc0.ɵɵtemplate(7, PickList_ng_template_7_Template, 4, 15, "ng-template", 7);
        ɵngcc0.ɵɵtemplate(8, PickList_ng_container_8_Template, 3, 1, "ng-container", 8);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(9, "div", 9);
        ɵngcc0.ɵɵelementStart(10, "button", 10);
        ɵngcc0.ɵɵlistener("click", function PickList_Template_button_click_10_listener() { return ctx.moveRight(); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(11, "button", 11);
        ɵngcc0.ɵɵlistener("click", function PickList_Template_button_click_11_listener() { return ctx.moveAllRight(); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(12, "button", 12);
        ɵngcc0.ɵɵlistener("click", function PickList_Template_button_click_12_listener() { return ctx.moveLeft(); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(13, "button", 13);
        ɵngcc0.ɵɵlistener("click", function PickList_Template_button_click_13_listener() { return ctx.moveAllLeft(); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(14, "div", 14);
        ɵngcc0.ɵɵtemplate(15, PickList_div_15_Template, 2, 1, "div", 3);
        ɵngcc0.ɵɵtemplate(16, PickList_div_16_Template, 5, 3, "div", 4);
        ɵngcc0.ɵɵelementStart(17, "ul", 15, 16);
        ɵngcc0.ɵɵlistener("dragover", function PickList_Template_ul_dragover_17_listener($event) { return ctx.onListMouseMove($event, ctx.TARGET_LIST); })("dragleave", function PickList_Template_ul_dragleave_17_listener() { return ctx.onListDragLeave(); })("drop", function PickList_Template_ul_drop_17_listener($event) { return ctx.onListDrop($event, ctx.TARGET_LIST); });
        ɵngcc0.ɵɵtemplate(19, PickList_ng_template_19_Template, 4, 15, "ng-template", 7);
        ɵngcc0.ɵɵtemplate(20, PickList_ng_container_20_Template, 3, 1, "ng-container", 8);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵtemplate(21, PickList_div_21_Template, 5, 4, "div", 17);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵclassMap(ctx.styleClass);
        ɵngcc0.ɵɵproperty("ngStyle", ctx.style)("ngClass", "p-picklist p-component");
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.showSourceControls);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngIf", ctx.sourceHeader);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.filterBy && ctx.showSourceFilter !== false);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(24, _c7, ctx.listHighlightSource))("ngStyle", ctx.sourceStyle);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.source)("ngForTrackBy", ctx.sourceTrackBy || ctx.trackBy);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", (ctx.source == null || ctx.source.length === 0) && ctx.emptyMessageSourceTemplate);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("disabled", ctx.disabled);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("disabled", ctx.disabled);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("disabled", ctx.disabled);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("disabled", ctx.disabled);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngIf", ctx.targetHeader);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.filterBy && ctx.showTargetFilter !== false);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(26, _c7, ctx.listHighlightTarget))("ngStyle", ctx.targetStyle);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.target)("ngForTrackBy", ctx.targetTrackBy || ctx.trackBy);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", (ctx.target == null || ctx.target.length === 0) && ctx.emptyMessageTargetTemplate);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.showTargetControls);
    } }, directives: [ɵngcc1.NgStyle, ɵngcc1.NgClass, ɵngcc1.NgIf, ɵngcc1.NgForOf, ɵngcc2.ButtonDirective, ɵngcc3.Ripple, ɵngcc1.NgTemplateOutlet], styles: [".p-picklist,.p-picklist-buttons{display:-ms-flexbox;display:flex}.p-picklist-buttons{-ms-flex-direction:column;-ms-flex-pack:center;flex-direction:column;justify-content:center}.p-picklist-list-wrapper{-ms-flex:1 1 50%;flex:1 1 50%}.p-picklist-list{list-style-type:none;margin:0;max-height:24rem;min-height:12rem;overflow:auto;padding:0}.p-picklist-item{cursor:pointer;overflow:hidden}.p-picklist-filter,.p-picklist-item{position:relative}.p-picklist-filter-icon{margin-top:-.5rem;position:absolute;top:50%}.p-picklist-filter-input{width:100%}.p-picklist-droppoint{height:6px}"], encapsulation: 2, changeDetection: 0 });
PickList.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
PickList.propDecorators = {
    source: [{ type: Input }],
    target: [{ type: Input }],
    sourceHeader: [{ type: Input }],
    targetHeader: [{ type: Input }],
    responsive: [{ type: Input }],
    filterBy: [{ type: Input }],
    filterLocale: [{ type: Input }],
    trackBy: [{ type: Input }],
    sourceTrackBy: [{ type: Input }],
    targetTrackBy: [{ type: Input }],
    showSourceFilter: [{ type: Input }],
    showTargetFilter: [{ type: Input }],
    metaKeySelection: [{ type: Input }],
    dragdrop: [{ type: Input }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    sourceStyle: [{ type: Input }],
    targetStyle: [{ type: Input }],
    showSourceControls: [{ type: Input }],
    showTargetControls: [{ type: Input }],
    sourceFilterPlaceholder: [{ type: Input }],
    targetFilterPlaceholder: [{ type: Input }],
    disabled: [{ type: Input }],
    ariaSourceFilterLabel: [{ type: Input }],
    ariaTargetFilterLabel: [{ type: Input }],
    filterMatchMode: [{ type: Input }],
    onMoveToSource: [{ type: Output }],
    onMoveAllToSource: [{ type: Output }],
    onMoveAllToTarget: [{ type: Output }],
    onMoveToTarget: [{ type: Output }],
    onSourceReorder: [{ type: Output }],
    onTargetReorder: [{ type: Output }],
    onSourceSelect: [{ type: Output }],
    onTargetSelect: [{ type: Output }],
    onSourceFilter: [{ type: Output }],
    onTargetFilter: [{ type: Output }],
    listViewSourceChild: [{ type: ViewChild, args: ['sourcelist',] }],
    listViewTargetChild: [{ type: ViewChild, args: ['targetlist',] }],
    sourceFilterViewChild: [{ type: ViewChild, args: ['sourceFilter',] }],
    targetFilterViewChild: [{ type: ViewChild, args: ['targetFilter',] }],
    templates: [{ type: ContentChildren, args: [PrimeTemplate,] }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(PickList, [{
        type: Component,
        args: [{
                selector: 'p-pickList',
                template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-picklist p-component'">
            <div class="p-picklist-buttons p-picklist-source-controls" *ngIf="showSourceControls">
                <button type="button" pButton pRipple icon="pi pi-angle-up" [disabled]="disabled" (click)="moveUp(sourcelist,source,selectedItemsSource,onSourceReorder)"></button>
                <button type="button" pButton pRipple icon="pi pi-angle-double-up" [disabled]="disabled" (click)="moveTop(sourcelist,source,selectedItemsSource,onSourceReorder)"></button>
                <button type="button" pButton pRipple icon="pi pi-angle-down" [disabled]="disabled" (click)="moveDown(sourcelist,source,selectedItemsSource,onSourceReorder)"></button>
                <button type="button" pButton pRipple icon="pi pi-angle-double-down" [disabled]="disabled" (click)="moveBottom(sourcelist,source,selectedItemsSource,onSourceReorder)"></button>
            </div>
            <div class="p-picklist-list-wrapper p-picklist-source-wrapper">
                <div class="p-picklist-header" *ngIf="sourceHeader">
                    <div class="p-picklist-title">{{sourceHeader}}</div>
                </div>
                <div class="p-picklist-filter-container" *ngIf="filterBy && showSourceFilter !== false">
                    <div class="p-picklist-filter">
                        <input #sourceFilter type="text" role="textbox" (keyup)="onFilter($event,source,SOURCE_LIST)" class="p-picklist-filter-input p-inputtext p-component" [disabled]="disabled" [attr.placeholder]="sourceFilterPlaceholder" [attr.aria-label]="ariaSourceFilterLabel">
                        <span class="p-picklist-filter-icon pi pi-search"></span>
                    </div>
                </div>
                
                <ul #sourcelist class="p-picklist-list p-picklist-source" [ngClass]="{'p-picklist-list-highlight': listHighlightSource}"
                    [ngStyle]="sourceStyle" (dragover)="onListMouseMove($event,SOURCE_LIST)" (dragleave)="onListDragLeave()" (drop)="onListDrop($event, SOURCE_LIST)" role="listbox" aria-multiselectable="multiple">
                    <ng-template ngFor let-item [ngForOf]="source" [ngForTrackBy]="sourceTrackBy || trackBy" let-i="index" let-l="last">
                        <li class="p-picklist-droppoint" *ngIf="dragdrop" (dragover)="onDragOver($event, i, SOURCE_LIST)" (drop)="onDrop($event, i, SOURCE_LIST)" (dragleave)="onDragLeave($event, SOURCE_LIST)"
                        [ngClass]="{'p-picklist-droppoint-highlight': (i === dragOverItemIndexSource)}" [style.display]="isItemVisible(item, SOURCE_LIST) ? 'block' : 'none'"></li>
                        <li [ngClass]="{'p-picklist-item':true,'p-highlight':isSelected(item,selectedItemsSource),'p-disabled': disabled}" pRipple
                            (click)="onItemClick($event,item,selectedItemsSource,onSourceSelect)" (dblclick)="onSourceItemDblClick()" (touchend)="onItemTouchEnd($event)" (keydown)="onItemKeydown($event,item,selectedItemsSource,onSourceSelect)"
                            [style.display]="isItemVisible(item, SOURCE_LIST) ? 'block' : 'none'" tabindex="0" role="option" [attr.aria-selected]="isSelected(item, selectedItemsSource)"
                            [attr.draggable]="dragdrop" (dragstart)="onDragStart($event, i, SOURCE_LIST)" (dragend)="onDragEnd($event)">
                            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item, index: i}"></ng-container>
                        </li>
                        <li class="p-picklist-droppoint" *ngIf="dragdrop&&l" (dragover)="onDragOver($event, i + 1, SOURCE_LIST)" (drop)="onDrop($event, i + 1, SOURCE_LIST)" (dragleave)="onDragLeave($event, SOURCE_LIST)"
                        [ngClass]="{'p-picklist-droppoint-highlight': (i + 1 === dragOverItemIndexSource)}"></li>
                    </ng-template>
                    <ng-container *ngIf="(source == null || source.length === 0) && emptyMessageSourceTemplate">
                        <li class="p-picklist-empty-message">
                            <ng-container *ngTemplateOutlet="emptyMessageSourceTemplate"></ng-container>
                        </li>
                    </ng-container>
                </ul>
            </div>
            <div class="p-picklist-buttons p-picklist-transfer-buttons">
                <button type="button" pButton pRipple icon="pi pi-angle-right" [disabled]="disabled" (click)="moveRight()"></button>
                <button type="button" pButton pRipple icon="pi pi-angle-double-right" [disabled]="disabled" (click)="moveAllRight()"></button>
                <button type="button" pButton pRipple icon="pi pi-angle-left" [disabled]="disabled" (click)="moveLeft()"></button>
                <button type="button" pButton pRipple icon="pi pi-angle-double-left" [disabled]="disabled" (click)="moveAllLeft()"></button>
            </div>
            <div class="p-picklist-list-wrapper p-picklist-target-wrapper">
                <div class="p-picklist-header" *ngIf="targetHeader">
                    <div class="p-picklist-title" *ngIf="targetHeader">{{targetHeader}}</div>
                </div>
                <div class="p-picklist-filter-container" *ngIf="filterBy && showTargetFilter !== false">
                    <div class="p-picklist-filter">
                        <input #targetFilter type="text" role="textbox" (keyup)="onFilter($event,target,TARGET_LIST)" class="p-picklist-filter-input p-inputtext p-component" [disabled]="disabled" [attr.placeholder]="targetFilterPlaceholder" [attr.aria-label]="ariaTargetFilterLabel">
                        <span class="p-picklist-filter-icon pi pi-search"></span>
                    </div>
                </div>
                <ul #targetlist class="p-picklist-list p-picklist-target" [ngClass]="{'p-picklist-list-highlight': listHighlightTarget}"
                    [ngStyle]="targetStyle" (dragover)="onListMouseMove($event,TARGET_LIST)" (dragleave)="onListDragLeave()" (drop)="onListDrop($event,TARGET_LIST)" role="listbox" aria-multiselectable="multiple">
                    <ng-template ngFor let-item [ngForOf]="target" [ngForTrackBy]="targetTrackBy || trackBy" let-i="index" let-l="last">
                        <li class="p-picklist-droppoint" *ngIf="dragdrop" (dragover)="onDragOver($event, i, TARGET_LIST)" (drop)="onDrop($event, i, TARGET_LIST)" (dragleave)="onDragLeave($event, TARGET_LIST)"
                        [ngClass]="{'p-picklist-droppoint-highlight': (i === dragOverItemIndexTarget)}" [style.display]="isItemVisible(item, TARGET_LIST) ? 'block' : 'none'"></li>
                        <li [ngClass]="{'p-picklist-item':true,'p-highlight':isSelected(item,selectedItemsTarget), 'p-disabled': disabled}" pRipple
                            (click)="onItemClick($event,item,selectedItemsTarget,onTargetSelect)" (dblclick)="onTargetItemDblClick()" (touchend)="onItemTouchEnd($event)" (keydown)="onItemKeydown($event,item,selectedItemsTarget,onTargetSelect)"
                            [style.display]="isItemVisible(item, TARGET_LIST) ? 'block' : 'none'" tabindex="0" role="option" [attr.aria-selected]="isSelected(item, selectedItemsTarget)"
                            [attr.draggable]="dragdrop" (dragstart)="onDragStart($event, i, TARGET_LIST)" (dragend)="onDragEnd($event)">
                            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item, index: i}"></ng-container>
                        </li>
                        <li class="p-picklist-droppoint" *ngIf="dragdrop&&l" (dragover)="onDragOver($event, i + 1, TARGET_LIST)" (drop)="onDrop($event, i + 1, TARGET_LIST)" (dragleave)="onDragLeave($event, TARGET_LIST)"
                        [ngClass]="{'p-picklist-droppoint-highlight': (i + 1 === dragOverItemIndexTarget)}"></li>
                    </ng-template>
                    <ng-container *ngIf="(target == null || target.length === 0) && emptyMessageTargetTemplate">
                        <li class="p-picklist-empty-message">
                            <ng-container *ngTemplateOutlet="emptyMessageTargetTemplate"></ng-container>
                        </li>
                    </ng-container>
                </ul>
            </div>
            <div class="p-picklist-buttons p-picklist-target-controls" *ngIf="showTargetControls">
                <button type="button" pButton pRipple icon="pi pi-angle-up" [disabled]="disabled" (click)="moveUp(targetlist,target,selectedItemsTarget,onTargetReorder)"></button>
                <button type="button" pButton pRipple icon="pi pi-angle-double-up" [disabled]="disabled" (click)="moveTop(targetlist,target,selectedItemsTarget,onTargetReorder)"></button>
                <button type="button" pButton pRipple icon="pi pi-angle-down" [disabled]="disabled" (click)="moveDown(targetlist,target,selectedItemsTarget,onTargetReorder)"></button>
                <button type="button" pButton pRipple icon="pi pi-angle-double-down" [disabled]="disabled" (click)="moveBottom(targetlist,target,selectedItemsTarget,onTargetReorder)"></button>
            </div>
        </div>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-picklist,.p-picklist-buttons{display:-ms-flexbox;display:flex}.p-picklist-buttons{-ms-flex-direction:column;-ms-flex-pack:center;flex-direction:column;justify-content:center}.p-picklist-list-wrapper{-ms-flex:1 1 50%;flex:1 1 50%}.p-picklist-list{list-style-type:none;margin:0;max-height:24rem;min-height:12rem;overflow:auto;padding:0}.p-picklist-item{cursor:pointer;overflow:hidden}.p-picklist-filter,.p-picklist-item{position:relative}.p-picklist-filter-icon{margin-top:-.5rem;position:absolute;top:50%}.p-picklist-filter-input{width:100%}.p-picklist-droppoint{height:6px}"]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc0.ChangeDetectorRef }]; }, { trackBy: [{
            type: Input
        }], showSourceFilter: [{
            type: Input
        }], showTargetFilter: [{
            type: Input
        }], metaKeySelection: [{
            type: Input
        }], showSourceControls: [{
            type: Input
        }], showTargetControls: [{
            type: Input
        }], disabled: [{
            type: Input
        }], filterMatchMode: [{
            type: Input
        }], onMoveToSource: [{
            type: Output
        }], onMoveAllToSource: [{
            type: Output
        }], onMoveAllToTarget: [{
            type: Output
        }], onMoveToTarget: [{
            type: Output
        }], onSourceReorder: [{
            type: Output
        }], onTargetReorder: [{
            type: Output
        }], onSourceSelect: [{
            type: Output
        }], onTargetSelect: [{
            type: Output
        }], onSourceFilter: [{
            type: Output
        }], onTargetFilter: [{
            type: Output
        }], source: [{
            type: Input
        }], target: [{
            type: Input
        }], sourceHeader: [{
            type: Input
        }], targetHeader: [{
            type: Input
        }], responsive: [{
            type: Input
        }], filterBy: [{
            type: Input
        }], filterLocale: [{
            type: Input
        }], sourceTrackBy: [{
            type: Input
        }], targetTrackBy: [{
            type: Input
        }], dragdrop: [{
            type: Input
        }], style: [{
            type: Input
        }], styleClass: [{
            type: Input
        }], sourceStyle: [{
            type: Input
        }], targetStyle: [{
            type: Input
        }], sourceFilterPlaceholder: [{
            type: Input
        }], targetFilterPlaceholder: [{
            type: Input
        }], ariaSourceFilterLabel: [{
            type: Input
        }], ariaTargetFilterLabel: [{
            type: Input
        }], listViewSourceChild: [{
            type: ViewChild,
            args: ['sourcelist']
        }], listViewTargetChild: [{
            type: ViewChild,
            args: ['targetlist']
        }], sourceFilterViewChild: [{
            type: ViewChild,
            args: ['sourceFilter']
        }], targetFilterViewChild: [{
            type: ViewChild,
            args: ['targetFilter']
        }], templates: [{
            type: ContentChildren,
            args: [PrimeTemplate]
        }] }); })();
class PickListModule {
}
PickListModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: PickListModule });
PickListModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function PickListModule_Factory(t) { return new (t || PickListModule)(); }, imports: [[CommonModule, ButtonModule, SharedModule, RippleModule], SharedModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(PickListModule, { declarations: function () { return [PickList]; }, imports: function () { return [CommonModule, ButtonModule, SharedModule, RippleModule]; }, exports: function () { return [PickList, SharedModule]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(PickListModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, ButtonModule, SharedModule, RippleModule],
                exports: [PickList, SharedModule],
                declarations: [PickList]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { PickList, PickListModule };

//# sourceMappingURL=primeng-picklist.js.map