import { AfterViewInit, EventEmitter, NgZone, OnDestroy, ElementRef, ChangeDetectorRef } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
export declare class Captcha implements AfterViewInit, OnDestroy {
    el: ElementRef;
    _zone: NgZone;
    cd: ChangeDetectorRef;
    siteKey: string;
    theme: string;
    type: string;
    size: string;
    tabindex: number;
    language: string;
    initCallback: string;
    onResponse: EventEmitter<any>;
    onExpire: EventEmitter<any>;
    private _instance;
    constructor(el: ElementRef, _zone: NgZone, cd: ChangeDetectorRef);
    ngAfterViewInit(): void;
    init(): void;
    reset(): void;
    getResponse(): String;
    recaptchaCallback(response: string): void;
    recaptchaExpiredCallback(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<Captcha, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<Captcha, "p-captcha", never, { "siteKey": "siteKey"; "theme": "theme"; "type": "type"; "size": "size"; "tabindex": "tabindex"; "language": "language"; "initCallback": "initCallback"; }, { "onResponse": "onResponse"; "onExpire": "onExpire"; }, never, never>;
}
export declare class CaptchaModule {
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<CaptchaModule, [typeof Captcha], [typeof ɵngcc1.CommonModule], [typeof Captcha]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<CaptchaModule>;
}

//# sourceMappingURL=captcha.d.ts.map