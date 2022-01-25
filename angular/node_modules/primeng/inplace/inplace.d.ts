import { EventEmitter, ChangeDetectorRef, AfterContentInit, TemplateRef, QueryList } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from 'primeng/button';
export declare class InplaceDisplay {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<InplaceDisplay, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<InplaceDisplay, "p-inplaceDisplay", never, {}, {}, never, ["*"]>;
}
export declare class InplaceContent {
    static ɵfac: ɵngcc0.ɵɵFactoryDef<InplaceContent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<InplaceContent, "p-inplaceContent", never, {}, {}, never, ["*"]>;
}
export declare class Inplace implements AfterContentInit {
    cd: ChangeDetectorRef;
    active: boolean;
    closable: boolean;
    disabled: boolean;
    preventClick: boolean;
    style: any;
    styleClass: string;
    closeIcon: string;
    templates: QueryList<any>;
    onActivate: EventEmitter<any>;
    onDeactivate: EventEmitter<any>;
    hover: boolean;
    displayTemplate: TemplateRef<any>;
    contentTemplate: TemplateRef<any>;
    constructor(cd: ChangeDetectorRef);
    ngAfterContentInit(): void;
    onActivateClick(event: any): void;
    onDeactivateClick(event: any): void;
    activate(event?: Event): void;
    deactivate(event?: Event): void;
    onKeydown(event: KeyboardEvent): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Inplace, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<Inplace, "p-inplace", never, { "closeIcon": "closeIcon"; "active": "active"; "closable": "closable"; "disabled": "disabled"; "preventClick": "preventClick"; "style": "style"; "styleClass": "styleClass"; }, { "onActivate": "onActivate"; "onDeactivate": "onDeactivate"; }, ["templates"], ["[pInplaceDisplay]", "[pInplaceContent]"]>;
}
export declare class InplaceModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<InplaceModule, [typeof Inplace, typeof InplaceDisplay, typeof InplaceContent], [typeof ɵngcc1.CommonModule, typeof ɵngcc2.ButtonModule], [typeof Inplace, typeof InplaceDisplay, typeof InplaceContent, typeof ɵngcc2.ButtonModule]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<InplaceModule>;
}

//# sourceMappingURL=inplace.d.ts.map