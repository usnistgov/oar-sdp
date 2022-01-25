import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/ripple";
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
    static ɵfac: i0.ɵɵFactoryDeclaration<ToggleButton, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToggleButton, "p-toggleButton", never, { "onLabel": "onLabel"; "offLabel": "offLabel"; "onIcon": "onIcon"; "offIcon": "offIcon"; "ariaLabelledBy": "ariaLabelledBy"; "disabled": "disabled"; "style": "style"; "styleClass": "styleClass"; "inputId": "inputId"; "tabindex": "tabindex"; "iconPos": "iconPos"; }, { "onChange": "onChange"; }, never, never>;
}
export declare class ToggleButtonModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ToggleButtonModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ToggleButtonModule, [typeof ToggleButton], [typeof i1.CommonModule, typeof i2.RippleModule], [typeof ToggleButton]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ToggleButtonModule>;
}
