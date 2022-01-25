import { Directive, ElementRef, NgZone, Optional, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { PrimeNGConfig } from 'primeng/api';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from 'primeng/api';
class Ripple {
    constructor(el, zone, config) {
        this.el = el;
        this.zone = zone;
        this.config = config;
    }
    ngAfterViewInit() {
        if (this.config && this.config.ripple) {
            this.zone.runOutsideAngular(() => {
                this.create();
                this.mouseDownListener = this.onMouseDown.bind(this);
                this.el.nativeElement.addEventListener('mousedown', this.mouseDownListener);
            });
        }
    }
    onMouseDown(event) {
        let ink = this.getInk();
        if (!ink || getComputedStyle(ink, null).display === 'none') {
            return;
        }
        DomHandler.removeClass(ink, 'p-ink-active');
        if (!DomHandler.getHeight(ink) && !DomHandler.getWidth(ink)) {
            let d = Math.max(DomHandler.getOuterWidth(this.el.nativeElement), DomHandler.getOuterHeight(this.el.nativeElement));
            ink.style.height = d + 'px';
            ink.style.width = d + 'px';
        }
        let offset = DomHandler.getOffset(this.el.nativeElement);
        let x = event.pageX - offset.left + document.body.scrollTop - DomHandler.getWidth(ink) / 2;
        let y = event.pageY - offset.top + document.body.scrollLeft - DomHandler.getHeight(ink) / 2;
        ink.style.top = y + 'px';
        ink.style.left = x + 'px';
        DomHandler.addClass(ink, 'p-ink-active');
    }
    getInk() {
        for (let i = 0; i < this.el.nativeElement.children.length; i++) {
            if (this.el.nativeElement.children[i].className.indexOf('p-ink') !== -1) {
                return this.el.nativeElement.children[i];
            }
        }
        return null;
    }
    resetInk() {
        let ink = this.getInk();
        if (ink) {
            DomHandler.removeClass(ink, 'p-ink-active');
        }
    }
    onAnimationEnd(event) {
        DomHandler.removeClass(event.currentTarget, 'p-ink-active');
    }
    create() {
        let ink = document.createElement('span');
        ink.className = 'p-ink';
        this.el.nativeElement.appendChild(ink);
        this.animationListener = this.onAnimationEnd.bind(this);
        ink.addEventListener('animationend', this.animationListener);
    }
    remove() {
        let ink = this.getInk();
        if (ink) {
            this.el.nativeElement.removeEventListener('mousedown', this.mouseDownListener);
            ink.removeEventListener('animationend', this.animationListener);
            DomHandler.removeElement(ink);
        }
    }
    ngOnDestroy() {
        if (this.config && this.config.ripple) {
            this.remove();
        }
    }
}
Ripple.ɵfac = function Ripple_Factory(t) { return new (t || Ripple)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.NgZone), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.PrimeNGConfig, 8)); };
Ripple.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: Ripple, selectors: [["", "pRipple", ""]], hostVars: 2, hostBindings: function Ripple_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵclassProp("p-ripple", true);
    } } });
Ripple.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: PrimeNGConfig, decorators: [{ type: Optional }] }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(Ripple, [{
        type: Directive,
        args: [{
                selector: '[pRipple]',
                host: {
                    '[class.p-ripple]': 'true'
                }
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc0.NgZone }, { type: ɵngcc1.PrimeNGConfig, decorators: [{
                type: Optional
            }] }]; }, null); })();
class RippleModule {
}
RippleModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: RippleModule });
RippleModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function RippleModule_Factory(t) { return new (t || RippleModule)(); }, imports: [[CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(RippleModule, { declarations: function () { return [Ripple]; }, imports: function () { return [CommonModule]; }, exports: function () { return [Ripple]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(RippleModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                exports: [Ripple],
                declarations: [Ripple]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { Ripple, RippleModule };

//# sourceMappingURL=primeng-ripple.js.map