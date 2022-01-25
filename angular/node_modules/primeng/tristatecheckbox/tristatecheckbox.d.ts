import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<TriStateCheckbox, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<TriStateCheckbox, "p-triStateCheckbox", never, { "disabled": "disabled"; "name": "name"; "ariaLabelledBy": "ariaLabelledBy"; "tabindex": "tabindex"; "inputId": "inputId"; "style": "style"; "styleClass": "styleClass"; "label": "label"; "readonly": "readonly"; }, { "onChange": "onChange"; }, never, never>;
}
export declare class TriStateCheckboxModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<TriStateCheckboxModule, [typeof TriStateCheckbox], [typeof ɵngcc1.CommonModule], [typeof TriStateCheckbox]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<TriStateCheckboxModule>;
}

//# sourceMappingURL=tristatecheckbox.d.ts.map