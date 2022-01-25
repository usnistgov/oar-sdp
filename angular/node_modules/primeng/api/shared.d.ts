import { TemplateRef } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
export declare class Header {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Header, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<Header, "p-header", never, {}, {}, never, ["*"]>;
}
export declare class Footer {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Footer, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<Footer, "p-footer", never, {}, {}, never, ["*"]>;
}
export declare class PrimeTemplate {
    template: TemplateRef<any>;
    type: string;
    name: string;
    constructor(template: TemplateRef<any>);
    getType(): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PrimeTemplate, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<PrimeTemplate, "[pTemplate]", never, { "type": "type"; "name": "pTemplate"; }, {}, never>;
}
export declare class SharedModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<SharedModule, [typeof Header, typeof Footer, typeof PrimeTemplate], [typeof ɵngcc1.CommonModule], [typeof Header, typeof Footer, typeof PrimeTemplate]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<SharedModule>;
}

//# sourceMappingURL=shared.d.ts.map