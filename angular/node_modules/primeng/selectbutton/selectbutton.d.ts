import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/ripple";
export declare const SELECTBUTTON_VALUE_ACCESSOR: any;
export declare class SelectButton implements ControlValueAccessor {
    cd: ChangeDetectorRef;
    options: any[];
    optionLabel: string;
    optionValue: string;
    optionDisabled: string;
    tabindex: number;
    multiple: boolean;
    style: any;
    styleClass: string;
    ariaLabelledBy: string;
    disabled: boolean;
    dataKey: string;
    onOptionClick: EventEmitter<any>;
    onChange: EventEmitter<any>;
    itemTemplate: any;
    value: any;
    onModelChange: Function;
    onModelTouched: Function;
    constructor(cd: ChangeDetectorRef);
    getOptionLabel(option: any): any;
    getOptionValue(option: any): any;
    isOptionDisabled(option: any): any;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    onItemClick(event: any, option: any, index: number): void;
    onBlur(): void;
    removeOption(option: any): void;
    isSelected(option: any): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectButton, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SelectButton, "p-selectButton", never, { "options": "options"; "optionLabel": "optionLabel"; "optionValue": "optionValue"; "optionDisabled": "optionDisabled"; "tabindex": "tabindex"; "multiple": "multiple"; "style": "style"; "styleClass": "styleClass"; "ariaLabelledBy": "ariaLabelledBy"; "disabled": "disabled"; "dataKey": "dataKey"; }, { "onOptionClick": "onOptionClick"; "onChange": "onChange"; }, ["itemTemplate"], never>;
}
export declare class SelectButtonModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectButtonModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<SelectButtonModule, [typeof SelectButton], [typeof i1.CommonModule, typeof i2.RippleModule], [typeof SelectButton]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<SelectButtonModule>;
}
