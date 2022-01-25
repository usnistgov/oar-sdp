import { ElementRef, OnDestroy, OnInit, AfterViewChecked } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export declare class FullCalendar implements OnDestroy, OnInit, AfterViewChecked {
    el: ElementRef;
    style: any;
    styleClass: string;
    initialized: boolean;
    calendar: any;
    config: any;
    _options: any;
    _events: any[];
    constructor(el: ElementRef);
    ngOnInit(): void;
    ngAfterViewChecked(): void;
    get events(): any;
    set events(value: any);
    get options(): any;
    set options(value: any);
    initialize(): void;
    getCalendar(): any;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FullCalendar, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FullCalendar, "p-fullCalendar", never, { "style": "style"; "styleClass": "styleClass"; "events": "events"; "options": "options"; }, {}, never, never>;
}
export declare class FullCalendarModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<FullCalendarModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<FullCalendarModule, [typeof FullCalendar], [typeof i1.CommonModule], [typeof FullCalendar]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<FullCalendarModule>;
}
