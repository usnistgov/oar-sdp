import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, NgZone, ChangeDetectorRef, Input, Output, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as ɵngcc0 from '@angular/core';
class Captcha {
    constructor(el, _zone, cd) {
        this.el = el;
        this._zone = _zone;
        this.cd = cd;
        this.siteKey = null;
        this.theme = 'light';
        this.type = 'image';
        this.size = 'normal';
        this.tabindex = 0;
        this.language = null;
        this.initCallback = "initRecaptcha";
        this.onResponse = new EventEmitter();
        this.onExpire = new EventEmitter();
        this._instance = null;
    }
    ngAfterViewInit() {
        if (window.grecaptcha) {
            if (!window.grecaptcha.render) {
                setTimeout(() => {
                    this.init();
                }, 100);
            }
            else {
                this.init();
            }
        }
        else {
            window[this.initCallback] = () => {
                this.init();
            };
        }
    }
    init() {
        this._instance = window.grecaptcha.render(this.el.nativeElement.children[0], {
            'sitekey': this.siteKey,
            'theme': this.theme,
            'type': this.type,
            'size': this.size,
            'tabindex': this.tabindex,
            'hl': this.language,
            'callback': (response) => { this._zone.run(() => this.recaptchaCallback(response)); },
            'expired-callback': () => { this._zone.run(() => this.recaptchaExpiredCallback()); }
        });
    }
    reset() {
        if (this._instance === null)
            return;
        window.grecaptcha.reset(this._instance);
        this.cd.markForCheck();
    }
    getResponse() {
        if (this._instance === null)
            return null;
        return window.grecaptcha.getResponse(this._instance);
    }
    recaptchaCallback(response) {
        this.onResponse.emit({
            response: response
        });
    }
    recaptchaExpiredCallback() {
        this.onExpire.emit();
    }
    ngOnDestroy() {
        if (this._instance != null) {
            window.grecaptcha.reset(this._instance);
        }
    }
}
Captcha.ɵfac = function Captcha_Factory(t) { return new (t || Captcha)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.NgZone), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef)); };
Captcha.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: Captcha, selectors: [["p-captcha"]], inputs: { siteKey: "siteKey", theme: "theme", type: "type", size: "size", tabindex: "tabindex", language: "language", initCallback: "initCallback" }, outputs: { onResponse: "onResponse", onExpire: "onExpire" }, decls: 1, vars: 0, template: function Captcha_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelement(0, "div");
    } }, encapsulation: 2, changeDetection: 0 });
Captcha.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: ChangeDetectorRef }
];
Captcha.propDecorators = {
    siteKey: [{ type: Input }],
    theme: [{ type: Input }],
    type: [{ type: Input }],
    size: [{ type: Input }],
    tabindex: [{ type: Input }],
    language: [{ type: Input }],
    initCallback: [{ type: Input }],
    onResponse: [{ type: Output }],
    onExpire: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(Captcha, [{
        type: Component,
        args: [{
                selector: 'p-captcha',
                template: `<div></div>`,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc0.NgZone }, { type: ɵngcc0.ChangeDetectorRef }]; }, { siteKey: [{
            type: Input
        }], theme: [{
            type: Input
        }], type: [{
            type: Input
        }], size: [{
            type: Input
        }], tabindex: [{
            type: Input
        }], language: [{
            type: Input
        }], initCallback: [{
            type: Input
        }], onResponse: [{
            type: Output
        }], onExpire: [{
            type: Output
        }] }); })();
class CaptchaModule {
}
CaptchaModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: CaptchaModule });
CaptchaModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function CaptchaModule_Factory(t) { return new (t || CaptchaModule)(); }, imports: [[CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(CaptchaModule, { declarations: function () { return [Captcha]; }, imports: function () { return [CommonModule]; }, exports: function () { return [Captcha]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(CaptchaModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                exports: [Captcha],
                declarations: [Captcha]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { Captcha, CaptchaModule };

//# sourceMappingURL=primeng-captcha.js.map