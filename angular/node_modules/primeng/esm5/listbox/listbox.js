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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { NgModule, Component, ElementRef, Input, Output, EventEmitter, AfterContentInit, ContentChildren, ContentChild, QueryList, TemplateRef, forwardRef, ChangeDetectorRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, PrimeTemplate, Footer, Header } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ObjectUtils } from 'primeng/utils';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FilterUtils } from 'primeng/utils';
export var LISTBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Listbox; }),
    multi: true
};
var Listbox = /** @class */ (function () {
    function Listbox(el, cd) {
        this.el = el;
        this.cd = cd;
        this.checkbox = false;
        this.filter = false;
        this.filterMode = 'contains';
        this.metaKeySelection = true;
        this.showToggleAll = true;
        this.onChange = new EventEmitter();
        this.onClick = new EventEmitter();
        this.onDblClick = new EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.disabledSelectedOptions = [];
    }
    Object.defineProperty(Listbox.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (val) {
            var opts = this.optionLabel ? ObjectUtils.generateSelectItems(val, this.optionLabel) : val;
            this._options = opts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Listbox.prototype, "filterValue", {
        get: function () {
            return this._filterValue;
        },
        set: function (val) {
            this._filterValue = val;
        },
        enumerable: true,
        configurable: true
    });
    Listbox.prototype.ngAfterContentInit = function () {
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
    Listbox.prototype.writeValue = function (value) {
        this.value = value;
        this.setDisabledSelectedOptions();
        this.cd.markForCheck();
    };
    Listbox.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Listbox.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Listbox.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    Listbox.prototype.onOptionClick = function (event, option) {
        if (this.disabled || option.disabled || this.readonly) {
            return;
        }
        if (this.multiple) {
            if (this.checkbox)
                this.onOptionClickCheckbox(event, option);
            else
                this.onOptionClickMultiple(event, option);
        }
        else {
            this.onOptionClickSingle(event, option);
        }
        this.onClick.emit({
            originalEvent: event,
            option: option,
            value: this.value
        });
        this.optionTouched = false;
    };
    Listbox.prototype.onOptionTouchEnd = function (event, option) {
        if (this.disabled || option.disabled || this.readonly) {
            return;
        }
        this.optionTouched = true;
    };
    Listbox.prototype.onOptionDoubleClick = function (event, option) {
        if (this.disabled || option.disabled || this.readonly) {
            return;
        }
        this.onDblClick.emit({
            originalEvent: event,
            option: option,
            value: this.value
        });
    };
    Listbox.prototype.onOptionClickSingle = function (event, option) {
        var selected = this.isSelected(option);
        var valueChanged = false;
        var metaSelection = this.optionTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            var metaKey = (event.metaKey || event.ctrlKey);
            if (selected) {
                if (metaKey) {
                    this.value = null;
                    valueChanged = true;
                }
            }
            else {
                this.value = option.value;
                valueChanged = true;
            }
        }
        else {
            this.value = selected ? null : option.value;
            valueChanged = true;
        }
        if (valueChanged) {
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    };
    Listbox.prototype.onOptionClickMultiple = function (event, option) {
        var selected = this.isSelected(option);
        var valueChanged = false;
        var metaSelection = this.optionTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            var metaKey = (event.metaKey || event.ctrlKey);
            if (selected) {
                if (metaKey) {
                    this.removeOption(option);
                }
                else {
                    this.value = [option.value];
                }
                valueChanged = true;
            }
            else {
                this.value = (metaKey) ? this.value || [] : [];
                this.value = __spread(this.value, [option.value]);
                valueChanged = true;
            }
        }
        else {
            if (selected) {
                this.removeOption(option);
            }
            else {
                this.value = __spread(this.value || [], [option.value]);
            }
            valueChanged = true;
        }
        if (valueChanged) {
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    };
    Listbox.prototype.onOptionClickCheckbox = function (event, option) {
        if (this.disabled || this.readonly) {
            return;
        }
        var selected = this.isSelected(option);
        if (selected) {
            this.removeOption(option);
        }
        else {
            this.value = this.value ? this.value : [];
            this.value = __spread(this.value, [option.value]);
        }
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    };
    Listbox.prototype.removeOption = function (option) {
        var _this = this;
        this.value = this.value.filter(function (val) { return !ObjectUtils.equals(val, option.value, _this.dataKey); });
    };
    Listbox.prototype.isSelected = function (option) {
        var e_1, _a;
        var selected = false;
        if (this.multiple) {
            if (this.value) {
                try {
                    for (var _b = __values(this.value), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var val = _c.value;
                        if (ObjectUtils.equals(val, option.value, this.dataKey)) {
                            selected = true;
                            break;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        }
        else {
            selected = ObjectUtils.equals(this.value, option.value, this.dataKey);
        }
        return selected;
    };
    Object.defineProperty(Listbox.prototype, "allChecked", {
        get: function () {
            if (this.filterValue) {
                return this.allFilteredSelected();
            }
            else {
                var optionCount = this.getEnabledOptionCount();
                var disabledSelectedOptionCount = this.disabledSelectedOptions.length;
                return this.value && this.options && (this.value.length > 0 && this.value.length == optionCount + disabledSelectedOptionCount);
            }
        },
        enumerable: true,
        configurable: true
    });
    Listbox.prototype.getEnabledOptionCount = function () {
        var e_2, _a;
        if (this.options) {
            var count = 0;
            try {
                for (var _b = __values(this.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var opt = _c.value;
                    if (!opt.disabled) {
                        count++;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return count;
        }
        else {
            return 0;
        }
    };
    Listbox.prototype.allFilteredSelected = function () {
        var e_3, _a;
        var allSelected;
        var options = this.filterValue ? this.getFilteredOptions() : this.options;
        if (this.value && options && options.length) {
            allSelected = true;
            try {
                for (var _b = __values(this.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var opt = _c.value;
                    if (this.isItemVisible(opt)) {
                        if (!this.isSelected(opt)) {
                            allSelected = false;
                            break;
                        }
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        return allSelected;
    };
    Listbox.prototype.onFilter = function (event) {
        this._filterValue = event.target.value;
    };
    Listbox.prototype.toggleAll = function (event) {
        if (this.disabled || this.readonly || !this.options || this.options.length === 0) {
            return;
        }
        if (this.allChecked) {
            if (this.disabledSelectedOptions && this.disabledSelectedOptions.length > 0) {
                var value = [];
                value = __spread(this.disabledSelectedOptions);
                this.value = value;
            }
            else {
                this.value = [];
            }
        }
        else {
            if (this.options) {
                this.value = [];
                if (this.disabledSelectedOptions && this.disabledSelectedOptions.length > 0) {
                    this.value = __spread(this.disabledSelectedOptions);
                }
                for (var i = 0; i < this.options.length; i++) {
                    var opt = this.options[i];
                    if (this.isItemVisible(opt) && !opt.disabled) {
                        this.value.push(opt.value);
                    }
                }
            }
        }
        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event, value: this.value });
        event.preventDefault();
    };
    Listbox.prototype.isItemVisible = function (option) {
        if (this.filterValue) {
            var visible = void 0;
            if (this.filterMode) {
                visible = FilterUtils[this.filterMode](option.label, this.filterValue, this.filterLocale);
            }
            else {
                visible = true;
            }
            return visible;
        }
        else {
            return true;
        }
    };
    Listbox.prototype.onInputFocus = function (event) {
        this.focus = true;
    };
    Listbox.prototype.onInputBlur = function (event) {
        this.focus = false;
    };
    Listbox.prototype.onOptionKeyDown = function (event, option) {
        if (this.readonly) {
            return;
        }
        var item = event.currentTarget;
        switch (event.which) {
            //down
            case 40:
                var nextItem = this.findNextItem(item);
                if (nextItem) {
                    nextItem.focus();
                }
                event.preventDefault();
                break;
            //up
            case 38:
                var prevItem = this.findPrevItem(item);
                if (prevItem) {
                    prevItem.focus();
                }
                event.preventDefault();
                break;
            //enter
            case 13:
                this.onOptionClick(event, option);
                event.preventDefault();
                break;
        }
    };
    Listbox.prototype.findNextItem = function (item) {
        var nextItem = item.nextElementSibling;
        if (nextItem)
            return DomHandler.hasClass(nextItem, 'ui-state-disabled') || DomHandler.isHidden(nextItem) ? this.findNextItem(nextItem) : nextItem;
        else
            return null;
    };
    Listbox.prototype.findPrevItem = function (item) {
        var prevItem = item.previousElementSibling;
        if (prevItem)
            return DomHandler.hasClass(prevItem, 'ui-state-disabled') || DomHandler.isHidden(prevItem) ? this.findPrevItem(prevItem) : prevItem;
        else
            return null;
    };
    Listbox.prototype.getFilteredOptions = function () {
        var filteredOptions = [];
        if (this.filterValue) {
            for (var i = 0; i < this.options.length; i++) {
                var opt = this.options[i];
                if (this.isItemVisible(opt) && !opt.disabled) {
                    filteredOptions.push(opt);
                }
            }
            return filteredOptions;
        }
        else {
            return this.options;
        }
    };
    Listbox.prototype.onHeaderCheckboxFocus = function () {
        this.headerCheckboxFocus = true;
    };
    Listbox.prototype.onHeaderCheckboxBlur = function () {
        this.headerCheckboxFocus = false;
    };
    Listbox.prototype.setDisabledSelectedOptions = function () {
        var e_4, _a;
        if (this.options) {
            this.disabledSelectedOptions = [];
            if (this.value) {
                try {
                    for (var _b = __values(this.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var opt = _c.value;
                        if (opt.disabled && this.isSelected(opt)) {
                            this.disabledSelectedOptions.push(opt.value);
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
    };
    Listbox.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], Listbox.prototype, "multiple", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "style", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "listStyle", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "listStyleClass", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "readonly", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "checkbox", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "filter", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "filterMode", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "filterLocale", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "metaKeySelection", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "dataKey", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "showToggleAll", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "optionLabel", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "ariaFilterLabel", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "filterPlaceHolder", void 0);
    __decorate([
        Output()
    ], Listbox.prototype, "onChange", void 0);
    __decorate([
        Output()
    ], Listbox.prototype, "onClick", void 0);
    __decorate([
        Output()
    ], Listbox.prototype, "onDblClick", void 0);
    __decorate([
        ViewChild('headerchkbox')
    ], Listbox.prototype, "headerCheckboxViewChild", void 0);
    __decorate([
        ContentChild(Header)
    ], Listbox.prototype, "headerFacet", void 0);
    __decorate([
        ContentChild(Footer)
    ], Listbox.prototype, "footerFacet", void 0);
    __decorate([
        ContentChildren(PrimeTemplate)
    ], Listbox.prototype, "templates", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "options", null);
    __decorate([
        Input()
    ], Listbox.prototype, "filterValue", null);
    Listbox = __decorate([
        Component({
            selector: 'p-listbox',
            template: "\n    <div [ngClass]=\"{'ui-listbox ui-inputtext ui-widget ui-widget-content ui-corner-all':true,'ui-state-disabled':disabled,'ui-state-focus':focus}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n      <div class=\"ui-helper-hidden-accessible\">\n        <input type=\"text\" readonly=\"readonly\" (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\">\n      </div>\n      <div class=\"ui-widget-header ui-corner-all ui-listbox-header ui-helper-clearfix\" *ngIf=\"headerFacet\">\n        <ng-content select=\"p-header\"></ng-content>\n      </div>\n      <div class=\"ui-widget-header ui-corner-all ui-listbox-header ui-helper-clearfix\" *ngIf=\"(checkbox && multiple && showToggleAll) || filter\" [ngClass]=\"{'ui-listbox-header-w-checkbox': checkbox}\">\n        <div class=\"ui-chkbox ui-widget\" *ngIf=\"checkbox && multiple && showToggleAll\">\n          <div class=\"ui-helper-hidden-accessible\">\n            <input type=\"checkbox\" readonly=\"readonly\" [checked]=\"allChecked\" (focus)=\"onHeaderCheckboxFocus()\" (blur)=\"onHeaderCheckboxBlur()\" (keydown.space)=\"toggleAll($event)\">\n          </div>\n          <div #headerchkbox class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" [ngClass]=\"{'ui-state-active': allChecked, 'ui-state-focus': headerCheckboxFocus}\" (click)=\"toggleAll($event)\">\n            <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'pi pi-check':allChecked}\"></span>\n          </div>\n        </div>\n        <div class=\"ui-listbox-filter-container\" *ngIf=\"filter\">\n          <input type=\"text\" [value]=\"filterValue||''\" (input)=\"onFilter($event)\" class=\"ui-inputtext ui-widget ui-state-default ui-corner-all\" [disabled]=\"disabled\" [attr.placeholder]=\"filterPlaceHolder\" [attr.aria-label]=\"ariaFilterLabel\">\n          <span class=\"ui-listbox-filter-icon pi pi-search\"></span>\n        </div>\n      </div>\n      <div [ngClass]=\"'ui-listbox-list-wrapper'\" [ngStyle]=\"listStyle\" [class]=\"listStyleClass\">\n        <ul class=\"ui-listbox-list\" role=\"listbox\" aria-multiselectable=\"multiple\">\n          <li *ngFor=\"let option of options; let i = index;\" [style.display]=\"isItemVisible(option) ? 'block' : 'none'\" [attr.tabindex]=\"option.disabled ? null : '0'\"\n              [ngClass]=\"{'ui-listbox-item ui-corner-all':true,'ui-state-highlight':isSelected(option), 'ui-state-disabled': option.disabled}\" role=\"option\" [attr.aria-label]=\"option.label\"\n              [attr.aria-selected]=\"isSelected(option)\" (click)=\"onOptionClick($event,option)\" (dblclick)=\"onOptionDoubleClick($event,option)\" (touchend)=\"onOptionTouchEnd($event,option)\" (keydown)=\"onOptionKeyDown($event,option)\">\n            <div class=\"ui-chkbox ui-widget\" *ngIf=\"checkbox && multiple\">\n              <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" [ngClass]=\"{'ui-state-active':isSelected(option)}\">\n                <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'pi pi-check':isSelected(option)}\"></span>\n              </div>\n            </div>\n            <span *ngIf=\"!itemTemplate\">{{option.label}}</span>\n            <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: option, index: i}\"></ng-container>\n          </li>\n        </ul>\n      </div>\n      <div class=\"ui-listbox-footer ui-widget-header ui-corner-all\" *ngIf=\"footerFacet\">\n        <ng-content select=\"p-footer\"></ng-content>\n      </div>\n    </div>\n  ",
            providers: [LISTBOX_VALUE_ACCESSOR],
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], Listbox);
    return Listbox;
}());
export { Listbox };
var ListboxModule = /** @class */ (function () {
    function ListboxModule() {
    }
    ListboxModule = __decorate([
        NgModule({
            imports: [CommonModule, SharedModule],
            exports: [Listbox, SharedModule],
            declarations: [Listbox]
        })
    ], ListboxModule);
    return ListboxModule;
}());
export { ListboxModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdGJveC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvbGlzdGJveC8iLCJzb3VyY2VzIjpbImxpc3Rib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUMsVUFBVSxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4TyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFNUMsTUFBTSxDQUFDLElBQU0sc0JBQXNCLEdBQVE7SUFDdkMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxPQUFPLEVBQVAsQ0FBTyxDQUFDO0lBQ3RDLEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQWlERjtJQXdFSSxpQkFBbUIsRUFBYyxFQUFTLEVBQXFCO1FBQTVDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBUyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQXhEdEQsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUUxQixXQUFNLEdBQVksS0FB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Q0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDO1lBQ2hDLFlBQVksRUFBRSxDQUFDLE9BQU8sQ0FBQztTQUMxQixDQUFDO09BQ1csYUFBYSxDQUFJO0lBQUQsb0JBQUM7Q0FBQSxBQUE5QixJQUE4QjtTQUFqQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBBZnRlckNvbnRlbnRJbml0LCBDb250ZW50Q2hpbGRyZW4sIENvbnRlbnRDaGlsZCwgUXVlcnlMaXN0LCBUZW1wbGF0ZVJlZixmb3J3YXJkUmVmLCBDaGFuZ2VEZXRlY3RvclJlZiwgVmlld0NoaWxkLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFNlbGVjdEl0ZW0gfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUsIFByaW1lVGVtcGxhdGUsIEZvb3RlciwgSGVhZGVyIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IE9iamVjdFV0aWxzIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGaWx0ZXJVdGlscyB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuXG5leHBvcnQgY29uc3QgTElTVEJPWF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IExpc3Rib3gpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtbGlzdGJveCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtuZ0NsYXNzXT1cInsndWktbGlzdGJveCB1aS1pbnB1dHRleHQgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwnOnRydWUsJ3VpLXN0YXRlLWRpc2FibGVkJzpkaXNhYmxlZCwndWktc3RhdGUtZm9jdXMnOmZvY3VzfVwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ1aS1oZWxwZXItaGlkZGVuLWFjY2Vzc2libGVcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcmVhZG9ubHk9XCJyZWFkb25seVwiIChmb2N1cyk9XCJvbklucHV0Rm9jdXMoJGV2ZW50KVwiIChibHVyKT1cIm9uSW5wdXRCbHVyKCRldmVudClcIj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInVpLXdpZGdldC1oZWFkZXIgdWktY29ybmVyLWFsbCB1aS1saXN0Ym94LWhlYWRlciB1aS1oZWxwZXItY2xlYXJmaXhcIiAqbmdJZj1cImhlYWRlckZhY2V0XCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwidWktd2lkZ2V0LWhlYWRlciB1aS1jb3JuZXItYWxsIHVpLWxpc3Rib3gtaGVhZGVyIHVpLWhlbHBlci1jbGVhcmZpeFwiICpuZ0lmPVwiKGNoZWNrYm94ICYmIG11bHRpcGxlICYmIHNob3dUb2dnbGVBbGwpIHx8IGZpbHRlclwiIFtuZ0NsYXNzXT1cInsndWktbGlzdGJveC1oZWFkZXItdy1jaGVja2JveCc6IGNoZWNrYm94fVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidWktY2hrYm94IHVpLXdpZGdldFwiICpuZ0lmPVwiY2hlY2tib3ggJiYgbXVsdGlwbGUgJiYgc2hvd1RvZ2dsZUFsbFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1oZWxwZXItaGlkZGVuLWFjY2Vzc2libGVcIj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiByZWFkb25seT1cInJlYWRvbmx5XCIgW2NoZWNrZWRdPVwiYWxsQ2hlY2tlZFwiIChmb2N1cyk9XCJvbkhlYWRlckNoZWNrYm94Rm9jdXMoKVwiIChibHVyKT1cIm9uSGVhZGVyQ2hlY2tib3hCbHVyKClcIiAoa2V5ZG93bi5zcGFjZSk9XCJ0b2dnbGVBbGwoJGV2ZW50KVwiPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgI2hlYWRlcmNoa2JveCBjbGFzcz1cInVpLWNoa2JveC1ib3ggdWktd2lkZ2V0IHVpLWNvcm5lci1hbGwgdWktc3RhdGUtZGVmYXVsdFwiIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtYWN0aXZlJzogYWxsQ2hlY2tlZCwgJ3VpLXN0YXRlLWZvY3VzJzogaGVhZGVyQ2hlY2tib3hGb2N1c31cIiAoY2xpY2spPVwidG9nZ2xlQWxsKCRldmVudClcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktY2hrYm94LWljb24gdWktY2xpY2thYmxlXCIgW25nQ2xhc3NdPVwieydwaSBwaS1jaGVjayc6YWxsQ2hlY2tlZH1cIj48L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidWktbGlzdGJveC1maWx0ZXItY29udGFpbmVyXCIgKm5nSWY9XCJmaWx0ZXJcIj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBbdmFsdWVdPVwiZmlsdGVyVmFsdWV8fCcnXCIgKGlucHV0KT1cIm9uRmlsdGVyKCRldmVudClcIiBjbGFzcz1cInVpLWlucHV0dGV4dCB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW2F0dHIucGxhY2Vob2xkZXJdPVwiZmlsdGVyUGxhY2VIb2xkZXJcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFGaWx0ZXJMYWJlbFwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbGlzdGJveC1maWx0ZXItaWNvbiBwaSBwaS1zZWFyY2hcIj48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IFtuZ0NsYXNzXT1cIid1aS1saXN0Ym94LWxpc3Qtd3JhcHBlcidcIiBbbmdTdHlsZV09XCJsaXN0U3R5bGVcIiBbY2xhc3NdPVwibGlzdFN0eWxlQ2xhc3NcIj5cbiAgICAgICAgPHVsIGNsYXNzPVwidWktbGlzdGJveC1saXN0XCIgcm9sZT1cImxpc3Rib3hcIiBhcmlhLW11bHRpc2VsZWN0YWJsZT1cIm11bHRpcGxlXCI+XG4gICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBvcHRpb24gb2Ygb3B0aW9uczsgbGV0IGkgPSBpbmRleDtcIiBbc3R5bGUuZGlzcGxheV09XCJpc0l0ZW1WaXNpYmxlKG9wdGlvbikgPyAnYmxvY2snIDogJ25vbmUnXCIgW2F0dHIudGFiaW5kZXhdPVwib3B0aW9uLmRpc2FibGVkID8gbnVsbCA6ICcwJ1wiXG4gICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktbGlzdGJveC1pdGVtIHVpLWNvcm5lci1hbGwnOnRydWUsJ3VpLXN0YXRlLWhpZ2hsaWdodCc6aXNTZWxlY3RlZChvcHRpb24pLCAndWktc3RhdGUtZGlzYWJsZWQnOiBvcHRpb24uZGlzYWJsZWR9XCIgcm9sZT1cIm9wdGlvblwiIFthdHRyLmFyaWEtbGFiZWxdPVwib3B0aW9uLmxhYmVsXCJcbiAgICAgICAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJpc1NlbGVjdGVkKG9wdGlvbilcIiAoY2xpY2spPVwib25PcHRpb25DbGljaygkZXZlbnQsb3B0aW9uKVwiIChkYmxjbGljayk9XCJvbk9wdGlvbkRvdWJsZUNsaWNrKCRldmVudCxvcHRpb24pXCIgKHRvdWNoZW5kKT1cIm9uT3B0aW9uVG91Y2hFbmQoJGV2ZW50LG9wdGlvbilcIiAoa2V5ZG93bik9XCJvbk9wdGlvbktleURvd24oJGV2ZW50LG9wdGlvbilcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1jaGtib3ggdWktd2lkZ2V0XCIgKm5nSWY9XCJjaGVja2JveCAmJiBtdWx0aXBsZVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktY2hrYm94LWJveCB1aS13aWRnZXQgdWktY29ybmVyLWFsbCB1aS1zdGF0ZS1kZWZhdWx0XCIgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1hY3RpdmUnOmlzU2VsZWN0ZWQob3B0aW9uKX1cIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWNoa2JveC1pY29uIHVpLWNsaWNrYWJsZVwiIFtuZ0NsYXNzXT1cInsncGkgcGktY2hlY2snOmlzU2VsZWN0ZWQob3B0aW9uKX1cIj48L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFpdGVtVGVtcGxhdGVcIj57e29wdGlvbi5sYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogb3B0aW9uLCBpbmRleDogaX1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwidWktbGlzdGJveC1mb290ZXIgdWktd2lkZ2V0LWhlYWRlciB1aS1jb3JuZXItYWxsXCIgKm5nSWY9XCJmb290ZXJGYWNldFwiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWZvb3RlclwiPjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICAgIHByb3ZpZGVyczogW0xJU1RCT1hfVkFMVUVfQUNDRVNTT1JdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxufSlcbmV4cG9ydCBjbGFzcyBMaXN0Ym94IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gICAgQElucHV0KCkgbXVsdGlwbGU6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgbGlzdFN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBsaXN0U3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgcmVhZG9ubHk6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGNoZWNrYm94OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBmaWx0ZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIGZpbHRlck1vZGU6IHN0cmluZyA9ICdjb250YWlucyc7XG5cbiAgICBASW5wdXQoKSBmaWx0ZXJMb2NhbGU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIG1ldGFLZXlTZWxlY3Rpb246IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgZGF0YUtleTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc2hvd1RvZ2dsZUFsbDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBvcHRpb25MYWJlbDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYXJpYUZpbHRlckxhYmVsOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBmaWx0ZXJQbGFjZUhvbGRlcjogc3RyaW5nO1xuXG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkRibENsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2hlYWRlcmNoa2JveCcpIGhlYWRlckNoZWNrYm94Vmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgQENvbnRlbnRDaGlsZChIZWFkZXIpIGhlYWRlckZhY2V0O1xuXG4gICAgQENvbnRlbnRDaGlsZChGb290ZXIpIGZvb3RlckZhY2V0O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xuXG4gICAgcHVibGljIGl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIHB1YmxpYyBfZmlsdGVyVmFsdWU6IHN0cmluZztcblxuICAgIHB1YmxpYyBmaWx0ZXJlZDogYm9vbGVhbjtcblxuICAgIHB1YmxpYyB2YWx1ZTogYW55O1xuXG4gICAgcHVibGljIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4geyB9O1xuXG4gICAgcHVibGljIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHsgfTtcblxuICAgIHB1YmxpYyBvcHRpb25Ub3VjaGVkOiBib29sZWFuO1xuXG4gICAgcHVibGljIGZvY3VzOiBib29sZWFuO1xuXG4gICAgcHVibGljIF9vcHRpb25zOiBhbnlbXTtcblxuICAgIHB1YmxpYyBoZWFkZXJDaGVja2JveEZvY3VzOiBib29sZWFuO1xuXG4gICAgcHVibGljIGRpc2FibGVkU2VsZWN0ZWRPcHRpb25zOiBTZWxlY3RJdGVtW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikgeyB9XG5cbiAgICBASW5wdXQoKSBnZXQgb3B0aW9ucygpOiBhbnlbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xuICAgIH1cblxuICAgIHNldCBvcHRpb25zKHZhbDogYW55W10pIHtcbiAgICAgICAgbGV0IG9wdHMgPSB0aGlzLm9wdGlvbkxhYmVsID8gT2JqZWN0VXRpbHMuZ2VuZXJhdGVTZWxlY3RJdGVtcyh2YWwsIHRoaXMub3B0aW9uTGFiZWwpIDogdmFsO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gb3B0cztcbiAgICB9XG5cbiAgICBASW5wdXQoKSBnZXQgZmlsdGVyVmFsdWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlclZhbHVlO1xuICAgIH1cblxuICAgIHNldCBmaWx0ZXJWYWx1ZSh2YWw6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9maWx0ZXJWYWx1ZSA9IHZhbDtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdpdGVtJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc2V0RGlzYWJsZWRTZWxlY3RlZE9wdGlvbnMoKTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB2YWw7XG4gICAgfVxuXG4gICAgb25PcHRpb25DbGljayhldmVudCwgb3B0aW9uKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IG9wdGlvbi5kaXNhYmxlZCB8fCB0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tib3gpXG4gICAgICAgICAgICAgICAgdGhpcy5vbk9wdGlvbkNsaWNrQ2hlY2tib3goZXZlbnQsIG9wdGlvbik7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5vbk9wdGlvbkNsaWNrTXVsdGlwbGUoZXZlbnQsIG9wdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uT3B0aW9uQ2xpY2tTaW5nbGUoZXZlbnQsIG9wdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbkNsaWNrLmVtaXQoe1xuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICBvcHRpb246IG9wdGlvbixcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9wdGlvblRvdWNoZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvbk9wdGlvblRvdWNoRW5kKGV2ZW50LCBvcHRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgb3B0aW9uLmRpc2FibGVkIHx8IHRoaXMucmVhZG9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub3B0aW9uVG91Y2hlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgb25PcHRpb25Eb3VibGVDbGljayhldmVudDogRXZlbnQsIG9wdGlvbjogU2VsZWN0SXRlbSk6IGFueSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IG9wdGlvbi5kaXNhYmxlZCB8fCB0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uRGJsQ2xpY2suZW1pdCh7XG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgIG9wdGlvbjogb3B0aW9uLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWVcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBvbk9wdGlvbkNsaWNrU2luZ2xlKGV2ZW50LCBvcHRpb24pIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5pc1NlbGVjdGVkKG9wdGlvbik7XG4gICAgICAgIGxldCB2YWx1ZUNoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgbGV0IG1ldGFTZWxlY3Rpb24gPSB0aGlzLm9wdGlvblRvdWNoZWQgPyBmYWxzZSA6IHRoaXMubWV0YUtleVNlbGVjdGlvbjtcblxuICAgICAgICBpZiAobWV0YVNlbGVjdGlvbikge1xuICAgICAgICAgICAgbGV0IG1ldGFLZXkgPSAoZXZlbnQubWV0YUtleSB8fCBldmVudC5jdHJsS2V5KTtcblxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1ldGFLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG9wdGlvbi52YWx1ZTtcbiAgICAgICAgICAgICAgICB2YWx1ZUNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHNlbGVjdGVkID8gbnVsbCA6IG9wdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWVDaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uT3B0aW9uQ2xpY2tNdWx0aXBsZShldmVudCwgb3B0aW9uKSB7XG4gICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMuaXNTZWxlY3RlZChvcHRpb24pO1xuICAgICAgICBsZXQgdmFsdWVDaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgIGxldCBtZXRhU2VsZWN0aW9uID0gdGhpcy5vcHRpb25Ub3VjaGVkID8gZmFsc2UgOiB0aGlzLm1ldGFLZXlTZWxlY3Rpb247XG5cbiAgICAgICAgaWYgKG1ldGFTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGxldCBtZXRhS2V5ID0gKGV2ZW50Lm1ldGFLZXkgfHwgZXZlbnQuY3RybEtleSk7XG5cbiAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGlmIChtZXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlT3B0aW9uKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gW29wdGlvbi52YWx1ZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhbHVlQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gKG1ldGFLZXkpID8gdGhpcy52YWx1ZSB8fCBbXSA6IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBbLi4udGhpcy52YWx1ZSwgb3B0aW9uLnZhbHVlXTtcbiAgICAgICAgICAgICAgICB2YWx1ZUNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVPcHRpb24ob3B0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBbLi4udGhpcy52YWx1ZSB8fCBbXSwgb3B0aW9uLnZhbHVlXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZUNoYW5nZWQpIHtcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25PcHRpb25DbGlja0NoZWNrYm94KGV2ZW50LCBvcHRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5pc1NlbGVjdGVkKG9wdGlvbik7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZU9wdGlvbihvcHRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWUgPyB0aGlzLnZhbHVlIDogW107XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gWy4uLnRoaXMudmFsdWUsIG9wdGlvbi52YWx1ZV07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7XG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbW92ZU9wdGlvbihvcHRpb246IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZS5maWx0ZXIodmFsID0+ICFPYmplY3RVdGlscy5lcXVhbHModmFsLCBvcHRpb24udmFsdWUsIHRoaXMuZGF0YUtleSkpO1xuICAgIH1cblxuICAgIGlzU2VsZWN0ZWQob3B0aW9uOiBTZWxlY3RJdGVtKSB7XG4gICAgICAgIGxldCBzZWxlY3RlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHZhbCBvZiB0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3RVdGlscy5lcXVhbHModmFsLCBvcHRpb24udmFsdWUsIHRoaXMuZGF0YUtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2VsZWN0ZWQgPSBPYmplY3RVdGlscy5lcXVhbHModGhpcy52YWx1ZSwgb3B0aW9uLnZhbHVlLCB0aGlzLmRhdGFLZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkO1xuICAgIH1cblxuICAgIGdldCBhbGxDaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5maWx0ZXJWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWxsRmlsdGVyZWRTZWxlY3RlZCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IG9wdGlvbkNvdW50ID0gdGhpcy5nZXRFbmFibGVkT3B0aW9uQ291bnQoKTtcbiAgICAgICAgICAgIGxldCBkaXNhYmxlZFNlbGVjdGVkT3B0aW9uQ291bnQgPSB0aGlzLmRpc2FibGVkU2VsZWN0ZWRPcHRpb25zLmxlbmd0aDtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgJiYgdGhpcy5vcHRpb25zICYmICh0aGlzLnZhbHVlLmxlbmd0aCA+IDAgJiYgdGhpcy52YWx1ZS5sZW5ndGggPT0gb3B0aW9uQ291bnQgKyBkaXNhYmxlZFNlbGVjdGVkT3B0aW9uQ291bnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0RW5hYmxlZE9wdGlvbkNvdW50KCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBvcHQgb2YgdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFvcHQuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjb3VudDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWxsRmlsdGVyZWRTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGFsbFNlbGVjdGVkOiBib29sZWFuO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IHRoaXMuZmlsdGVyVmFsdWUgPyB0aGlzLmdldEZpbHRlcmVkT3B0aW9ucygpIDogdGhpcy5vcHRpb25zO1xuXG4gICAgICAgIGlmICh0aGlzLnZhbHVlICYmIG9wdGlvbnMgJiYgb3B0aW9ucy5sZW5ndGgpIMKge1xuICAgICAgICAgICAgYWxsU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgZm9yIChsZXQgb3B0IG9mIHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzSXRlbVZpc2libGUob3B0KSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNTZWxlY3RlZChvcHQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYWxsU2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgb25GaWx0ZXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5fZmlsdGVyVmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgfVxuXG4gICAgdG9nZ2xlQWxsKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMucmVhZG9ubHkgfHwgIXRoaXMub3B0aW9ucyB8fCB0aGlzLm9wdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5hbGxDaGVja2VkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kaXNhYmxlZFNlbGVjdGVkT3B0aW9ucyAmJiB0aGlzLmRpc2FibGVkU2VsZWN0ZWRPcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBbXTtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IFsuLi50aGlzLmRpc2FibGVkU2VsZWN0ZWRPcHRpb25zXTtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IFtdO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpc2FibGVkU2VsZWN0ZWRPcHRpb25zICYmIHRoaXMuZGlzYWJsZWRTZWxlY3RlZE9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gWy4uLnRoaXMuZGlzYWJsZWRTZWxlY3RlZE9wdGlvbnNdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5vcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBvcHQgPSB0aGlzLm9wdGlvbnNbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzSXRlbVZpc2libGUob3B0KSAmJiAhb3B0LmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlLnB1c2gob3B0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIHZhbHVlOiB0aGlzLnZhbHVlIH0pO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGlzSXRlbVZpc2libGUob3B0aW9uOiBTZWxlY3RJdGVtKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmZpbHRlclZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgdmlzaWJsZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyTW9kZSkge1xuICAgICAgICAgICAgICAgIHZpc2libGUgPSBGaWx0ZXJVdGlsc1t0aGlzLmZpbHRlck1vZGVdKG9wdGlvbi5sYWJlbCwgdGhpcy5maWx0ZXJWYWx1ZSwgdGhpcy5maWx0ZXJMb2NhbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB2aXNpYmxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbklucHV0Rm9jdXMoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1cyA9IHRydWU7XG4gICAgfVxuXG4gICAgb25JbnB1dEJsdXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1cyA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uT3B0aW9uS2V5RG93bihldmVudDpLZXlib2FyZEV2ZW50LCBvcHRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZG9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpdGVtID0gPEhUTUxMSUVsZW1lbnQ+IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG5cbiAgICAgICAgc3dpdGNoKGV2ZW50LndoaWNoKSB7XG4gICAgICAgICAgICAvL2Rvd25cbiAgICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICAgICAgdmFyIG5leHRJdGVtID0gdGhpcy5maW5kTmV4dEl0ZW0oaXRlbSk7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRJdGVtLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvL3VwXG4gICAgICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgICAgIHZhciBwcmV2SXRlbSA9IHRoaXMuZmluZFByZXZJdGVtKGl0ZW0pO1xuICAgICAgICAgICAgICAgIGlmIChwcmV2SXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2SXRlbS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy9lbnRlclxuICAgICAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3B0aW9uQ2xpY2soZXZlbnQsIG9wdGlvbik7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmluZE5leHRJdGVtKGl0ZW0pIHtcbiAgICAgICAgbGV0IG5leHRJdGVtID0gaXRlbS5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgaWYgKG5leHRJdGVtKVxuICAgICAgICAgICAgcmV0dXJuIERvbUhhbmRsZXIuaGFzQ2xhc3MobmV4dEl0ZW0sICd1aS1zdGF0ZS1kaXNhYmxlZCcpIHx8IERvbUhhbmRsZXIuaXNIaWRkZW4obmV4dEl0ZW0pID8gdGhpcy5maW5kTmV4dEl0ZW0obmV4dEl0ZW0pIDogbmV4dEl0ZW07XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGZpbmRQcmV2SXRlbShpdGVtKSB7XG4gICAgICAgIGxldCBwcmV2SXRlbSA9IGl0ZW0ucHJldmlvdXNFbGVtZW50U2libGluZztcblxuICAgICAgICBpZiAocHJldkl0ZW0pXG4gICAgICAgICAgICByZXR1cm4gRG9tSGFuZGxlci5oYXNDbGFzcyhwcmV2SXRlbSwgJ3VpLXN0YXRlLWRpc2FibGVkJykgfHwgRG9tSGFuZGxlci5pc0hpZGRlbihwcmV2SXRlbSkgPyB0aGlzLmZpbmRQcmV2SXRlbShwcmV2SXRlbSkgOiBwcmV2SXRlbTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZ2V0RmlsdGVyZWRPcHRpb25zKCkge1xuICAgICAgICBsZXQgZmlsdGVyZWRPcHRpb25zID0gW107XG4gICAgICAgIGlmICh0aGlzLmZpbHRlclZhbHVlKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBvcHQgPSB0aGlzLm9wdGlvbnNbaV07XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNJdGVtVmlzaWJsZShvcHQpICYmICFvcHQuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRPcHRpb25zLnB1c2gob3B0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyZWRPcHRpb25zO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSGVhZGVyQ2hlY2tib3hGb2N1cygpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJDaGVja2JveEZvY3VzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbkhlYWRlckNoZWNrYm94Qmx1cigpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJDaGVja2JveEZvY3VzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTZWxlY3RlZE9wdGlvbnMoKXtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlZFNlbGVjdGVkT3B0aW9ucyA9IFtdO1xuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBvcHQgb2YgdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHQuZGlzYWJsZWQgJiYgdGhpcy5pc1NlbGVjdGVkKG9wdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZWRTZWxlY3RlZE9wdGlvbnMucHVzaChvcHQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFNoYXJlZE1vZHVsZV0sXG4gICAgZXhwb3J0czogW0xpc3Rib3gsIFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbTGlzdGJveF1cbn0pXG5leHBvcnQgY2xhc3MgTGlzdGJveE1vZHVsZSB7IH1cblxuIl19