import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export declare class Tag {
    styleClass: string;
    style: any;
    severity: string;
    value: string;
    icon: string;
    rounded: boolean;
    containerClass(): {
        'p-tag p-component': boolean;
        'p-tag-info': boolean;
        'p-tag-success': boolean;
        'p-tag-warning': boolean;
        'p-tag-danger': boolean;
        'p-tag-rounded': boolean;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<Tag, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Tag, "p-tag", never, { "styleClass": "styleClass"; "style": "style"; "severity": "severity"; "value": "value"; "icon": "icon"; "rounded": "rounded"; }, {}, never, ["*"]>;
}
export declare class TagModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<TagModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<TagModule, [typeof Tag], [typeof i1.CommonModule], [typeof Tag]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<TagModule>;
}
