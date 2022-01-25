import { AfterViewInit, EventEmitter, NgZone, OnDestroy, ElementRef, ChangeDetectorRef } from '@angular/core';
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
}
export declare class CaptchaModule {
}
