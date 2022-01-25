import { ElementRef, DoCheck } from '@angular/core';
import { NgModel } from '@angular/forms';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
export declare class InputText implements DoCheck {
    el: ElementRef;
    ngModel: NgModel;
    filled: boolean;
    constructor(el: ElementRef, ngModel: NgModel);
    ngDoCheck(): void;
    onInput(e: any): void;
    updateFilledState(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<InputText, [null, { optional: true; }]>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<InputText, "[pInputText]", never, {}, {}, never>;
}
export declare class InputTextModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<InputTextModule, [typeof InputText], [typeof ɵngcc1.CommonModule], [typeof InputText]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<InputTextModule>;
}

//# sourceMappingURL=inputtext.d.ts.map