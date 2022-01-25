import { AfterViewInit, AfterViewChecked, OnDestroy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { TerminalService } from './terminalservice';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
export declare class Terminal implements AfterViewInit, AfterViewChecked, OnDestroy {
    el: ElementRef;
    terminalService: TerminalService;
    cd: ChangeDetectorRef;
    welcomeMessage: string;
    prompt: string;
    style: any;
    styleClass: string;
    commands: any[];
    command: string;
    container: Element;
    commandProcessed: boolean;
    subscription: Subscription;
    constructor(el: ElementRef, terminalService: TerminalService, cd: ChangeDetectorRef);
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    set response(value: string);
    handleCommand(event: KeyboardEvent): void;
    focus(element: HTMLElement): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Terminal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Terminal, "p-terminal", never, { "welcomeMessage": "welcomeMessage"; "prompt": "prompt"; "style": "style"; "styleClass": "styleClass"; "response": "response"; }, {}, never, never>;
}
export declare class TerminalModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<TerminalModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<TerminalModule, [typeof Terminal], [typeof i1.CommonModule, typeof i2.FormsModule], [typeof Terminal]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<TerminalModule>;
}
