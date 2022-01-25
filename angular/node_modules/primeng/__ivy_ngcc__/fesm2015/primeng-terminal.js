import { Injectable, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, ChangeDetectorRef, Input, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { Subject } from 'rxjs';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from '@angular/forms';

function Terminal_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div");
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(ctx_r0.welcomeMessage);
} }
function Terminal_div_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div");
    ɵngcc0.ɵɵelementStart(1, "span", 8);
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(3, "span", 9);
    ɵngcc0.ɵɵtext(4);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(5, "div", 10);
    ɵngcc0.ɵɵtext(6);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const command_r3 = ctx.$implicit;
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(ctx_r1.prompt);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(command_r3.text);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(command_r3.response);
} }
class TerminalService {
    constructor() {
        this.commandSource = new Subject();
        this.responseSource = new Subject();
        this.commandHandler = this.commandSource.asObservable();
        this.responseHandler = this.responseSource.asObservable();
    }
    sendCommand(command) {
        if (command) {
            this.commandSource.next(command);
        }
    }
    sendResponse(response) {
        if (response) {
            this.responseSource.next(response);
        }
    }
}
TerminalService.ɵfac = function TerminalService_Factory(t) { return new (t || TerminalService)(); };
TerminalService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: TerminalService, factory: TerminalService.ɵfac });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(TerminalService, [{
        type: Injectable
    }], function () { return []; }, null); })();

class Terminal {
    constructor(el, terminalService, cd) {
        this.el = el;
        this.terminalService = terminalService;
        this.cd = cd;
        this.commands = [];
        this.subscription = terminalService.responseHandler.subscribe(response => {
            this.commands[this.commands.length - 1].response = response;
            this.commandProcessed = true;
        });
    }
    ngAfterViewInit() {
        this.container = DomHandler.find(this.el.nativeElement, '.p-terminal')[0];
    }
    ngAfterViewChecked() {
        if (this.commandProcessed) {
            this.container.scrollTop = this.container.scrollHeight;
            this.commandProcessed = false;
        }
    }
    set response(value) {
        if (value) {
            this.commands[this.commands.length - 1].response = value;
            this.commandProcessed = true;
        }
    }
    handleCommand(event) {
        if (event.keyCode == 13) {
            this.commands.push({ text: this.command });
            this.terminalService.sendCommand(this.command);
            this.command = '';
        }
    }
    focus(element) {
        element.focus();
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
Terminal.ɵfac = function Terminal_Factory(t) { return new (t || Terminal)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(TerminalService), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef)); };
Terminal.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: Terminal, selectors: [["p-terminal"]], inputs: { response: "response", welcomeMessage: "welcomeMessage", prompt: "prompt", style: "style", styleClass: "styleClass" }, decls: 9, vars: 8, consts: [[3, "ngClass", "ngStyle", "click"], [4, "ngIf"], [1, "p-terminal-content"], [4, "ngFor", "ngForOf"], [1, "p-terminal-prompt-container"], [1, "p-terminal-content-prompt"], ["type", "text", "autocomplete", "off", "autofocus", "", 1, "p-terminal-input", 3, "ngModel", "ngModelChange", "keydown"], ["in", ""], [1, "p-terminal-prompt"], [1, "p-terminal-command"], [1, "p-terminal-response"]], template: function Terminal_Template(rf, ctx) { if (rf & 1) {
        const _r4 = ɵngcc0.ɵɵgetCurrentView();
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵlistener("click", function Terminal_Template_div_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r4); const _r2 = ɵngcc0.ɵɵreference(8); return ctx.focus(_r2); });
        ɵngcc0.ɵɵtemplate(1, Terminal_div_1_Template, 2, 1, "div", 1);
        ɵngcc0.ɵɵelementStart(2, "div", 2);
        ɵngcc0.ɵɵtemplate(3, Terminal_div_3_Template, 7, 3, "div", 3);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(4, "div", 4);
        ɵngcc0.ɵɵelementStart(5, "span", 5);
        ɵngcc0.ɵɵtext(6);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(7, "input", 6, 7);
        ɵngcc0.ɵɵlistener("ngModelChange", function Terminal_Template_input_ngModelChange_7_listener($event) { return ctx.command = $event; })("keydown", function Terminal_Template_input_keydown_7_listener($event) { return ctx.handleCommand($event); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵclassMap(ctx.styleClass);
        ɵngcc0.ɵɵproperty("ngClass", "p-terminal p-component")("ngStyle", ctx.style);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.welcomeMessage);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.commands);
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵtextInterpolate(ctx.prompt);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngModel", ctx.command);
    } }, directives: [ɵngcc1.NgClass, ɵngcc1.NgStyle, ɵngcc1.NgIf, ɵngcc1.NgForOf, ɵngcc2.DefaultValueAccessor, ɵngcc2.NgControlStatus, ɵngcc2.NgModel], styles: [".p-terminal{height:18rem;overflow:auto}.p-terminal-prompt-container{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex}.p-terminal-input{-ms-flex:1 1 auto;background-color:rgba(0,0,0,0);border:0;color:inherit;flex:1 1 auto;outline:0 none;padding:0}.p-terminal-input::-ms-clear{display:none}"], encapsulation: 2, changeDetection: 0 });
Terminal.ctorParameters = () => [
    { type: ElementRef },
    { type: TerminalService },
    { type: ChangeDetectorRef }
];
Terminal.propDecorators = {
    welcomeMessage: [{ type: Input }],
    prompt: [{ type: Input }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    response: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(Terminal, [{
        type: Component,
        args: [{
                selector: 'p-terminal',
                template: `
        <div [ngClass]="'p-terminal p-component'" [ngStyle]="style" [class]="styleClass" (click)="focus(in)">
            <div *ngIf="welcomeMessage">{{welcomeMessage}}</div>
            <div class="p-terminal-content">
                <div *ngFor="let command of commands">
                    <span class="p-terminal-prompt">{{prompt}}</span>
                    <span class="p-terminal-command">{{command.text}}</span>
                    <div class="p-terminal-response">{{command.response}}</div>
                </div>
            </div>
            <div class="p-terminal-prompt-container">
                <span class="p-terminal-content-prompt">{{prompt}}</span>
                <input #in type="text" [(ngModel)]="command" class="p-terminal-input" autocomplete="off" (keydown)="handleCommand($event)" autofocus>
            </div>
        </div>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-terminal{height:18rem;overflow:auto}.p-terminal-prompt-container{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex}.p-terminal-input{-ms-flex:1 1 auto;background-color:rgba(0,0,0,0);border:0;color:inherit;flex:1 1 auto;outline:0 none;padding:0}.p-terminal-input::-ms-clear{display:none}"]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: TerminalService }, { type: ɵngcc0.ChangeDetectorRef }]; }, { response: [{
            type: Input
        }], welcomeMessage: [{
            type: Input
        }], prompt: [{
            type: Input
        }], style: [{
            type: Input
        }], styleClass: [{
            type: Input
        }] }); })();
class TerminalModule {
}
TerminalModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: TerminalModule });
TerminalModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function TerminalModule_Factory(t) { return new (t || TerminalModule)(); }, imports: [[CommonModule, FormsModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(TerminalModule, { declarations: function () { return [Terminal]; }, imports: function () { return [CommonModule, FormsModule]; }, exports: function () { return [Terminal]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(TerminalModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, FormsModule],
                exports: [Terminal],
                declarations: [Terminal]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { Terminal, TerminalModule, TerminalService };

//# sourceMappingURL=primeng-terminal.js.map