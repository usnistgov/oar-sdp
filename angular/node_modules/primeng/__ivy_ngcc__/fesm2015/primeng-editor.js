import { forwardRef, EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Output, ContentChild, Input, ContentChildren, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header, PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as Quill from 'quill';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';

function Editor_div_1_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
function Editor_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 3);
    ɵngcc0.ɵɵprojection(1);
    ɵngcc0.ɵɵtemplate(2, Editor_div_1_ng_container_2_Template, 1, 0, "ng-container", 4);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r0.headerTemplate);
} }
function Editor_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 3);
    ɵngcc0.ɵɵelementStart(1, "span", 5);
    ɵngcc0.ɵɵelementStart(2, "select", 6);
    ɵngcc0.ɵɵelementStart(3, "option", 7);
    ɵngcc0.ɵɵtext(4, "Heading");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(5, "option", 8);
    ɵngcc0.ɵɵtext(6, "Subheading");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(7, "option", 9);
    ɵngcc0.ɵɵtext(8, "Normal");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(9, "select", 10);
    ɵngcc0.ɵɵelementStart(10, "option", 9);
    ɵngcc0.ɵɵtext(11, "Sans Serif");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(12, "option", 11);
    ɵngcc0.ɵɵtext(13, "Serif");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(14, "option", 12);
    ɵngcc0.ɵɵtext(15, "Monospace");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(16, "span", 5);
    ɵngcc0.ɵɵelement(17, "button", 13);
    ɵngcc0.ɵɵelement(18, "button", 14);
    ɵngcc0.ɵɵelement(19, "button", 15);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(20, "span", 5);
    ɵngcc0.ɵɵelement(21, "select", 16);
    ɵngcc0.ɵɵelement(22, "select", 17);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(23, "span", 5);
    ɵngcc0.ɵɵelement(24, "button", 18);
    ɵngcc0.ɵɵelement(25, "button", 19);
    ɵngcc0.ɵɵelementStart(26, "select", 20);
    ɵngcc0.ɵɵelement(27, "option", 9);
    ɵngcc0.ɵɵelement(28, "option", 21);
    ɵngcc0.ɵɵelement(29, "option", 22);
    ɵngcc0.ɵɵelement(30, "option", 23);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(31, "span", 5);
    ɵngcc0.ɵɵelement(32, "button", 24);
    ɵngcc0.ɵɵelement(33, "button", 25);
    ɵngcc0.ɵɵelement(34, "button", 26);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(35, "span", 5);
    ɵngcc0.ɵɵelement(36, "button", 27);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} }
