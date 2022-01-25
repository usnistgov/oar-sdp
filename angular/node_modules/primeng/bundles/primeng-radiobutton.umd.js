(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('primeng/radiobutton', ['exports', '@angular/core', '@angular/common', '@angular/forms'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.radiobutton = {}), global.ng.core, global.ng.common, global.ng.forms));
}(this, (function (exports, core, common, forms) { 'use strict';

    var RADIO_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return RadioButton; }),
        multi: true
    };
    var RadioButton = /** @class */ (function () {
        function RadioButton(cd) {
            this.cd = cd;
            this.onClick = new core.EventEmitter();
            this.onFocus = new core.EventEmitter();
            this.onBlur = new core.EventEmitter();
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
        }
        RadioButton.prototype.handleClick = function (event, radioButton, focus) {
            event.preventDefault();
            if (this.disabled) {
                return;
            }
            this.select(event);
            if (focus) {
                radioButton.focus();
            }
        };
        RadioButton.prototype.select = function (event) {
            if (!this.disabled) {
                this.inputViewChild.nativeElement.checked = true;
                this.checked = true;
                this.onModelChange(this.value);
                this.onClick.emit(event);
            }
        };
        RadioButton.prototype.writeValue = function (value) {
            this.checked = (value == this.value);
            if (this.inputViewChild && this.inputViewChild.nativeElement) {
                this.inputViewChild.nativeElement.checked = this.checked;
            }
            this.cd.markForCheck();
        };
        RadioButton.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        RadioButton.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        RadioButton.prototype.setDisabledState = function (val) {
            this.disabled = val;
            this.cd.markForCheck();
        };
        RadioButton.prototype.onInputFocus = function (event) {
            this.focused = true;
            this.onFocus.emit(event);
        };
        RadioButton.prototype.onInputBlur = function (event) {
            this.focused = false;
            this.onModelTouched();
            this.onBlur.emit(event);
        };
        RadioButton.prototype.onChange = function (event) {
            this.select(event);
        };
        RadioButton.prototype.focus = function () {
            this.inputViewChild.nativeElement.focus();
        };
        return RadioButton;
    }());
    RadioButton.decorators = [
        { type: core.Component, args: [{
                    selector: 'p-radioButton',
                    template: "\n        <div [ngStyle]=\"style\" [ngClass]=\"{'p-radiobutton p-component':true,'p-radiobutton-checked': checked, 'p-radiobutton-disabled': disabled, 'p-radiobutton-focused': focused}\" [class]=\"styleClass\">\n            <div class=\"p-hidden-accessible\">\n                <input #rb type=\"radio\" [attr.id]=\"inputId\" [attr.name]=\"name\" [attr.value]=\"value\" [attr.tabindex]=\"tabindex\" [attr.aria-labelledby]=\"ariaLabelledBy\"\n                    [checked]=\"checked\" (change)=\"onChange($event)\" (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\" [disabled]=\"disabled\">\n            </div>\n            <div (click)=\"handleClick($event, rb, true)\" role=\"radio\" [attr.aria-checked]=\"checked\"\n                [ngClass]=\"{'p-radiobutton-box':true,\n                'p-highlight': checked, 'p-disabled': disabled, 'p-focus': focused}\">\n                <span class=\"p-radiobutton-icon\"></span>\n            </div>\n        </div>\n        <label (click)=\"select($event)\" [class]=\"labelStyleClass\"\n            [ngClass]=\"{'p-radiobutton-label':true, 'p-radiobutton-label-active':rb.checked, 'p-disabled':disabled, 'p-radiobutton-label-focus':focused}\"\n            *ngIf=\"label\" [attr.for]=\"inputId\">{{label}}</label>\n    ",
                    providers: [RADIO_VALUE_ACCESSOR],
                    changeDetection: core.ChangeDetectionStrategy.OnPush
                },] }
    ];
    RadioButton.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef }
    ]; };
    RadioButton.propDecorators = {
        value: [{ type: core.Input }],
        name: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        label: [{ type: core.Input }],
        tabindex: [{ type: core.Input }],
        inputId: [{ type: core.Input }],
        ariaLabelledBy: [{ type: core.Input }],
        style: [{ type: core.Input }],
        styleClass: [{ type: core.Input }],
        labelStyleClass: [{ type: core.Input }],
        onClick: [{ type: core.Output }],
        onFocus: [{ type: core.Output }],
        onBlur: [{ type: core.Output }],
        inputViewChild: [{ type: core.ViewChild, args: ['rb',] }]
    };
    var RadioButtonModule = /** @class */ (function () {
        function RadioButtonModule() {
        }
        return RadioButtonModule;
    }());
    RadioButtonModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [RadioButton],
                    declarations: [RadioButton]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.RADIO_VALUE_ACCESSOR = RADIO_VALUE_ACCESSOR;
    exports.RadioButton = RadioButton;
    exports.RadioButtonModule = RadioButtonModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-radiobutton.umd.js.map
