import { EventEmitter, ChangeDetectorRef, SimpleChanges, OnChanges } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ControlValueAccessor } from '@angular/forms';
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
}
export declare class SelectButtonModule {
}