const _c0 = [[["p-header"]]];
const _c1 = ["p-header"];
const EDITOR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Editor),
    multi: true
};
class Editor {
    constructor(el) {
        this.el = el;
        this.onTextChange = new EventEmitter();
        this.onSelectionChange = new EventEmitter();
        this.onInit = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    ngAfterViewInit() {
        let editorElement = DomHandler.findSingle(this.el.nativeElement, 'div.p-editor-content');
        let toolbarElement = DomHandler.findSingle(this.el.nativeElement, 'div.p-editor-toolbar');
        let defaultModule = { toolbar: toolbarElement };
        let modules = this.modules ? Object.assign(Object.assign({}, defaultModule), this.modules) : defaultModule;
        this.quill = new Quill(editorElement, {
            modules: modules,
            placeholder: this.placeholder,
            readOnly: this.readonly,
            theme: 'snow',
            formats: this.formats,
            bounds: this.bounds,
            debug: this.debug,
            scrollingContainer: this.scrollingContainer
        });
        if (this.value) {
            this.quill.pasteHTML(this.value);
        }
        this.quill.on('text-change', (delta, oldContents, source) => {
            if (source === 'user') {
                let html = editorElement.children[0].innerHTML;
                let text = this.quill.getText().trim();
                if (html === '<p><br></p>') {
                    html = null;
                }
                this.onTextChange.emit({
                    htmlValue: html,
                    textValue: text,
                    delta: delta,
                    source: source
                });
                this.onModelChange(html);
                this.onModelTouched();
            }
        });
        this.quill.on('selection-change', (range, oldRange, source) => {
            this.onSelectionChange.emit({
                range: range,
                oldRange: oldRange,
                source: source
            });
        });
        this.onInit.emit({
            editor: this.quill
        });
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'toolbar':
                    this.toolbarTemplate = item.template;
                    break;
            }
        });
    }
    writeValue(value) {
        this.value = value;
        if (this.quill) {
            if (value)
                this.quill.pasteHTML(value);
            else
                this.quill.setText('');
        }
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    getQuill() {
        return this.quill;
    }
    get readonly() {
        return this._readonly;
    }
    set readonly(val) {
        this._readonly = val;
        if (this.quill) {
            if (this._readonly)
                this.quill.disable();
            else
                this.quill.enable();
        }
    }
}
Editor.ɵfac = function Editor_Factory(t) { return new (t || Editor)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef)); };
Editor.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: Editor, selectors: [["p-editor"]], contentQueries: function Editor_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵngcc0.ɵɵcontentQuery(dirIndex, Header, true);
        ɵngcc0.ɵɵcontentQuery(dirIndex, PrimeTemplate, false);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.toolbar = _t.first);
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.templates = _t);
    } }, inputs: { readonly: "readonly", style: "style", styleClass: "styleClass", placeholder: "placeholder", formats: "formats", modules: "modules", bounds: "bounds", scrollingContainer: "scrollingContainer", debug: "debug" }, outputs: { onTextChange: "onTextChange", onSelectionChange: "onSelectionChange", onInit: "onInit" }, features: [ɵngcc0.ɵɵProvidersFeature([EDITOR_VALUE_ACCESSOR])], ngContentSelectors: _c1, decls: 4, vars: 6, consts: [[3, "ngClass"], ["class", "p-editor-toolbar", 4, "ngIf"], [1, "p-editor-content", 3, "ngStyle"], [1, "p-editor-toolbar"], [4, "ngTemplateOutlet"], [1, "ql-formats"], [1, "ql-header"], ["value", "1"], ["value", "2"], ["selected", ""], [1, "ql-font"], ["value", "serif"], ["value", "monospace"], ["aria-label", "Bold", "type", "button", 1, "ql-bold"], ["aria-label", "Italic", "type", "button", 1, "ql-italic"], ["aria-label", "Underline", "type", "button", 1, "ql-underline"], [1, "ql-color"], [1, "ql-background"], ["value", "ordered", "aria-label", "Ordered List", "type", "button", 1, "ql-list"], ["value", "bullet", "aria-label", "Unordered List", "type", "button", 1, "ql-list"], [1, "ql-align"], ["value", "center"], ["value", "right"], ["value", "justify"], ["aria-label", "Insert Link", "type", "button", 1, "ql-link"], ["aria-label", "Insert Image", "type", "button", 1, "ql-image"], ["aria-label", "Insert Code Block", "type", "button", 1, "ql-code-block"], ["aria-label", "Remove Styles", "type", "button", 1, "ql-clean"]], template: function Editor_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵprojectionDef(_c0);
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵtemplate(1, Editor_div_1_Template, 3, 1, "div", 1);
        ɵngcc0.ɵɵtemplate(2, Editor_div_2_Template, 37, 0, "div", 1);
        ɵngcc0.ɵɵelement(3, "div", 2);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵclassMap(ctx.styleClass);
        ɵngcc0.ɵɵproperty("ngClass", "p-editor-container");
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.toolbar || ctx.toolbarTemplate);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", !ctx.toolbar && !ctx.toolbarTemplate);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngStyle", ctx.style);
    } }, directives: [ɵngcc1.NgClass, ɵngcc1.NgIf, ɵngcc1.NgStyle, ɵngcc1.NgTemplateOutlet], encapsulation: 2, changeDetection: 0 });
