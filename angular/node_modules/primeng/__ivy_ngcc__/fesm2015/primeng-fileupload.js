import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, NgZone, ChangeDetectorRef, Input, Output, ContentChildren, ViewChild, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { ProgressBarModule } from 'primeng/progressbar';
import { DomHandler } from 'primeng/dom';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { HttpEventType, HttpClient } from '@angular/common/http';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/platform-browser';
import * as ɵngcc2 from '@angular/common/http';
import * as ɵngcc3 from '@angular/common';
import * as ɵngcc4 from 'primeng/ripple';
import * as ɵngcc5 from 'primeng/messages';
import * as ɵngcc6 from 'primeng/button';
import * as ɵngcc7 from 'primeng/progressbar';

const _c0 = ["advancedfileinput"];
const _c1 = ["basicfileinput"];
const _c2 = ["content"];
function FileUpload_div_0_p_button_8_Template(rf, ctx) { if (rf & 1) {
    const _r11 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "p-button", 17);
    ɵngcc0.ɵɵlistener("onClick", function FileUpload_div_0_p_button_8_Template_p_button_onClick_0_listener() { ɵngcc0.ɵɵrestoreView(_r11); const ctx_r10 = ɵngcc0.ɵɵnextContext(2); return ctx_r10.upload(); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("label", ctx_r3.uploadLabel)("icon", ctx_r3.uploadIcon)("disabled", !ctx_r3.hasFiles() || ctx_r3.isFileLimitExceeded());
} }
function FileUpload_div_0_p_button_9_Template(rf, ctx) { if (rf & 1) {
    const _r13 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "p-button", 17);
    ɵngcc0.ɵɵlistener("onClick", function FileUpload_div_0_p_button_9_Template_p_button_onClick_0_listener() { ɵngcc0.ɵɵrestoreView(_r13); const ctx_r12 = ɵngcc0.ɵɵnextContext(2); return ctx_r12.clear(); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("label", ctx_r4.cancelLabel)("icon", ctx_r4.cancelIcon)("disabled", !ctx_r4.hasFiles() || ctx_r4.uploading);
} }
function FileUpload_div_0_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
function FileUpload_div_0_p_progressBar_13_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "p-progressBar", 18);
} if (rf & 2) {
    const ctx_r7 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("value", ctx_r7.progress)("showValue", false);
} }
function FileUpload_div_0_div_15_div_1_div_1_img_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "img", 25);
} if (rf & 2) {
    const file_r17 = ɵngcc0.ɵɵnextContext().$implicit;
    const ctx_r19 = ɵngcc0.ɵɵnextContext(4);
    ɵngcc0.ɵɵproperty("src", file_r17.objectURL, ɵngcc0.ɵɵsanitizeUrl)("width", ctx_r19.previewWidth);
} }
function FileUpload_div_0_div_15_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r22 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 22);
    ɵngcc0.ɵɵelementStart(1, "div");
    ɵngcc0.ɵɵtemplate(2, FileUpload_div_0_div_15_div_1_div_1_img_2_Template, 1, 2, "img", 23);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(3, "div");
    ɵngcc0.ɵɵtext(4);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(5, "div");
    ɵngcc0.ɵɵtext(6);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(7, "div");
    ɵngcc0.ɵɵelementStart(8, "button", 24);
    ɵngcc0.ɵɵlistener("click", function FileUpload_div_0_div_15_div_1_div_1_Template_button_click_8_listener($event) { ɵngcc0.ɵɵrestoreView(_r22); const i_r18 = ctx.index; const ctx_r21 = ɵngcc0.ɵɵnextContext(4); return ctx_r21.remove($event, i_r18); });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const file_r17 = ctx.$implicit;
    const ctx_r16 = ɵngcc0.ɵɵnextContext(4);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r16.isImage(file_r17));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(file_r17.name);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(ctx_r16.formatSize(file_r17.size));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("disabled", ctx_r16.uploading);
} }
function FileUpload_div_0_div_15_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div");
    ɵngcc0.ɵɵtemplate(1, FileUpload_div_0_div_15_div_1_div_1_Template, 9, 4, "div", 21);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r14 = ɵngcc0.ɵɵnextContext(3);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", ctx_r14.files);
} }
function FileUpload_div_0_div_15_div_2_ng_template_1_Template(rf, ctx) { }
function FileUpload_div_0_div_15_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div");
    ɵngcc0.ɵɵtemplate(1, FileUpload_div_0_div_15_div_2_ng_template_1_Template, 0, 0, "ng-template", 26);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r15 = ɵngcc0.ɵɵnextContext(3);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", ctx_r15.files)("ngForTemplate", ctx_r15.fileTemplate);
} }
function FileUpload_div_0_div_15_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 19);
    ɵngcc0.ɵɵtemplate(1, FileUpload_div_0_div_15_div_1_Template, 2, 1, "div", 20);
    ɵngcc0.ɵɵtemplate(2, FileUpload_div_0_div_15_div_2_Template, 2, 2, "div", 20);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", !ctx_r8.fileTemplate);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r8.fileTemplate);
} }
function FileUpload_div_0_ng_container_16_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
const _c3 = function (a0, a1) { return { "p-focus": a0, "p-disabled": a1 }; };
const _c4 = function (a0) { return { $implicit: a0 }; };
function FileUpload_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r25 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 2);
    ɵngcc0.ɵɵelementStart(1, "div", 3);
    ɵngcc0.ɵɵelementStart(2, "span", 4);
    ɵngcc0.ɵɵlistener("focus", function FileUpload_div_0_Template_span_focus_2_listener() { ɵngcc0.ɵɵrestoreView(_r25); const ctx_r24 = ɵngcc0.ɵɵnextContext(); return ctx_r24.onFocus(); })("blur", function FileUpload_div_0_Template_span_blur_2_listener() { ɵngcc0.ɵɵrestoreView(_r25); const ctx_r26 = ɵngcc0.ɵɵnextContext(); return ctx_r26.onBlur(); })("click", function FileUpload_div_0_Template_span_click_2_listener() { ɵngcc0.ɵɵrestoreView(_r25); const ctx_r27 = ɵngcc0.ɵɵnextContext(); return ctx_r27.choose(); })("keydown.enter", function FileUpload_div_0_Template_span_keydown_enter_2_listener() { ɵngcc0.ɵɵrestoreView(_r25); const ctx_r28 = ɵngcc0.ɵɵnextContext(); return ctx_r28.choose(); });
    ɵngcc0.ɵɵelementStart(3, "input", 5, 6);
    ɵngcc0.ɵɵlistener("change", function FileUpload_div_0_Template_input_change_3_listener($event) { ɵngcc0.ɵɵrestoreView(_r25); const ctx_r29 = ɵngcc0.ɵɵnextContext(); return ctx_r29.onFileSelect($event); });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelement(5, "span", 7);
    ɵngcc0.ɵɵelementStart(6, "span", 8);
    ɵngcc0.ɵɵtext(7);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(8, FileUpload_div_0_p_button_8_Template, 1, 3, "p-button", 9);
    ɵngcc0.ɵɵtemplate(9, FileUpload_div_0_p_button_9_Template, 1, 3, "p-button", 9);
    ɵngcc0.ɵɵtemplate(10, FileUpload_div_0_ng_container_10_Template, 1, 0, "ng-container", 10);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(11, "div", 11, 12);
    ɵngcc0.ɵɵlistener("dragenter", function FileUpload_div_0_Template_div_dragenter_11_listener($event) { ɵngcc0.ɵɵrestoreView(_r25); const ctx_r30 = ɵngcc0.ɵɵnextContext(); return ctx_r30.onDragEnter($event); })("dragleave", function FileUpload_div_0_Template_div_dragleave_11_listener($event) { ɵngcc0.ɵɵrestoreView(_r25); const ctx_r31 = ɵngcc0.ɵɵnextContext(); return ctx_r31.onDragLeave($event); })("drop", function FileUpload_div_0_Template_div_drop_11_listener($event) { ɵngcc0.ɵɵrestoreView(_r25); const ctx_r32 = ɵngcc0.ɵɵnextContext(); return ctx_r32.onDrop($event); });
    ɵngcc0.ɵɵtemplate(13, FileUpload_div_0_p_progressBar_13_Template, 1, 2, "p-progressBar", 13);
    ɵngcc0.ɵɵelement(14, "p-messages", 14);
    ɵngcc0.ɵɵtemplate(15, FileUpload_div_0_div_15_Template, 3, 2, "div", 15);
    ɵngcc0.ɵɵtemplate(16, FileUpload_div_0_ng_container_16_Template, 1, 0, "ng-container", 16);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵclassMap(ctx_r0.styleClass);
    ɵngcc0.ɵɵproperty("ngClass", "p-fileupload p-fileupload-advanced p-component")("ngStyle", ctx_r0.style);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction2(22, _c3, ctx_r0.focus, ctx_r0.disabled || ctx_r0.isChooseDisabled()));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("multiple", ctx_r0.multiple)("accept", ctx_r0.accept)("disabled", ctx_r0.disabled || ctx_r0.isChooseDisabled());
    ɵngcc0.ɵɵattribute("title", "");
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵclassMap(ctx_r0.chooseIcon);
    ɵngcc0.ɵɵproperty("ngClass", "p-button-icon p-button-icon-left");
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(ctx_r0.chooseLabel);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", !ctx_r0.auto && ctx_r0.showUploadButton);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", !ctx_r0.auto && ctx_r0.showCancelButton);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r0.toolbarTemplate);
    ɵngcc0.ɵɵadvance(3);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r0.hasFiles());
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("value", ctx_r0.msgs)("enableService", false);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r0.hasFiles());
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r0.contentTemplate)("ngTemplateOutletContext", ɵngcc0.ɵɵpureFunction1(25, _c4, ctx_r0.files));
} }
function FileUpload_div_1_input_6_Template(rf, ctx) { if (rf & 1) {
    const _r36 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "input", 31, 32);
    ɵngcc0.ɵɵlistener("change", function FileUpload_div_1_input_6_Template_input_change_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r36); const ctx_r35 = ɵngcc0.ɵɵnextContext(2); return ctx_r35.onFileSelect($event); })("focus", function FileUpload_div_1_input_6_Template_input_focus_0_listener() { ɵngcc0.ɵɵrestoreView(_r36); const ctx_r37 = ɵngcc0.ɵɵnextContext(2); return ctx_r37.onFocus(); })("blur", function FileUpload_div_1_input_6_Template_input_blur_0_listener() { ɵngcc0.ɵɵrestoreView(_r36); const ctx_r38 = ɵngcc0.ɵɵnextContext(2); return ctx_r38.onBlur(); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r33 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("accept", ctx_r33.accept)("multiple", ctx_r33.multiple)("disabled", ctx_r33.disabled);
} }
const _c5 = function (a1, a2, a3) { return { "p-button p-component p-fileupload-choose": true, "p-fil(eupload-choose-selected": a1, "p-focus": a2, "p-disabled": a3 }; };
function FileUpload_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r40 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 27);
    ɵngcc0.ɵɵelement(1, "p-messages", 14);
    ɵngcc0.ɵɵelementStart(2, "span", 28);
    ɵngcc0.ɵɵlistener("mouseup", function FileUpload_div_1_Template_span_mouseup_2_listener() { ɵngcc0.ɵɵrestoreView(_r40); const ctx_r39 = ɵngcc0.ɵɵnextContext(); return ctx_r39.onBasicUploaderClick(); })("keydown", function FileUpload_div_1_Template_span_keydown_2_listener() { ɵngcc0.ɵɵrestoreView(_r40); const ctx_r41 = ɵngcc0.ɵɵnextContext(); return ctx_r41.onBasicUploaderClick(); });
    ɵngcc0.ɵɵelement(3, "span", 29);
    ɵngcc0.ɵɵelementStart(4, "span", 8);
    ɵngcc0.ɵɵtext(5);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(6, FileUpload_div_1_input_6_Template, 2, 3, "input", 30);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("value", ctx_r1.msgs)("enableService", false);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵclassMap(ctx_r1.styleClass);
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction3(9, _c5, ctx_r1.hasFiles(), ctx_r1.focus, ctx_r1.disabled))("ngStyle", ctx_r1.style);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngClass", ctx_r1.hasFiles() && !ctx_r1.auto ? ctx_r1.uploadIcon : ctx_r1.chooseIcon);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(ctx_r1.auto ? ctx_r1.chooseLabel : ctx_r1.hasFiles() ? ctx_r1.files[0].name : ctx_r1.chooseLabel);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", !ctx_r1.hasFiles());
} }
class FileUpload {
    constructor(el, sanitizer, zone, http, cd) {
        this.el = el;
        this.sanitizer = sanitizer;
        this.zone = zone;
        this.http = http;
        this.cd = cd;
        this.method = 'POST';
        this.invalidFileSizeMessageSummary = '{0}: Invalid file size, ';
        this.invalidFileSizeMessageDetail = 'maximum upload size is {0}.';
        this.invalidFileTypeMessageSummary = '{0}: Invalid file type, ';
        this.invalidFileTypeMessageDetail = 'allowed file types: {0}.';
        this.invalidFileLimitMessageDetail = 'limit is {0} at most.';
        this.invalidFileLimitMessageSummary = 'Maximum number of files exceeded, ';
        this.previewWidth = 50;
        this.chooseLabel = 'Choose';
        this.uploadLabel = 'Upload';
        this.cancelLabel = 'Cancel';
        this.chooseIcon = 'pi pi-plus';
        this.uploadIcon = 'pi pi-upload';
        this.cancelIcon = 'pi pi-times';
        this.showUploadButton = true;
        this.showCancelButton = true;
        this.mode = 'advanced';
        this.onBeforeUpload = new EventEmitter();
        this.onSend = new EventEmitter();
        this.onUpload = new EventEmitter();
        this.onError = new EventEmitter();
        this.onClear = new EventEmitter();
        this.onRemove = new EventEmitter();
        this.onSelect = new EventEmitter();
        this.onProgress = new EventEmitter();
        this.uploadHandler = new EventEmitter();
        this._files = [];
        this.progress = 0;
        this.uploadedFileCount = 0;
    }
    set files(files) {
        this._files = [];
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (this.validate(file)) {
                if (this.isImage(file)) {
                    file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
                }
                this._files.push(files[i]);
            }
        }
    }
    get files() {
        return this._files;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'file':
                    this.fileTemplate = item.template;
                    break;
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'toolbar':
                    this.toolbarTemplate = item.template;
                    break;
                default:
                    this.fileTemplate = item.template;
                    break;
            }
        });
    }
    ngAfterViewInit() {
        if (this.mode === 'advanced') {
            this.zone.runOutsideAngular(() => {
                if (this.content)
                    this.content.nativeElement.addEventListener('dragover', this.onDragOver.bind(this));
            });
        }
    }
    choose() {
        this.advancedFileInput.nativeElement.click();
    }
    onFileSelect(event) {
        if (event.type !== 'drop' && this.isIE11() && this.duplicateIEEvent) {
            this.duplicateIEEvent = false;
            return;
        }
        this.msgs = [];
        if (!this.multiple) {
            this.files = [];
        }
        let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (!this.isFileSelected(file)) {
                if (this.validate(file)) {
                    if (this.isImage(file)) {
                        file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
                    }
                    this.files.push(files[i]);
                }
            }
        }
        this.onSelect.emit({ originalEvent: event, files: files, currentFiles: this.files });
        if (this.fileLimit && this.mode == "advanced") {
            this.checkFileLimit();
        }
        if (this.hasFiles() && this.auto && (!(this.mode === "advanced") || !this.isFileLimitExceeded())) {
            this.upload();
        }
        if (event.type !== 'drop' && this.isIE11()) {
            this.clearIEInput();
        }
        else {
            this.clearInputElement();
        }
    }
    isFileSelected(file) {
        for (let sFile of this.files) {
            if ((sFile.name + sFile.type + sFile.size) === (file.name + file.type + file.size)) {
                return true;
            }
        }
        return false;
    }
    isIE11() {
        return !!window['MSInputMethodContext'] && !!document['documentMode'];
    }
    validate(file) {
        if (this.accept && !this.isFileTypeValid(file)) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileTypeMessageSummary.replace('{0}', file.name),
                detail: this.invalidFileTypeMessageDetail.replace('{0}', this.accept)
            });
            return false;
        }
        if (this.maxFileSize && file.size > this.maxFileSize) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileSizeMessageSummary.replace('{0}', file.name),
                detail: this.invalidFileSizeMessageDetail.replace('{0}', this.formatSize(this.maxFileSize))
            });
            return false;
        }
        return true;
    }
    isFileTypeValid(file) {
        let acceptableTypes = this.accept.split(',').map(type => type.trim());
        for (let type of acceptableTypes) {
            let acceptable = this.isWildcard(type) ? this.getTypeClass(file.type) === this.getTypeClass(type)
                : file.type == type || this.getFileExtension(file).toLowerCase() === type.toLowerCase();
            if (acceptable) {
                return true;
            }
        }
        return false;
    }
    getTypeClass(fileType) {
        return fileType.substring(0, fileType.indexOf('/'));
    }
    isWildcard(fileType) {
        return fileType.indexOf('*') !== -1;
    }
    getFileExtension(file) {
        return '.' + file.name.split('.').pop();
    }
    isImage(file) {
        return /^image\//.test(file.type);
    }
    onImageLoad(img) {
        window.URL.revokeObjectURL(img.src);
    }
    upload() {
        if (this.customUpload) {
            if (this.fileLimit) {
                this.uploadedFileCount += this.files.length;
            }
            this.uploadHandler.emit({
                files: this.files
            });
            this.cd.markForCheck();
        }
        else {
            this.uploading = true;
            this.msgs = [];
            let formData = new FormData();
            this.onBeforeUpload.emit({
                'formData': formData
            });
            for (let i = 0; i < this.files.length; i++) {
                formData.append(this.name, this.files[i], this.files[i].name);
            }
            this.http.post(this.url, formData, {
                headers: this.headers, reportProgress: true, observe: 'events', withCredentials: this.withCredentials
            }).subscribe((event) => {
                switch (event.type) {
                    case HttpEventType.Sent:
                        this.onSend.emit({
                            originalEvent: event,
                            'formData': formData
                        });
                        break;
                    case HttpEventType.Response:
                        this.uploading = false;
                        this.progress = 0;
                        if (event['status'] >= 200 && event['status'] < 300) {
                            if (this.fileLimit) {
                                this.uploadedFileCount += this.files.length;
                            }
                            this.onUpload.emit({ originalEvent: event, files: this.files });
                        }
                        else {
                            this.onError.emit({ files: this.files });
                        }
                        this.clear();
                        break;
                    case HttpEventType.UploadProgress: {
                        if (event['loaded']) {
                            this.progress = Math.round((event['loaded'] * 100) / event['total']);
                        }
                        this.onProgress.emit({ originalEvent: event, progress: this.progress });
                        break;
                    }
                }
                this.cd.markForCheck();
            }, error => {
                this.uploading = false;
                this.onError.emit({ files: this.files, error: error });
            });
        }
    }
    clear() {
        this.files = [];
        this.onClear.emit();
        this.clearInputElement();
        this.cd.markForCheck();
    }
    remove(event, index) {
        this.clearInputElement();
        this.onRemove.emit({ originalEvent: event, file: this.files[index] });
        this.files.splice(index, 1);
    }
    isFileLimitExceeded() {
        if (this.fileLimit && this.fileLimit <= this.files.length + this.uploadedFileCount && this.focus) {
            this.focus = false;
        }
        return this.fileLimit && this.fileLimit < this.files.length + this.uploadedFileCount;
    }
    isChooseDisabled() {
        return this.fileLimit && this.fileLimit <= this.files.length + this.uploadedFileCount;
    }
    checkFileLimit() {
        if (this.isFileLimitExceeded()) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileLimitMessageSummary.replace('{0}', this.fileLimit.toString()),
                detail: this.invalidFileLimitMessageDetail.replace('{0}', this.fileLimit.toString())
            });
        }
    }
    clearInputElement() {
        if (this.advancedFileInput && this.advancedFileInput.nativeElement) {
            this.advancedFileInput.nativeElement.value = '';
        }
        if (this.basicFileInput && this.basicFileInput.nativeElement) {
            this.basicFileInput.nativeElement.value = '';
        }
    }
    clearIEInput() {
        if (this.advancedFileInput && this.advancedFileInput.nativeElement) {
            this.duplicateIEEvent = true; //IE11 fix to prevent onFileChange trigger again
            this.advancedFileInput.nativeElement.value = '';
        }
    }
    hasFiles() {
        return this.files && this.files.length > 0;
    }
    onDragEnter(e) {
        if (!this.disabled) {
            e.stopPropagation();
            e.preventDefault();
        }
    }
    onDragOver(e) {
        if (!this.disabled) {
            DomHandler.addClass(this.content.nativeElement, 'p-fileupload-highlight');
            this.dragHighlight = true;
            e.stopPropagation();
            e.preventDefault();
        }
    }
    onDragLeave(event) {
        if (!this.disabled) {
            DomHandler.removeClass(this.content.nativeElement, 'p-fileupload-highlight');
        }
    }
    onDrop(event) {
        if (!this.disabled) {
            DomHandler.removeClass(this.content.nativeElement, 'p-fileupload-highlight');
            event.stopPropagation();
            event.preventDefault();
            let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
            let allowDrop = this.multiple || (files && files.length === 1);
            if (allowDrop) {
                this.onFileSelect(event);
            }
        }
    }
    onFocus() {
        this.focus = true;
    }
    onBlur() {
        this.focus = false;
    }
    formatSize(bytes) {
        if (bytes == 0) {
            return '0 B';
        }
        let k = 1024, dm = 3, sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    onBasicUploaderClick() {
        if (this.hasFiles())
            this.upload();
        else
            this.basicFileInput.nativeElement.click();
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    ngOnDestroy() {
        if (this.content && this.content.nativeElement) {
            this.content.nativeElement.removeEventListener('dragover', this.onDragOver);
        }
    }
}
FileUpload.ɵfac = function FileUpload_Factory(t) { return new (t || FileUpload)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.DomSanitizer), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.NgZone), ɵngcc0.ɵɵdirectiveInject(ɵngcc2.HttpClient), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef)); };
FileUpload.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: FileUpload, selectors: [["p-fileUpload"]], contentQueries: function FileUpload_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵngcc0.ɵɵcontentQuery(dirIndex, PrimeTemplate, false);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.templates = _t);
    } }, viewQuery: function FileUpload_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵviewQuery(_c0, true);
        ɵngcc0.ɵɵviewQuery(_c1, true);
        ɵngcc0.ɵɵviewQuery(_c2, true);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.advancedFileInput = _t.first);
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.basicFileInput = _t.first);
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.content = _t.first);
    } }, inputs: { method: "method", invalidFileSizeMessageSummary: "invalidFileSizeMessageSummary", invalidFileSizeMessageDetail: "invalidFileSizeMessageDetail", invalidFileTypeMessageSummary: "invalidFileTypeMessageSummary", invalidFileTypeMessageDetail: "invalidFileTypeMessageDetail", invalidFileLimitMessageDetail: "invalidFileLimitMessageDetail", invalidFileLimitMessageSummary: "invalidFileLimitMessageSummary", previewWidth: "previewWidth", chooseLabel: "chooseLabel", uploadLabel: "uploadLabel", cancelLabel: "cancelLabel", chooseIcon: "chooseIcon", uploadIcon: "uploadIcon", cancelIcon: "cancelIcon", showUploadButton: "showUploadButton", showCancelButton: "showCancelButton", mode: "mode", files: "files", name: "name", url: "url", multiple: "multiple", accept: "accept", disabled: "disabled", auto: "auto", withCredentials: "withCredentials", maxFileSize: "maxFileSize", style: "style", styleClass: "styleClass", headers: "headers", customUpload: "customUpload", fileLimit: "fileLimit" }, outputs: { onBeforeUpload: "onBeforeUpload", onSend: "onSend", onUpload: "onUpload", onError: "onError", onClear: "onClear", onRemove: "onRemove", onSelect: "onSelect", onProgress: "onProgress", uploadHandler: "uploadHandler" }, decls: 2, vars: 2, consts: [[3, "ngClass", "ngStyle", "class", 4, "ngIf"], ["class", "p-fileupload p-fileupload-basic p-component", 4, "ngIf"], [3, "ngClass", "ngStyle"], [1, "p-fileupload-buttonbar"], ["pRipple", "", "tabindex", "0", 1, "p-button", "p-component", "p-fileupload-choose", 3, "ngClass", "focus", "blur", "click", "keydown.enter"], ["type", "file", 3, "multiple", "accept", "disabled", "change"], ["advancedfileinput", ""], [3, "ngClass"], [1, "p-button-label"], ["type", "button", 3, "label", "icon", "disabled", "onClick", 4, "ngIf"], [4, "ngTemplateOutlet"], [1, "p-fileupload-content", 3, "dragenter", "dragleave", "drop"], ["content", ""], [3, "value", "showValue", 4, "ngIf"], [3, "value", "enableService"], ["class", "p-fileupload-files", 4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["type", "button", 3, "label", "icon", "disabled", "onClick"], [3, "value", "showValue"], [1, "p-fileupload-files"], [4, "ngIf"], ["class", "p-fileupload-row", 4, "ngFor", "ngForOf"], [1, "p-fileupload-row"], [3, "src", "width", 4, "ngIf"], ["type", "button", "icon", "pi pi-times", "pButton", "", 3, "disabled", "click"], [3, "src", "width"], ["ngFor", "", 3, "ngForOf", "ngForTemplate"], [1, "p-fileupload", "p-fileupload-basic", "p-component"], ["tabindex", "0", "pRipple", "", 3, "ngClass", "ngStyle", "mouseup", "keydown"], [1, "p-button-icon", "p-button-icon-left", "pi", 3, "ngClass"], ["type", "file", 3, "accept", "multiple", "disabled", "change", "focus", "blur", 4, "ngIf"], ["type", "file", 3, "accept", "multiple", "disabled", "change", "focus", "blur"], ["basicfileinput", ""]], template: function FileUpload_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, FileUpload_div_0_Template, 17, 27, "div", 0);
        ɵngcc0.ɵɵtemplate(1, FileUpload_div_1_Template, 7, 13, "div", 1);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ctx.mode === "advanced");
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.mode === "basic");
    } }, directives: [ɵngcc3.NgIf, ɵngcc3.NgClass, ɵngcc3.NgStyle, ɵngcc4.Ripple, ɵngcc3.NgTemplateOutlet, ɵngcc5.Messages, ɵngcc6.Button, ɵngcc7.ProgressBar, ɵngcc3.NgForOf, ɵngcc6.ButtonDirective], styles: [".p-fileupload-content{position:relative}.p-fileupload-row{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex}.p-fileupload-row>div{-ms-flex:1 1 auto;flex:1 1 auto;width:25%}.p-fileupload-row>div:last-child{text-align:right}.p-fileupload-content .p-progressbar{left:0;position:absolute;top:0;width:100%}.p-button.p-fileupload-choose{overflow:hidden;position:relative}.p-button.p-fileupload-choose input[type=file],.p-fileupload-choose.p-fileupload-choose-selected input[type=file]{display:none}.p-fluid .p-fileupload .p-button{width:auto}"], encapsulation: 2, changeDetection: 0 });
