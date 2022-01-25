import { EventEmitter, Directive, ElementRef, NgZone, Input, Output, HostListener, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';

import * as ɵngcc0 from '@angular/core';
class Draggable {
    constructor(el, zone) {
        this.el = el;
        this.zone = zone;
        this.onDragStart = new EventEmitter();
        this.onDragEnd = new EventEmitter();
        this.onDrag = new EventEmitter();
    }
    get pDraggableDisabled() {
        return this._pDraggableDisabled;
    }
    set pDraggableDisabled(_pDraggableDisabled) {
        this._pDraggableDisabled = _pDraggableDisabled;
        if (this._pDraggableDisabled) {
            this.unbindMouseListeners();
        }
        else {
            this.el.nativeElement.draggable = true;
            this.bindMouseListeners();
        }
    }
    ngAfterViewInit() {
        if (!this.pDraggableDisabled) {
            this.el.nativeElement.draggable = true;
            this.bindMouseListeners();
        }
    }
    bindDragListener() {
        if (!this.dragListener) {
            this.zone.runOutsideAngular(() => {
                this.dragListener = this.drag.bind(this);
                this.el.nativeElement.addEventListener('drag', this.dragListener);
            });
        }
    }
    unbindDragListener() {
        if (this.dragListener) {
            this.zone.runOutsideAngular(() => {
                this.el.nativeElement.removeEventListener('drag', this.dragListener);
                this.dragListener = null;
            });
        }
    }
    bindMouseListeners() {
        if (!this.mouseDownListener && !this.mouseUpListener) {
            this.zone.runOutsideAngular(() => {
                this.mouseDownListener = this.mousedown.bind(this);
                this.mouseUpListener = this.mouseup.bind(this);
                this.el.nativeElement.addEventListener('mousedown', this.mouseDownListener);
                this.el.nativeElement.addEventListener('mouseup', this.mouseUpListener);
            });
        }
    }
    unbindMouseListeners() {
        if (this.mouseDownListener && this.mouseUpListener) {
            this.zone.runOutsideAngular(() => {
                this.el.nativeElement.removeEventListener('mousedown', this.mouseDownListener);
                this.el.nativeElement.removeEventListener('mouseup', this.mouseUpListener);
                this.mouseDownListener = null;
                this.mouseUpListener = null;
            });
        }
    }
    drag(event) {
        this.onDrag.emit(event);
    }
    dragStart(event) {
        if (this.allowDrag() && !this.pDraggableDisabled) {
            if (this.dragEffect) {
                event.dataTransfer.effectAllowed = this.dragEffect;
            }
            event.dataTransfer.setData('text', this.scope);
            this.onDragStart.emit(event);
            this.bindDragListener();
        }
        else {
            event.preventDefault();
        }
    }
    dragEnd(event) {
        this.onDragEnd.emit(event);
        this.unbindDragListener();
    }
    mousedown(event) {
        this.handle = event.target;
    }
    mouseup(event) {
        this.handle = null;
    }
    allowDrag() {
        if (this.dragHandle && this.handle)
            return DomHandler.matches(this.handle, this.dragHandle);
        else
            return true;
    }
    ngOnDestroy() {
        this.unbindDragListener();
        this.unbindMouseListeners();
    }
}
Draggable.ɵfac = function Draggable_Factory(t) { return new (t || Draggable)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.NgZone)); };
Draggable.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: Draggable, selectors: [["", "pDraggable", ""]], hostBindings: function Draggable_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("dragstart", function Draggable_dragstart_HostBindingHandler($event) { return ctx.dragStart($event); })("dragend", function Draggable_dragend_HostBindingHandler($event) { return ctx.dragEnd($event); });
    } }, inputs: { pDraggableDisabled: "pDraggableDisabled", scope: ["pDraggable", "scope"], dragEffect: "dragEffect", dragHandle: "dragHandle" }, outputs: { onDragStart: "onDragStart", onDragEnd: "onDragEnd", onDrag: "onDrag" } });