Editor.ctorParameters = () => [
    { type: ElementRef }
];
Editor.propDecorators = {
    onTextChange: [{ type: Output }],
    onSelectionChange: [{ type: Output }],
    toolbar: [{ type: ContentChild, args: [Header,] }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    placeholder: [{ type: Input }],
    formats: [{ type: Input }],
    modules: [{ type: Input }],
    bounds: [{ type: Input }],
    scrollingContainer: [{ type: Input }],
    debug: [{ type: Input }],
    onInit: [{ type: Output }],
    templates: [{ type: ContentChildren, args: [PrimeTemplate,] }],
    readonly: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(Editor, [{
        type: Component,
        args: [{
                selector: 'p-editor',
                template: `
        <div [ngClass]="'p-editor-container'" [class]="styleClass">
            <div class="p-editor-toolbar" *ngIf="toolbar || toolbarTemplate">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            </div>
            <div class="p-editor-toolbar" *ngIf="!toolbar && !toolbarTemplate">
                <span class="ql-formats">
                    <select class="ql-header">
                      <option value="1">Heading</option>
                      <option value="2">Subheading</option>
                      <option selected>Normal</option>
                    </select>
                    <select class="ql-font">
                      <option selected>Sans Serif</option>
                      <option value="serif">Serif</option>
                      <option value="monospace">Monospace</option>
                    </select>
                </span>
                <span class="ql-formats">
                    <button class="ql-bold" aria-label="Bold" type="button"></button>
                    <button class="ql-italic" aria-label="Italic" type="button"></button>
                    <button class="ql-underline" aria-label="Underline" type="button"></button>
                </span>
                <span class="ql-formats">
                    <select class="ql-color"></select>
                    <select class="ql-background"></select>
                </span>
                <span class="ql-formats">
                    <button class="ql-list" value="ordered" aria-label="Ordered List" type="button"></button>
                    <button class="ql-list" value="bullet" aria-label="Unordered List" type="button"></button>
                    <select class="ql-align">
                        <option selected></option>
                        <option value="center"></option>
                        <option value="right"></option>
                        <option value="justify"></option>
                    </select>
                </span>
                <span class="ql-formats">
                    <button class="ql-link" aria-label="Insert Link" type="button"></button>
                    <button class="ql-image" aria-label="Insert Image" type="button"></button>
                    <button class="ql-code-block" aria-label="Insert Code Block" type="button"></button>
                </span>
                <span class="ql-formats">
                    <button class="ql-clean" aria-label="Remove Styles" type="button"></button>
                </span>
            </div>
            <div class="p-editor-content" [ngStyle]="style"></div>
        </div>
    `,
                providers: [EDITOR_VALUE_ACCESSOR],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }]; }, { onTextChange: [{
            type: Output
        }], onSelectionChange: [{
            type: Output
        }], onInit: [{
            type: Output
        }], readonly: [{
            type: Input
        }], toolbar: [{
            type: ContentChild,
            args: [Header]
        }], style: [{
            type: Input
        }], styleClass: [{
            type: Input
        }], placeholder: [{
            type: Input
        }], formats: [{
            type: Input
        }], modules: [{
            type: Input
        }], bounds: [{
            type: Input
        }], scrollingContainer: [{
            type: Input
        }], debug: [{
            type: Input
        }], templates: [{
            type: ContentChildren,
            args: [PrimeTemplate]
        }] }); })();
class EditorModule {
}
EditorModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: EditorModule });
EditorModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function EditorModule_Factory(t) { return new (t || EditorModule)(); }, imports: [[CommonModule], SharedModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(EditorModule, { declarations: function () { return [Editor]; }, imports: function () { return [CommonModule]; }, exports: function () { return [Editor, SharedModule]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(EditorModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                exports: [Editor, SharedModule],
                declarations: [Editor]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { EDITOR_VALUE_ACCESSOR, Editor, EditorModule };

//# sourceMappingURL=primeng-editor.js.map