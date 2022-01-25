import { OnInit, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
export declare const RATING_VALUE_ACCESSOR: any;
export declare class Rating implements OnInit, ControlValueAccessor {
    private cd;
    disabled: boolean;
    readonly: boolean;
    stars: number;
    cancel: boolean;
    iconOnClass: string;
    iconOnStyle: any;
    iconOffClass: string;
    iconOffStyle: any;
    iconCancelClass: string;
    iconCancelStyle: any;
    onRate: EventEmitter<any>;
    onCancel: EventEmitter<any>;
    constructor(cd: ChangeDetectorRef);
    value: number;
    onModelChange: Function;
    onModelTouched: Function;
    starsArray: number[];
    ngOnInit(): void;
    rate(event: any, i: number): void;
    clear(event: any): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Rating, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<Rating, "p-rating", never, { "stars": "stars"; "cancel": "cancel"; "iconOnClass": "iconOnClass"; "iconOffClass": "iconOffClass"; "iconCancelClass": "iconCancelClass"; "disabled": "disabled"; "readonly": "readonly"; "iconOnStyle": "iconOnStyle"; "iconOffStyle": "iconOffStyle"; "iconCancelStyle": "iconCancelStyle"; }, { "onRate": "onRate"; "onCancel": "onCancel"; }, never, never>;
}
export declare class RatingModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<RatingModule, [typeof Rating], [typeof ɵngcc1.CommonModule], [typeof Rating]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<RatingModule>;
}

//# sourceMappingURL=rating.d.ts.map