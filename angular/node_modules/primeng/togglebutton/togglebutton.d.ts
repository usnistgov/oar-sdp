import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from 'primeng/ripple';
export declare const TOGGLEBUTTON_VALUE_ACCESSOR: any;
export declare class ToggleButton implements ControlValueAccessor {
    cd: ChangeDetectorRef;
    onLabel: string;
    offLabel: string;
    onIcon: string;
    offIcon: string;
    ariaLabelledBy: string;
    disabled: boolean;
    style: any;
    styleClass: string;
    inputId: string;
    tabindex: number;
    iconPos: string;
    onChange: EventEmitter<any>;
    checked: boolean;
    onModelChange: Function;
    onModelTouched: Function;
    constructor(cd: ChangeDetectorRef);
    toggle(event: Event): void;
    onBlur(): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    get hasOnLabel(): boolean;
    get hasOffLabel(): boolean;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ToggleButton, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<ToggleButton, "p-toggleButton", never, { "iconPos": "iconPos"; "disabled": "disabled"; "onLabel": "onLabel"; "offLabel": "offLabel"; "onIcon": "onIcon"; "offIcon": "offIcon"; "ariaLabelledBy": "ariaLabelledBy"; "style": "style"; "styleClass": "styleClass"; "inputId": "inputId"; "tabindex": "tabindex"; }, { "onChange": "onChange"; }, never, never>;
}
export declare class ToggleButtonModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<ToggleButtonModule, [typeof ToggleButton], [typeof ɵngcc1.CommonModule, typeof ɵngcc2.RippleModule], [typeof ToggleButton]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<ToggleButtonModule>;
}

//# sourceMappingURL=togglebutton.d.ts.map