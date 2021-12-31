var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { NgModule, Component, ElementRef, AfterViewChecked, AfterContentInit, Input, Output, ContentChildren, QueryList, TemplateRef, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SharedModule, PrimeTemplate } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ObjectUtils } from 'primeng/utils';
import { FilterUtils } from 'primeng/utils';
var OrderList = /** @class */ (function () {
    function OrderList(el) {
        this.el = el;
        this.metaKeySelection = true;
        this.controlsPosition = 'left';
        this.filterMatchMode = "contains";
        this.selectionChange = new EventEmitter();
        this.trackBy = function (index, item) { return item; };
        this.onReorder = new EventEmitter();
        this.onSelectionChange = new EventEmitter();
        this.onFilterEvent = new EventEmitter();
    }
    Object.defineProperty(OrderList.prototype, "selection", {
        get: function () {
            return this._selection;
        },
        set: function (val) {
            this._selection = val;
        },
        enumerable: true,
        configurable: true
    });
    OrderList.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    OrderList.prototype.ngAfterViewChecked = function () {
        if (this.movedUp || this.movedDown) {
            var listItems = DomHandler.find(this.listViewChild.nativeElement, 'li.ui-state-highlight');
            var listItem = void 0;
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
    };
    Object.defineProperty(OrderList.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            this._value = val;
            if (this.filterValue) {
                this.filter();
            }
        },
        enumerable: true,
        configurable: true
    });
    OrderList.prototype.onItemClick = function (event, item, index) {
        this.itemTouched = false;
        var selectedIndex = ObjectUtils.findIndexInList(item, this.selection);
        var selected = (selectedIndex != -1);
        var metaSelection = this.itemTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            var metaKey = (event.metaKey || event.ctrlKey || event.shiftKey);
            if (selected && metaKey) {
                this._selection = this._selection.filter(function (val, index) { return index !== selectedIndex; });
            }
            else {
                this._selection = (metaKey) ? this._selection ? __spread(this._selection) : [] : [];
                ObjectUtils.insertIntoOrderedArray(item, index, this._selection, this.value);
            }
        }
        else {
            if (selected) {
                this._selection = this._selection.filter(function (val, index) { return index !== selectedIndex; });
            }
            else {
                this._selection = this._selection ? __spread(this._selection) : [];
                ObjectUtils.insertIntoOrderedArray(item, index, this._selection, this.value);
            }
        }
        //binding
        this.selectionChange.emit(this._selection);
        //event
        this.onSelectionChange.emit({ originalEvent: event, value: this._selection });
    };
    OrderList.prototype.onFilterKeyup = function (event) {
        this.filterValue = event.target.value.trim().toLocaleLowerCase(this.filterLocale);
        this.filter();
        this.onFilterEvent.emit({
            originalEvent: event,
            value: this.visibleOptions
        });
    };
    OrderList.prototype.filter = function () {
        var searchFields = this.filterBy.split(',');
        this.visibleOptions = FilterUtils.filter(this.value, searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
    };
    OrderList.prototype.isItemVisible = function (item) {
        if (this.filterValue && this.filterValue.trim().length) {
            for (var i = 0; i < this.visibleOptions.length; i++) {
                if (item == this.visibleOptions[i]) {
                    return true;
                }
            }
        }
        else {
            return true;
        }
    };
    OrderList.prototype.onItemTouchEnd = function (event) {
        this.itemTouched = true;
    };
    OrderList.prototype.isSelected = function (item) {
        return ObjectUtils.findIndexInList(item, this.selection) != -1;
    };
    OrderList.prototype.moveUp = function (event) {
        if (this.selection) {
            for (var i = 0; i < this.selection.length; i++) {
                var selectedItem = this.selection[i];
                var selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, this.value);
                if (selectedItemIndex != 0) {
                    var movedItem = this.value[selectedItemIndex];
                    var temp = this.value[selectedItemIndex - 1];
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
    };
    OrderList.prototype.moveTop = function (event) {
        if (this.selection) {
            for (var i = this.selection.length - 1; i >= 0; i--) {
                var selectedItem = this.selection[i];
                var selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, this.value);
                if (selectedItemIndex != 0) {
                    var movedItem = this.value.splice(selectedItemIndex, 1)[0];
                    this.value.unshift(movedItem);
                }
                else {
                    break;
                }
            }
            this.onReorder.emit(event);
            this.listViewChild.nativeElement.scrollTop = 0;
        }
    };
    OrderList.prototype.moveDown = function (event) {
        if (this.selection) {
            for (var i = this.selection.length - 1; i >= 0; i--) {
                var selectedItem = this.selection[i];
                var selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, this.value);
                if (selectedItemIndex != (this.value.length - 1)) {
                    var movedItem = this.value[selectedItemIndex];
                    var temp = this.value[selectedItemIndex + 1];
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
    };
    OrderList.prototype.moveBottom = function (event) {
        if (this.selection) {
            for (var i = 0; i < this.selection.length; i++) {
                var selectedItem = this.selection[i];
                var selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, this.value);
                if (selectedItemIndex != (this.value.length - 1)) {
                    var movedItem = this.value.splice(selectedItemIndex, 1)[0];
                    this.value.push(movedItem);
                }
                else {
                    break;
                }
            }
            this.onReorder.emit(event);
            this.listViewChild.nativeElement.scrollTop = this.listViewChild.nativeElement.scrollHeight;
        }
    };
    OrderList.prototype.onDragStart = function (event, index) {
        event.dataTransfer.setData('text', 'b'); // For firefox
        event.target.blur();
        this.dragging = true;
        this.draggedItemIndex = index;
    };
    OrderList.prototype.onDragOver = function (event, index) {
        if (this.dragging && this.draggedItemIndex !== index && this.draggedItemIndex + 1 !== index) {
            this.dragOverItemIndex = index;
            event.preventDefault();
        }
    };
    OrderList.prototype.onDragLeave = function (event) {
        this.dragOverItemIndex = null;
    };
    OrderList.prototype.onDrop = function (event, index) {
        var dropIndex = (this.draggedItemIndex > index) ? index : (index === 0) ? 0 : index - 1;
        ObjectUtils.reorderArray(this.value, this.draggedItemIndex, dropIndex);
        this.dragOverItemIndex = null;
        this.onReorder.emit(event);
        event.preventDefault();
    };
    OrderList.prototype.onDragEnd = function (event) {
        this.dragging = false;
    };
    OrderList.prototype.onListMouseMove = function (event) {
        if (this.dragging) {
            var offsetY = this.listViewChild.nativeElement.getBoundingClientRect().top + document.body.scrollTop;
            var bottomDiff = (offsetY + this.listViewChild.nativeElement.clientHeight) - event.pageY;
            var topDiff = (event.pageY - offsetY);
            if (bottomDiff < 25 && bottomDiff > 0)
                this.listViewChild.nativeElement.scrollTop += 15;
            else if (topDiff < 25 && topDiff > 0)
                this.listViewChild.nativeElement.scrollTop -= 15;
        }
    };
    OrderList.prototype.onItemKeydown = function (event, item, index) {
        var listItem = event.currentTarget;
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
    };
    OrderList.prototype.findNextItem = function (item) {
        var nextItem = item.nextElementSibling;
        if (nextItem)
            return !DomHandler.hasClass(nextItem, 'ui-orderlist-item') || DomHandler.isHidden(nextItem) ? this.findNextItem(nextItem) : nextItem;
        else
            return null;
    };
    OrderList.prototype.findPrevItem = function (item) {
        var prevItem = item.previousElementSibling;
        if (prevItem)
            return !DomHandler.hasClass(prevItem, 'ui-orderlist-item') || DomHandler.isHidden(prevItem) ? this.findPrevItem(prevItem) : prevItem;
        else
            return null;
    };
    OrderList.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], OrderList.prototype, "header", void 0);
    __decorate([
        Input()
    ], OrderList.prototype, "style", void 0);
    __decorate([
        Input()
    ], OrderList.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], OrderList.prototype, "listStyle", void 0);
    __decorate([
        Input()
    ], OrderList.prototype, "responsive", void 0);
    __decorate([
        Input()
    ], OrderList.prototype, "filterBy", void 0);
    __decorate([
        Input()
    ], OrderList.prototype, "filterPlaceholder", void 0);
    __decorate([
        Input()
    ], OrderList.prototype, "filterLocale", void 0);
    __decorate([
        Input()
    ], OrderList.prototype, "metaKeySelection", void 0);
    __decorate([
        Input()
    ], OrderList.prototype, "dragdrop", void 0);
    __decorate([
        Input()
    ], OrderList.prototype, "controlsPosition", void 0);
    __decorate([
        Input()
    ], OrderList.prototype, "ariaFilterLabel", void 0);
    __decorate([
        Input()
    ], OrderList.prototype, "filterMatchMode", void 0);
    __decorate([
        Output()
    ], OrderList.prototype, "selectionChange", void 0);
    __decorate([
        Input()
    ], OrderList.prototype, "trackBy", void 0);
    __decorate([
        Output()
    ], OrderList.prototype, "onReorder", void 0);
    __decorate([
        Output()
    ], OrderList.prototype, "onSelectionChange", void 0);
    __decorate([
        Output()
    ], OrderList.prototype, "onFilterEvent", void 0);
    __decorate([
        ViewChild('listelement')
    ], OrderList.prototype, "listViewChild", void 0);
    __decorate([
        ContentChildren(PrimeTemplate)
    ], OrderList.prototype, "templates", void 0);
    __decorate([
        Input()
    ], OrderList.prototype, "selection", null);
    __decorate([
        Input()
    ], OrderList.prototype, "value", null);
    OrderList = __decorate([
        Component({
            selector: 'p-orderList',
            template: "\n        <div [ngClass]=\"{'ui-orderlist ui-widget': true, 'ui-orderlist-controls-left': controlsPosition === 'left',\n                    'ui-orderlist-controls-right': controlsPosition === 'right'}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-orderlist-controls\">\n                <button type=\"button\" pButton icon=\"pi pi-angle-up\" (click)=\"moveUp($event)\"></button>\n                <button type=\"button\" pButton icon=\"pi pi-angle-double-up\" (click)=\"moveTop($event)\"></button>\n                <button type=\"button\" pButton icon=\"pi pi-angle-down\" (click)=\"moveDown($event)\"></button>\n                <button type=\"button\" pButton icon=\"pi pi-angle-double-down\" (click)=\"moveBottom($event)\"></button>\n            </div>\n            <div class=\"ui-orderlist-list-container\">\n                <div class=\"ui-orderlist-caption ui-widget-header ui-corner-top\" *ngIf=\"header\">{{header}}</div>\n                <div class=\"ui-orderlist-filter-container ui-widget-content\" *ngIf=\"filterBy\">\n                    <input type=\"text\" role=\"textbox\" (keyup)=\"onFilterKeyup($event)\" class=\"ui-inputtext ui-widget ui-state-default ui-corner-all\" [attr.placeholder]=\"filterPlaceholder\" [attr.aria-label]=\"ariaFilterLabel\">\n                    <span class=\"ui-orderlist-filter-icon pi pi-search\"></span>\n                </div>\n                <ul #listelement class=\"ui-widget-content ui-orderlist-list ui-corner-bottom\" [ngStyle]=\"listStyle\" (dragover)=\"onListMouseMove($event)\">\n                    <ng-template ngFor [ngForTrackBy]=\"trackBy\" let-item [ngForOf]=\"value\" let-i=\"index\" let-l=\"last\">\n                        <li class=\"ui-orderlist-droppoint\" *ngIf=\"dragdrop && isItemVisible(item)\" (dragover)=\"onDragOver($event, i)\" (drop)=\"onDrop($event, i)\" (dragleave)=\"onDragLeave($event)\"\n                            [ngClass]=\"{'ui-orderlist-droppoint-highlight': (i === dragOverItemIndex)}\"></li>\n                        <li class=\"ui-orderlist-item\" tabindex=\"0\"\n                            [ngClass]=\"{'ui-state-highlight':isSelected(item)}\"\n                            (click)=\"onItemClick($event,item,i)\" (touchend)=\"onItemTouchEnd($event)\" (keydown)=\"onItemKeydown($event,item,i)\"\n                            [style.display]=\"isItemVisible(item) ? 'block' : 'none'\" role=\"option\" [attr.aria-selected]=\"isSelected(item)\"\n                            [draggable]=\"dragdrop\" (dragstart)=\"onDragStart($event, i)\" (dragend)=\"onDragEnd($event)\">\n                            <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item, index: i}\"></ng-container>\n                        </li>\n                        <li class=\"ui-orderlist-droppoint\" *ngIf=\"dragdrop && l\" (dragover)=\"onDragOver($event, i + 1)\" (drop)=\"onDrop($event, i + 1)\" (dragleave)=\"onDragLeave($event)\"\n                            [ngClass]=\"{'ui-orderlist-droppoint-highlight': (i + 1 === dragOverItemIndex)}\"></li>\n                    </ng-template>\n                </ul>\n            </div>\n        </div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], OrderList);
    return OrderList;
}());
export { OrderList };
var OrderListModule = /** @class */ (function () {
    function OrderListModule() {
    }
    OrderListModule = __decorate([
        NgModule({
            imports: [CommonModule, ButtonModule, SharedModule],
            exports: [OrderList, SharedModule],
            declarations: [OrderList]
        })
    ], OrderListModule);
    return OrderListModule;
}());
export { OrderListModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJsaXN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9vcmRlcmxpc3QvIiwic291cmNlcyI6WyJvcmRlcmxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsZ0JBQWdCLEVBQUMsZ0JBQWdCLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxlQUFlLEVBQUMsU0FBUyxFQUFDLFdBQVcsRUFBQyxZQUFZLEVBQUMsU0FBUyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hNLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFDLFlBQVksRUFBQyxhQUFhLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDdkQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN2QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUF1QzVDO0lBZ0VJLG1CQUFtQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQTlDeEIscUJBQWdCLEdBQVksSUFBSSxDQUFDO1FBSWpDLHFCQUFnQixHQUFXLE1BQU0sQ0FBQztRQUlsQyxvQkFBZSxHQUFXLFVBQVUsQ0FBQztRQUVwQyxvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXpELFlBQU8sR0FBYSxVQUFDLEtBQWEsRUFBRSxJQUFTLElBQUssT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDO1FBRXRELGNBQVMsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsRCxzQkFBaUIsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUUxRCxrQkFB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RCxDQUFDO09BQ1csU0FBUyxDQTBXckI7SUFBRCxnQkFBQztDQUFBLEFBMVdELElBMFdDO1NBMVdZLFNBQVM7QUFpWHRCO0lBQUE7SUFBK0IsQ0FBQztJQUFuQixlQUFlO1FBTDNCLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsWUFBWSxDQUFDO1lBQ2pELE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBQyxZQUFZLENBQUM7WUFDakMsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDO1NBQzVCLENBQUM7T0FDVyxlQUFlLENBQUk7SUFBRCxzQkFBQztDQUFBLEFBQWhDLElBQWdDO1NBQW5CLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxFbGVtZW50UmVmLEFmdGVyVmlld0NoZWNrZWQsQWZ0ZXJDb250ZW50SW5pdCxJbnB1dCxPdXRwdXQsQ29udGVudENoaWxkcmVuLFF1ZXJ5TGlzdCxUZW1wbGF0ZVJlZixFdmVudEVtaXR0ZXIsVmlld0NoaWxkLENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtCdXR0b25Nb2R1bGV9IGZyb20gJ3ByaW1lbmcvYnV0dG9uJztcbmltcG9ydCB7U2hhcmVkTW9kdWxlLFByaW1lVGVtcGxhdGV9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHtPYmplY3RVdGlsc30gZnJvbSAncHJpbWVuZy91dGlscyc7XG5pbXBvcnQgeyBGaWx0ZXJVdGlscyB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Atb3JkZXJMaXN0JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInsndWktb3JkZXJsaXN0IHVpLXdpZGdldCc6IHRydWUsICd1aS1vcmRlcmxpc3QtY29udHJvbHMtbGVmdCc6IGNvbnRyb2xzUG9zaXRpb24gPT09ICdsZWZ0JyxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLW9yZGVybGlzdC1jb250cm9scy1yaWdodCc6IGNvbnRyb2xzUG9zaXRpb24gPT09ICdyaWdodCd9XCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLW9yZGVybGlzdC1jb250cm9sc1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gaWNvbj1cInBpIHBpLWFuZ2xlLXVwXCIgKGNsaWNrKT1cIm1vdmVVcCgkZXZlbnQpXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiBpY29uPVwicGkgcGktYW5nbGUtZG91YmxlLXVwXCIgKGNsaWNrKT1cIm1vdmVUb3AoJGV2ZW50KVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gaWNvbj1cInBpIHBpLWFuZ2xlLWRvd25cIiAoY2xpY2spPVwibW92ZURvd24oJGV2ZW50KVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gaWNvbj1cInBpIHBpLWFuZ2xlLWRvdWJsZS1kb3duXCIgKGNsaWNrKT1cIm1vdmVCb3R0b20oJGV2ZW50KVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktb3JkZXJsaXN0LWxpc3QtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLW9yZGVybGlzdC1jYXB0aW9uIHVpLXdpZGdldC1oZWFkZXIgdWktY29ybmVyLXRvcFwiICpuZ0lmPVwiaGVhZGVyXCI+e3toZWFkZXJ9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1vcmRlcmxpc3QtZmlsdGVyLWNvbnRhaW5lciB1aS13aWRnZXQtY29udGVudFwiICpuZ0lmPVwiZmlsdGVyQnlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcm9sZT1cInRleHRib3hcIiAoa2V5dXApPVwib25GaWx0ZXJLZXl1cCgkZXZlbnQpXCIgY2xhc3M9XCJ1aS1pbnB1dHRleHQgdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbFwiIFthdHRyLnBsYWNlaG9sZGVyXT1cImZpbHRlclBsYWNlaG9sZGVyXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhRmlsdGVyTGFiZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1vcmRlcmxpc3QtZmlsdGVyLWljb24gcGkgcGktc2VhcmNoXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDx1bCAjbGlzdGVsZW1lbnQgY2xhc3M9XCJ1aS13aWRnZXQtY29udGVudCB1aS1vcmRlcmxpc3QtbGlzdCB1aS1jb3JuZXItYm90dG9tXCIgW25nU3R5bGVdPVwibGlzdFN0eWxlXCIgKGRyYWdvdmVyKT1cIm9uTGlzdE1vdXNlTW92ZSgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBbbmdGb3JUcmFja0J5XT1cInRyYWNrQnlcIiBsZXQtaXRlbSBbbmdGb3JPZl09XCJ2YWx1ZVwiIGxldC1pPVwiaW5kZXhcIiBsZXQtbD1cImxhc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInVpLW9yZGVybGlzdC1kcm9wcG9pbnRcIiAqbmdJZj1cImRyYWdkcm9wICYmIGlzSXRlbVZpc2libGUoaXRlbSlcIiAoZHJhZ292ZXIpPVwib25EcmFnT3ZlcigkZXZlbnQsIGkpXCIgKGRyb3ApPVwib25Ecm9wKCRldmVudCwgaSlcIiAoZHJhZ2xlYXZlKT1cIm9uRHJhZ0xlYXZlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktb3JkZXJsaXN0LWRyb3Bwb2ludC1oaWdobGlnaHQnOiAoaSA9PT0gZHJhZ092ZXJJdGVtSW5kZXgpfVwiPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJ1aS1vcmRlcmxpc3QtaXRlbVwiIHRhYmluZGV4PVwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1oaWdobGlnaHQnOmlzU2VsZWN0ZWQoaXRlbSl9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50LGl0ZW0saSlcIiAodG91Y2hlbmQpPVwib25JdGVtVG91Y2hFbmQoJGV2ZW50KVwiIChrZXlkb3duKT1cIm9uSXRlbUtleWRvd24oJGV2ZW50LGl0ZW0saSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5kaXNwbGF5XT1cImlzSXRlbVZpc2libGUoaXRlbSkgPyAnYmxvY2snIDogJ25vbmUnXCIgcm9sZT1cIm9wdGlvblwiIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwiaXNTZWxlY3RlZChpdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2RyYWdnYWJsZV09XCJkcmFnZHJvcFwiIChkcmFnc3RhcnQpPVwib25EcmFnU3RhcnQoJGV2ZW50LCBpKVwiIChkcmFnZW5kKT1cIm9uRHJhZ0VuZCgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogaXRlbSwgaW5kZXg6IGl9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwidWktb3JkZXJsaXN0LWRyb3Bwb2ludFwiICpuZ0lmPVwiZHJhZ2Ryb3AgJiYgbFwiIChkcmFnb3Zlcik9XCJvbkRyYWdPdmVyKCRldmVudCwgaSArIDEpXCIgKGRyb3ApPVwib25Ecm9wKCRldmVudCwgaSArIDEpXCIgKGRyYWdsZWF2ZSk9XCJvbkRyYWdMZWF2ZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLW9yZGVybGlzdC1kcm9wcG9pbnQtaGlnaGxpZ2h0JzogKGkgKyAxID09PSBkcmFnT3Zlckl0ZW1JbmRleCl9XCI+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyTGlzdCBpbXBsZW1lbnRzIEFmdGVyVmlld0NoZWNrZWQsQWZ0ZXJDb250ZW50SW5pdCB7XG5cbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBsaXN0U3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHJlc3BvbnNpdmU6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBmaWx0ZXJCeTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgZmlsdGVyUGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGZpbHRlckxvY2FsZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgbWV0YUtleVNlbGVjdGlvbjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBkcmFnZHJvcDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGNvbnRyb2xzUG9zaXRpb246IHN0cmluZyA9ICdsZWZ0JztcblxuICAgIEBJbnB1dCgpIGFyaWFGaWx0ZXJMYWJlbDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgZmlsdGVyTWF0Y2hNb2RlOiBzdHJpbmcgPSBcImNvbnRhaW5zXCI7XG5cbiAgICBAT3V0cHV0KCkgc2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBJbnB1dCgpIHRyYWNrQnk6IEZ1bmN0aW9uID0gKGluZGV4OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gaXRlbTtcblxuICAgIEBPdXRwdXQoKSBvblJlb3JkZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uU2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkZpbHRlckV2ZW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2xpc3RlbGVtZW50JykgbGlzdFZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8YW55PjtcblxuICAgIHB1YmxpYyBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBfc2VsZWN0aW9uOiBhbnlbXTtcblxuICAgIG1vdmVkVXA6IGJvb2xlYW47XG5cbiAgICBtb3ZlZERvd246IGJvb2xlYW47XG5cbiAgICBpdGVtVG91Y2hlZDogYm9vbGVhbjtcblxuICAgIGRyYWdnZWRJdGVtSW5kZXg6IG51bWJlcjtcblxuICAgIGRyYWdPdmVySXRlbUluZGV4OiBudW1iZXI7XG5cbiAgICBkcmFnZ2luZzogYm9vbGVhbjtcblxuICAgIHB1YmxpYyBmaWx0ZXJWYWx1ZTogc3RyaW5nO1xuXG4gICAgcHVibGljIHZpc2libGVPcHRpb25zOiBhbnlbXTtcblxuICAgIHB1YmxpYyBfdmFsdWU6IGFueVtdO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmKSB7fVxuXG4gICAgZ2V0IHNlbGVjdGlvbigpOiBhbnlbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3Rpb247XG4gICAgfVxuXG4gICAgQElucHV0KCkgc2V0IHNlbGVjdGlvbih2YWw6YW55W10pIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gdmFsO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaXRlbSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgICAgICBpZiAodGhpcy5tb3ZlZFVwfHx0aGlzLm1vdmVkRG93bikge1xuICAgICAgICAgICAgbGV0IGxpc3RJdGVtcyA9IERvbUhhbmRsZXIuZmluZCh0aGlzLmxpc3RWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJ2xpLnVpLXN0YXRlLWhpZ2hsaWdodCcpO1xuICAgICAgICAgICAgbGV0IGxpc3RJdGVtO1xuXG4gICAgICAgICAgICBpZiAobGlzdEl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb3ZlZFVwKVxuICAgICAgICAgICAgICAgICAgICBsaXN0SXRlbSA9IGxpc3RJdGVtc1swXTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGxpc3RJdGVtID0gbGlzdEl0ZW1zW2xpc3RJdGVtcy5sZW5ndGggLSAxXTtcblxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuc2Nyb2xsSW5WaWV3KHRoaXMubGlzdFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCBsaXN0SXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1vdmVkVXAgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubW92ZWREb3duID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgdmFsdWUoKTogYW55W10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuXG4gICAgQElucHV0KCkgc2V0IHZhbHVlKHZhbDphbnlbXSkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbDtcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyVmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkl0ZW1DbGljayhldmVudCwgaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgdGhpcy5pdGVtVG91Y2hlZCA9IGZhbHNlO1xuICAgICAgICBsZXQgc2VsZWN0ZWRJbmRleCA9IE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdChpdGVtLCB0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgIGxldCBzZWxlY3RlZCA9IChzZWxlY3RlZEluZGV4ICE9IC0xKTtcbiAgICAgICAgbGV0IG1ldGFTZWxlY3Rpb24gPSB0aGlzLml0ZW1Ub3VjaGVkID8gZmFsc2UgOiB0aGlzLm1ldGFLZXlTZWxlY3Rpb247XG5cbiAgICAgICAgaWYgKG1ldGFTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGxldCBtZXRhS2V5ID0gKGV2ZW50Lm1ldGFLZXl8fGV2ZW50LmN0cmxLZXl8fGV2ZW50LnNoaWZ0S2V5KTtcblxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkICYmIG1ldGFLZXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSB0aGlzLl9zZWxlY3Rpb24uZmlsdGVyKCh2YWwsIGluZGV4KSA9PiBpbmRleCAhPT0gc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSAobWV0YUtleSkgPyB0aGlzLl9zZWxlY3Rpb24gPyBbLi4udGhpcy5fc2VsZWN0aW9uXSA6IFtdIDogW107XG4gICAgICAgICAgICAgICAgT2JqZWN0VXRpbHMuaW5zZXJ0SW50b09yZGVyZWRBcnJheShpdGVtLCBpbmRleCwgdGhpcy5fc2VsZWN0aW9uLCB0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHRoaXMuX3NlbGVjdGlvbi5maWx0ZXIoKHZhbCwgaW5kZXgpID0+IGluZGV4ICE9PSBzZWxlY3RlZEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHRoaXMuX3NlbGVjdGlvbiA/IFsuLi50aGlzLl9zZWxlY3Rpb25dIDogW107XG4gICAgICAgICAgICAgICAgT2JqZWN0VXRpbHMuaW5zZXJ0SW50b09yZGVyZWRBcnJheShpdGVtLCBpbmRleCwgdGhpcy5fc2VsZWN0aW9uLCB0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vYmluZGluZ1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuX3NlbGVjdGlvbik7XG5cbiAgICAgICAgLy9ldmVudFxuICAgICAgICB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlLmVtaXQoe29yaWdpbmFsRXZlbnQ6ZXZlbnQsIHZhbHVlOiB0aGlzLl9zZWxlY3Rpb259KTtcbiAgICB9XG5cbiAgICBvbkZpbHRlcktleXVwKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZmlsdGVyVmFsdWUgPSBldmVudC50YXJnZXQudmFsdWUudHJpbSgpLnRvTG9jYWxlTG93ZXJDYXNlKHRoaXMuZmlsdGVyTG9jYWxlKTtcbiAgICAgICAgdGhpcy5maWx0ZXIoKTtcblxuICAgICAgICB0aGlzLm9uRmlsdGVyRXZlbnQuZW1pdCh7XG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZpc2libGVPcHRpb25zXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZpbHRlcigpIHtcbiAgICAgICAgbGV0IHNlYXJjaEZpZWxkczogc3RyaW5nW10gPSB0aGlzLmZpbHRlckJ5LnNwbGl0KCcsJyk7XG4gICAgICAgIHRoaXMudmlzaWJsZU9wdGlvbnMgPSBGaWx0ZXJVdGlscy5maWx0ZXIodGhpcy52YWx1ZSwgc2VhcmNoRmllbGRzLCB0aGlzLmZpbHRlclZhbHVlLCB0aGlzLmZpbHRlck1hdGNoTW9kZSwgdGhpcy5maWx0ZXJMb2NhbGUpO1xuICAgIH1cblxuICAgIGlzSXRlbVZpc2libGUoaXRlbTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmZpbHRlclZhbHVlICYmIHRoaXMuZmlsdGVyVmFsdWUudHJpbSgpLmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZpc2libGVPcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0gPT0gdGhpcy52aXNpYmxlT3B0aW9uc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSXRlbVRvdWNoRW5kKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuaXRlbVRvdWNoZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlzU2VsZWN0ZWQoaXRlbTogYW55KSB7XG4gICAgICAgIHJldHVybiBPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3QoaXRlbSwgdGhpcy5zZWxlY3Rpb24pICE9IC0xO1xuICAgIH1cblxuICAgIG1vdmVVcChldmVudCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zZWxlY3Rpb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtID0gdGhpcy5zZWxlY3Rpb25baV07XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbUluZGV4OiBudW1iZXIgPSBPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3Qoc2VsZWN0ZWRJdGVtLCB0aGlzLnZhbHVlKTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEl0ZW1JbmRleCAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlZEl0ZW0gPSB0aGlzLnZhbHVlW3NlbGVjdGVkSXRlbUluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXAgPSB0aGlzLnZhbHVlW3NlbGVjdGVkSXRlbUluZGV4LTFdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlW3NlbGVjdGVkSXRlbUluZGV4LTFdID0gbW92ZWRJdGVtO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlW3NlbGVjdGVkSXRlbUluZGV4XSA9IHRlbXA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubW92ZWRVcCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm9uUmVvcmRlci5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVUb3AoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5zZWxlY3Rpb24ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtID0gdGhpcy5zZWxlY3Rpb25baV07XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbUluZGV4OiBudW1iZXIgPSBPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3Qoc2VsZWN0ZWRJdGVtLCB0aGlzLnZhbHVlKTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEl0ZW1JbmRleCAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlZEl0ZW0gPSB0aGlzLnZhbHVlLnNwbGljZShzZWxlY3RlZEl0ZW1JbmRleCwxKVswXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZS51bnNoaWZ0KG1vdmVkSXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub25SZW9yZGVyLmVtaXQoZXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5saXN0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVEb3duKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbikge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuc2VsZWN0aW9uLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbSA9IHRoaXMuc2VsZWN0aW9uW2ldO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW1JbmRleDogbnVtYmVyID0gT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbSwgdGhpcy52YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtSW5kZXggIT0gKHRoaXMudmFsdWUubGVuZ3RoIC0gMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmVkSXRlbSA9IHRoaXMudmFsdWVbc2VsZWN0ZWRJdGVtSW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcCA9IHRoaXMudmFsdWVbc2VsZWN0ZWRJdGVtSW5kZXgrMV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWVbc2VsZWN0ZWRJdGVtSW5kZXgrMV0gPSBtb3ZlZEl0ZW07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWVbc2VsZWN0ZWRJdGVtSW5kZXhdID0gdGVtcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5tb3ZlZERvd24gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5vblJlb3JkZXIuZW1pdChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlQm90dG9tKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbikge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNlbGVjdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSB0aGlzLnNlbGVjdGlvbltpXTtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtSW5kZXg6IG51bWJlciA9IE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdChzZWxlY3RlZEl0ZW0sIHRoaXMudmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSXRlbUluZGV4ICE9ICh0aGlzLnZhbHVlLmxlbmd0aCAtIDEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlZEl0ZW0gPSB0aGlzLnZhbHVlLnNwbGljZShzZWxlY3RlZEl0ZW1JbmRleCwxKVswXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZS5wdXNoKG1vdmVkSXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub25SZW9yZGVyLmVtaXQoZXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5saXN0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gdGhpcy5saXN0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EcmFnU3RhcnQoZXZlbnQ6IERyYWdFdmVudCwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dCcsICdiJyk7ICAgIC8vIEZvciBmaXJlZm94XG4gICAgICAgICg8SFRNTExJRWxlbWVudD4gZXZlbnQudGFyZ2V0KS5ibHVyKCk7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmRyYWdnZWRJdGVtSW5kZXggPSBpbmRleDtcbiAgICB9XG5cbiAgICBvbkRyYWdPdmVyKGV2ZW50OiBEcmFnRXZlbnQsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcgJiYgdGhpcy5kcmFnZ2VkSXRlbUluZGV4ICE9PSBpbmRleCAmJiB0aGlzLmRyYWdnZWRJdGVtSW5kZXggKyAxICE9PSBpbmRleCkge1xuICAgICAgICAgICAgdGhpcy5kcmFnT3Zlckl0ZW1JbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRHJhZ0xlYXZlKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICAgICAgdGhpcy5kcmFnT3Zlckl0ZW1JbmRleCA9IG51bGw7XG4gICAgfVxuXG4gICAgb25Ecm9wKGV2ZW50OiBEcmFnRXZlbnQsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGRyb3BJbmRleCA9ICh0aGlzLmRyYWdnZWRJdGVtSW5kZXggPiBpbmRleCkgPyBpbmRleCA6IChpbmRleCA9PT0gMCkgPyAwIDogaW5kZXggLSAxO1xuICAgICAgICBPYmplY3RVdGlscy5yZW9yZGVyQXJyYXkodGhpcy52YWx1ZSwgdGhpcy5kcmFnZ2VkSXRlbUluZGV4LCBkcm9wSW5kZXgpO1xuICAgICAgICB0aGlzLmRyYWdPdmVySXRlbUluZGV4ID0gbnVsbDtcbiAgICAgICAgdGhpcy5vblJlb3JkZXIuZW1pdChldmVudCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25EcmFnRW5kKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uTGlzdE1vdXNlTW92ZShldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgICAgICAgbGV0IG9mZnNldFkgPSB0aGlzLmxpc3RWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcbiAgICAgICAgICAgIGxldCBib3R0b21EaWZmID0gKG9mZnNldFkgKyB0aGlzLmxpc3RWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQpIC0gZXZlbnQucGFnZVk7XG4gICAgICAgICAgICBsZXQgdG9wRGlmZiA9IChldmVudC5wYWdlWSAtIG9mZnNldFkpO1xuICAgICAgICAgICAgaWYgKGJvdHRvbURpZmYgPCAyNSAmJiBib3R0b21EaWZmID4gMClcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgKz0gMTU7XG4gICAgICAgICAgICBlbHNlIGlmICh0b3BEaWZmIDwgMjUgJiYgdG9wRGlmZiA+IDApXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wIC09IDE1O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JdGVtS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCwgaXRlbSwgaW5kZXg6IE51bWJlcikge1xuICAgICAgICBsZXQgbGlzdEl0ZW0gPSA8SFRNTExJRWxlbWVudD4gZXZlbnQuY3VycmVudFRhcmdldDtcblxuICAgICAgICBzd2l0Y2goZXZlbnQud2hpY2gpIHtcbiAgICAgICAgICAgIC8vZG93blxuICAgICAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgICAgICB2YXIgbmV4dEl0ZW0gPSB0aGlzLmZpbmROZXh0SXRlbShsaXN0SXRlbSk7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRJdGVtLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvL3VwXG4gICAgICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgICAgIHZhciBwcmV2SXRlbSA9IHRoaXMuZmluZFByZXZJdGVtKGxpc3RJdGVtKTtcbiAgICAgICAgICAgICAgICBpZiAocHJldkl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldkl0ZW0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vZW50ZXJcbiAgICAgICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkl0ZW1DbGljayhldmVudCwgaXRlbSwgaW5kZXgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmROZXh0SXRlbShpdGVtKSB7XG4gICAgICAgIGxldCBuZXh0SXRlbSA9IGl0ZW0ubmV4dEVsZW1lbnRTaWJsaW5nO1xuXG4gICAgICAgIGlmIChuZXh0SXRlbSlcbiAgICAgICAgICAgIHJldHVybiAhRG9tSGFuZGxlci5oYXNDbGFzcyhuZXh0SXRlbSwgJ3VpLW9yZGVybGlzdC1pdGVtJykgfHwgRG9tSGFuZGxlci5pc0hpZGRlbihuZXh0SXRlbSkgPyB0aGlzLmZpbmROZXh0SXRlbShuZXh0SXRlbSkgOiBuZXh0SXRlbTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZmluZFByZXZJdGVtKGl0ZW0pIHtcbiAgICAgICAgbGV0IHByZXZJdGVtID0gaXRlbS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuXG4gICAgICAgIGlmIChwcmV2SXRlbSlcbiAgICAgICAgICAgIHJldHVybiAhRG9tSGFuZGxlci5oYXNDbGFzcyhwcmV2SXRlbSwgJ3VpLW9yZGVybGlzdC1pdGVtJykgfHwgRG9tSGFuZGxlci5pc0hpZGRlbihwcmV2SXRlbSkgPyB0aGlzLmZpbmRQcmV2SXRlbShwcmV2SXRlbSkgOiBwcmV2SXRlbTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsQnV0dG9uTW9kdWxlLFNoYXJlZE1vZHVsZV0sXG4gICAgZXhwb3J0czogW09yZGVyTGlzdCxTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW09yZGVyTGlzdF1cbn0pXG5leHBvcnQgY2xhc3MgT3JkZXJMaXN0TW9kdWxlIHsgfVxuIl19