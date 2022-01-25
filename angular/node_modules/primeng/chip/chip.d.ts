import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export declare class Chip {
    label: string;
    icon: string;
    image: string;
    style: any;
    styleClass: string;
    removable: boolean;
    removeIcon: string;
    onRemove: EventEmitter<any>;
    visible: boolean;
    containerClass(): {
        'p-chip p-component': boolean;
        'p-chip-image': boolean;
    };
    close(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Chip, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Chip, "p-chip", never, { "label": "label"; "icon": "icon"; "image": "image"; "style": "style"; "styleClass": "styleClass"; "removable": "removable"; "removeIcon": "removeIcon"; }, { "onRemove": "onRemove"; }, never, ["*"]>;
}
export declare class ChipModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ChipModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ChipModule, [typeof Chip], [typeof i1.CommonModule], [typeof Chip]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ChipModule>;
}
