import { ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export declare class FocusTrap {
    el: ElementRef;
    pFocusTrapDisabled: boolean;
    constructor(el: ElementRef);
    onkeydown(e: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FocusTrap, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<FocusTrap, "[pFocusTrap]", never, { "pFocusTrapDisabled": "pFocusTrapDisabled"; }, {}, never>;
}
export declare class FocusTrapModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<FocusTrapModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<FocusTrapModule, [typeof FocusTrap], [typeof i1.CommonModule], [typeof FocusTrap]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<FocusTrapModule>;
}
