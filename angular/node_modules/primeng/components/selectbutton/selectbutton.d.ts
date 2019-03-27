import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { SelectItem } from '../common/selectitem';
import { ObjectUtils } from '../utils/objectutils';
import { ControlValueAccessor } from '@angular/forms';
export declare const SELECTBUTTON_VALUE_ACCESSOR: any;
export declare class SelectButton implements ControlValueAccessor {
    objectUtils: ObjectUtils;
    private cd;
    tabindex: number;
    multiple: boolean;
    style: any;
    styleClass: string;
    disabled: boolean;
    dataKey: string;
    optionLabel: string;
    onOptionClick: EventEmitter<any>;
    onChange: EventEmitter<any>;
    itemTemplate: any;
    value: any;
    focusedItem: HTMLInputElement;
    _options: any[];
    onModelChange: Function;
    onModelTouched: Function;
    constructor(objectUtils: ObjectUtils, cd: ChangeDetectorRef);
    options: any[];
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    onItemClick(event: any, option: SelectItem, checkbox: HTMLInputElement, index: number): void;
    onFocus(event: Event): void;
    onBlur(event: any): void;
    isSelected(option: SelectItem): boolean;
    findItemIndex(option: SelectItem): number;
}
export declare class SelectButtonModule {
}
