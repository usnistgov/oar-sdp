import { EventEmitter, ChangeDetectorRef, ElementRef } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
export declare const CHECKBOX_VALUE_ACCESSOR: any;
export declare class Checkbox implements ControlValueAccessor {
    private cd;
    value: any;
    name: string;
    disabled: boolean;
    binary: boolean;
    label: string;
    ariaLabelledBy: string;
    tabindex: number;
    inputId: string;
    style: any;
    styleClass: string;
    labelStyleClass: string;
    formControl: FormControl;
    checkboxIcon: string;
    readonly: boolean;
    required: boolean;
    inputViewChild: ElementRef;
    onChange: EventEmitter<any>;
    model: any;
    onModelChange: Function;
    onModelTouched: Function;
    focused: boolean;
    checked: boolean;
    constructor(cd: ChangeDetectorRef);
    onClick(event: any, checkbox: any, focus: boolean): void;
    updateModel(event: any): void;
    handleChange(event: any): void;
    isChecked(): boolean;
    removeValue(): void;
    addValue(): void;
    onFocus(): void;
    onBlur(): void;
    focus(): void;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Checkbox, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<Checkbox, "p-checkbox", never, { "checkboxIcon": "checkboxIcon"; "disabled": "disabled"; "value": "value"; "name": "name"; "binary": "binary"; "label": "label"; "ariaLabelledBy": "ariaLabelledBy"; "tabindex": "tabindex"; "inputId": "inputId"; "style": "style"; "styleClass": "styleClass"; "labelStyleClass": "labelStyleClass"; "formControl": "formControl"; "readonly": "readonly"; "required": "required"; }, { "onChange": "onChange"; }, never, never>;
}
export declare class CheckboxModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<CheckboxModule, [typeof Checkbox], [typeof ɵngcc1.CommonModule], [typeof Checkbox]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<CheckboxModule>;
}

//# sourceMappingURL=checkbox.d.ts.map