import { EventEmitter, ChangeDetectorRef, SimpleChanges, OnChanges } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ControlValueAccessor } from '@angular/forms';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from 'primeng/ripple';
export declare const SELECTBUTTON_VALUE_ACCESSOR: any;
export declare class SelectButton implements ControlValueAccessor, OnChanges {
    cd: ChangeDetectorRef;
    tabindex: number;
    multiple: boolean;
    style: any;
    styleClass: string;
    ariaLabelledBy: string;
    disabled: boolean;
    dataKey: string;
    optionLabel: string;
    onOptionClick: EventEmitter<any>;
    onChange: EventEmitter<any>;
    itemTemplate: any;
    value: any;
    _options: any[];
    onModelChange: Function;
    onModelTouched: Function;
    constructor(cd: ChangeDetectorRef);
    get options(): any[];
    set options(val: any[]);
    ngOnChanges(simpleChange: SimpleChanges): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    onItemClick(event: any, option: SelectItem, index: number): void;
    onBlur(): void;
    isSelected(option: SelectItem): boolean;
    findItemIndex(option: SelectItem): number;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<SelectButton, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<SelectButton, "p-selectButton", never, { "tabindex": "tabindex"; "options": "options"; "disabled": "disabled"; "multiple": "multiple"; "style": "style"; "styleClass": "styleClass"; "ariaLabelledBy": "ariaLabelledBy"; "dataKey": "dataKey"; "optionLabel": "optionLabel"; }, { "onOptionClick": "onOptionClick"; "onChange": "onChange"; }, ["itemTemplate"], never>;
}
export declare class SelectButtonModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<SelectButtonModule, [typeof SelectButton], [typeof ɵngcc1.CommonModule, typeof ɵngcc2.RippleModule], [typeof SelectButton]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<SelectButtonModule>;
}

//# sourceMappingURL=selectbutton.d.ts.map