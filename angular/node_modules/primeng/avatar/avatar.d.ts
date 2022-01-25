import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export declare class Avatar {
    label: string;
    icon: string;
    image: string;
    size: string;
    shape: string;
    style: any;
    styleClass: string;
    containerClass(): {
        'p-avatar p-component': boolean;
        'p-avatar-image': boolean;
        'p-avatar-circle': boolean;
        'p-avatar-lg': boolean;
        'p-avatar-xl': boolean;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<Avatar, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Avatar, "p-avatar", never, { "label": "label"; "icon": "icon"; "image": "image"; "size": "size"; "shape": "shape"; "style": "style"; "styleClass": "styleClass"; }, {}, never, ["*"]>;
}
export declare class AvatarModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<AvatarModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AvatarModule, [typeof Avatar], [typeof i1.CommonModule], [typeof Avatar]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AvatarModule>;
}