FileUpload.ctorParameters = () => [
    { type: ElementRef },
    { type: DomSanitizer },
    { type: NgZone },
    { type: HttpClient },
    { type: ChangeDetectorRef }
];
FileUpload.propDecorators = {
    name: [{ type: Input }],
    url: [{ type: Input }],
    method: [{ type: Input }],
    multiple: [{ type: Input }],
    accept: [{ type: Input }],
    disabled: [{ type: Input }],
    auto: [{ type: Input }],
    withCredentials: [{ type: Input }],
    maxFileSize: [{ type: Input }],
    invalidFileSizeMessageSummary: [{ type: Input }],
    invalidFileSizeMessageDetail: [{ type: Input }],
    invalidFileTypeMessageSummary: [{ type: Input }],
    invalidFileTypeMessageDetail: [{ type: Input }],
    invalidFileLimitMessageDetail: [{ type: Input }],
    invalidFileLimitMessageSummary: [{ type: Input }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    previewWidth: [{ type: Input }],
    chooseLabel: [{ type: Input }],
    uploadLabel: [{ type: Input }],
    cancelLabel: [{ type: Input }],
    chooseIcon: [{ type: Input }],
    uploadIcon: [{ type: Input }],
    cancelIcon: [{ type: Input }],
    showUploadButton: [{ type: Input }],
    showCancelButton: [{ type: Input }],
    mode: [{ type: Input }],
    headers: [{ type: Input }],
    customUpload: [{ type: Input }],
    fileLimit: [{ type: Input }],
    onBeforeUpload: [{ type: Output }],
    onSend: [{ type: Output }],
    onUpload: [{ type: Output }],
    onError: [{ type: Output }],
    onClear: [{ type: Output }],
    onRemove: [{ type: Output }],
    onSelect: [{ type: Output }],
    onProgress: [{ type: Output }],
    uploadHandler: [{ type: Output }],
    templates: [{ type: ContentChildren, args: [PrimeTemplate,] }],
    advancedFileInput: [{ type: ViewChild, args: ['advancedfileinput',] }],
    basicFileInput: [{ type: ViewChild, args: ['basicfileinput',] }],
    content: [{ type: ViewChild, args: ['content',] }],
    files: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(FileUpload, [{
        type: Component,
        args: [{
                selector: 'p-fileUpload',
                template: `
        <div [ngClass]="'p-fileupload p-fileupload-advanced p-component'" [ngStyle]="style" [class]="styleClass" *ngIf="mode === 'advanced'">
            <div class="p-fileupload-buttonbar">
                <span class="p-button p-component p-fileupload-choose" [ngClass]="{'p-focus': focus, 'p-disabled':disabled || isChooseDisabled()}" (focus)="onFocus()" (blur)="onBlur()" pRipple
                    (click)="choose()" (keydown.enter)="choose()" tabindex="0"> 
                    <input #advancedfileinput type="file" (change)="onFileSelect($event)" [multiple]="multiple" [accept]="accept" [disabled]="disabled || isChooseDisabled()" [attr.title]="''">
                    <span [ngClass]="'p-button-icon p-button-icon-left'" [class]="chooseIcon"></span>
                    <span class="p-button-label">{{chooseLabel}}</span>
                </span>

                <p-button *ngIf="!auto&&showUploadButton" type="button" [label]="uploadLabel" [icon]="uploadIcon" (onClick)="upload()" [disabled]="!hasFiles() || isFileLimitExceeded()"></p-button>
                <p-button *ngIf="!auto&&showCancelButton" type="button" [label]="cancelLabel" [icon]="cancelIcon" (onClick)="clear()" [disabled]="!hasFiles() || uploading"></p-button>

                <ng-container *ngTemplateOutlet="toolbarTemplate"></ng-container>
            </div>
            <div #content class="p-fileupload-content" (dragenter)="onDragEnter($event)" (dragleave)="onDragLeave($event)" (drop)="onDrop($event)">
                <p-progressBar [value]="progress" [showValue]="false" *ngIf="hasFiles()"></p-progressBar>

                <p-messages [value]="msgs" [enableService]="false"></p-messages>

                <div class="p-fileupload-files" *ngIf="hasFiles()">
                    <div *ngIf="!fileTemplate">
                        <div class="p-fileupload-row" *ngFor="let file of files; let i = index;">
                            <div><img [src]="file.objectURL" *ngIf="isImage(file)" [width]="previewWidth" /></div>
                            <div>{{file.name}}</div>
                            <div>{{formatSize(file.size)}}</div>
                            <div>
                                <button type="button" icon="pi pi-times" pButton (click)="remove($event,i)" [disabled]="uploading"></button>
                            </div>
                        </div>
                    </div>
                    <div *ngIf="fileTemplate">
                        <ng-template ngFor [ngForOf]="files" [ngForTemplate]="fileTemplate"></ng-template>
                    </div>
                </div>
                <ng-container *ngTemplateOutlet="contentTemplate; context: {$implicit: files}"></ng-container>
            </div>
        </div>
        <div class="p-fileupload p-fileupload-basic p-component" *ngIf="mode === 'basic'">
            <p-messages [value]="msgs" [enableService]="false"></p-messages>
            <span [ngClass]="{'p-button p-component p-fileupload-choose': true, 'p-fil(eupload-choose-selected': hasFiles(),'p-focus': focus, 'p-disabled':disabled}"
                [ngStyle]="style" [class]="styleClass" (mouseup)="onBasicUploaderClick()" (keydown)="onBasicUploaderClick()" tabindex="0" pRipple>
                <span class="p-button-icon p-button-icon-left pi" [ngClass]="hasFiles()&&!auto ? uploadIcon : chooseIcon"></span>
                <span class="p-button-label">{{auto ? chooseLabel : hasFiles() ? files[0].name : chooseLabel}}</span>
                <input #basicfileinput type="file" [accept]="accept" [multiple]="multiple" [disabled]="disabled"
                    (change)="onFileSelect($event)" *ngIf="!hasFiles()" (focus)="onFocus()" (blur)="onBlur()">
            </span>
        </div>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-fileupload-content{position:relative}.p-fileupload-row{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex}.p-fileupload-row>div{-ms-flex:1 1 auto;flex:1 1 auto;width:25%}.p-fileupload-row>div:last-child{text-align:right}.p-fileupload-content .p-progressbar{left:0;position:absolute;top:0;width:100%}.p-button.p-fileupload-choose{overflow:hidden;position:relative}.p-button.p-fileupload-choose input[type=file],.p-fileupload-choose.p-fileupload-choose-selected input[type=file]{display:none}.p-fluid .p-fileupload .p-button{width:auto}"]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc1.DomSanitizer }, { type: ɵngcc0.NgZone }, { type: ɵngcc2.HttpClient }, { type: ɵngcc0.ChangeDetectorRef }]; }, { method: [{
            type: Input
        }], invalidFileSizeMessageSummary: [{
            type: Input
        }], invalidFileSizeMessageDetail: [{
            type: Input
        }], invalidFileTypeMessageSummary: [{
            type: Input
        }], invalidFileTypeMessageDetail: [{
            type: Input
        }], invalidFileLimitMessageDetail: [{
            type: Input
        }], invalidFileLimitMessageSummary: [{
            type: Input
        }], previewWidth: [{
            type: Input
        }], chooseLabel: [{
            type: Input
        }], uploadLabel: [{
            type: Input
        }], cancelLabel: [{
            type: Input
        }], chooseIcon: [{
            type: Input
        }], uploadIcon: [{
            type: Input
        }], cancelIcon: [{
            type: Input
        }], showUploadButton: [{
            type: Input
        }], showCancelButton: [{
            type: Input
        }], mode: [{
            type: Input
        }], onBeforeUpload: [{
            type: Output
        }], onSend: [{
            type: Output
        }], onUpload: [{
            type: Output
        }], onError: [{
            type: Output
        }], onClear: [{
            type: Output
        }], onRemove: [{
            type: Output
        }], onSelect: [{
            type: Output
        }], onProgress: [{
            type: Output
        }], uploadHandler: [{
            type: Output
        }], files: [{
            type: Input
        }], name: [{
            type: Input
        }], url: [{
            type: Input
        }], multiple: [{
            type: Input
        }], accept: [{
            type: Input
        }], disabled: [{
            type: Input
        }], auto: [{
            type: Input
        }], withCredentials: [{
            type: Input
        }], maxFileSize: [{
            type: Input
        }], style: [{
            type: Input
        }], styleClass: [{
            type: Input
        }], headers: [{
            type: Input
        }], customUpload: [{
            type: Input
        }], fileLimit: [{
            type: Input
        }], templates: [{
            type: ContentChildren,
            args: [PrimeTemplate]
        }], advancedFileInput: [{
            type: ViewChild,
            args: ['advancedfileinput']
        }], basicFileInput: [{
            type: ViewChild,
            args: ['basicfileinput']
        }], content: [{
            type: ViewChild,
            args: ['content']
        }] }); })();
class FileUploadModule {
}
FileUploadModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: FileUploadModule });
FileUploadModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function FileUploadModule_Factory(t) { return new (t || FileUploadModule)(); }, imports: [[CommonModule, SharedModule, ButtonModule, ProgressBarModule, MessagesModule, RippleModule], SharedModule, ButtonModule, ProgressBarModule, MessagesModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(FileUploadModule, { declarations: function () { return [FileUpload]; }, imports: function () { return [CommonModule, SharedModule, ButtonModule, ProgressBarModule, MessagesModule, RippleModule]; }, exports: function () { return [FileUpload, SharedModule, ButtonModule, ProgressBarModule, MessagesModule]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(FileUploadModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, SharedModule, ButtonModule, ProgressBarModule, MessagesModule, RippleModule],
                exports: [FileUpload, SharedModule, ButtonModule, ProgressBarModule, MessagesModule],
                declarations: [FileUpload]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { FileUpload, FileUploadModule };

//# sourceMappingURL=primeng-fileupload.js.map