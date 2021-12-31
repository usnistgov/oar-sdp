var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, Input, Renderer2, AfterViewInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
var Lightbox = /** @class */ (function () {
    function Lightbox(el, renderer, cd) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.type = 'image';
        this.effectDuration = '500ms';
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.closeOnEscape = true;
    }
    Lightbox.prototype.onImageClick = function (event, image, i, content) {
        this.index = i;
        this.loading = true;
        content.style.width = 32 + 'px';
        content.style.height = 32 + 'px';
        this.preventDocumentClickListener = true;
        this.show();
        this.displayImage(image);
        event.preventDefault();
    };
    Lightbox.prototype.ngAfterViewInit = function () {
        this.panel = DomHandler.findSingle(this.el.nativeElement, '.ui-lightbox ');
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.panel);
            else
                DomHandler.appendChild(this.panel, this.appendTo);
        }
    };
    Lightbox.prototype.onLinkClick = function (event, content) {
        this.preventDocumentClickListener = true;
        this.show();
        event.preventDefault();
    };
    Lightbox.prototype.displayImage = function (image) {
        var _this = this;
        setTimeout(function () {
            _this.cd.markForCheck();
            _this.currentImage = image;
            _this.captionText = image.title;
            _this.center();
        }, 1000);
    };
    Lightbox.prototype.show = function () {
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
    };
    Lightbox.prototype.hide = function (event) {
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
    };
    Lightbox.prototype.center = function () {
        var elementWidth = DomHandler.getOuterWidth(this.panel);
        var elementHeight = DomHandler.getOuterHeight(this.panel);
        if (elementWidth == 0 && elementHeight == 0) {
            this.panel.style.visibility = 'hidden';
            this.panel.style.display = 'block';
            elementWidth = DomHandler.getOuterWidth(this.panel);
            elementHeight = DomHandler.getOuterHeight(this.panel);
            this.panel.style.display = 'none';
            this.panel.style.visibility = 'visible';
        }
    };
    Lightbox.prototype.onImageLoad = function (event, content) {
        var _this = this;
        var image = event.target;
        image.style.visibility = 'hidden';
        image.style.display = 'block';
        var imageWidth = DomHandler.getOuterWidth(image);
        var imageHeight = DomHandler.getOuterHeight(image);
        image.style.display = 'none';
        image.style.visibility = 'visible';
        content.style.width = imageWidth + 'px';
        content.style.height = imageHeight + 'px';
        this.panel.style.left = parseInt(this.panel.style.left) + (DomHandler.getOuterWidth(this.panel) - imageWidth) / 2 + 'px';
        this.panel.style.top = parseInt(this.panel.style.top) + (DomHandler.getOuterHeight(this.panel) - imageHeight) / 2 + 'px';
        setTimeout(function () {
            _this.cd.markForCheck();
            DomHandler.fadeIn(image, 500);
            image.style.display = 'block';
            //this.captionText = this.currentImage.title;
            _this.loading = false;
        }, parseInt(this.effectDuration));
    };
    Lightbox.prototype.prev = function (placeholder) {
        this.captionText = null;
        this.loading = true;
        placeholder.style.display = 'none';
        if (this.index > 0) {
            this.displayImage(this.images[--this.index]);
        }
    };
    Lightbox.prototype.next = function (placeholder) {
        this.captionText = null;
        this.loading = true;
        placeholder.style.display = 'none';
        if (this.index <= (this.images.length - 1)) {
            this.displayImage(this.images[++this.index]);
        }
    };
    Lightbox.prototype.bindGlobalListeners = function () {
        var _this = this;
        this.documentClickListener = this.renderer.listen('document', 'click', function (event) {
            if (!_this.preventDocumentClickListener && _this.visible) {
                _this.hide(event);
            }
            _this.preventDocumentClickListener = false;
            _this.cd.markForCheck();
        });
        if (this.closeOnEscape && !this.documentEscapeListener) {
            this.documentEscapeListener = this.renderer.listen('document', 'keydown', function (event) {
                if (event.which == 27) {
                    if (parseInt(_this.panel.style.zIndex) === (DomHandler.zindex + _this.baseZIndex)) {
                        _this.hide(event);
                    }
                }
            });
        }
    };
    Lightbox.prototype.unbindGlobalListeners = function () {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    Object.defineProperty(Lightbox.prototype, "leftVisible", {
        get: function () {
            return this.images && this.images.length && this.index != 0 && !this.loading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Lightbox.prototype, "rightVisible", {
        get: function () {
            return this.images && this.images.length && this.index < (this.images.length - 1) && !this.loading;
        },
        enumerable: true,
        configurable: true
    });
    Lightbox.prototype.ngOnDestroy = function () {
        this.unbindGlobalListeners();
        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.panel);
        }
    };
    Lightbox.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], Lightbox.prototype, "images", void 0);
    __decorate([
        Input()
    ], Lightbox.prototype, "type", void 0);
    __decorate([
        Input()
    ], Lightbox.prototype, "style", void 0);
    __decorate([
        Input()
    ], Lightbox.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Lightbox.prototype, "appendTo", void 0);
    __decorate([
        Input()
    ], Lightbox.prototype, "easing", void 0);
    __decorate([
        Input()
    ], Lightbox.prototype, "effectDuration", void 0);
    __decorate([
        Input()
    ], Lightbox.prototype, "autoZIndex", void 0);
    __decorate([
        Input()
    ], Lightbox.prototype, "baseZIndex", void 0);
    __decorate([
        Input()
    ], Lightbox.prototype, "closeOnEscape", void 0);
    Lightbox = __decorate([
        Component({
            selector: 'p-lightbox',
            template: "\n        <div [ngStyle]=\"style\" [class]=\"styleClass\" *ngIf=\"(type == 'image')\">\n            <a *ngFor=\"let image of images; let i = index;\" [href]=\"image.source\" (click)=\"onImageClick($event,image,i,content)\">\n                <img [src]=\"image.thumbnail\" [title]=\"image.title\" [alt]=\"image.alt\">\n            </a>\n        </div>\n        <span [ngStyle]=\"style\" [class]=\"styleClass\" *ngIf=\"(type == 'content')\" (click)=\"onLinkClick($event,content)\">\n            <ng-content select=\"a\"></ng-content>\n        </span>\n        <div class=\"ui-lightbox ui-widget ui-corner-all ui-shadow\" [style.display]=\"visible ? 'block' : 'none'\" [style.zIndex]=\"zindex\"\n            [ngClass]=\"{'ui-lightbox-loading': loading}\"\n            [style.transitionProperty]=\"'all'\" [style.transitionDuration]=\"effectDuration\" [style.transitionTimingFunction]=\"easing\" (click)=\"preventDocumentClickListener=true\">\n           <div class=\"ui-lightbox-content-wrapper\">\n              <a class=\"ui-state-default ui-lightbox-nav-left ui-corner-right\" [style.zIndex]=\"zindex + 1\" (click)=\"prev(img)\"\n                [ngClass]=\"{'ui-helper-hidden':!leftVisible}\"><span class=\"ui-lightbox-nav-icon pi pi-chevron-left\"></span></a>\n              <div #content class=\"ui-lightbox-content ui-corner-all\" \n                [style.transitionProperty]=\"'width,height'\" [style.transitionDuration]=\"effectDuration\" [style.transitionTimingFunction]=\"easing\">\n                <img #img [src]=\"currentImage ? currentImage.source||'' : ''\" (load)=\"onImageLoad($event,content)\" style=\"display:none\">\n                <ng-content></ng-content>\n              </div>\n              <a class=\"ui-state-default ui-lightbox-nav-right ui-corner-left ui-helper-hidden\" [style.zIndex]=\"zindex + 1\" (click)=\"next(img)\"\n                [ngClass]=\"{'ui-helper-hidden':!rightVisible}\"><span class=\"ui-lightbox-nav-icon pi pi-chevron-right\"></span></a>\n           </div>\n           <div class=\"ui-lightbox-caption ui-widget-header\" [style.display]=\"captionText ? 'block' : 'none'\">\n              <span class=\"ui-lightbox-caption-text\">{{captionText}}</span><a class=\"ui-lightbox-close ui-corner-all\" tabindex=\"0\" (click)=\"hide($event)\" (keydown.enter)=\"hide($event)\"><span class=\"pi pi-times\"></span></a>\n              <div style=\"clear:both\"></div>\n           </div>\n        </div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], Lightbox);
    return Lightbox;
}());
export { Lightbox };
var LightboxModule = /** @class */ (function () {
    function LightboxModule() {
    }
    LightboxModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Lightbox],
            declarations: [Lightbox]
        })
    ], LightboxModule);
    return LightboxModule;
}());
export { LightboxModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2xpZ2h0Ym94LyIsInNvdXJjZXMiOlsibGlnaHRib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsYUFBYSxFQUFDLFNBQVMsRUFBQyxpQkFBaUIsRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5SSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQW1DdkM7SUE0Q0ksa0JBQW1CLEVBQWMsRUFBUyxRQUFtQixFQUFTLEVBQXFCO1FBQXhFLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVMsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUF4Q2xGLFNBQUksR0FBVyxPQUFPLENBQUM7UUFVdkIsbUJBQWMsR0FBUSxPQUFPLENBQUM7UUFFOUIsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUzQixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBRXZCLGtCQUFhLEdBQVksSUFBSSxDQUFDO0lBd0J1RCxDQUFDO0lBRS9GLCtCQUFZLEdBQVosVUFBYSxLQUFLLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxPQUFPO1FBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNoQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLENBQUM7UUFDekMsSUFBSSxDQUFDLElB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Q0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDakQ7SUFDTCxDQUFDOztnQkF2S3NCLFVBQVU7Z0JBQW1CLFNBQVM7Z0JBQWEsaUJBQWlCOztJQTFDbEY7UUFBUixLQUFLLEVBQUU7NENBQWU7SUFFZDtRQUFSLEtBQUssRUFBRTswQ0FBd0I7SUFFdkI7UUFBUixLQUFLLEVBQUU7MkNBQVk7SUFFWDtRQUFSLEtBQUssRUFBRTtnREFBb0I7SUFFbkI7UUFBUixLQUFLLEVBQUU7OENBQWU7SUFFZDtRQUFSLEtBQUssRUFBRTs0Q0FBb0I7SUFFbkI7UUFBUixLQUFLLEVBQUU7b0RBQStCO0lBRTlCO1FBQVIsS0FBSyxFQUFFO2dEQUE0QjtJQUUzQjtRQUFSLEtBQUssRUFBRTtnREFBd0I7SUFFdkI7UUFBUixLQUFLLEVBQUU7bURBQStCO0lBcEI5QixRQUFRO1FBakNwQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsODRFQTRCVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO1NBQ25ELENBQUM7T0FDVyxRQUFRLENBcU5wQjtJQUFELGVBQUM7Q0FBQSxBQXJORCxJQXFOQztTQXJOWSxRQUFRO0FBNE5yQjtJQUFBO0lBQThCLENBQUM7SUFBbEIsY0FBYztRQUwxQixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ25CLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQztTQUMzQixDQUFDO09BQ1csY0FBYyxDQUFJO0lBQUQscUJBQUM7Q0FBQSxBQUEvQixJQUErQjtTQUFsQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsRWxlbWVudFJlZixJbnB1dCxSZW5kZXJlcjIsQWZ0ZXJWaWV3SW5pdCxPbkRlc3Ryb3ksQ2hhbmdlRGV0ZWN0b3JSZWYsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWxpZ2h0Ym94JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiAqbmdJZj1cIih0eXBlID09ICdpbWFnZScpXCI+XG4gICAgICAgICAgICA8YSAqbmdGb3I9XCJsZXQgaW1hZ2Ugb2YgaW1hZ2VzOyBsZXQgaSA9IGluZGV4O1wiIFtocmVmXT1cImltYWdlLnNvdXJjZVwiIChjbGljayk9XCJvbkltYWdlQ2xpY2soJGV2ZW50LGltYWdlLGksY29udGVudClcIj5cbiAgICAgICAgICAgICAgICA8aW1nIFtzcmNdPVwiaW1hZ2UudGh1bWJuYWlsXCIgW3RpdGxlXT1cImltYWdlLnRpdGxlXCIgW2FsdF09XCJpbWFnZS5hbHRcIj5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxzcGFuIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiAqbmdJZj1cIih0eXBlID09ICdjb250ZW50JylcIiAoY2xpY2spPVwib25MaW5rQ2xpY2soJGV2ZW50LGNvbnRlbnQpXCI+XG4gICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJhXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1saWdodGJveCB1aS13aWRnZXQgdWktY29ybmVyLWFsbCB1aS1zaGFkb3dcIiBbc3R5bGUuZGlzcGxheV09XCJ2aXNpYmxlID8gJ2Jsb2NrJyA6ICdub25lJ1wiIFtzdHlsZS56SW5kZXhdPVwiemluZGV4XCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktbGlnaHRib3gtbG9hZGluZyc6IGxvYWRpbmd9XCJcbiAgICAgICAgICAgIFtzdHlsZS50cmFuc2l0aW9uUHJvcGVydHldPVwiJ2FsbCdcIiBbc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uXT1cImVmZmVjdER1cmF0aW9uXCIgW3N0eWxlLnRyYW5zaXRpb25UaW1pbmdGdW5jdGlvbl09XCJlYXNpbmdcIiAoY2xpY2spPVwicHJldmVudERvY3VtZW50Q2xpY2tMaXN0ZW5lcj10cnVlXCI+XG4gICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1saWdodGJveC1jb250ZW50LXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgPGEgY2xhc3M9XCJ1aS1zdGF0ZS1kZWZhdWx0IHVpLWxpZ2h0Ym94LW5hdi1sZWZ0IHVpLWNvcm5lci1yaWdodFwiIFtzdHlsZS56SW5kZXhdPVwiemluZGV4ICsgMVwiIChjbGljayk9XCJwcmV2KGltZylcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktaGVscGVyLWhpZGRlbic6IWxlZnRWaXNpYmxlfVwiPjxzcGFuIGNsYXNzPVwidWktbGlnaHRib3gtbmF2LWljb24gcGkgcGktY2hldnJvbi1sZWZ0XCI+PC9zcGFuPjwvYT5cbiAgICAgICAgICAgICAgPGRpdiAjY29udGVudCBjbGFzcz1cInVpLWxpZ2h0Ym94LWNvbnRlbnQgdWktY29ybmVyLWFsbFwiIFxuICAgICAgICAgICAgICAgIFtzdHlsZS50cmFuc2l0aW9uUHJvcGVydHldPVwiJ3dpZHRoLGhlaWdodCdcIiBbc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uXT1cImVmZmVjdER1cmF0aW9uXCIgW3N0eWxlLnRyYW5zaXRpb25UaW1pbmdGdW5jdGlvbl09XCJlYXNpbmdcIj5cbiAgICAgICAgICAgICAgICA8aW1nICNpbWcgW3NyY109XCJjdXJyZW50SW1hZ2UgPyBjdXJyZW50SW1hZ2Uuc291cmNlfHwnJyA6ICcnXCIgKGxvYWQpPVwib25JbWFnZUxvYWQoJGV2ZW50LGNvbnRlbnQpXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8YSBjbGFzcz1cInVpLXN0YXRlLWRlZmF1bHQgdWktbGlnaHRib3gtbmF2LXJpZ2h0IHVpLWNvcm5lci1sZWZ0IHVpLWhlbHBlci1oaWRkZW5cIiBbc3R5bGUuekluZGV4XT1cInppbmRleCArIDFcIiAoY2xpY2spPVwibmV4dChpbWcpXCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLWhlbHBlci1oaWRkZW4nOiFyaWdodFZpc2libGV9XCI+PHNwYW4gY2xhc3M9XCJ1aS1saWdodGJveC1uYXYtaWNvbiBwaSBwaS1jaGV2cm9uLXJpZ2h0XCI+PC9zcGFuPjwvYT5cbiAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1saWdodGJveC1jYXB0aW9uIHVpLXdpZGdldC1oZWFkZXJcIiBbc3R5bGUuZGlzcGxheV09XCJjYXB0aW9uVGV4dCA/ICdibG9jaycgOiAnbm9uZSdcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1saWdodGJveC1jYXB0aW9uLXRleHRcIj57e2NhcHRpb25UZXh0fX08L3NwYW4+PGEgY2xhc3M9XCJ1aS1saWdodGJveC1jbG9zZSB1aS1jb3JuZXItYWxsXCIgdGFiaW5kZXg9XCIwXCIgKGNsaWNrKT1cImhpZGUoJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cImhpZGUoJGV2ZW50KVwiPjxzcGFuIGNsYXNzPVwicGkgcGktdGltZXNcIj48L3NwYW4+PC9hPlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiY2xlYXI6Ym90aFwiPjwvZGl2PlxuICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcbn0pXG5leHBvcnQgY2xhc3MgTGlnaHRib3ggaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBpbWFnZXM6IGFueVtdO1xuICAgIFxuICAgIEBJbnB1dCgpIHR5cGU6IHN0cmluZyA9ICdpbWFnZSc7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuICAgICAgICBcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgYXBwZW5kVG86IGFueTtcbiAgICBcbiAgICBASW5wdXQoKSBlYXNpbmc6ICdlYXNlLW91dCc7XG4gICAgXG4gICAgQElucHV0KCkgZWZmZWN0RHVyYXRpb246IGFueSA9ICc1MDBtcyc7XG5cbiAgICBASW5wdXQoKSBhdXRvWkluZGV4OiBib29sZWFuID0gdHJ1ZTtcbiAgICBcbiAgICBASW5wdXQoKSBiYXNlWkluZGV4OiBudW1iZXIgPSAwO1xuICAgICAgICAgICAgICAgIFxuICAgIEBJbnB1dCgpIGNsb3NlT25Fc2NhcGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgcHVibGljIHZpc2libGU6IGJvb2xlYW47XG4gICAgXG4gICAgcHVibGljIGxvYWRpbmc6IGJvb2xlYW47XG4gICAgICAgIFxuICAgIHB1YmxpYyBjdXJyZW50SW1hZ2U6IGFueTtcbiAgICBcbiAgICBwdWJsaWMgY2FwdGlvblRleHQ6IHN0cmluZztcbiAgICBcbiAgICBwdWJsaWMgemluZGV4OiBhbnk7XG4gICAgXG4gICAgcHVibGljIHBhbmVsOiBhbnk7XG4gICAgXG4gICAgcHVibGljIGluZGV4OiBudW1iZXI7XG4gICAgXG4gICAgcHVibGljIG1hc2s6IGFueTtcbiAgICBcbiAgICBwdWJsaWMgcHJldmVudERvY3VtZW50Q2xpY2tMaXN0ZW5lcjogYm9vbGVhbjtcbiAgICBcbiAgICBwdWJsaWMgZG9jdW1lbnRDbGlja0xpc3RlbmVyOiBhbnk7XG5cbiAgICBwdWJsaWMgZG9jdW1lbnRFc2NhcGVMaXN0ZW5lcjogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMixwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cbiAgICAgICAgICAgICAgICBcbiAgICBvbkltYWdlQ2xpY2soZXZlbnQsaW1hZ2UsaSxjb250ZW50KSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpO1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICBjb250ZW50LnN0eWxlLndpZHRoID0gMzIgKyAncHgnO1xuICAgICAgICBjb250ZW50LnN0eWxlLmhlaWdodCA9IDMyICsgJ3B4JztcbiAgICAgICAgdGhpcy5wcmV2ZW50RG9jdW1lbnRDbGlja0xpc3RlbmVyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIHRoaXMuZGlzcGxheUltYWdlKGltYWdlKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLnBhbmVsID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJy51aS1saWdodGJveCAnKTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmFwcGVuZFRvKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hcHBlbmRUbyA9PT0gJ2JvZHknKVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5wYW5lbCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hcHBlbmRDaGlsZCh0aGlzLnBhbmVsLCB0aGlzLmFwcGVuZFRvKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvbkxpbmtDbGljayhldmVudCxjb250ZW50KSB7XG4gICAgICAgIHRoaXMucHJldmVudERvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IHRydWU7XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBcbiAgICBkaXNwbGF5SW1hZ2UoaW1hZ2UpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50SW1hZ2UgPSBpbWFnZTtcbiAgICAgICAgICAgIHRoaXMuY2FwdGlvblRleHQgPSBpbWFnZS50aXRsZTtcbiAgICAgICAgICAgIHRoaXMuY2VudGVyKCk7XG4gICAgICAgIH0sIDEwMDApO1xuICAgIH1cbiAgICBcbiAgICBzaG93KCkge1xuICAgICAgICB0aGlzLm1hc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgXG4gICAgICAgIERvbUhhbmRsZXIuYWRkTXVsdGlwbGVDbGFzc2VzKHRoaXMubWFzaywgJ3VpLXdpZGdldC1vdmVybGF5IHVpLWRpYWxvZy1tYXNrJyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5tYXNrKTtcbiAgICAgICAgaWYgKHRoaXMuYXV0b1pJbmRleCkge1xuICAgICAgICAgICAgdGhpcy56aW5kZXggPSB0aGlzLmJhc2VaSW5kZXggKyAoKytEb21IYW5kbGVyLnppbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXNrLnN0eWxlLnpJbmRleCA9IHRoaXMuemluZGV4IC0gMTtcbiAgICAgICAgdGhpcy5jZW50ZXIoKTtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5iaW5kR2xvYmFsTGlzdGVuZXJzKCk7XG4gICAgfVxuICAgIFxuICAgIGhpZGUoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5jYXB0aW9uVGV4dCA9IG51bGw7XG4gICAgICAgIHRoaXMuaW5kZXggPSBudWxsO1xuICAgICAgICB0aGlzLmN1cnJlbnRJbWFnZSA9IG51bGw7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMubWFzaykge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLm1hc2spO1xuICAgICAgICAgICAgdGhpcy5tYXNrID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy51bmJpbmRHbG9iYWxMaXN0ZW5lcnMoKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgXG4gICAgY2VudGVyKCkge1xuICAgICAgICBsZXQgZWxlbWVudFdpZHRoID0gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMucGFuZWwpO1xuICAgICAgICBsZXQgZWxlbWVudEhlaWdodCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5wYW5lbCk7XG4gICAgICAgIGlmIChlbGVtZW50V2lkdGggPT0gMCAmJiBlbGVtZW50SGVpZ2h0ID09IDApIHtcbiAgICAgICAgICAgIHRoaXMucGFuZWwuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgdGhpcy5wYW5lbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIGVsZW1lbnRXaWR0aCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLnBhbmVsKTtcbiAgICAgICAgICAgIGVsZW1lbnRIZWlnaHQgPSBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMucGFuZWwpO1xuICAgICAgICAgICAgdGhpcy5wYW5lbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgdGhpcy5wYW5lbC5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgICB9XG4gICAgfVxuICAgICAgICBcbiAgICBvbkltYWdlTG9hZChldmVudCxjb250ZW50KSB7XG4gICAgICAgIGxldCBpbWFnZSA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgaW1hZ2Uuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICBpbWFnZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgbGV0IGltYWdlV2lkdGggPSBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgoaW1hZ2UpO1xuICAgICAgICBsZXQgaW1hZ2VIZWlnaHQgPSBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KGltYWdlKTtcbiAgICAgICAgaW1hZ2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgaW1hZ2Uuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcblxuICAgICAgICBjb250ZW50LnN0eWxlLndpZHRoID0gaW1hZ2VXaWR0aCArICdweCc7XG4gICAgICAgIGNvbnRlbnQuc3R5bGUuaGVpZ2h0ID0gaW1hZ2VIZWlnaHQgKyAncHgnO1xuICAgICAgICB0aGlzLnBhbmVsLnN0eWxlLmxlZnQgPSBwYXJzZUludCh0aGlzLnBhbmVsLnN0eWxlLmxlZnQpICsgKERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLnBhbmVsKSAtIGltYWdlV2lkdGgpIC8gMiArICdweCc7XG4gICAgICAgIHRoaXMucGFuZWwuc3R5bGUudG9wID0gcGFyc2VJbnQodGhpcy5wYW5lbC5zdHlsZS50b3ApICsgKERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5wYW5lbCkgLSBpbWFnZUhlaWdodCkgLyAyICsgJ3B4JztcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmZhZGVJbihpbWFnZSwgNTAwKTtcbiAgICAgICAgICAgIGltYWdlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgLy90aGlzLmNhcHRpb25UZXh0ID0gdGhpcy5jdXJyZW50SW1hZ2UudGl0bGU7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSwgcGFyc2VJbnQodGhpcy5lZmZlY3REdXJhdGlvbikpO1xuICAgIH1cbiAgICBcbiAgICBwcmV2KHBsYWNlaG9sZGVyOiBhbnkpIHtcbiAgICAgICAgdGhpcy5jYXB0aW9uVGV4dCA9IG51bGw7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHBsYWNlaG9sZGVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGlmICh0aGlzLmluZGV4ID4gMCkge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5SW1hZ2UodGhpcy5pbWFnZXNbLS10aGlzLmluZGV4XSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbmV4dChwbGFjZWhvbGRlcjogYW55KSB7XG4gICAgICAgIHRoaXMuY2FwdGlvblRleHQgPSBudWxsO1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICBwbGFjZWhvbGRlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBpZiAodGhpcy5pbmRleCA8PSAodGhpcy5pbWFnZXMubGVuZ3RoIC0gMSkpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUltYWdlKHRoaXMuaW1hZ2VzWysrdGhpcy5pbmRleF0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZEdsb2JhbExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5wcmV2ZW50RG9jdW1lbnRDbGlja0xpc3RlbmVyJiZ0aGlzLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wcmV2ZW50RG9jdW1lbnRDbGlja0xpc3RlbmVyID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VPbkVzY2FwZSAmJiAhdGhpcy5kb2N1bWVudEVzY2FwZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RXNjYXBlTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT0gMjcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KHRoaXMucGFuZWwuc3R5bGUuekluZGV4KSA9PT0gKERvbUhhbmRsZXIuemluZGV4ICsgdGhpcy5iYXNlWkluZGV4KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kR2xvYmFsTGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudEVzY2FwZUxpc3RlbmVyKXtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRFc2NhcGVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEVzY2FwZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAgICAgXG4gICAgZ2V0IGxlZnRWaXNpYmxlKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlcyAmJiB0aGlzLmltYWdlcy5sZW5ndGggJiYgdGhpcy5pbmRleCAhPSAwICYmICF0aGlzLmxvYWRpbmc7IFxuICAgIH1cbiAgICBcbiAgICBnZXQgcmlnaHRWaXNpYmxlKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlcyAmJiB0aGlzLmltYWdlcy5sZW5ndGggJiYgdGhpcy5pbmRleCA8ICh0aGlzLmltYWdlcy5sZW5ndGggLSAxKSAmJiAhdGhpcy5sb2FkaW5nOyBcbiAgICB9XG4gICAgXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudW5iaW5kR2xvYmFsTGlzdGVuZXJzKCk7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5hcHBlbmRUbykge1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucGFuZWwpO1xuICAgICAgICB9XG4gICAgfVxuICAgICAgICBcbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbTGlnaHRib3hdLFxuICAgIGRlY2xhcmF0aW9uczogW0xpZ2h0Ym94XVxufSlcbmV4cG9ydCBjbGFzcyBMaWdodGJveE1vZHVsZSB7IH1cbiJdfQ==