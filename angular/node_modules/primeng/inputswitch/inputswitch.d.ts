import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
export declare const INPUTSWITCH_VALUE_ACCESSOR: any;
export declare class InputSwitch implements ControlValueAccessor {
    private cd;
    style: any;
    styleClass: string;
    tabindex: number;
    inputId: string;
    name: string;
    disabled: boolean;
    readonly: boolean;
    ariaLabelledBy: string;
    onChange: EventEmitter<any>;
    checked: boolean;
    focused: boolean;
    onModelChange: Function;
    onModelTouched: Function;
    constructor(cd: ChangeDetectorRef);
    onClick(event: Event, cb: HTMLInputElement): void;
    onInputChange(event: Event): void;
    toggle(event: Event): void;
    updateModel(event: Event, value: boolean): void;
    onFocus(event: Event): void;
    onBlur(event: Event): void;
    writeValue(checked: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<InputSwitch, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<InputSwitch, "p-inputSwitch", never, { "disabled": "disabled"; "style": "style"; "styleClass": "styleClass"; "tabindex": "tabindex"; "inputId": "inputId"; "name": "name"; "readonly": "readonly"; "ariaLabelledBy": "ariaLabelledBy"; }, { "onChange": "onChange"; }, never, never>;
}
export declare class InputSwitchModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<InputSwitchModule, [typeof InputSwitch], [typeof ɵngcc1.CommonModule], [typeof InputSwitch]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<InputSwitchModule>;
}

//# sourceMappingURL=inputswitch.d.ts.map