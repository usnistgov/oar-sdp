import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export declare class Divider {
    styleClass: string;
    style: any;
    layout: string;
    type: string;
    align: string;
    containerClass(): {
        'p-divider p-component': boolean;
        'p-divider-horizontal': boolean;
        'p-divider-vertical': boolean;
        'p-divider-solid': boolean;
        'p-divider-dashed': boolean;
        'p-divider-dotted': boolean;
        'p-divider-left': boolean;
        'p-divider-center': boolean;
        'p-divider-right': boolean;
        'p-divider-top': boolean;
        'p-divider-bottom': boolean;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<Divider, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Divider, "p-divider", never, { "styleClass": "styleClass"; "style": "style"; "layout": "layout"; "type": "type"; "align": "align"; }, {}, never, ["*"]>;
}
export declare class DividerModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<DividerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<DividerModule, [typeof Divider], [typeof i1.CommonModule], [typeof Divider]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<DividerModule>;
}
