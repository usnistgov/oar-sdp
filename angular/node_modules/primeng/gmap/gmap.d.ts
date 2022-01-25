import { ElementRef, AfterViewChecked, DoCheck, EventEmitter, IterableDiffers, ChangeDetectorRef, NgZone } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export declare class GMap implements AfterViewChecked, DoCheck {
    el: ElementRef;
    cd: ChangeDetectorRef;
    zone: NgZone;
    style: any;
    styleClass: string;
    options: any;
    overlays: any[];
    onMapClick: EventEmitter<any>;
    onOverlayClick: EventEmitter<any>;
    onOverlayDblClick: EventEmitter<any>;
    onOverlayDragStart: EventEmitter<any>;
    onOverlayDrag: EventEmitter<any>;
    onOverlayDragEnd: EventEmitter<any>;
    onMapReady: EventEmitter<any>;
    onMapDragEnd: EventEmitter<any>;
    onZoomChanged: EventEmitter<any>;
    differ: any;
    map: any;
    constructor(el: ElementRef, differs: IterableDiffers, cd: ChangeDetectorRef, zone: NgZone);
    ngAfterViewChecked(): void;
    initialize(): void;
    bindOverlayEvents(overlay: any): void;
    ngDoCheck(): void;
    bindDragEvents(overlay: any): void;
    getMap(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<GMap, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GMap, "p-gmap", never, { "style": "style"; "styleClass": "styleClass"; "options": "options"; "overlays": "overlays"; }, { "onMapClick": "onMapClick"; "onOverlayClick": "onOverlayClick"; "onOverlayDblClick": "onOverlayDblClick"; "onOverlayDragStart": "onOverlayDragStart"; "onOverlayDrag": "onOverlayDrag"; "onOverlayDragEnd": "onOverlayDragEnd"; "onMapReady": "onMapReady"; "onMapDragEnd": "onMapDragEnd"; "onZoomChanged": "onZoomChanged"; }, never, never>;
}
export declare class GMapModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<GMapModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<GMapModule, [typeof GMap], [typeof i1.CommonModule], [typeof GMap]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<GMapModule>;
}
