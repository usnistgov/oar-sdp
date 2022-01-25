import { TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export declare class Header {
    static ɵfac: i0.ɵɵFactoryDeclaration<Header, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Header, "p-header", never, {}, {}, never, ["*"]>;
}
export declare class Footer {
    static ɵfac: i0.ɵɵFactoryDeclaration<Footer, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Footer, "p-footer", never, {}, {}, never, ["*"]>;
}
export declare class PrimeTemplate {
    template: TemplateRef<any>;
    type: string;
    name: string;
    constructor(template: TemplateRef<any>);
    getType(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<PrimeTemplate, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<PrimeTemplate, "[pTemplate]", never, { "type": "type"; "name": "pTemplate"; }, {}, never>;
}
export declare class SharedModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<SharedModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<SharedModule, [typeof Header, typeof Footer, typeof PrimeTemplate], [typeof i1.CommonModule], [typeof Header, typeof Footer, typeof PrimeTemplate]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<SharedModule>;
}
