import { ElementRef, EventEmitter } from '@angular/core';
import { Validator, AbstractControl } from '@angular/forms';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
export declare const KEYFILTER_VALIDATOR: any;
export declare class KeyFilter implements Validator {
    el: ElementRef;
    pValidateOnly: boolean;
    ngModelChange: EventEmitter<any>;
    regex: RegExp;
    _pattern: any;
    isAndroid: boolean;
    lastValue: any;
    constructor(el: ElementRef);
    get pattern(): any;
    set pattern(_pattern: any);
    isNavKeyPress(e: KeyboardEvent): boolean;
    isSpecialKey(e: KeyboardEvent): boolean;
    getKey(e: KeyboardEvent): any;
    getCharCode(e: KeyboardEvent): number;
    findDelta(value: string, prevValue: string): string;
    isValidChar(c: string): boolean;
    isValidString(str: string): boolean;
    onInput(e: KeyboardEvent): void;
    onKeyPress(e: KeyboardEvent): void;
    onPaste(e: any): void;
    validate(c: AbstractControl): {
        [key: string]: any;
    };
    static ɵfac: ɵngcc0.ɵɵFactoryDef<KeyFilter, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<KeyFilter, "[pKeyFilter]", never, { "pattern": "pKeyFilter"; "pValidateOnly": "pValidateOnly"; }, { "ngModelChange": "ngModelChange"; }, never>;
}
export declare class KeyFilterModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<KeyFilterModule, [typeof KeyFilter], [typeof ɵngcc1.CommonModule], [typeof KeyFilter]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<KeyFilterModule>;
}

//# sourceMappingURL=keyfilter.d.ts.map