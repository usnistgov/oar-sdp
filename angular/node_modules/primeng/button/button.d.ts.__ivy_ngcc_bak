import { ElementRef, EventEmitter, AfterViewInit, OnDestroy, AfterContentInit, TemplateRef, QueryList } from '@angular/core';
export declare class ButtonDirective implements AfterViewInit, OnDestroy {
    el: ElementRef;
    iconPos: 'left' | 'right' | 'top' | 'bottom';
    _label: string;
    _icon: string;
    initialized: boolean;
    _initialStyleClass: string;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
    getStyleClass(): string;
    setStyleClass(): void;
    get label(): string;
    set label(val: string);
    get icon(): string;
    set icon(val: string);
    ngOnDestroy(): void;
}
export declare class Button implements AfterContentInit {
    type: string;
    iconPos: string;
    icon: string;
    badge: string;
    label: string;
    disabled: boolean;
    style: any;
    styleClass: string;
    badgeClass: string;
    contentTemplate: TemplateRef<any>;
    templates: QueryList<any>;
    onClick: EventEmitter<any>;
    onFocus: EventEmitter<any>;
    onBlur: EventEmitter<any>;
    ngAfterContentInit(): void;
}
export declare class ButtonModule {
}
