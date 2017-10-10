import { Directive, Input, HostBinding,ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Directive({
   selector: '[sanitizeHtml]'
})
export class SanitizeHtmlDirective {

    @Input()
    public sanitizeHtml: string;   

    @HostBinding('innerHtml')
    public get innerHtml(): SafeHtml {
        return this._sanitizer.bypassSecurityTrustHtml(this.sanitizeHtml);
    }
    constructor(private _sanitizer: DomSanitizer){}
}
