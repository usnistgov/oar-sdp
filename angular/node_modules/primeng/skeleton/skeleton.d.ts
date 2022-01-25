import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export declare class Skeleton {
    styleClass: string;
    style: any;
    shape: string;
    animation: string;
    borderRadius: string;
    size: string;
    width: string;
    height: string;
    containerClass(): {
        'p-skeleton p-component': boolean;
        'p-skeleton-circle': boolean;
        'p-skeleton-none': boolean;
    };
    containerStyle(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<Skeleton, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Skeleton, "p-skeleton", never, { "styleClass": "styleClass"; "style": "style"; "shape": "shape"; "animation": "animation"; "borderRadius": "borderRadius"; "size": "size"; "width": "width"; "height": "height"; }, {}, never, never>;
}
export declare class SkeletonModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<SkeletonModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<SkeletonModule, [typeof Skeleton], [typeof i1.CommonModule], [typeof Skeleton]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<SkeletonModule>;
}
