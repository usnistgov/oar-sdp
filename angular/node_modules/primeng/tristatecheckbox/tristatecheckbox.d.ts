import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export declare const TRISTATECHECKBOX_VALUE_ACCESSOR: any;
export declare class TriStateCheckbox implements ControlValueAccessor {
    private cd;
    constructor(cd: ChangeDetectorRef);
    disabled: boolean;
    name: string;
    ariaLabelledBy: string;
    tabindex: number;
    inputId: string;
    style: any;
    styleClass: string;
    label: string;
    readonly: boolean;
    checkboxTrueIcon: string;
    checkboxFalseIcon: string;
    onChange: EventEmitter<any>;
    focused: boolean;
    value: any;
    onModelChange: Function;
    onModelTouched: Function;
    onClick(event: Event, input: HTMLInputElement): void;
    onKeydown(event: KeyboardEvent): void;
    onKeyup(event: KeyboardEvent): void;
    toggle(event: Event): void;
    onFocus(): void;
    onBlur(): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    writeValue(value: any): void;
    setDisabledState(disabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TriStateCheckbox, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TriStateCheckbox, "p-triStateCheckbox", never, { "disabled": "disabled"; "name": "name"; "ariaLabelledBy": "ariaLabelledBy"; "tabindex": "tabindex"; "inputId": "inputId"; "style": "style"; "styleClass": "styleClass"; "label": "label"; "readonly": "readonly"; "checkboxTrueIcon": "checkboxTrueIcon"; "checkboxFalseIcon": "checkboxFalseIcon"; }, { "onChange": "onChange"; }, never, never>;
}
export declare class TriStateCheckboxModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<TriStateCheckboxModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<TriStateCheckboxModule, [typeof TriStateCheckbox], [typeof i1.CommonModule], [typeof TriStateCheckbox]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<TriStateCheckboxModule>;
}
