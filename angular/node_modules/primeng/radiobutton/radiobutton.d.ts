import { ElementRef, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
export declare const RADIO_VALUE_ACCESSOR: any;
export declare class RadioButton implements ControlValueAccessor {
    cd: ChangeDetectorRef;
    value: any;
    name: string;
    disabled: boolean;
    label: string;
    tabindex: number;
    inputId: string;
    ariaLabelledBy: string;
    style: any;
    styleClass: string;
    labelStyleClass: string;
    onClick: EventEmitter<any>;
    onFocus: EventEmitter<any>;
    onBlur: EventEmitter<any>;
    inputViewChild: ElementRef;
    onModelChange: Function;
    onModelTouched: Function;
    checked: boolean;
    focused: boolean;
    constructor(cd: ChangeDetectorRef);
    handleClick(event: any, radioButton: any, focus: any): void;
    select(event: any): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    onInputFocus(event: any): void;
    onInputBlur(event: any): void;
    onChange(event: any): void;
    focus(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<RadioButton, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<RadioButton, "p-radioButton", never, { "disabled": "disabled"; "value": "value"; "name": "name"; "label": "label"; "tabindex": "tabindex"; "inputId": "inputId"; "ariaLabelledBy": "ariaLabelledBy"; "style": "style"; "styleClass": "styleClass"; "labelStyleClass": "labelStyleClass"; }, { "onClick": "onClick"; "onFocus": "onFocus"; "onBlur": "onBlur"; }, never, never>;
}
export declare class RadioButtonModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<RadioButtonModule, [typeof RadioButton], [typeof ɵngcc1.CommonModule], [typeof RadioButton]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<RadioButtonModule>;
}

//# sourceMappingURL=radiobutton.d.ts.map