Draggable.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
Draggable.propDecorators = {
    scope: [{ type: Input, args: ['pDraggable',] }],
    dragEffect: [{ type: Input }],
    dragHandle: [{ type: Input }],
    onDragStart: [{ type: Output }],
    onDragEnd: [{ type: Output }],
    onDrag: [{ type: Output }],
    pDraggableDisabled: [{ type: Input }],
    dragStart: [{ type: HostListener, args: ['dragstart', ['$event'],] }],
    dragEnd: [{ type: HostListener, args: ['dragend', ['$event'],] }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(Draggable, [{
        type: Directive,
        args: [{
                selector: '[pDraggable]'
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc0.NgZone }]; }, { onDragStart: [{
            type: Output
        }], onDragEnd: [{
            type: Output
        }], onDrag: [{
            type: Output
        }], pDraggableDisabled: [{
            type: Input
        }], dragStart: [{
            type: HostListener,
            args: ['dragstart', ['$event']]
        }], dragEnd: [{
            type: HostListener,
            args: ['dragend', ['$event']]
        }], scope: [{
            type: Input,
            args: ['pDraggable']
        }], dragEffect: [{
            type: Input
        }], dragHandle: [{
            type: Input
        }] }); })();
class Droppable {
    constructor(el, zone) {
        this.el = el;
        this.zone = zone;
        this.onDragEnter = new EventEmitter();
        this.onDragLeave = new EventEmitter();
        this.onDrop = new EventEmitter();
    }
    ngAfterViewInit() {
        if (!this.pDroppableDisabled) {
            this.bindDragOverListener();
        }
    }
    bindDragOverListener() {
        if (!this.dragOverListener) {
            this.zone.runOutsideAngular(() => {
                this.dragOverListener = this.dragOver.bind(this);
                this.el.nativeElement.addEventListener('dragover', this.dragOverListener);
            });
        }
    }
    unbindDragOverListener() {
        if (this.dragOverListener) {
            this.zone.runOutsideAngular(() => {
                this.el.nativeElement.removeEventListener('dragover', this.dragOverListener);
                this.dragOverListener = null;
            });
        }
    }
    dragOver(event) {
        event.preventDefault();
    }
    drop(event) {
        if (this.allowDrop(event)) {
            DomHandler.removeClass(this.el.nativeElement, 'p-draggable-enter');
            event.preventDefault();
            this.onDrop.emit(event);
        }
    }
    dragEnter(event) {
        event.preventDefault();
        if (this.dropEffect) {
            event.dataTransfer.dropEffect = this.dropEffect;
        }
        DomHandler.addClass(this.el.nativeElement, 'p-draggable-enter');
        this.onDragEnter.emit(event);
    }
    dragLeave(event) {
        event.preventDefault();
        DomHandler.removeClass(this.el.nativeElement, 'p-draggable-enter');
        this.onDragLeave.emit(event);
    }
    allowDrop(event) {
        let dragScope = event.dataTransfer.getData('text');
        if (typeof (this.scope) == "string" && dragScope == this.scope) {
            return true;
        }
        else if (this.scope instanceof Array) {
            for (let j = 0; j < this.scope.length; j++) {
                if (dragScope == this.scope[j]) {
                    return true;
                }
            }
        }
        return false;
    }
    ngOnDestroy() {
        this.unbindDragOverListener();
    }
}
Droppable.ɵfac = function Droppable_Factory(t) { return new (t || Droppable)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.NgZone)); };
Droppable.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: Droppable, selectors: [["", "pDroppable", ""]], hostBindings: function Droppable_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("drop", function Droppable_drop_HostBindingHandler($event) { return ctx.drop($event); })("dragenter", function Droppable_dragenter_HostBindingHandler($event) { return ctx.dragEnter($event); })("dragleave", function Droppable_dragleave_HostBindingHandler($event) { return ctx.dragLeave($event); });
    } }, inputs: { scope: ["pDroppable", "scope"], pDroppableDisabled: "pDroppableDisabled", dropEffect: "dropEffect" }, outputs: { onDragEnter: "onDragEnter", onDragLeave: "onDragLeave", onDrop: "onDrop" } });
Droppable.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
Droppable.propDecorators = {
    scope: [{ type: Input, args: ['pDroppable',] }],
    pDroppableDisabled: [{ type: Input }],
    dropEffect: [{ type: Input }],
    onDragEnter: [{ type: Output }],
    onDragLeave: [{ type: Output }],
    onDrop: [{ type: Output }],
    drop: [{ type: HostListener, args: ['drop', ['$event'],] }],
    dragEnter: [{ type: HostListener, args: ['dragenter', ['$event'],] }],
    dragLeave: [{ type: HostListener, args: ['dragleave', ['$event'],] }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(Droppable, [{
        type: Directive,
        args: [{
                selector: '[pDroppable]'
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc0.NgZone }]; }, { onDragEnter: [{
            type: Output
        }], onDragLeave: [{
            type: Output
        }], onDrop: [{
            type: Output
        }], drop: [{
            type: HostListener,
            args: ['drop', ['$event']]
        }], dragEnter: [{
            type: HostListener,
            args: ['dragenter', ['$event']]
        }], dragLeave: [{
            type: HostListener,
            args: ['dragleave', ['$event']]
        }], scope: [{
            type: Input,
            args: ['pDroppable']
        }], pDroppableDisabled: [{
            type: Input
        }], dropEffect: [{
            type: Input
        }] }); })();
class DragDropModule {
}
DragDropModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: DragDropModule });
DragDropModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function DragDropModule_Factory(t) { return new (t || DragDropModule)(); }, imports: [[CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(DragDropModule, { declarations: function () { return [Draggable, Droppable]; }, imports: function () { return [CommonModule]; }, exports: function () { return [Draggable, Droppable]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DragDropModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                exports: [Draggable, Droppable],
                declarations: [Draggable, Droppable]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { DragDropModule, Draggable, Droppable };

//# sourceMappingURL=primeng-dragdrop.js.map