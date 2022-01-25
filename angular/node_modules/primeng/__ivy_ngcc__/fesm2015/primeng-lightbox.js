import { Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Renderer2, ChangeDetectorRef, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';

function Lightbox_div_0_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "a", 19);
    ɵngcc0.ɵɵlistener("click", function Lightbox_div_0_a_1_Template_a_click_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r8); const image_r5 = ctx.$implicit; const i_r6 = ctx.index; const ctx_r7 = ɵngcc0.ɵɵnextContext(2); const _r2 = ɵngcc0.ɵɵreference(7); return ctx_r7.onImageClick($event, image_r5, i_r6, _r2); });
    ɵngcc0.ɵɵelement(1, "img", 20);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const image_r5 = ctx.$implicit;
    ɵngcc0.ɵɵproperty("href", image_r5.source, ɵngcc0.ɵɵsanitizeUrl);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("src", image_r5.thumbnail, ɵngcc0.ɵɵsanitizeUrl)("title", image_r5.title)("alt", image_r5.alt);
} }
function Lightbox_div_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 17);
    ɵngcc0.ɵɵtemplate(1, Lightbox_div_0_a_1_Template, 2, 4, "a", 18);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵclassMap(ctx_r0.styleClass);
    ɵngcc0.ɵɵproperty("ngStyle", ctx_r0.style);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", ctx_r0.images);
} }
function Lightbox_span_1_Template(rf, ctx) { if (rf & 1) {
    const _r10 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "span", 21);
    ɵngcc0.ɵɵlistener("click", function Lightbox_span_1_Template_span_click_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r10); const ctx_r9 = ɵngcc0.ɵɵnextContext(); const _r2 = ɵngcc0.ɵɵreference(7); return ctx_r9.onLinkClick($event, _r2); });
    ɵngcc0.ɵɵprojection(1, 1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵclassMap(ctx_r1.styleClass);
    ɵngcc0.ɵɵproperty("ngStyle", ctx_r1.style);
} }
const _c0 = ["*", [["a"]]];
const _c1 = function (a0) { return { "ui-lightbox-loading": a0 }; };
const _c2 = function (a0) { return { "ui-helper-hidden": a0 }; };
const _c3 = ["*", "a"];
class Lightbox {
    constructor(el, renderer, cd) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.type = 'image';
        this.effectDuration = '500ms';
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.closeOnEscape = true;
    }
    onImageClick(event, image, i, content) {
        this.index = i;
        this.loading = true;
        content.style.width = 32 + 'px';
        content.style.height = 32 + 'px';
        this.preventDocumentClickListener = true;
        this.show();
        this.displayImage(image);
        event.preventDefault();
    }
    ngAfterViewInit() {
        this.panel = DomHandler.findSingle(this.el.nativeElement, '.ui-lightbox ');
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.panel);
            else
                DomHandler.appendChild(this.panel, this.appendTo);
        }
    }
    onLinkClick(event, content) {
        this.preventDocumentClickListener = true;
        this.show();
        event.preventDefault();
    }
    displayImage(image) {
        setTimeout(() => {
            this.cd.markForCheck();
            this.currentImage = image;
            this.captionText = image.title;
            this.center();
        }, 1000);
    }
    show() {
        this.mask = document.createElement('div');
        DomHandler.addMultipleClasses(this.mask, 'ui-widget-overlay ui-dialog-mask');
        document.body.appendChild(this.mask);
        if (this.autoZIndex) {
            this.zindex = this.baseZIndex + (++DomHandler.zindex);
        }
        this.mask.style.zIndex = this.zindex - 1;
        this.center();
        this.visible = true;
        this.bindGlobalListeners();
    }
    hide(event) {
        this.captionText = null;
        this.index = null;
        this.currentImage = null;
        this.visible = false;
        if (this.mask) {
            document.body.removeChild(this.mask);
            this.mask = null;
        }
        this.unbindGlobalListeners();
        event.preventDefault();
    }
    center() {
        let elementWidth = DomHandler.getOuterWidth(this.panel);
        let elementHeight = DomHandler.getOuterHeight(this.panel);
        if (elementWidth == 0 && elementHeight == 0) {
            this.panel.style.visibility = 'hidden';
            this.panel.style.display = 'block';
            elementWidth = DomHandler.getOuterWidth(this.panel);
            elementHeight = DomHandler.getOuterHeight(this.panel);
            this.panel.style.display = 'none';
            this.panel.style.visibility = 'visible';
        }
    }
    onImageLoad(event, content) {
        let image = event.target;
        image.style.visibility = 'hidden';
        image.style.display = 'block';
        let imageWidth = DomHandler.getOuterWidth(image);
        let imageHeight = DomHandler.getOuterHeight(image);
        image.style.display = 'none';
        image.style.visibility = 'visible';
        content.style.width = imageWidth + 'px';
        content.style.height = imageHeight + 'px';
        this.panel.style.left = parseInt(this.panel.style.left) + (DomHandler.getOuterWidth(this.panel) - imageWidth) / 2 + 'px';
        this.panel.style.top = parseInt(this.panel.style.top) + (DomHandler.getOuterHeight(this.panel) - imageHeight) / 2 + 'px';
        setTimeout(() => {
            this.cd.markForCheck();
            DomHandler.fadeIn(image, 500);
            image.style.display = 'block';
            //this.captionText = this.currentImage.title;
            this.loading = false;
        }, parseInt(this.effectDuration));
    }
    prev(placeholder) {
        this.captionText = null;
        this.loading = true;
        placeholder.style.display = 'none';
        if (this.index > 0) {
            this.displayImage(this.images[--this.index]);
        }
    }
    next(placeholder) {
        this.captionText = null;
        this.loading = true;
        placeholder.style.display = 'none';
        if (this.index <= (this.images.length - 1)) {
            this.displayImage(this.images[++this.index]);
        }
    }
    bindGlobalListeners() {
        const documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
        this.documentClickListener = this.renderer.listen(documentTarget, 'click', (event) => {
            if (!this.preventDocumentClickListener && this.visible) {
                this.hide(event);
            }
            this.preventDocumentClickListener = false;
            this.cd.markForCheck();
        });
        if (this.closeOnEscape && !this.documentEscapeListener) {
            this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', (event) => {
                if (event.which == 27) {
                    if (parseInt(this.panel.style.zIndex) === (DomHandler.zindex + this.baseZIndex)) {
                        this.hide(event);
                    }
                }
            });
        }
    }
    unbindGlobalListeners() {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    get leftVisible() {
        return this.images && this.images.length && this.index != 0 && !this.loading;
    }
    get rightVisible() {
        return this.images && this.images.length && this.index < (this.images.length - 1) && !this.loading;
    }
    ngOnDestroy() {
        this.unbindGlobalListeners();
        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.panel);
        }
    }
}
Lightbox.ɵfac = function Lightbox_Factory(t) { return new (t || Lightbox)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef)); };
Lightbox.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: Lightbox, selectors: [["p-lightbox"]], inputs: { type: "type", effectDuration: "effectDuration", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", closeOnEscape: "closeOnEscape", images: "images", style: "style", styleClass: "styleClass", appendTo: "appendTo", easing: "easing" }, ngContentSelectors: _c3, decls: 19, vars: 35, consts: [[3, "ngStyle", "class", 4, "ngIf"], [3, "ngStyle", "class", "click", 4, "ngIf"], [1, "ui-lightbox", "ui-widget", "ui-corner-all", "ui-shadow", 3, "ngClass", "click"], [1, "ui-lightbox-content-wrapper"], [1, "ui-state-default", "ui-lightbox-nav-left", "ui-corner-right", 3, "ngClass", "click"], [1, "ui-lightbox-nav-icon", "pi", "pi-chevron-left"], [1, "ui-lightbox-content", "ui-corner-all"], ["content", ""], [2, "display", "none", 3, "src", "load"], ["img", ""], [1, "ui-state-default", "ui-lightbox-nav-right", "ui-corner-left", "ui-helper-hidden", 3, "ngClass", "click"], [1, "ui-lightbox-nav-icon", "pi", "pi-chevron-right"], [1, "ui-lightbox-caption", "ui-widget-header"], [1, "ui-lightbox-caption-text"], ["tabindex", "0", 1, "ui-lightbox-close", "ui-corner-all", 3, "click", "keydown.enter"], [1, "pi", "pi-times"], [2, "clear", "both"], [3, "ngStyle"], [3, "href", "click", 4, "ngFor", "ngForOf"], [3, "href", "click"], [3, "src", "title", "alt"], [3, "ngStyle", "click"]], template: function Lightbox_Template(rf, ctx) { if (rf & 1) {
        const _r11 = ɵngcc0.ɵɵgetCurrentView();
        ɵngcc0.ɵɵprojectionDef(_c0);
        ɵngcc0.ɵɵtemplate(0, Lightbox_div_0_Template, 2, 4, "div", 0);
        ɵngcc0.ɵɵtemplate(1, Lightbox_span_1_Template, 2, 3, "span", 1);
        ɵngcc0.ɵɵelementStart(2, "div", 2);
        ɵngcc0.ɵɵlistener("click", function Lightbox_Template_div_click_2_listener() { return ctx.preventDocumentClickListener = true; });
        ɵngcc0.ɵɵelementStart(3, "div", 3);
        ɵngcc0.ɵɵelementStart(4, "a", 4);
        ɵngcc0.ɵɵlistener("click", function Lightbox_Template_a_click_4_listener() { ɵngcc0.ɵɵrestoreView(_r11); const _r3 = ɵngcc0.ɵɵreference(9); return ctx.prev(_r3); });
        ɵngcc0.ɵɵelement(5, "span", 5);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(6, "div", 6, 7);
        ɵngcc0.ɵɵelementStart(8, "img", 8, 9);
        ɵngcc0.ɵɵlistener("load", function Lightbox_Template_img_load_8_listener($event) { ɵngcc0.ɵɵrestoreView(_r11); const _r2 = ɵngcc0.ɵɵreference(7); return ctx.onImageLoad($event, _r2); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵprojection(10);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(11, "a", 10);
        ɵngcc0.ɵɵlistener("click", function Lightbox_Template_a_click_11_listener() { ɵngcc0.ɵɵrestoreView(_r11); const _r3 = ɵngcc0.ɵɵreference(9); return ctx.next(_r3); });
        ɵngcc0.ɵɵelement(12, "span", 11);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(13, "div", 12);
        ɵngcc0.ɵɵelementStart(14, "span", 13);
        ɵngcc0.ɵɵtext(15);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(16, "a", 14);
        ɵngcc0.ɵɵlistener("click", function Lightbox_Template_a_click_16_listener($event) { return ctx.hide($event); })("keydown.enter", function Lightbox_Template_a_keydown_enter_16_listener($event) { return ctx.hide($event); });
        ɵngcc0.ɵɵelement(17, "span", 15);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelement(18, "div", 16);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ctx.type == "image");
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.type == "content");
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵstyleProp("display", ctx.visible ? "block" : "none")("z-index", ctx.zindex)("transition-property", "all")("transition-duration", ctx.effectDuration)("transition-timing-function", ctx.easing);
        ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(29, _c1, ctx.loading));
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵstyleProp("z-index", ctx.zindex + 1);
        ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(31, _c2, !ctx.leftVisible));
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵstyleProp("transition-property", "width,height")("transition-duration", ctx.effectDuration)("transition-timing-function", ctx.easing);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("src", ctx.currentImage ? ctx.currentImage.source || "" : "", ɵngcc0.ɵɵsanitizeUrl);
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵstyleProp("z-index", ctx.zindex + 1);
        ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(33, _c2, !ctx.rightVisible));
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵstyleProp("display", ctx.captionText ? "block" : "none");
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵtextInterpolate(ctx.captionText);
    } }, directives: [ɵngcc1.NgIf, ɵngcc1.NgClass, ɵngcc1.NgStyle, ɵngcc1.NgForOf], styles: [".ui-lightbox{-ms-transform:translateX(-50%) translateY(-50%);display:none;left:50%;position:fixed;top:50%;transform:translateX(-50%) translateY(-50%)}.ui-lightbox-content-wrapper{position:relative}.ui-lightbox-content{background-color:#000;margin:0;padding:0;position:relative}.ui-lightbox-nav-left,.ui-lightbox-nav-right{cursor:pointer;position:absolute;top:50%}.ui-lightbox-nav-left{left:0}.ui-lightbox-nav-right{right:0}.ui-lightbox-loading .ui-lightbox-content{background:url(\"data:image/gif;base64,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\") #000 50% no-repeat}.ui-lightbox-caption{display:none;padding:.2em .4em}.ui-lightbox-caption-text{float:left;margin:.3em 0 .1em}.ui-lightbox-close{float:right;margin:0;padding:.125em}.ui-lightbox-close.ui-state-hover{padding:0}.ui-lightbox-nav-left,.ui-lightbox-nav-right{opacity:.5}.ui-lightbox-nav-left:hover,.ui-lightbox-nav-right:hover{opacity:1}", ".p-dialog-mask{-ms-flex-align:center;-ms-flex-pack:center;align-items:center;background-color:rgba(0,0,0,0);display:-ms-flexbox;display:flex;height:100%;justify-content:center;left:0;pointer-events:none;position:fixed;top:0;transition-property:background-color;width:100%}.p-dialog,.p-dialog-mask.p-component-overlay{pointer-events:auto}.p-dialog{-ms-flex-direction:column;-ms-transform:scale(1);display:-ms-flexbox;display:flex;flex-direction:column;max-height:90%;position:relative;transform:scale(1)}.p-dialog-content{overflow-y:auto}.p-dialog-header{-ms-flex-align:center;-ms-flex-pack:justify;align-items:center;display:-ms-flexbox;display:flex;justify-content:space-between}.p-dialog-footer,.p-dialog-header{-ms-flex-negative:0;flex-shrink:0}.p-dialog .p-dialog-header-icon,.p-dialog .p-dialog-header-icons{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex}.p-dialog .p-dialog-header-icon{-ms-flex-pack:center;justify-content:center;overflow:hidden;position:relative}.p-dialog-mask.p-dialog-mask-leave{background-color:rgba(0,0,0,0)}.p-fluid .p-dialog-footer .p-button{width:auto}.p-dialog-bottom-left .p-dialog,.p-dialog-bottom-right .p-dialog,.p-dialog-bottom .p-dialog,.p-dialog-left .p-dialog,.p-dialog-right .p-dialog,.p-dialog-top-left .p-dialog,.p-dialog-top-right .p-dialog,.p-dialog-top .p-dialog{margin:.75rem;transform:translateZ(0)}.p-dialog-maximized{-ms-transform:none;height:100%;max-height:100%;transform:none;transition:none;width:100vw!important}.p-dialog-maximized .p-dialog-content{-ms-flex-positive:1;flex-grow:1}.p-dialog-left{-ms-flex-pack:start;justify-content:flex-start}.p-dialog-right{-ms-flex-pack:end;justify-content:flex-end}.p-dialog-top,.p-dialog-top-left{-ms-flex-align:start;align-items:flex-start}.p-dialog-top-left{-ms-flex-pack:start;justify-content:flex-start}.p-dialog-top-right{-ms-flex-align:start;-ms-flex-pack:end;align-items:flex-start;justify-content:flex-end}.p-dialog-bottom,.p-dialog-bottom-left{-ms-flex-align:end;align-items:flex-end}.p-dialog-bottom-left{-ms-flex-pack:start;justify-content:flex-start}.p-dialog-bottom-right{-ms-flex-align:end;-ms-flex-pack:end;align-items:flex-end;justify-content:flex-end}.p-dialog .p-resizable-handle{bottom:1px;cursor:se-resize;display:block;font-size:.1px;height:12px;position:absolute;right:1px;width:12px}.p-confirm-dialog .p-dialog-content{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex}"], encapsulation: 2 });
