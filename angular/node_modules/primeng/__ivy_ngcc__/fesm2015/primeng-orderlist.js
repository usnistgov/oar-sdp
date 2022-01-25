import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, ChangeDetectorRef, Input, Output, ViewChild, ContentChildren, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ObjectUtils, FilterUtils } from 'primeng/utils';
import { RippleModule } from 'primeng/ripple';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from 'primeng/button';
import * as ɵngcc3 from 'primeng/ripple';

const _c0 = ["listelement"];
function OrderList_div_7_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 12);
    ɵngcc0.ɵɵelementStart(1, "div", 13);
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(ctx_r0.header);
} }
function OrderList_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r5 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 14);
    ɵngcc0.ɵɵelementStart(1, "div", 15);
    ɵngcc0.ɵɵelementStart(2, "input", 16);
    ɵngcc0.ɵɵlistener("keyup", function OrderList_div_8_Template_input_keyup_2_listener($event) { ɵngcc0.ɵɵrestoreView(_r5); const ctx_r4 = ɵngcc0.ɵɵnextContext(); return ctx_r4.onFilterKeyup($event); });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelement(3, "span", 17);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵattribute("placeholder", ctx_r1.filterPlaceholder)("aria-label", ctx_r1.ariaFilterLabel);
} }
const _c1 = function (a0) { return { "p-orderlist-droppoint-highlight": a0 }; };
function OrderList_ng_template_11_li_0_Template(rf, ctx) { if (rf & 1) {
    const _r13 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "li", 21);
    ɵngcc0.ɵɵlistener("dragover", function OrderList_ng_template_11_li_0_Template_li_dragover_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r13); const i_r7 = ɵngcc0.ɵɵnextContext().index; const ctx_r12 = ɵngcc0.ɵɵnextContext(); return ctx_r12.onDragOver($event, i_r7); })("drop", function OrderList_ng_template_11_li_0_Template_li_drop_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r13); const i_r7 = ɵngcc0.ɵɵnextContext().index; const ctx_r15 = ɵngcc0.ɵɵnextContext(); return ctx_r15.onDrop($event, i_r7); })("dragleave", function OrderList_ng_template_11_li_0_Template_li_dragleave_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r13); const ctx_r17 = ɵngcc0.ɵɵnextContext(2); return ctx_r17.onDragLeave($event); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r7 = ɵngcc0.ɵɵnextContext().index;
    const ctx_r9 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(1, _c1, i_r7 === ctx_r9.dragOverItemIndex));
} }
function OrderList_ng_template_11_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
function OrderList_ng_template_11_li_3_Template(rf, ctx) { if (rf & 1) {
    const _r20 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "li", 21);
    ɵngcc0.ɵɵlistener("dragover", function OrderList_ng_template_11_li_3_Template_li_dragover_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r20); const i_r7 = ɵngcc0.ɵɵnextContext().index; const ctx_r19 = ɵngcc0.ɵɵnextContext(); return ctx_r19.onDragOver($event, i_r7 + 1); })("drop", function OrderList_ng_template_11_li_3_Template_li_drop_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r20); const i_r7 = ɵngcc0.ɵɵnextContext().index; const ctx_r22 = ɵngcc0.ɵɵnextContext(); return ctx_r22.onDrop($event, i_r7 + 1); })("dragleave", function OrderList_ng_template_11_li_3_Template_li_dragleave_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r20); const ctx_r24 = ɵngcc0.ɵɵnextContext(2); return ctx_r24.onDragLeave($event); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r7 = ɵngcc0.ɵɵnextContext().index;
    const ctx_r11 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(1, _c1, i_r7 + 1 === ctx_r11.dragOverItemIndex));
} }
const _c2 = function (a0) { return { "p-highlight": a0 }; };
const _c3 = function (a0, a1) { return { $implicit: a0, index: a1 }; };
function OrderList_ng_template_11_Template(rf, ctx) { if (rf & 1) {
    const _r27 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵtemplate(0, OrderList_ng_template_11_li_0_Template, 1, 3, "li", 18);
    ɵngcc0.ɵɵelementStart(1, "li", 19);
    ɵngcc0.ɵɵlistener("click", function OrderList_ng_template_11_Template_li_click_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r27); const item_r6 = ctx.$implicit; const i_r7 = ctx.index; const ctx_r26 = ɵngcc0.ɵɵnextContext(); return ctx_r26.onItemClick($event, item_r6, i_r7); })("touchend", function OrderList_ng_template_11_Template_li_touchend_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r27); const ctx_r28 = ɵngcc0.ɵɵnextContext(); return ctx_r28.onItemTouchEnd($event); })("keydown", function OrderList_ng_template_11_Template_li_keydown_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r27); const item_r6 = ctx.$implicit; const i_r7 = ctx.index; const ctx_r29 = ɵngcc0.ɵɵnextContext(); return ctx_r29.onItemKeydown($event, item_r6, i_r7); })("dragstart", function OrderList_ng_template_11_Template_li_dragstart_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r27); const i_r7 = ctx.index; const ctx_r30 = ɵngcc0.ɵɵnextContext(); return ctx_r30.onDragStart($event, i_r7); })("dragend", function OrderList_ng_template_11_Template_li_dragend_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r27); const ctx_r31 = ɵngcc0.ɵɵnextContext(); return ctx_r31.onDragEnd($event); });
    ɵngcc0.ɵɵtemplate(2, OrderList_ng_template_11_ng_container_2_Template, 1, 0, "ng-container", 20);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(3, OrderList_ng_template_11_li_3_Template, 1, 3, "li", 18);
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const i_r7 = ctx.index;
    const l_r8 = ctx.last;
    const ctx_r3 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngIf", ctx_r3.dragdrop && ctx_r3.isItemVisible(item_r6));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵstyleProp("display", ctx_r3.isItemVisible(item_r6) ? "block" : "none");
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(9, _c2, ctx_r3.isSelected(item_r6)));
    ɵngcc0.ɵɵattribute("aria-selected", ctx_r3.isSelected(item_r6))("draggable", ctx_r3.dragdrop);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r3.itemTemplate)("ngTemplateOutletContext", ɵngcc0.ɵɵpureFunction2(11, _c3, item_r6, i_r7));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r3.dragdrop && l_r8);
} }
const _c4 = function (a1, a2) { return { "p-orderlist p-component": true, "p-orderlist-controls-left": a1, "p-orderlist-controls-right": a2 }; };
class OrderList {
    constructor(el, cd) {
        this.el = el;
        this.cd = cd;
        this.metaKeySelection = true;
        this.controlsPosition = 'left';
        this.filterMatchMode = "contains";
        this.selectionChange = new EventEmitter();
        this.trackBy = (index, item) => item;
        this.onReorder = new EventEmitter();
        this.onSelectionChange = new EventEmitter();
        this.onFilterEvent = new EventEmitter();
    }
    get selection() {
        return this._selection;
    }
    set selection(val) {
        this._selection = val;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    ngAfterViewChecked() {
        if (this.movedUp || this.movedDown) {
            let listItems = DomHandler.find(this.listViewChild.nativeElement, 'li.p-highlight');
            let listItem;
            if (listItems.length > 0) {
                if (this.movedUp)
                    listItem = listItems[0];
                else
                    listItem = listItems[listItems.length - 1];
                DomHandler.scrollInView(this.listViewChild.nativeElement, listItem);
            }
            this.movedUp = false;
            this.movedDown = false;
        }
    }
    get value() {
        return this._value;
    }
    set value(val) {
        this._value = val;
        if (this.filterValue) {
            this.filter();
        }
    }
    onItemClick(event, item, index) {
        this.itemTouched = false;
        let selectedIndex = ObjectUtils.findIndexInList(item, this.selection);
        let selected = (selectedIndex != -1);
        let metaSelection = this.itemTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            let metaKey = (event.metaKey || event.ctrlKey || event.shiftKey);
            if (selected && metaKey) {
                this._selection = this._selection.filter((val, index) => index !== selectedIndex);
            }
            else {
                this._selection = (metaKey) ? this._selection ? [...this._selection] : [] : [];
                ObjectUtils.insertIntoOrderedArray(item, index, this._selection, this.value);
            }
        }
        else {
            if (selected) {
                this._selection = this._selection.filter((val, index) => index !== selectedIndex);
            }
            else {
                this._selection = this._selection ? [...this._selection] : [];
                ObjectUtils.insertIntoOrderedArray(item, index, this._selection, this.value);
            }
        }
        //binding
        this.selectionChange.emit(this._selection);
        //event
        this.onSelectionChange.emit({ originalEvent: event, value: this._selection });
    }
    onFilterKeyup(event) {
        this.filterValue = event.target.value.trim().toLocaleLowerCase(this.filterLocale);
        this.filter();
        this.onFilterEvent.emit({
            originalEvent: event,
            value: this.visibleOptions
        });
    }
    filter() {
        let searchFields = this.filterBy.split(',');
        this.visibleOptions = FilterUtils.filter(this.value, searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
    }
    isItemVisible(item) {
        if (this.filterValue && this.filterValue.trim().length) {
            for (let i = 0; i < this.visibleOptions.length; i++) {
                if (item == this.visibleOptions[i]) {
                    return true;
                }
            }
        }
        else {
            return true;
        }
    }
    onItemTouchEnd(event) {
        this.itemTouched = true;
    }
    isSelected(item) {
        return ObjectUtils.findIndexInList(item, this.selection) != -1;
    }
    moveUp(event) {
        if (this.selection) {
            for (let i = 0; i < this.selection.length; i++) {
                let selectedItem = this.selection[i];
                let selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, this.value);
                if (selectedItemIndex != 0) {
                    let movedItem = this.value[selectedItemIndex];
                    let temp = this.value[selectedItemIndex - 1];
                    this.value[selectedItemIndex - 1] = movedItem;
                    this.value[selectedItemIndex] = temp;
                }
                else {
                    break;
                }
            }
            this.movedUp = true;
            this.onReorder.emit(event);
        }
    }
    moveTop(event) {
        if (this.selection) {
            for (let i = this.selection.length - 1; i >= 0; i--) {
                let selectedItem = this.selection[i];
                let selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, this.value);
                if (selectedItemIndex != 0) {
                    let movedItem = this.value.splice(selectedItemIndex, 1)[0];
                    this.value.unshift(movedItem);
                }
                else {
                    break;
                }
            }
            this.onReorder.emit(event);
            this.listViewChild.nativeElement.scrollTop = 0;
        }
    }
    moveDown(event) {
        if (this.selection) {
            for (let i = this.selection.length - 1; i >= 0; i--) {
                let selectedItem = this.selection[i];
                let selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, this.value);
                if (selectedItemIndex != (this.value.length - 1)) {
                    let movedItem = this.value[selectedItemIndex];
                    let temp = this.value[selectedItemIndex + 1];
                    this.value[selectedItemIndex + 1] = movedItem;
                    this.value[selectedItemIndex] = temp;
                }
                else {
                    break;
                }
            }
            this.movedDown = true;
            this.onReorder.emit(event);
        }
    }
    moveBottom(event) {
        if (this.selection) {
            for (let i = 0; i < this.selection.length; i++) {
                let selectedItem = this.selection[i];
                let selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, this.value);
                if (selectedItemIndex != (this.value.length - 1)) {
                    let movedItem = this.value.splice(selectedItemIndex, 1)[0];
                    this.value.push(movedItem);
                }
                else {
                    break;
                }
            }
            this.onReorder.emit(event);
            this.listViewChild.nativeElement.scrollTop = this.listViewChild.nativeElement.scrollHeight;
        }
    }
    onDragStart(event, index) {
        event.dataTransfer.setData('text', 'b'); // For firefox
        event.target.blur();
        this.dragging = true;
        this.draggedItemIndex = index;
    }
    onDragOver(event, index) {
        if (this.dragging && this.draggedItemIndex !== index && this.draggedItemIndex + 1 !== index) {
            this.dragOverItemIndex = index;
            event.preventDefault();
        }
    }
    onDragLeave(event) {
        this.dragOverItemIndex = null;
    }
    onDrop(event, index) {
        let dropIndex = (this.draggedItemIndex > index) ? index : (index === 0) ? 0 : index - 1;
        ObjectUtils.reorderArray(this.value, this.draggedItemIndex, dropIndex);
        this.dragOverItemIndex = null;
        this.onReorder.emit(event);
        event.preventDefault();
    }
    onDragEnd(event) {
        this.dragging = false;
    }
    onListMouseMove(event) {
        if (this.dragging) {
            let offsetY = this.listViewChild.nativeElement.getBoundingClientRect().top + document.body.scrollTop;
            let bottomDiff = (offsetY + this.listViewChild.nativeElement.clientHeight) - event.pageY;
            let topDiff = (event.pageY - offsetY);
            if (bottomDiff < 25 && bottomDiff > 0)
                this.listViewChild.nativeElement.scrollTop += 15;
            else if (topDiff < 25 && topDiff > 0)
                this.listViewChild.nativeElement.scrollTop -= 15;
        }
    }
    onItemKeydown(event, item, index) {
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
                this.onItemClick(event, item, index);
                event.preventDefault();
                break;
        }
    }
    findNextItem(item) {
        let nextItem = item.nextElementSibling;
        if (nextItem)
            return !DomHandler.hasClass(nextItem, 'p-orderlist-item') || DomHandler.isHidden(nextItem) ? this.findNextItem(nextItem) : nextItem;
        else
            return null;
    }
    findPrevItem(item) {
        let prevItem = item.previousElementSibling;
        if (prevItem)
            return !DomHandler.hasClass(prevItem, 'p-orderlist-item') || DomHandler.isHidden(prevItem) ? this.findPrevItem(prevItem) : prevItem;
        else
            return null;
    }
}
OrderList.ɵfac = function OrderList_Factory(t) { return new (t || OrderList)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef)); };
OrderList.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: OrderList, selectors: [["p-orderList"]], contentQueries: function OrderList_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵngcc0.ɵɵcontentQuery(dirIndex, PrimeTemplate, false);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.templates = _t);
    } }, viewQuery: function OrderList_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵviewQuery(_c0, true);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.listViewChild = _t.first);
    } }, inputs: { metaKeySelection: "metaKeySelection", controlsPosition: "controlsPosition", filterMatchMode: "filterMatchMode", trackBy: "trackBy", selection: "selection", value: "value", header: "header", style: "style", styleClass: "styleClass", listStyle: "listStyle", responsive: "responsive", filterBy: "filterBy", filterPlaceholder: "filterPlaceholder", filterLocale: "filterLocale", dragdrop: "dragdrop", ariaFilterLabel: "ariaFilterLabel" }, outputs: { selectionChange: "selectionChange", onReorder: "onReorder", onSelectionChange: "onSelectionChange", onFilterEvent: "onFilterEvent" }, decls: 12, vars: 12, consts: [[3, "ngClass", "ngStyle"], [1, "p-orderlist-controls"], ["type", "button", "pButton", "", "pRipple", "", "icon", "pi pi-angle-up", 3, "click"], ["type", "button", "pButton", "", "pRipple", "", "icon", "pi pi-angle-double-up", 3, "click"], ["type", "button", "pButton", "", "pRipple", "", "icon", "pi pi-angle-down", 3, "click"], ["type", "button", "pButton", "", "pRipple", "", "icon", "pi pi-angle-double-down", 3, "click"], [1, "p-orderlist-list-container"], ["class", "p-orderlist-header", 4, "ngIf"], ["class", "p-orderlist-filter-container", 4, "ngIf"], [1, "p-orderlist-list", 3, "ngStyle", "dragover"], ["listelement", ""], ["ngFor", "", 3, "ngForTrackBy", "ngForOf"], [1, "p-orderlist-header"], [1, "p-orderlist-title"], [1, "p-orderlist-filter-container"], [1, "p-orderlist-filter"], ["type", "text", "role", "textbox", 1, "p-orderlist-filter-input", "p-inputtext", "p-component", 3, "keyup"], [1, "p-orderlist-filter-icon", "pi", "pi-search"], ["class", "p-orderlist-droppoint", 3, "ngClass", "dragover", "drop", "dragleave", 4, "ngIf"], ["tabindex", "0", "pRipple", "", "role", "option", 1, "p-orderlist-item", 3, "ngClass", "click", "touchend", "keydown", "dragstart", "dragend"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "p-orderlist-droppoint", 3, "ngClass", "dragover", "drop", "dragleave"]], template: function OrderList_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "div", 1);
        ɵngcc0.ɵɵelementStart(2, "button", 2);
        ɵngcc0.ɵɵlistener("click", function OrderList_Template_button_click_2_listener($event) { return ctx.moveUp($event); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(3, "button", 3);
        ɵngcc0.ɵɵlistener("click", function OrderList_Template_button_click_3_listener($event) { return ctx.moveTop($event); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(4, "button", 4);
        ɵngcc0.ɵɵlistener("click", function OrderList_Template_button_click_4_listener($event) { return ctx.moveDown($event); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(5, "button", 5);
        ɵngcc0.ɵɵlistener("click", function OrderList_Template_button_click_5_listener($event) { return ctx.moveBottom($event); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(6, "div", 6);
        ɵngcc0.ɵɵtemplate(7, OrderList_div_7_Template, 3, 1, "div", 7);
        ɵngcc0.ɵɵtemplate(8, OrderList_div_8_Template, 4, 2, "div", 8);
        ɵngcc0.ɵɵelementStart(9, "ul", 9, 10);
        ɵngcc0.ɵɵlistener("dragover", function OrderList_Template_ul_dragover_9_listener($event) { return ctx.onListMouseMove($event); });
        ɵngcc0.ɵɵtemplate(11, OrderList_ng_template_11_Template, 4, 14, "ng-template", 11);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵclassMap(ctx.styleClass);
        ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction2(9, _c4, ctx.controlsPosition === "left", ctx.controlsPosition === "right"))("ngStyle", ctx.style);
        ɵngcc0.ɵɵadvance(7);
        ɵngcc0.ɵɵproperty("ngIf", ctx.header);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.filterBy);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngStyle", ctx.listStyle);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngForTrackBy", ctx.trackBy)("ngForOf", ctx.value);
    } }, directives: [ɵngcc1.NgClass, ɵngcc1.NgStyle, ɵngcc2.ButtonDirective, ɵngcc3.Ripple, ɵngcc1.NgIf, ɵngcc1.NgForOf, ɵngcc1.NgTemplateOutlet], styles: [".p-orderlist,.p-orderlist-controls{display:-ms-flexbox;display:flex}.p-orderlist-controls{-ms-flex-direction:column;-ms-flex-pack:center;flex-direction:column;justify-content:center}.p-orderlist-list-container{-ms-flex:1 1 auto;flex:1 1 auto}.p-orderlist-list{list-style-type:none;margin:0;max-height:24rem;min-height:12rem;overflow:auto;padding:0}.p-orderlist-item{cursor:pointer;overflow:hidden;position:relative}.p-orderlist.p-state-disabled .p-button,.p-orderlist.p-state-disabled .p-orderlist-item{cursor:default}.p-orderlist.p-state-disabled .p-orderlist-list{overflow:hidden}.p-orderlist-filter{position:relative}.p-orderlist-filter-icon{margin-top:-.5rem;position:absolute;top:50%}.p-orderlist-filter-input{width:100%}.p-orderlist-controls-right .p-orderlist-controls{-ms-flex-order:2;order:2}.p-orderlist-controls-right .p-orderlist-list-container{-ms-flex-order:1;order:1}.p-orderlist-droppoint{height:6px}"], encapsulation: 2, changeDetection: 0 });
OrderList.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
OrderList.propDecorators = {
    header: [{ type: Input }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    listStyle: [{ type: Input }],
    responsive: [{ type: Input }],
    filterBy: [{ type: Input }],
    filterPlaceholder: [{ type: Input }],
    filterLocale: [{ type: Input }],
    metaKeySelection: [{ type: Input }],
    dragdrop: [{ type: Input }],
    controlsPosition: [{ type: Input }],
    ariaFilterLabel: [{ type: Input }],
    filterMatchMode: [{ type: Input }],
    selectionChange: [{ type: Output }],
    trackBy: [{ type: Input }],
    onReorder: [{ type: Output }],
    onSelectionChange: [{ type: Output }],
    onFilterEvent: [{ type: Output }],
    listViewChild: [{ type: ViewChild, args: ['listelement',] }],
    templates: [{ type: ContentChildren, args: [PrimeTemplate,] }],
    selection: [{ type: Input }],
    value: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(OrderList, [{
        type: Component,
        args: [{
                selector: 'p-orderList',
                template: `
        <div [ngClass]="{'p-orderlist p-component': true, 'p-orderlist-controls-left': controlsPosition === 'left',
                    'p-orderlist-controls-right': controlsPosition === 'right'}" [ngStyle]="style" [class]="styleClass">
            <div class="p-orderlist-controls">
                <button type="button" pButton pRipple icon="pi pi-angle-up" (click)="moveUp($event)"></button>
                <button type="button" pButton pRipple icon="pi pi-angle-double-up" (click)="moveTop($event)"></button>
                <button type="button" pButton pRipple icon="pi pi-angle-down" (click)="moveDown($event)"></button>
                <button type="button" pButton pRipple icon="pi pi-angle-double-down" (click)="moveBottom($event)"></button>
            </div>
            <div class="p-orderlist-list-container">
                <div class="p-orderlist-header" *ngIf="header">
                    <div class="p-orderlist-title">{{header}}</div>
                </div>
                <div class="p-orderlist-filter-container" *ngIf="filterBy">
                    <div class="p-orderlist-filter">
                        <input type="text" role="textbox" (keyup)="onFilterKeyup($event)" class="p-orderlist-filter-input p-inputtext p-component" [attr.placeholder]="filterPlaceholder" [attr.aria-label]="ariaFilterLabel">
                        <span class="p-orderlist-filter-icon pi pi-search"></span>
                    </div>
                </div>
                <ul #listelement class="p-orderlist-list" [ngStyle]="listStyle" (dragover)="onListMouseMove($event)">
                    <ng-template ngFor [ngForTrackBy]="trackBy" let-item [ngForOf]="value" let-i="index" let-l="last">
                        <li class="p-orderlist-droppoint" *ngIf="dragdrop && isItemVisible(item)" (dragover)="onDragOver($event, i)" (drop)="onDrop($event, i)" (dragleave)="onDragLeave($event)"
                            [ngClass]="{'p-orderlist-droppoint-highlight': (i === dragOverItemIndex)}"></li>
                        <li class="p-orderlist-item" tabindex="0" [ngClass]="{'p-highlight':isSelected(item)}" pRipple
                            (click)="onItemClick($event,item,i)" (touchend)="onItemTouchEnd($event)" (keydown)="onItemKeydown($event,item,i)"
                            [style.display]="isItemVisible(item) ? 'block' : 'none'" role="option" [attr.aria-selected]="isSelected(item)"
                            [attr.draggable]="dragdrop" (dragstart)="onDragStart($event, i)" (dragend)="onDragEnd($event)">
                            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item, index: i}"></ng-container>
                        </li>
                        <li class="p-orderlist-droppoint" *ngIf="dragdrop && l" (dragover)="onDragOver($event, i + 1)" (drop)="onDrop($event, i + 1)" (dragleave)="onDragLeave($event)"
                            [ngClass]="{'p-orderlist-droppoint-highlight': (i + 1 === dragOverItemIndex)}"></li>
                    </ng-template>
                </ul>
            </div>
        </div>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-orderlist,.p-orderlist-controls{display:-ms-flexbox;display:flex}.p-orderlist-controls{-ms-flex-direction:column;-ms-flex-pack:center;flex-direction:column;justify-content:center}.p-orderlist-list-container{-ms-flex:1 1 auto;flex:1 1 auto}.p-orderlist-list{list-style-type:none;margin:0;max-height:24rem;min-height:12rem;overflow:auto;padding:0}.p-orderlist-item{cursor:pointer;overflow:hidden;position:relative}.p-orderlist.p-state-disabled .p-button,.p-orderlist.p-state-disabled .p-orderlist-item{cursor:default}.p-orderlist.p-state-disabled .p-orderlist-list{overflow:hidden}.p-orderlist-filter{position:relative}.p-orderlist-filter-icon{margin-top:-.5rem;position:absolute;top:50%}.p-orderlist-filter-input{width:100%}.p-orderlist-controls-right .p-orderlist-controls{-ms-flex-order:2;order:2}.p-orderlist-controls-right .p-orderlist-list-container{-ms-flex-order:1;order:1}.p-orderlist-droppoint{height:6px}"]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc0.ChangeDetectorRef }]; }, { metaKeySelection: [{
            type: Input
        }], controlsPosition: [{
            type: Input
        }], filterMatchMode: [{
            type: Input
        }], selectionChange: [{
            type: Output
        }], trackBy: [{
            type: Input
        }], onReorder: [{
            type: Output
        }], onSelectionChange: [{
            type: Output
        }], onFilterEvent: [{
            type: Output
        }], selection: [{
            type: Input
        }], value: [{
            type: Input
        }], header: [{
            type: Input
        }], style: [{
            type: Input
        }], styleClass: [{
            type: Input
        }], listStyle: [{
            type: Input
        }], responsive: [{
            type: Input
        }], filterBy: [{
            type: Input
        }], filterPlaceholder: [{
            type: Input
        }], filterLocale: [{
            type: Input
        }], dragdrop: [{
            type: Input
        }], ariaFilterLabel: [{
            type: Input
        }], listViewChild: [{
            type: ViewChild,
            args: ['listelement']
        }], templates: [{
            type: ContentChildren,
            args: [PrimeTemplate]
        }] }); })();
class OrderListModule {
}
OrderListModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: OrderListModule });
OrderListModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function OrderListModule_Factory(t) { return new (t || OrderListModule)(); }, imports: [[CommonModule, ButtonModule, SharedModule, RippleModule], SharedModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(OrderListModule, { declarations: function () { return [OrderList]; }, imports: function () { return [CommonModule, ButtonModule, SharedModule, RippleModule]; }, exports: function () { return [OrderList, SharedModule]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(OrderListModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, ButtonModule, SharedModule, RippleModule],
                exports: [OrderList, SharedModule],
                declarations: [OrderList]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { OrderList, OrderListModule };

//# sourceMappingURL=primeng-orderlist.js.map