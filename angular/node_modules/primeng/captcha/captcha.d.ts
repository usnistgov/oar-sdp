import { AfterViewInit, EventEmitter, NgZone, OnDestroy, ElementRef, ChangeDetectorRef } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export declare class Captcha implements AfterViewInit, OnDestroy {
    el: ElementRef;
    _zone: NgZone;
    cd: ChangeDetectorRef;
    siteKey: string;
    theme: string;
    type: string;
    size: string;
    tabindex: number;
    initCallback: string;
    onResponse: EventEmitter<any>;
    onExpire: EventEmitter<any>;
    private _instance;
    private _language;
    get language(): string;
    set language(language: string);
    constructor(el: ElementRef, _zone: NgZone, cd: ChangeDetectorRef);
    ngAfterViewInit(): void;
    init(): void;
    reset(): void;
    getResponse(): String;
    recaptchaCallback(response: string): void;
    recaptchaExpiredCallback(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Captcha, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Captcha, "p-captcha", never, { "siteKey": "siteKey"; "theme": "theme"; "type": "type"; "size": "size"; "tabindex": "tabindex"; "initCallback": "initCallback"; "language": "language"; }, { "onResponse": "onResponse"; "onExpire": "onExpire"; }, never, never>;
}
export declare class CaptchaModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<CaptchaModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CaptchaModule, [typeof Captcha], [typeof i1.CommonModule], [typeof Captcha]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CaptchaModule>;
}