Lightbox.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
Lightbox.propDecorators = {
    images: [{ type: Input }],
    type: [{ type: Input }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    appendTo: [{ type: Input }],
    easing: [{ type: Input }],
    effectDuration: [{ type: Input }],
    autoZIndex: [{ type: Input }],
    baseZIndex: [{ type: Input }],
    closeOnEscape: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(Lightbox, [{
        type: Component,
        args: [{
                selector: 'p-lightbox',
                template: `
        <div [ngStyle]="style" [class]="styleClass" *ngIf="(type == 'image')">
            <a *ngFor="let image of images; let i = index;" [href]="image.source" (click)="onImageClick($event,image,i,content)">
                <img [src]="image.thumbnail" [title]="image.title" [alt]="image.alt">
            </a>
        </div>
        <span [ngStyle]="style" [class]="styleClass" *ngIf="(type == 'content')" (click)="onLinkClick($event,content)">
            <ng-content select="a"></ng-content>
        </span>
        <div class="ui-lightbox ui-widget ui-corner-all ui-shadow" [style.display]="visible ? 'block' : 'none'" [style.zIndex]="zindex"
            [ngClass]="{'ui-lightbox-loading': loading}"
            [style.transitionProperty]="'all'" [style.transitionDuration]="effectDuration" [style.transitionTimingFunction]="easing" (click)="preventDocumentClickListener=true">
           <div class="ui-lightbox-content-wrapper">
              <a class="ui-state-default ui-lightbox-nav-left ui-corner-right" [style.zIndex]="zindex + 1" (click)="prev(img)"
                [ngClass]="{'ui-helper-hidden':!leftVisible}"><span class="ui-lightbox-nav-icon pi pi-chevron-left"></span></a>
              <div #content class="ui-lightbox-content ui-corner-all" 
                [style.transitionProperty]="'width,height'" [style.transitionDuration]="effectDuration" [style.transitionTimingFunction]="easing">
                <img #img [src]="currentImage ? currentImage.source||'' : ''" (load)="onImageLoad($event,content)" style="display:none">
                <ng-content></ng-content>
              </div>
              <a class="ui-state-default ui-lightbox-nav-right ui-corner-left ui-helper-hidden" [style.zIndex]="zindex + 1" (click)="next(img)"
                [ngClass]="{'ui-helper-hidden':!rightVisible}"><span class="ui-lightbox-nav-icon pi pi-chevron-right"></span></a>
           </div>
           <div class="ui-lightbox-caption ui-widget-header" [style.display]="captionText ? 'block' : 'none'">
              <span class="ui-lightbox-caption-text">{{captionText}}</span><a class="ui-lightbox-close ui-corner-all" tabindex="0" (click)="hide($event)" (keydown.enter)="hide($event)"><span class="pi pi-times"></span></a>
              <div style="clear:both"></div>
           </div>
        </div>
    `,
                changeDetection: ChangeDetectionStrategy.Default,
                encapsulation: ViewEncapsulation.None,
                styles: [".ui-lightbox{-ms-transform:translateX(-50%) translateY(-50%);display:none;left:50%;position:fixed;top:50%;transform:translateX(-50%) translateY(-50%)}.ui-lightbox-content-wrapper{position:relative}.ui-lightbox-content{background-color:#000;margin:0;padding:0;position:relative}.ui-lightbox-nav-left,.ui-lightbox-nav-right{cursor:pointer;position:absolute;top:50%}.ui-lightbox-nav-left{left:0}.ui-lightbox-nav-right{right:0}.ui-lightbox-loading .ui-lightbox-content{background:url(\"data:image/gif;base64,R0lGODlhIAAgAPYAAAAAAOLi4gMDAyMjIyAgIAEBATw8PHBwcGdnZzc3NwcHBxMTE2hoaHFxcVNTUxUVFX5+fpmZmW5ubhcXFwoKCnNzc1FRUUdHR7Gxsa6urqmpqYODgx4eHggICHV1dU5OTgUFBTAwMKysrIGBgREREVVVVXd3dzg4OCcnJ7Ozs7CwsEhISDExMSwsLA4ODiUlJbe3t0FBQTo6OkxMTAwMDICAgGBgYCEhIRgYGGpqatHR0dPT08HBwdXV1bm5uVhYWBoaGhwcHBAQEEVFRVdXV1xcXIqKimNjY15eXqOjo56enpqamqWlpaCgoGFhYSoqKqGhoaenpygoKDU1NZycnFpaWsrKyr6+vrW1tc7OztDQ0D4+PpGRkZeXl1BQUHx8fJOTk46OjomJiZCQkJWVlcPDw8XFxcfHx7y8vC4uLjMzM4WFhUBAQIeHh7q6ukpKSszMzIyMjMnJyXp6enl5eUNDQ8DAwGxsbKqqqmVlZdfX1wAAAAAAAAAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAFAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAIAAgAAAH/4AAgoOEhYaHiImKi4yNjo+QkZKECzk2NJOCDxchgwU1OjsSmQoQGCIWghQiOz01npALERkYGQ4AFBqtP4ILN0ACjgISGhkpGDIANjw+KABCKNEujxMbGiowowAEHIIT0SgUkBwjGiIzhkIvKDiSJCsxwYYdmI8KFB0FjfqLAgYMEiSUEJeoAJABBAgiGnCgQQUPJlgoIgGuWyICCBhoRNBCEbRoFhEVSODAwocTIBQVwEEgiMJEChSkzNTPRQdEFF46KsABxYtphUisAxLpW7QJgkDMxAFO5yIC0V5gEjrg5kcUQB098ElCEFQURAH4CiLvEQUFg25ECwKLpiCmKBC6ui0kYILcuXjz6t3Ld1IgACH5BAAFAAEALAAAAAAgACAAAAf/gACCg4SFhoeIiYqLjI2Ohw8Tj44XKlhbk4sKEVZZXAWZgwsxLYMdTJ1RCqEAIA1JSjOCFKhaUSCCoI8kRkpMULIKVFZaXaALN0C6jAVHS01RTFMAVVc8XgBCKNsujwsmS1AaCIJSpQAT2ygUk0AeS0oXhkIvKDihQjEyy4QdNJMgOqxqxC9RCyJFkKwYiKgAkAEE2CWi4CChDSdSFJFQx0ERiCEWQlq4oUjbto6KgCQwIOOJAEUFcBAIInGRgIKsGrrogIhCzUcFgqB40a0QiXpAMj1QJ6kVLgA41P1kxGHbi39HB/A0iaKoo6MvSAgisC0pAGRBXk4SOOjGtiCDFXCGSodCSM6GC7ze3cu3r9+/gAcFAgAh+QQABQACACwAAAAAIAAgAAAH/4AAgoOEhYaHiImKi4yNjoYkTj8Uj40SPGUMlYsdSzxmSiCbg0IyKIM0TTxnTAqjACAIYGNDgh1Uq1CiAB2VLl9hZGAXsGSrXAUKEjNABY4FRGJjXV0sAD8+aB8ANmItKC6PJAxiXBFIAAIhIYJVUygolI8TCNIxhkAvKDijLidTzgx1oLEJxC5GAReRkLFixZSDhwoAGUBAXiIWQy6smMFBEQl4KDoqenKi5Al+iYSAFJmIwgAUL5opKoCDQBCLM189c9HrEAWcz4LADFeIhD4gmxaAnCDIoCAcIIEuEgqToNEBvVTCI+rIxYAXJAQRgIcUwIIbQQQUPHiD7KCEOhMBTIAnJG7EBVzt6t3Lt6/fvYEAACH5BAAFAAMALAAAAAAgACAAAAf/gACCg4SFhoeIiYqLjI2OhiRVDhSPjQhYPkeViwpjWG5dIJuDBTdBgxRkWGhKCqOCK18QW4IdXKsRogAPHY8FNl8bG2wAIEarRgUKDW4ROI8XHl9rbS0ADhkYbwBIWj1wU48uPx4QYg4ABS1pgm09ZUc0lQtE5SeGR1hEz5sUIWkFDAkAIq9SAQGOAjIC8YLFFBQIExUAMoAAJUU41oVQs0ARCRQgOSyaABKkC0VCSopUJADHjRsTFhXAQSDIRZmvErrodYjCTV9BULw4WYjECxRANn0EGbNYRBwlfzIiKVSe0Ru9UpqsRGHAABKCCIBMCmCBqYiPBKC9MZZUTkJUEIW8PVRgAdG5ePPq3ctXbyAAIfkEAAUABAAsAAAAACAAIAAAB/+AAIKDhIWGh4iJiouMjY6GQhZDHY+NSFEiRZWLCmtRGXEgm4QgCoMdYhoZYKajAA9ETmqCnRoqY6IACy6VCQgHDQkAIBAaGCMAChIpShyPTzYMDR4oADNQUUMAVXJZOj+PHRdOOR4rAAVST4Ij3joXlS7jOSyGNnA7YRSbHSgvhyAMvBHiqlEBgxNu3MCxqACQAQT2KXKBoiIKGopIWHQ20eJFRUI2NsShcMJIAkEkNixo0AWlQxRUPioQxB+vQiReoACySWNFk8MECMJhUSajCRVfYMx5g1LIijcdKSAwgIQgAhV56roBRGilAgcF3cg6KCxLAEhREDxbqACJqGwI48qdS7fuqEAAIfkEAAUABQAsAAAAACAAIAAAB/+AAIKDhIWGh4iJiouMjY6GLitsCo+NJRFUM5WLICYRTSMCm4kdc59iIIIgLw+VT2woggp0EVBrogtfblFSjhNeP0hpAAINEUl0AApfZWdyTr4rFkVOBAB1YBFsAD92zlZ1jiBTbw42WwAFL7ECRmZycEYUjxRqbyW9hUfwRiSbIEGCHKLwxoKQUY1AUCjQiAQBAhMWFWjRgkCHRRRQaERBQxGJjRwwbuSoSAhIRg9u3IioqAAOAkAuMmKIsFEBFzINUZi3qUAQFC9cGCKxDsimjxpZghAFAMdGno4eaHzRkeiNiyY1Cn0EgsAAfwAIaDQKYMENIEwr0QRwY+ygtTUUAUzQeDCuoQIkttrdy7ev3799AwEAIfkEAAUABgAsAAAAACAAIAAAB/+AAIKDhIWGh4iJiouMjY6GBQMDj45sI20ylIsgDG1jBwWaiQp3nl8ggiAyQxSPJCgPqZ1cdAIAJB4pbkeOCmoxF5MCR21cEgAKFTBodmO2jB0hqzM4ADIjRpkOKcw8P48cLAYrIQAFN5MFI252ZRutjiAELFschkVXZWskmgUkC4coXPjgQlQjEDj4MSJBgMCERRPA2MlgYJGCFygy0lCE5MwVH21QjcKoUREBNglY3GC04MaNh4oK4CAARIHBm4gKuOiAiAI8SgWCoHhRsBAJjEA0vcoIE8QzHBlR/Gz0IOOLjUdv8BQStWg8AjcUEsiYFEBLIM+ADrpBdlAonIIRJmQUAhcSCa918+rdy7evqEAAIfkEAAUABwAsAAAAACAAIAAAB/+AAIKDhIWGh4iJiouMjY6HIAKPjkFFP0CTjB8VXx+ZigI/FRAMkgACCWwdjwVCNIICRKMHkkJ3URlIj0FPITgABQ4VNUcFIDl4KiliposCLygtUyQAIXd0LQAzuClYDo9AKFIhN4ITmAV0GSkwX6uOIBziC4ZEKT4QQpmtr4YddStcfGoEYoI+RkIIEJiwaEIYNxpkLAIBDQWKfojy6NiYRIEiihYvKjrSo2QTEIsW3LjBUNEDD1SohBgIqlmjAi7eGaJA4VOBICheCCxEAhqmSSRCtowkCEfIno8eWHzxquiNVUJCDoVH4AY1AAQsHlUJpIDPQTfEDjJLc9AEiwcP2xYqQGKr3Lt48+rdizcQACH5BAAFAAgALAAAAAAgACAAAAf/gACCg4SFhoeIiYqLjI2Oj5CHCmkhCpGLU0gMMpeJBUOaPwWCAiwyHZAdlgACF0g5NgIALkcRTSWPEy8DQgAFdUh3uCBOVFBMELKMBTcoKC8UAC8/CC8AQ11NTBozj0DOKA+CJOIFEtp4FaiOIBzPLoZeTHge8JAFLtGGHVt1NJ2MQEzoxUgIAQITFj1og4EJm0UCBoD7l8iGHCtWlIBQFHGiIhtZQmpcZPBGQkUPxIhY8hDgoQIUlDnCt84QBX33grwzROIFCiCRSIA7CUIZDnA4Gz1w9uJfzxuohICzx47ADRKCCDgDCmDBDRyjIoUF0OznoLEuJzgj6LJQARJUCtvKnUu3rt25gQAAIfkEAAUACQAsAAAAACAAIAAAB/+AAIKDhIWGh4iJiouMjY6PkIgkC5GMHEMzN5WKLBcOQ4MCL2oKkCAgggWdJR8FADREbWMfjyQvA0KCaRdEFwACJUZcXQ2ujRwoKC8UAEB1FhwABrJdS76OOMkoD4I0JIJOY11UOaWOIMgvNIYXZOTrkAUuzIYKJ1vwm4oCD0FCxomEECAwYRGQGhpUJPmSz5CAAdoaGrpjpyKPKzISFYCYTGIhBGZCmrFjQJELAjcKKnqwIQoTJk4E6DNUoIPNR/I6IGIxRGe8IMpcGCKR4EsbobW0qQQhE0A2KQ5QQHqQTB0AWzd0CtGW6xEIlN8AEEgGRNCCGzgA4hx0g+wgtfoTJiTrOrNQARJI6+rdy7evX76BAAAh+QQABQAKACwAAAAAIAAgAAAH/4AAgoOEhYaHiImKi4yNjo+QiCACkYxCTywklYoEaTIsgwUcQJEgBYM3aQYygh1vHiYtj0IvN0KCnVtTAAUrJhBrDo8cKCgvFABCLQYTAGoVwGJbjzjFKA+CCjSCDl9rRkgKjyDEL9uFWxtxNuePBS7IhiAsJ/GbigILQED2iEIEBJop4jCHShImYlAkEjDAWrtDOVKkwEIRwilEBBwquuOmY0cIilwQuCEwEQ4ISpRQmUPgnqECHWJeZPSuwyEQQ4bYhFQgiDEXhhxo0TIG6CMS1gROEpQGih4dMSA9KGYOAIlaNoUYwKOHCCQQIzUByIiCFIAFMiqUdIeqmFleLhQHTSh2K26hAiSM2t3Lt6/fv5sCAQAh+QQABQALACwAAAAAIAAgAAAH/4AAgoOEhYaHiImKi4yNjo+QiAWRjRQ3BAqUihwoKByEIJOQBaIABJ0vggoJRBeZjjQ3N0KCp1IDAAUyRzkHKI9BqBQAQgMoLgBSNgwNDZ+OOJ0oC4Igr3XMJl6ljCCcL8OFagd0Dh2RBS7hhSBPIeeaiwIkODjriC4EBBOLQAdjZLpAwJXoVCcaio4wicJQgwdFBlEgTJQng0WLDxNRIHCDn6IJHsiAAVPhWTxCBTp0eNUoHbxCAmLEeOmoQLAXyAoxsCLHSE5HJKR5BCFAUJgdWqywgfQAFUISL26cQ6IDqQNIIDiSqNUJCAAFDdyI8Thq0I2ugx4UPQlgQidabA4LFSDxM67du3jz6qUUCAAh+QQABQAMACwAAAAAIAAgAAAH/4AAgoOEhYaHiImKi4yNjo+QkZKECkBAApOJQCgoD5mDBQWDBJwcggUDUwSQHTc3QoKkKEGCTzMODjSPOJwvHQBCAwMUAEErDkVVLo8TnCgLggIggiwWRUd1kCAcKC/EhVJVeRcKkQUu34UCNwPln4kFQg8Pv4oUBAQTixN5NW1iDVYlkoVCV6IfZLp0iRAhhyKCBhEVaUKR4h17BG7oU/TgjpiPOWi9o6TAXaNz9dRt2ZLSUYEg3ZYVysPjyoaIjUg42wgCEwAjVs7YMQDpQS9dJF7c+FXESlAv2jKSiMUJCAAFErBwMWVu0I2qgxZMe9cMBayRhAqQkIm2rdu3cATjNgoEACH5BAAFAA0ALAAAAAAgACAAAAf/gACCg4SFhoeIiYqLjI2Oj5CRkoQKQDgCk4k4KCgPmYMFBYMEnByDJBwUkB03N0KCpChBgkAsBiGQE5wvHQBCAwOqJCEydWyYjg+cKAuCAiCCHMUzuI8CHCgvqoU4dR8J0JAFLtuGOEHhn4gFNCQkyIkUBAQTiwtEBx4mSECKsSg0FH3YsKaNQST+lgVM5GDMmDAObSiSd6OeIhJHvnyZYwOHukIKFKRjNK6XIQpvLph8VCBINheGjrjBMufVIxLLLIIIKIALDzQ+6Ch4pCxbQBIvvrABgIQHjytYTjwCQeAGCVgoPJApoOBLmadeIokSdAMFka0AaHjAomTAJ10XFIiA4nD1UwESC0Z+3Mu3r9+/kAIBACH5BAAFAA4ALAAAAAAgACAAAAf/gACCg4SFhoeIiYqLjI2Oj5CRkoQCEwsFk4k4KCgLmYOYgwScHIMULpEdBDdCgqMoQYITLyg4kBOcLx0AQgMDFLycLS+QC5ydggIgsigtakCQBRwoL8CFQi1TKKGPBS7WhkKXn4unHdyIFAQEE4tCK0VONh+tia8oNIoxBw0VFR5bFN3Ll+jCl4MHYyhSd6OdIiFEJNy54wAVOUIgMnZzscuQixVsOnYLQs0iIRsZNDQw2YjEMYdPSinggkUFngMiGT3IlQ+ICjQBq/jAggGPl0cgVpEQ9ELFjjEFQHgYimGEgGiDWvjYQQaTEAg+Uvz49OKKjiKm2IT8ROFIlZwXCOPKnUu3LqRAACH5BAAFAA8ALAAAAAAgACAAAAf/gACCg4SFhoeIiYqLjI2Oj5CRkoQFJCSTijgoKAuYiASbHIMdHZEKHARCgqAoQYITLy+Xjw+bL6VCAwMUAEKbrZALv50AAiCvv6qPBRwoL7yFvig4kgUu0IYUNJ6MChTHixQEBBOLHVMrHytSi6wo24ksVUVISD/wn7/4h1MM/gw2XCgSd6PcwDdIbBBhx62QAAUClrkoZYhGDBkKIhUI4kxgoR9NIiDYx4jEr3ICWrgCIUYDFCp5KDaq5WxbDjlYDABwIEJDEiorHoEgcOMSBRU64BgpAEJCzyQmCkCSCoAEjKRhpLrwICKKBU9tkv4YRMEARk8TjvyQ2bCt27dwBONGCgQAIfkEAAUAEAAsAAAAACAAIAAAB/+AAIKDhIWGh4iJiouMjY6PkJGShAUkJJOKEygoC5iIBJscgyAgkQocBEKCoChBgg8vAzSQD5svHQBCAzcUuZsoOJALv50AAgKCmpuqjwUcKC+9hUKbwZEFLtKGFLOeiwIgBYwUBAQT3y9qCSzMiawo3Yg3dUMXFyeL7/GHUhb+FgYWUeBw45yiDgZmvIlxyVshAeKaucBliIYMNaUgFQgCzYUhL2PaVNHWiMSvcwKeAAEA4ksELnGqKHhUC9osBDxE4PtAJQKYODEegSBw4xIFPFbKbCgAIo8SnzkiOoooBEPSNuJo3KHS5Y2nEVZ4lBjUIc2UmZgm2HCA1qHbt3AF48qVFAgAIfkEAAUAEQAsAAAAACAAIAAAB/+AAIKDhIWGh4iJiouMjY6PkJGShAUkQpOKDygoC5iIBJscgyAFkQocBJcAoChBgg8vNx2Qmigvs0IDNxQAQpsoD5ALv50AAgKCE7+qjgUctryFQi8oOJIFLtGGHTSejAWljBQEBBOLBUADA0DIiqwo3YkPTy1padbuv/GIQTL+Mq4UUeBww5wiEC1OnJACwpshcJCwzdrG4knDiEFQSAlh6AIEDx8mOnKx6cgcYyFQGDvQpgadDxcbaXqDxQsAJz7wGAAwJE6bEXMSPALxQgwDARSS2IFhwliVMD9/QBJQDAcWOz7aIKPgxEibGJgWqMCqVZCCjTEjUVBix80dh4UQLuChkgZuoQck7Ordy5dQIAAh+QQABQASACwAAAAAIAAgAAAH/4AAgoOEhYaHiImKi4yNjo+QkZKEBSQuk4oPKCgkmIgEmxyDAgWRChwEQoKgKEGCDwMEIJCaKC8dAEIDNxS5mygLkAu/wQCkghO/qo8FHLa9hUIvKDiSBS7Qhh00noyljRQEBBOLBUC71YusKNyJw7/Zn7/tiO+b8YcUHDfkigVBLwak60bwWhABhkCguIEQUrMiWH4YksHAxhYFkIQgMLMDgrE0L4w5qXDnCJuGjWZY6QFnBoAiGZQkAGBgDsk8LR6lyeAmj4AOS1LguWPMyxwPEthAIvFAEAkmKUR8KdXBgok7UjA9jVrjm4AbrjC5aJIigwmChTxEfYOW0IISbwgwtp1Lt66gQAAh+QQABQATACwAAAAAIAAgAAAH/4AAgoOEhYaHiImKi4yNjo+QkZKEBUIuk4oPKCgkmIgEmxyDBZIKHARCgqAoQYIPAxwCkJooLx0AQgM3FLibKKmPC74LggKkABO+vI8FHLXLhEIvKDiSBS7QhR00nozHjBQEBBOLBUC6xIurKNyJwpu26r7tiEK+8YoUHDfkigU4BDgA60YQSAkZsgoJCILjm6MJSXrIKWEohIMVaRI6qrJDB5w5AAQ8uSFoho0SH1pAMqEjS5kVAIg0GcMCgBoENoh8ePCohYYUTgR0GBNliRMABergJAIEkpB0QpZEoXKAFIgtPwyAwBQ1ipIK3255okHG6x2Che54rYOWEIkPdQi2tp1Lt66gQAAh+QQABQAUACwAAAAAIAAgAAAH/4AAgoOEhYaHiImKi4yNjo+QkZKEBUIuk4oPKCgkmIgEmxyDBZIKHARCgqAoQYILN0ECkJooLx0AQgM3FLibKKmPC74LggKkABO+vI8FHLXLhEIvKDiSBS7QhR00nozHjBQEBBOLBUC6nYurKNyJwpsDsorr7YhCvvGLFBw35IoFOAhwqNetGw4HJ+QVInEp0gQlWXhYMHRDBosg3xodgSOnTAUABV60AnBixZYpIx15kGPGzRAAXrjUeAJAioUVbNSAePQECp4iAhSs6WKkBMgpXlac2PlICDEALsJ0iXOElIAXCaphchGnS5g8GbvREOPVRsFCR7waOBvtggGmbAbjyp0LIBAAIfkEAAUAFQAsAAAAACAAIAAAB/+AAIKDhIWGh4iJiouMjY6PkJGShAVCLpOKDygoJJiIBJscgwWSChwEQoKgKEGCCzdApI+aKC8dAEIDNxS4myi8jwu+C4ICshO+wI4FHLXKg0IvKDiSBS7PhB00noyyjBQEBBOLBUC6qYurKNuJJL433ogDagkxnYlC7/GHLWFNJrcSFcBBIAi7RR2E7ONGCAeRISAOubgUKUgXM24cGKIV6xGJMGWu+JAAoAABagBQhJCC4sEjByHdqFgB4EINCQMABDmxksAjCXbcpMgjQIGJNSZopuQpypGUCFGK3KJRYw0djSWBAFEAycU4QTQgrJlDhCEhCnPWfLFglpADtWoN2g6iIIOFALl48+YNBAAh+QQABQAWACwAAAAAIAAgAAAH/4AAgoOEhYaHiImKi4yNjo+QkZKEBUIuk4oPKCgkmIgEmxyDBZIKHARCgqAoQYILN0Ckj5ooLx0AQgM3FLibKLyPC74LggKyE77AjgUctcqDQi8oOJIFLs+EHTSejLKMuTcTiwVAupeKQmBKNRI3iiS+BIskKT09Ox/o8YwXTCk12AoVwEEgSMBDHVx442ZogoUYIA65OAcJyBgfKvIVgoci1iMhbXykEJEHADliAIAMe+QExkgodQBskVClFUcUohqB4JIiQxQHBUAwaODkhKAJ0h48YpBBg5OIFCQ0yBNTEAWKjSjIOKHA6p0GCIYwJAQiD9gtYwkZOOAkZ1qTHAeovZ1Ll24gACH5BAAFABcALAAAAAAgACAAAAf/gACCg4SFhoeIiYqLjI2Oj5CRkoQFQi6Tig8oKCSYiASbHJ4ACkEEQoKgKEGCJARABZCaKC8dAEIDNxS3myi7jwu9C4ICsQATvb+OBRy0yoNCLyg4kgUuz4QdNJFCqI3GjCsYMGudiQVAuduKQhg772+KJL0EiyQZWVlwM+y9ootDmoiYg61QARwEghQ8pMAFuFGGHswwAOIQhYWLcLQRAeWCIRLSYD0SAgEPEypVWl0CAETYoyomlXAxAEDNjyHDhPQC4ghEGyZNuswoIIBIkRlSBD148cJbIydNIhCpSMNGkQ8sBnVQAKnDFDVcAXQoUsSLGoiEBHwoYgEFWkI4DS4kWPdW0MO6ePPWDQQAIfkEAAUAGAAsAAAAACAAIAAAB/+AAIKDhIWGh4iJiouMjY6PkJGShAVCLpOKDygoJJiIBJscngAKQQRCgqAoQYIkBEAFkJooLx0AQgM3FLebKLuPC70LggKxABO9v44FHLTKg0IvKDiSBS7PhB00kS6ojcaMQyIYI52JBUADBNiGQnhWcHAXiiS9oopCUWZmZW/49oxidEnigR0lHASCGDSkgAa4UYYWXEgg4BCFhYomzFHChY0hEtKAQHJRgQqZOF4E0VAgCEgvb40cLCETZoQaAFJipNklpNcERyDm0FwTo4CAIUPUUAPw4MUAjIaIhGnzpmKHGUOm3CMFAlKHEC2MgbgwJMFWiIJYDDkxDO0gBTcKfrqdS7euXUOBAAAh+QQABQAZACwAAAAAIAAgAAAH/4AAgoOEhYaHiImKi4yNjo+QkZKEBUIuk4oPKCgkmIgEmxyeAApBBEKCoChBgiQEQAWQMi0oLx0AQgM3FLibKLyPORC0C4ICsQATvsCOQFBfT8yDQi8oOJI4DsWHHTSPBS4kQgKNyIokXxoZIhuoiQVAAwS3iV52djw8ZQ7nvqKJM9wIFOhFkRBfrBKRoNMEypIGl97heKVgUSUSEUchIsEmBDlDFKQ5WnAgTo0EhkhUAwKJBoI4G+jUEaQAhCAgvtw1emNkwxwJTwAEeTLg1sFN2xgJkLDhS4UTAAqwoMUSwAN5FR3NcMqGnAA1tP4BOAZJgZQXyAqkoaqxEJAnLw1EtqWQta3du3jzKgoEACH5BAAFABoALAAAAAAgACAAAAf/gACCg4SFhoeIiYqLjI2Oj5CRkoQFQi6Tig8oKCSYgx0FgwSbHJ4AaU0/QoKjKEGCJARAoY9zPSkGHQBCAzcUu5sov48SOz1GD4ICtBPBw444STtlT4ZCLyg4kjg/bLSFHTSPBTSWAo3fiSwbTUxJX52JBUADBLqIIEZY+zAwSIokgr3CtyGDQYMOFAkJBkRRiw1kyIxhEA9RARyyQCwCIUSIOFOJXCR4km4QhWePSDiZc6eFIRLYGj6iUIXOgTwJBIHQCABHsI+N2Jg4gODHDQAwB+hauGnBIyIHGCBxCaCVzAX1eDZSk6eImlAFbmwaCKBASUYTkonapA0kIV4EDRS4LWR2rt27ePMeCgQAIfkEAAUAGwAsAAAAACAAIAAAB/+AAIKDhIWGh4iJiouMjY6PkJGShAVCLpOKDygoJJiDFEKDBJscngAtTSlFgqMoQYIkBEAFkB5ZOlYGAEIDNxS7myi/jwxwWjsSggK0ABPBw444VHBnF4ZCLyg4khMlW8yFHTSPBTRCNOCK6Yhpc2RLER6hiQVAAwQdiSA1UVEaGniIKCIR7BUiAXSaKFQ4Q5GQYEAUSTHRps0IG/MQFcAhC8QiEC5cQDN1iEaaG+sEURjpyIWFPD9uGCKRLeIjEG+OVPmAQhAIjwBwBBvnCIWTKl5iPABAc0C+h5s6Fa1i4cIAVptsLrgHtJGCE2xkAihwY5PBsSkZCSDEYdMCkoUOKHDg0BWu3bt48+pdFAgAIfkEAAUAHAAsAAAAACAAIAAAB/+AAIKDhIWGh4iJiouMjY6PkJGShAVCLpOKDygoJJiDNEKDBJscngAtUBlVgqMoQYIkBEAFkAdmVmUyAEIDNxS7myi/j0c8Z1Y5ggK0ABPBw44TZDx2dYZCLyg4khNeMsyFHTSPBRQuNOCK6YhSB2JhcTnjiQVAAwQKiQIVXV0RS0suKCIRDIi+O2MSJhyiSEhBRQMYmDDRwME8RAVwyAKxSAAFGh1MKerwwuAhCtAeUYjhhc0DQySymXx04kOdKdsAgOAIAMezRyRW1DnxZFzMASEdbrrkyAUbGWleAmhlcsGNIAIg2esEoMCNTa8ErZsUZNMCkYUUBJkwFq3bt3AF48pFFAgAIfkEAAUAHQAsAAAAACAAIAAAB/+AAIKDhIWGh4iJiouMjY6PkJGShA8XLpOECxOEX01SJJgAU0l4JYIUKkpSHKEVblduRAAUGWQoQYIkBEAFj04wbnZoBgBObTcUAEIozMmOD2EwaDwVghO9ABPMKM6ON9E+FoZCLyg4kg8fFwKHHTSQ7hTYi/OJL0dzEBBO74kFQAMIKEgkIM+aNm3EGGGjiMQ2IP6QfJk4kViiZcwgJuJQBQECJxe6HSqAYxeIRQI6UBgYSpECHEIQURDpCESIBE8uFSJRTuOjF1OeoNgEAMRJADi20XQZQuiLdzwHdFC2TWejAgNQvAAFgEBGQQtu4KjHSMECqzeY4RJEdhIQZgsPWhoSMOGa3Lt48+rdiykQACH5BAAFAB4ALAAAAAAgACAAAAf/gACCg4SFhoeIiYqLjI2Oj5CRkoQLRTMKk4JCFyGEdDs6R5kCBxgiFoIUeDs9Jpk0XBkpKg4AFBqsRIIkBEAFjwwaGVgYMgA2PFgoAEIozhSPExsaKjASggQPghPOKNCPHCMaIjOGQi8oOJIkKzEChx00kAoUHb+M94pCFjkSEiXfEBUAMoAApkRDGlTw4MFEAkUkugFRFIOBRYss9ElU5IKNAwcfTnRQVABHLxCMFChAmWmRABcjD1EI+KgABxQvXBgigW4iJG7OJggCwRJHN5qMCDh7IY/ngJHNnkECgpMENmc+F9xQB6mAi4MAbjgLMihfS6MorLY0JOCB2rVwB+PKnUtXbiAAOwAAAAAAAAAAAA==\") #000 50% no-repeat}.ui-lightbox-caption{display:none;padding:.2em .4em}.ui-lightbox-caption-text{float:left;margin:.3em 0 .1em}.ui-lightbox-close{float:right;margin:0;padding:.125em}.ui-lightbox-close.ui-state-hover{padding:0}.ui-lightbox-nav-left,.ui-lightbox-nav-right{opacity:.5}.ui-lightbox-nav-left:hover,.ui-lightbox-nav-right:hover{opacity:1}", ".p-dialog-mask{-ms-flex-align:center;-ms-flex-pack:center;align-items:center;background-color:rgba(0,0,0,0);display:-ms-flexbox;display:flex;height:100%;justify-content:center;left:0;pointer-events:none;position:fixed;top:0;transition-property:background-color;width:100%}.p-dialog,.p-dialog-mask.p-component-overlay{pointer-events:auto}.p-dialog{-ms-flex-direction:column;-ms-transform:scale(1);display:-ms-flexbox;display:flex;flex-direction:column;max-height:90%;position:relative;transform:scale(1)}.p-dialog-content{overflow-y:auto}.p-dialog-header{-ms-flex-align:center;-ms-flex-pack:justify;align-items:center;display:-ms-flexbox;display:flex;justify-content:space-between}.p-dialog-footer,.p-dialog-header{-ms-flex-negative:0;flex-shrink:0}.p-dialog .p-dialog-header-icon,.p-dialog .p-dialog-header-icons{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex}.p-dialog .p-dialog-header-icon{-ms-flex-pack:center;justify-content:center;overflow:hidden;position:relative}.p-dialog-mask.p-dialog-mask-leave{background-color:rgba(0,0,0,0)}.p-fluid .p-dialog-footer .p-button{width:auto}.p-dialog-bottom-left .p-dialog,.p-dialog-bottom-right .p-dialog,.p-dialog-bottom .p-dialog,.p-dialog-left .p-dialog,.p-dialog-right .p-dialog,.p-dialog-top-left .p-dialog,.p-dialog-top-right .p-dialog,.p-dialog-top .p-dialog{margin:.75rem;transform:translateZ(0)}.p-dialog-maximized{-ms-transform:none;height:100%;max-height:100%;transform:none;transition:none;width:100vw!important}.p-dialog-maximized .p-dialog-content{-ms-flex-positive:1;flex-grow:1}.p-dialog-left{-ms-flex-pack:start;justify-content:flex-start}.p-dialog-right{-ms-flex-pack:end;justify-content:flex-end}.p-dialog-top,.p-dialog-top-left{-ms-flex-align:start;align-items:flex-start}.p-dialog-top-left{-ms-flex-pack:start;justify-content:flex-start}.p-dialog-top-right{-ms-flex-align:start;-ms-flex-pack:end;align-items:flex-start;justify-content:flex-end}.p-dialog-bottom,.p-dialog-bottom-left{-ms-flex-align:end;align-items:flex-end}.p-dialog-bottom-left{-ms-flex-pack:start;justify-content:flex-start}.p-dialog-bottom-right{-ms-flex-align:end;-ms-flex-pack:end;align-items:flex-end;justify-content:flex-end}.p-dialog .p-resizable-handle{bottom:1px;cursor:se-resize;display:block;font-size:.1px;height:12px;position:absolute;right:1px;width:12px}.p-confirm-dialog .p-dialog-content{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex}"]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc0.Renderer2 }, { type: ɵngcc0.ChangeDetectorRef }]; }, { type: [{
            type: Input
        }], effectDuration: [{
            type: Input
        }], autoZIndex: [{
            type: Input
        }], baseZIndex: [{
            type: Input
        }], closeOnEscape: [{
            type: Input
        }], images: [{
            type: Input
        }], style: [{
            type: Input
        }], styleClass: [{
            type: Input
        }], appendTo: [{
            type: Input
        }], easing: [{
            type: Input
        }] }); })();
class LightboxModule {
}
LightboxModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: LightboxModule });
LightboxModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function LightboxModule_Factory(t) { return new (t || LightboxModule)(); }, imports: [[CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(LightboxModule, { declarations: function () { return [Lightbox]; }, imports: function () { return [CommonModule]; }, exports: function () { return [Lightbox]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(LightboxModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                exports: [Lightbox],
                declarations: [Lightbox]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { Lightbox, LightboxModule };

//# sourceMappingURL=primeng-lightbox.js.map