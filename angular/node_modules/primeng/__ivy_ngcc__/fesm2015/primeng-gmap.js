import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, IterableDiffers, ChangeDetectorRef, NgZone, Input, Output, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
class GMap {
    constructor(el, differs, cd, zone) {
        this.el = el;
        this.cd = cd;
        this.zone = zone;
        this.onMapClick = new EventEmitter();
        this.onOverlayClick = new EventEmitter();
        this.onOverlayDblClick = new EventEmitter();
        this.onOverlayDragStart = new EventEmitter();
        this.onOverlayDrag = new EventEmitter();
        this.onOverlayDragEnd = new EventEmitter();
        this.onMapReady = new EventEmitter();
        this.onMapDragEnd = new EventEmitter();
        this.onZoomChanged = new EventEmitter();
        this.differ = differs.find([]).create(null);
    }
    ngAfterViewChecked() {
        if (!this.map && this.el.nativeElement.offsetParent) {
            this.initialize();
        }
    }
    initialize() {
        this.map = new google.maps.Map(this.el.nativeElement.children[0], this.options);
        this.onMapReady.emit({
            map: this.map
        });
        if (this.overlays) {
            for (let overlay of this.overlays) {
                overlay.setMap(this.map);
                this.bindOverlayEvents(overlay);
            }
        }
        this.map.addListener('click', (event) => {
            this.zone.run(() => {
                this.onMapClick.emit(event);
            });
        });
        this.map.addListener('dragend', (event) => {
            this.zone.run(() => {
                this.onMapDragEnd.emit(event);
            });
        });
        this.map.addListener('zoom_changed', (event) => {
            this.zone.run(() => {
                this.onZoomChanged.emit(event);
            });
        });
    }
    bindOverlayEvents(overlay) {
        overlay.addListener('click', (event) => {
            this.zone.run(() => {
                this.onOverlayClick.emit({
                    originalEvent: event,
                    'overlay': overlay,
                    map: this.map
                });
            });
        });
        overlay.addListener('dblclick', (event) => {
            this.zone.run(() => {
                this.onOverlayDblClick.emit({
                    originalEvent: event,
                    'overlay': overlay,
                    map: this.map
                });
            });
        });
        if (overlay.getDraggable()) {
            this.bindDragEvents(overlay);
        }
    }
    ngDoCheck() {
        let changes = this.differ.diff(this.overlays);
        if (changes && this.map) {
            changes.forEachRemovedItem((record) => {
                google.maps.event.clearInstanceListeners(record.item);
                record.item.setMap(null);
            });
            changes.forEachAddedItem((record) => {
                record.item.setMap(this.map);
                record.item.addListener('click', (event) => {
                    this.zone.run(() => {
                        this.onOverlayClick.emit({
                            originalEvent: event,
                            overlay: record.item,
                            map: this.map
                        });
                    });
                });
                if (record.item.getDraggable()) {
                    this.bindDragEvents(record.item);
                }
            });
        }
    }
    bindDragEvents(overlay) {
        overlay.addListener('dragstart', (event) => {
            this.zone.run(() => {
                this.onOverlayDragStart.emit({
                    originalEvent: event,
                    overlay: overlay,
                    map: this.map
                });
            });
        });
        overlay.addListener('drag', (event) => {
            this.zone.run(() => {
                this.onOverlayDrag.emit({
                    originalEvent: event,
                    overlay: overlay,
                    map: this.map
                });
            });
        });
        overlay.addListener('dragend', (event) => {
            this.zone.run(() => {
                this.onOverlayDragEnd.emit({
                    originalEvent: event,
                    overlay: overlay,
                    map: this.map
                });
            });
        });
    }
    getMap() {
        return this.map;
    }
}
GMap.ɵfac = function GMap_Factory(t) { return new (t || GMap)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.IterableDiffers), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.NgZone)); };
GMap.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: GMap, selectors: [["p-gmap"]], inputs: { style: "style", styleClass: "styleClass", options: "options", overlays: "overlays" }, outputs: { onMapClick: "onMapClick", onOverlayClick: "onOverlayClick", onOverlayDblClick: "onOverlayDblClick", onOverlayDragStart: "onOverlayDragStart", onOverlayDrag: "onOverlayDrag", onOverlayDragEnd: "onOverlayDragEnd", onMapReady: "onMapReady", onMapDragEnd: "onMapDragEnd", onZoomChanged: "onZoomChanged" }, decls: 1, vars: 3, consts: [[3, "ngStyle"]], template: function GMap_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelement(0, "div", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵclassMap(ctx.styleClass);
        ɵngcc0.ɵɵproperty("ngStyle", ctx.style);
    } }, directives: [ɵngcc1.NgStyle], encapsulation: 2, changeDetection: 0 });
GMap.ctorParameters = () => [
    { type: ElementRef },
    { type: IterableDiffers },
    { type: ChangeDetectorRef },
    { type: NgZone }
];
GMap.propDecorators = {
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    options: [{ type: Input }],
    overlays: [{ type: Input }],
    onMapClick: [{ type: Output }],
    onOverlayClick: [{ type: Output }],
    onOverlayDblClick: [{ type: Output }],
    onOverlayDragStart: [{ type: Output }],
    onOverlayDrag: [{ type: Output }],
    onOverlayDragEnd: [{ type: Output }],
    onMapReady: [{ type: Output }],
    onMapDragEnd: [{ type: Output }],
    onZoomChanged: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GMap, [{
        type: Component,
        args: [{
                selector: 'p-gmap',
                template: `<div [ngStyle]="style" [class]="styleClass"></div>`,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc0.IterableDiffers }, { type: ɵngcc0.ChangeDetectorRef }, { type: ɵngcc0.NgZone }]; }, { onMapClick: [{
            type: Output
        }], onOverlayClick: [{
            type: Output
        }], onOverlayDblClick: [{
            type: Output
        }], onOverlayDragStart: [{
            type: Output
        }], onOverlayDrag: [{
            type: Output
        }], onOverlayDragEnd: [{
            type: Output
        }], onMapReady: [{
            type: Output
        }], onMapDragEnd: [{
            type: Output
        }], onZoomChanged: [{
            type: Output
        }], style: [{
            type: Input
        }], styleClass: [{
            type: Input
        }], options: [{
            type: Input
        }], overlays: [{
            type: Input
        }] }); })();
class GMapModule {
}
GMapModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: GMapModule });
GMapModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function GMapModule_Factory(t) { return new (t || GMapModule)(); }, imports: [[CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(GMapModule, { declarations: function () { return [GMap]; }, imports: function () { return [CommonModule]; }, exports: function () { return [GMap]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GMapModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                exports: [GMap],
                declarations: [GMap]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { GMap, GMapModule };

//# sourceMappingURL=primeng-gmap.js.map