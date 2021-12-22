import { OnInit, AfterViewInit, AfterContentInit, OnDestroy, ElementRef, EventEmitter, QueryList, TemplateRef } from '@angular/core';
import { Message } from '../common/message';
import { DomHandler } from '../dom/domhandler';
import { MessageService } from '../common/messageservice';
import { Subscription } from 'rxjs';
export declare class ToastItem implements AfterViewInit, OnDestroy {
    message: Message;
    index: number;
    template: TemplateRef<any>;
    showTransitionOptions: string;
    hideTransitionOptions: string;
    onClose: EventEmitter<any>;
    containerViewChild: ElementRef;
    timeout: any;
    ngAfterViewInit(): void;
    initTimeout(): void;
    clearTimeout(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    onCloseIconClick(event: any): void;
    ngOnDestroy(): void;
}
export declare class Toast implements OnInit, AfterContentInit, OnDestroy {
    messageService: MessageService;
    domHandler: DomHandler;
    key: string;
    autoZIndex: boolean;
    baseZIndex: number;
    style: any;
    styleClass: string;
    position: string;
    modal: boolean;
    showTransitionOptions: string;
    hideTransitionOptions: string;
    onClose: EventEmitter<any>;
    containerViewChild: ElementRef;
    templates: QueryList<any>;
    messageSubscription: Subscription;
    clearSubscription: Subscription;
    messages: Message[];
    template: TemplateRef<any>;
    mask: HTMLDivElement;
    constructor(messageService: MessageService, domHandler: DomHandler);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    onMessageClose(event: any): void;
    enableModality(): void;
    disableModality(): void;
    ngOnDestroy(): void;
}
export declare class ToastModule {
}
