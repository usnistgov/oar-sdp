import { ElementRef, EventEmitter, AfterContentInit, QueryList, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from 'primeng/inputtext';
import * as ɵngcc3 from 'primeng/api';
export declare const CHIPS_VALUE_ACCESSOR: any;
export declare class Chips implements AfterContentInit, ControlValueAccessor {
    el: ElementRef;
    cd: ChangeDetectorRef;
    style: any;
    styleClass: string;
    disabled: boolean;
    field: string;
    placeholder: string;
    max: number;
    ariaLabelledBy: string;
    tabindex: number;
    inputId: string;
    allowDuplicate: boolean;
    inputStyle: any;
    inputStyleClass: any;
    addOnTab: boolean;
    addOnBlur: boolean;
    separator: string;
    onAdd: EventEmitter<any>;
    onRemove: EventEmitter<any>;
    onFocus: EventEmitter<any>;
    onBlur: EventEmitter<any>;
    onChipClick: EventEmitter<any>;
    inputViewChild: ElementRef;
    templates: QueryList<any>;
    itemTemplate: TemplateRef<any>;
    value: any;
    onModelChange: Function;
    onModelTouched: Function;
    valueChanged: boolean;
    focus: boolean;
    filled: boolean;
    constructor(el: ElementRef, cd: ChangeDetectorRef);
    ngAfterContentInit(): void;
    onClick(): void;
    onInput(): void;
    onPaste(event: any): void;
    updateFilledState(): void;
    onItemClick(event: Event, item: any): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    resolveFieldData(data: any, field: string): any;
    onInputFocus(event: FocusEvent): void;
    onInputBlur(event: FocusEvent): void;
    removeItem(event: Event, index: number): void;
    addItem(event: Event, item: string, preventDefault: boolean): void;
    onKeydown(event: KeyboardEvent): void;
    updateMaxedOut(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Chips, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<Chips, "p-chips", never, { "allowDuplicate": "allowDuplicate"; "disabled": "disabled"; "style": "style"; "styleClass": "styleClass"; "field": "field"; "placeholder": "placeholder"; "max": "max"; "ariaLabelledBy": "ariaLabelledBy"; "tabindex": "tabindex"; "inputId": "inputId"; "inputStyle": "inputStyle"; "inputStyleClass": "inputStyleClass"; "addOnTab": "addOnTab"; "addOnBlur": "addOnBlur"; "separator": "separator"; }, { "onAdd": "onAdd"; "onRemove": "onRemove"; "onFocus": "onFocus"; "onBlur": "onBlur"; "onChipClick": "onChipClick"; }, ["templates"], never>;
}
export declare class ChipsModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<ChipsModule, [typeof Chips], [typeof ɵngcc1.CommonModule, typeof ɵngcc2.InputTextModule, typeof ɵngcc3.SharedModule], [typeof Chips, typeof ɵngcc2.InputTextModule, typeof ɵngcc3.SharedModule]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<ChipsModule>;
}

//# sourceMappingURL=chips.d.ts.map