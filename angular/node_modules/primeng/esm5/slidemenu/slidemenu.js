var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { NgModule, Component, ElementRef, AfterViewChecked, OnDestroy, Input, Renderer2, Inject, forwardRef, ViewChild, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { RouterModule } from '@angular/router';
var SlideMenuSub = /** @class */ (function () {
    function SlideMenuSub(slideMenu) {
        this.backLabel = 'Back';
        this.easing = 'ease-out';
        this.slideMenu = slideMenu;
    }
    SlideMenuSub.prototype.itemClick = function (event, item, listitem) {
        var _this = this;
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        if (!item.url) {
            event.preventDefault();
        }
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
        if (item.items && !this.slideMenu.animating) {
            this.slideMenu.left -= this.slideMenu.menuWidth;
            this.activeItem = listitem;
            this.slideMenu.animating = true;
            setTimeout(function () { return _this.slideMenu.animating = false; }, this.effectDuration);
        }
        if (!item.items && this.slideMenu.popup) {
            this.slideMenu.hide();
        }
    };
    SlideMenuSub.prototype.ngOnDestroy = function () {
        this.activeItem = null;
    };
    SlideMenuSub.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return SlideMenu; }),] }] }
    ]; };
    __decorate([
        Input()
    ], SlideMenuSub.prototype, "item", void 0);
    __decorate([
        Input()
    ], SlideMenuSub.prototype, "root", void 0);
    __decorate([
        Input()
    ], SlideMenuSub.prototype, "backLabel", void 0);
    __decorate([
        Input()
    ], SlideMenuSub.prototype, "menuWidth", void 0);
    __decorate([
        Input()
    ], SlideMenuSub.prototype, "effectDuration", void 0);
    __decorate([
        Input()
    ], SlideMenuSub.prototype, "easing", void 0);
    __decorate([
        Input()
    ], SlideMenuSub.prototype, "index", void 0);
    SlideMenuSub = __decorate([
        Component({
            selector: 'p-slideMenuSub',
            template: "\n        <ul [ngClass]=\"{'ui-slidemenu-rootlist':root, 'ui-submenu-list':!root, 'ui-active-submenu': (-slideMenu.left == (index * menuWidth))}\"\n            [style.width.px]=\"menuWidth\" [style.left.px]=\"root ? slideMenu.left : slideMenu.menuWidth\"\n            [style.transitionProperty]=\"root ? 'left' : 'none'\" [style.transitionDuration]=\"effectDuration + 'ms'\" [style.transitionTimingFunction]=\"easing\">\n            <ng-template ngFor let-child [ngForOf]=\"(root ? item : item.items)\">\n                <li *ngIf=\"child.separator\" class=\"ui-menu-separator ui-widget-content\" [ngClass]=\"{'ui-helper-hidden': child.visible === false}\">\n                <li *ngIf=\"!child.separator\" #listitem [ngClass]=\"{'ui-menuitem ui-widget ui-corner-all':true,'ui-menuitem-active':listitem==activeItem,'ui-helper-hidden': child.visible === false}\"\n                    [class]=\"child.styleClass\" [ngStyle]=\"child.style\">\n                    <a *ngIf=\"!child.routerLink\" [attr.href]=\"child.url\" class=\"ui-menuitem-link ui-corner-all\" [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\"\n                        [ngClass]=\"{'ui-state-disabled':child.disabled}\" [attr.tabindex]=\"child.disabled ? null : '0'\" \n                        (click)=\"itemClick($event, child, listitem)\">\n                        <span class=\"ui-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                        <span class=\"ui-submenu-icon pi pi-fw pi-caret-right\" *ngIf=\"child.items\"></span>\n                    </a>\n                    <a *ngIf=\"child.routerLink\" [routerLink]=\"child.routerLink\" [queryParams]=\"child.queryParams\" [routerLinkActive]=\"'ui-menuitem-link-active'\" \n                        [routerLinkActiveOptions]=\"child.routerLinkActiveOptions||{exact:false}\" [href]=\"child.url\" class=\"ui-menuitem-link ui-corner-all\" \n                        [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\" [attr.tabindex]=\"child.disabled ? null : '0'\" \n                        [ngClass]=\"{'ui-state-disabled':child.disabled}\" \n                        (click)=\"itemClick($event, child, listitem)\"\n                        [fragment]=\"child.fragment\" [queryParamsHandling]=\"child.queryParamsHandling\" [preserveFragment]=\"child.preserveFragment\" [skipLocationChange]=\"child.skipLocationChange\" [replaceUrl]=\"child.replaceUrl\" [state]=\"child.state\">\n                        <span class=\"ui-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                        <span class=\"ui-submenu-icon pi pi-fw pi-caret-right\" *ngIf=\"child.items\"></span>\n                    </a>\n                    <p-slideMenuSub class=\"ui-submenu\" [item]=\"child\" [index]=\"index + 1\" [menuWidth]=\"menuWidth\" *ngIf=\"child.items\"></p-slideMenuSub>\n                </li>\n            </ng-template>\n        </ul>\n    "
        }),
        __param(0, Inject(forwardRef(function () { return SlideMenu; })))
    ], SlideMenuSub);
    return SlideMenuSub;
}());
export { SlideMenuSub };
var SlideMenu = /** @class */ (function () {
    function SlideMenu(el, renderer, cd) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.menuWidth = 190;
        this.viewportHeight = 180;
        this.effectDuration = 250;
        this.easing = 'ease-out';
        this.backLabel = 'Back';
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.showTransitionOptions = '225ms ease-out';
        this.hideTransitionOptions = '195ms ease-in';
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
        this.left = 0;
        this.animating = false;
    }
    SlideMenu.prototype.ngAfterViewChecked = function () {
        if (!this.viewportUpdated && !this.popup && this.containerViewChild) {
            this.updateViewPort();
            this.viewportUpdated = true;
        }
    };
    Object.defineProperty(SlideMenu.prototype, "container", {
        set: function (element) {
            this.containerViewChild = element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideMenu.prototype, "backward", {
        set: function (element) {
            this.backwardViewChild = element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideMenu.prototype, "slideMenuContent", {
        set: function (element) {
            this.slideMenuContentViewChild = element;
        },
        enumerable: true,
        configurable: true
    });
    SlideMenu.prototype.updateViewPort = function () {
        this.slideMenuContentViewChild.nativeElement.style.height = this.viewportHeight - DomHandler.getHiddenElementOuterHeight(this.backwardViewChild.nativeElement) + 'px';
    };
    SlideMenu.prototype.toggle = function (event) {
        if (this.visible)
            this.hide();
        else
            this.show(event);
        this.preventDocumentDefault = true;
        this.cd.detectChanges();
    };
    SlideMenu.prototype.show = function (event) {
        this.target = event.currentTarget;
        this.visible = true;
        this.preventDocumentDefault = true;
    };
    SlideMenu.prototype.onOverlayAnimationStart = function (event) {
        switch (event.toState) {
            case 'visible':
                if (this.popup) {
                    this.updateViewPort();
                    this.moveOnTop();
                    this.onShow.emit({});
                    this.appendOverlay();
                    DomHandler.absolutePosition(this.containerViewChild.nativeElement, this.target);
                    this.bindDocumentClickListener();
                    this.bindDocumentResizeListener();
                }
                break;
            case 'void':
                this.onOverlayHide();
                this.onHide.emit({});
                break;
        }
    };
    SlideMenu.prototype.appendOverlay = function () {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.containerViewChild.nativeElement);
            else
                DomHandler.appendChild(this.containerViewChild.nativeElement, this.appendTo);
        }
    };
    SlideMenu.prototype.restoreOverlayAppend = function () {
        if (this.container && this.appendTo) {
            this.el.nativeElement.appendChild(this.containerViewChild.nativeElement);
        }
    };
    SlideMenu.prototype.moveOnTop = function () {
        if (this.autoZIndex) {
            this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
    };
    SlideMenu.prototype.hide = function () {
        this.visible = false;
    };
    SlideMenu.prototype.onWindowResize = function () {
        this.hide();
    };
    SlideMenu.prototype.onClick = function (event) {
        this.preventDocumentDefault = true;
    };
    SlideMenu.prototype.goBack = function () {
        this.left += this.menuWidth;
    };
    SlideMenu.prototype.bindDocumentClickListener = function () {
        var _this = this;
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', function () {
                if (!_this.preventDocumentDefault) {
                    _this.hide();
                    _this.cd.detectChanges();
                }
                _this.preventDocumentDefault = false;
            });
        }
    };
    SlideMenu.prototype.unbindDocumentClickListener = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    SlideMenu.prototype.bindDocumentResizeListener = function () {
        this.documentResizeListener = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.documentResizeListener);
    };
    SlideMenu.prototype.unbindDocumentResizeListener = function () {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    };
    SlideMenu.prototype.onOverlayHide = function () {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.preventDocumentDefault = false;
        this.target = null;
        this.left = 0;
    };
    SlideMenu.prototype.ngOnDestroy = function () {
        if (this.popup) {
            this.restoreOverlayAppend();
            this.onOverlayHide();
        }
    };
    SlideMenu.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], SlideMenu.prototype, "model", void 0);
    __decorate([
        Input()
    ], SlideMenu.prototype, "popup", void 0);
    __decorate([
        Input()
    ], SlideMenu.prototype, "style", void 0);
    __decorate([
        Input()
    ], SlideMenu.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], SlideMenu.prototype, "menuWidth", void 0);
    __decorate([
        Input()
    ], SlideMenu.prototype, "viewportHeight", void 0);
    __decorate([
        Input()
    ], SlideMenu.prototype, "effectDuration", void 0);
    __decorate([
        Input()
    ], SlideMenu.prototype, "easing", void 0);
    __decorate([
        Input()
    ], SlideMenu.prototype, "backLabel", void 0);
    __decorate([
        Input()
    ], SlideMenu.prototype, "appendTo", void 0);
    __decorate([
        Input()
    ], SlideMenu.prototype, "autoZIndex", void 0);
    __decorate([
        Input()
    ], SlideMenu.prototype, "baseZIndex", void 0);
    __decorate([
        Input()
    ], SlideMenu.prototype, "showTransitionOptions", void 0);
    __decorate([
        Input()
    ], SlideMenu.prototype, "hideTransitionOptions", void 0);
    __decorate([
        Output()
    ], SlideMenu.prototype, "onShow", void 0);
    __decorate([
        Output()
    ], SlideMenu.prototype, "onHide", void 0);
    __decorate([
        ViewChild('container')
    ], SlideMenu.prototype, "container", null);
    __decorate([
        ViewChild('backward')
    ], SlideMenu.prototype, "backward", null);
    __decorate([
        ViewChild('slideMenuContent')
    ], SlideMenu.prototype, "slideMenuContent", null);
    SlideMenu = __decorate([
        Component({
            selector: 'p-slideMenu',
            template: "\n        <div #container [ngClass]=\"{'ui-slidemenu ui-widget ui-widget-content ui-corner-all':true, 'ui-slidemenu-dynamic ui-shadow':popup}\" \n            [class]=\"styleClass\" [ngStyle]=\"style\" (click)=\"onClick($event)\"\n            [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" [@.disabled]=\"popup !== true\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" *ngIf=\"!popup || visible\">\n            <div class=\"ui-slidemenu-wrapper\" [style.height]=\"left ? viewportHeight + 'px' : 'auto'\">\n                <div #slideMenuContent class=\"ui-slidemenu-content\">\n                    <p-slideMenuSub [item]=\"model\" root=\"root\" [index]=\"0\" [menuWidth]=\"menuWidth\" [effectDuration]=\"effectDuration\" [easing]=\"easing\"></p-slideMenuSub>\n                </div>\n                <div #backward class=\"ui-slidemenu-backward ui-widget-header ui-corner-all\" [style.display]=\"left ? 'block' : 'none'\" (click)=\"goBack()\">\n                    <span class=\"ui-slidemenu-backward-icon pi pi-fw pi-caret-left\"></span><span>{{backLabel}}</span>\n                </div>\n            </div>\n        </div>\n    ",
            animations: [
                trigger('overlayAnimation', [
                    state('void', style({
                        transform: 'translateY(5%)',
                        opacity: 0
                    })),
                    state('visible', style({
                        transform: 'translateY(0)',
                        opacity: 1
                    })),
                    transition('void => visible', animate('{{showTransitionParams}}')),
                    transition('visible => void', animate('{{hideTransitionParams}}'))
                ])
            ],
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], SlideMenu);
    return SlideMenu;
}());
export { SlideMenu };
var SlideMenuModule = /** @class */ (function () {
    function SlideMenuModule() {
    }
    SlideMenuModule = __decorate([
        NgModule({
            imports: [CommonModule, RouterModule],
            exports: [SlideMenu, RouterModule],
            declarations: [SlideMenu, SlideMenuSub]
        })
    ], SlideMenuModule);
    return SlideMenuModule;
}());
export { SlideMenuModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVtZW51LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9zbGlkZW1lbnUvIiwic291cmNlcyI6WyJzbGlkZW1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLGdCQUFnQixFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsaUJBQWlCLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDak0sT0FBTyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQWdCLE1BQU0scUJBQXFCLENBQUM7QUFDMUYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBbUM3QztJQWtCSSxzQkFBaUQsU0FBUztRQVpqRCxjQUFTLEdBQVcsTUFBTSxDQUFDO1FBTTNCLFdBQU0sR0FBVyxVQUFVLENBQUM7UUFPakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFzQixDQUFDO0lBQzVDLENBQUM7SUFJRCxnQ0FBUyxHQUFULFVBQVUsS0FBSyxFQUFFLElBQWMsRUFBRSxRQUFhO1FBQTlDLGlCQTRCQztRQTNCRyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDWCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDMUI7UUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLENBQUMsT0FB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Q04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFDLFlBQVksQ0FBQztZQUNwQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUMsWUFBWSxDQUFDO1lBQ2pDLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBQyxZQUFZLENBQUM7U0FDekMsQ0FBQztPQUNXLGVBQWUsQ0FBSTtJQUFELHNCQUFDO0NBQUEsQUFBaEMsSUFBZ0M7U0FBbkIsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LEVsZW1lbnRSZWYsQWZ0ZXJWaWV3Q2hlY2tlZCxPbkRlc3Ryb3ksSW5wdXQsUmVuZGVyZXIyLEluamVjdCxmb3J3YXJkUmVmLFZpZXdDaGlsZCxPdXRwdXQsRXZlbnRFbWl0dGVyLENoYW5nZURldGVjdG9yUmVmLENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7dHJpZ2dlcixzdGF0ZSxzdHlsZSx0cmFuc2l0aW9uLGFuaW1hdGUsQW5pbWF0aW9uRXZlbnR9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7TWVudUl0ZW19IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7Um91dGVyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Atc2xpZGVNZW51U3ViJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8dWwgW25nQ2xhc3NdPVwieyd1aS1zbGlkZW1lbnUtcm9vdGxpc3QnOnJvb3QsICd1aS1zdWJtZW51LWxpc3QnOiFyb290LCAndWktYWN0aXZlLXN1Ym1lbnUnOiAoLXNsaWRlTWVudS5sZWZ0ID09IChpbmRleCAqIG1lbnVXaWR0aCkpfVwiXG4gICAgICAgICAgICBbc3R5bGUud2lkdGgucHhdPVwibWVudVdpZHRoXCIgW3N0eWxlLmxlZnQucHhdPVwicm9vdCA/IHNsaWRlTWVudS5sZWZ0IDogc2xpZGVNZW51Lm1lbnVXaWR0aFwiXG4gICAgICAgICAgICBbc3R5bGUudHJhbnNpdGlvblByb3BlcnR5XT1cInJvb3QgPyAnbGVmdCcgOiAnbm9uZSdcIiBbc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uXT1cImVmZmVjdER1cmF0aW9uICsgJ21zJ1wiIFtzdHlsZS50cmFuc2l0aW9uVGltaW5nRnVuY3Rpb25dPVwiZWFzaW5nXCI+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWNoaWxkIFtuZ0Zvck9mXT1cIihyb290ID8gaXRlbSA6IGl0ZW0uaXRlbXMpXCI+XG4gICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwiY2hpbGQuc2VwYXJhdG9yXCIgY2xhc3M9XCJ1aS1tZW51LXNlcGFyYXRvciB1aS13aWRnZXQtY29udGVudFwiIFtuZ0NsYXNzXT1cInsndWktaGVscGVyLWhpZGRlbic6IGNoaWxkLnZpc2libGUgPT09IGZhbHNlfVwiPlxuICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cIiFjaGlsZC5zZXBhcmF0b3JcIiAjbGlzdGl0ZW0gW25nQ2xhc3NdPVwieyd1aS1tZW51aXRlbSB1aS13aWRnZXQgdWktY29ybmVyLWFsbCc6dHJ1ZSwndWktbWVudWl0ZW0tYWN0aXZlJzpsaXN0aXRlbT09YWN0aXZlSXRlbSwndWktaGVscGVyLWhpZGRlbic6IGNoaWxkLnZpc2libGUgPT09IGZhbHNlfVwiXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzc109XCJjaGlsZC5zdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwiY2hpbGQuc3R5bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCIhY2hpbGQucm91dGVyTGlua1wiIFthdHRyLmhyZWZdPVwiY2hpbGQudXJsXCIgY2xhc3M9XCJ1aS1tZW51aXRlbS1saW5rIHVpLWNvcm5lci1hbGxcIiBbYXR0ci50YXJnZXRdPVwiY2hpbGQudGFyZ2V0XCIgW2F0dHIudGl0bGVdPVwiY2hpbGQudGl0bGVcIiBbYXR0ci5pZF09XCJjaGlsZC5pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWRpc2FibGVkJzpjaGlsZC5kaXNhYmxlZH1cIiBbYXR0ci50YWJpbmRleF09XCJjaGlsZC5kaXNhYmxlZCA/IG51bGwgOiAnMCdcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJpdGVtQ2xpY2soJGV2ZW50LCBjaGlsZCwgbGlzdGl0ZW0pXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLWljb25cIiAqbmdJZj1cImNoaWxkLmljb25cIiBbbmdDbGFzc109XCJjaGlsZC5pY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS10ZXh0XCI+e3tjaGlsZC5sYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1zdWJtZW51LWljb24gcGkgcGktZncgcGktY2FyZXQtcmlnaHRcIiAqbmdJZj1cImNoaWxkLml0ZW1zXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiY2hpbGQucm91dGVyTGlua1wiIFtyb3V0ZXJMaW5rXT1cImNoaWxkLnJvdXRlckxpbmtcIiBbcXVlcnlQYXJhbXNdPVwiY2hpbGQucXVlcnlQYXJhbXNcIiBbcm91dGVyTGlua0FjdGl2ZV09XCIndWktbWVudWl0ZW0tbGluay1hY3RpdmUnXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICBbcm91dGVyTGlua0FjdGl2ZU9wdGlvbnNdPVwiY2hpbGQucm91dGVyTGlua0FjdGl2ZU9wdGlvbnN8fHtleGFjdDpmYWxzZX1cIiBbaHJlZl09XCJjaGlsZC51cmxcIiBjbGFzcz1cInVpLW1lbnVpdGVtLWxpbmsgdWktY29ybmVyLWFsbFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFyZ2V0XT1cImNoaWxkLnRhcmdldFwiIFthdHRyLnRpdGxlXT1cImNoaWxkLnRpdGxlXCIgW2F0dHIuaWRdPVwiY2hpbGQuaWRcIiBbYXR0ci50YWJpbmRleF09XCJjaGlsZC5kaXNhYmxlZCA/IG51bGwgOiAnMCdcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtZGlzYWJsZWQnOmNoaWxkLmRpc2FibGVkfVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIml0ZW1DbGljaygkZXZlbnQsIGNoaWxkLCBsaXN0aXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2ZyYWdtZW50XT1cImNoaWxkLmZyYWdtZW50XCIgW3F1ZXJ5UGFyYW1zSGFuZGxpbmddPVwiY2hpbGQucXVlcnlQYXJhbXNIYW5kbGluZ1wiIFtwcmVzZXJ2ZUZyYWdtZW50XT1cImNoaWxkLnByZXNlcnZlRnJhZ21lbnRcIiBbc2tpcExvY2F0aW9uQ2hhbmdlXT1cImNoaWxkLnNraXBMb2NhdGlvbkNoYW5nZVwiIFtyZXBsYWNlVXJsXT1cImNoaWxkLnJlcGxhY2VVcmxcIiBbc3RhdGVdPVwiY2hpbGQuc3RhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0taWNvblwiICpuZ0lmPVwiY2hpbGQuaWNvblwiIFtuZ0NsYXNzXT1cImNoaWxkLmljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLXRleHRcIj57e2NoaWxkLmxhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXN1Ym1lbnUtaWNvbiBwaSBwaS1mdyBwaS1jYXJldC1yaWdodFwiICpuZ0lmPVwiY2hpbGQuaXRlbXNcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPHAtc2xpZGVNZW51U3ViIGNsYXNzPVwidWktc3VibWVudVwiIFtpdGVtXT1cImNoaWxkXCIgW2luZGV4XT1cImluZGV4ICsgMVwiIFttZW51V2lkdGhdPVwibWVudVdpZHRoXCIgKm5nSWY9XCJjaGlsZC5pdGVtc1wiPjwvcC1zbGlkZU1lbnVTdWI+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvdWw+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBTbGlkZU1lbnVTdWIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgaXRlbTogTWVudUl0ZW07XG4gICAgXG4gICAgQElucHV0KCkgcm9vdDogYm9vbGVhbjtcbiAgICBcbiAgICBASW5wdXQoKSBiYWNrTGFiZWw6IHN0cmluZyA9ICdCYWNrJztcbiAgICBcbiAgICBASW5wdXQoKSBtZW51V2lkdGg6IG51bWJlcjtcbiAgICBcbiAgICBASW5wdXQoKSBlZmZlY3REdXJhdGlvbjogYW55O1xuICAgICAgICBcbiAgICBASW5wdXQoKSBlYXNpbmc6IHN0cmluZyA9ICdlYXNlLW91dCc7XG5cbiAgICBASW5wdXQoKSBpbmRleDogbnVtYmVyO1xuXG4gICAgc2xpZGVNZW51OiBTbGlkZU1lbnU7XG4gICAgXG4gICAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IFNsaWRlTWVudSkpIHNsaWRlTWVudSkge1xuICAgICAgICB0aGlzLnNsaWRlTWVudSA9IHNsaWRlTWVudSBhcyBTbGlkZU1lbnU7XG4gICAgfVxuICAgICAgICAgICAgIFxuICAgIGFjdGl2ZUl0ZW06IGFueTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICBpdGVtQ2xpY2soZXZlbnQsIGl0ZW06IE1lbnVJdGVtLCBsaXN0aXRlbTogYW55KcKge1xuICAgICAgICBpZiAoaXRlbS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKCFpdGVtLnVybCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICBpZiAoaXRlbS5jb21tYW5kKSB7ICAgICAgICAgICAgXG4gICAgICAgICAgICBpdGVtLmNvbW1hbmQoe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIGl0ZW06IGl0ZW1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoaXRlbS5pdGVtcyAmJiAhdGhpcy5zbGlkZU1lbnUuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlTWVudS5sZWZ0IC09IHRoaXMuc2xpZGVNZW51Lm1lbnVXaWR0aDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtID0gbGlzdGl0ZW07XG4gICAgICAgICAgICB0aGlzLnNsaWRlTWVudS5hbmltYXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnNsaWRlTWVudS5hbmltYXRpbmcgPSBmYWxzZSwgdGhpcy5lZmZlY3REdXJhdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWl0ZW0uaXRlbXMgJiYgdGhpcy5zbGlkZU1lbnUucG9wdXApIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVNZW51LmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAgICAgXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IG51bGw7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Atc2xpZGVNZW51JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2ICNjb250YWluZXIgW25nQ2xhc3NdPVwieyd1aS1zbGlkZW1lbnUgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwnOnRydWUsICd1aS1zbGlkZW1lbnUtZHluYW1pYyB1aS1zaGFkb3cnOnBvcHVwfVwiIFxuICAgICAgICAgICAgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiIChjbGljayk9XCJvbkNsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgW0BvdmVybGF5QW5pbWF0aW9uXT1cInt2YWx1ZTogJ3Zpc2libGUnLCBwYXJhbXM6IHtzaG93VHJhbnNpdGlvblBhcmFtczogc2hvd1RyYW5zaXRpb25PcHRpb25zLCBoaWRlVHJhbnNpdGlvblBhcmFtczogaGlkZVRyYW5zaXRpb25PcHRpb25zfX1cIiBbQC5kaXNhYmxlZF09XCJwb3B1cCAhPT0gdHJ1ZVwiIChAb3ZlcmxheUFuaW1hdGlvbi5zdGFydCk9XCJvbk92ZXJsYXlBbmltYXRpb25TdGFydCgkZXZlbnQpXCIgKm5nSWY9XCIhcG9wdXAgfHwgdmlzaWJsZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXNsaWRlbWVudS13cmFwcGVyXCIgW3N0eWxlLmhlaWdodF09XCJsZWZ0ID8gdmlld3BvcnRIZWlnaHQgKyAncHgnIDogJ2F1dG8nXCI+XG4gICAgICAgICAgICAgICAgPGRpdiAjc2xpZGVNZW51Q29udGVudCBjbGFzcz1cInVpLXNsaWRlbWVudS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxwLXNsaWRlTWVudVN1YiBbaXRlbV09XCJtb2RlbFwiIHJvb3Q9XCJyb290XCIgW2luZGV4XT1cIjBcIiBbbWVudVdpZHRoXT1cIm1lbnVXaWR0aFwiIFtlZmZlY3REdXJhdGlvbl09XCJlZmZlY3REdXJhdGlvblwiIFtlYXNpbmddPVwiZWFzaW5nXCI+PC9wLXNsaWRlTWVudVN1Yj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICNiYWNrd2FyZCBjbGFzcz1cInVpLXNsaWRlbWVudS1iYWNrd2FyZCB1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci1hbGxcIiBbc3R5bGUuZGlzcGxheV09XCJsZWZ0ID8gJ2Jsb2NrJyA6ICdub25lJ1wiIChjbGljayk9XCJnb0JhY2soKVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXNsaWRlbWVudS1iYWNrd2FyZC1pY29uIHBpIHBpLWZ3IHBpLWNhcmV0LWxlZnRcIj48L3NwYW4+PHNwYW4+e3tiYWNrTGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignb3ZlcmxheUFuaW1hdGlvbicsIFtcbiAgICAgICAgICAgIHN0YXRlKCd2b2lkJywgc3R5bGUoe1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoNSUpJyxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICBzdGF0ZSgndmlzaWJsZScsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJyxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHZpc2libGUnLCBhbmltYXRlKCd7e3Nob3dUcmFuc2l0aW9uUGFyYW1zfX0nKSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IHZvaWQnLCBhbmltYXRlKCd7e2hpZGVUcmFuc2l0aW9uUGFyYW1zfX0nKSlcbiAgICAgICAgXSlcbiAgICBdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxufSlcbmV4cG9ydCBjbGFzcyBTbGlkZU1lbnUgaW1wbGVtZW50cyBBZnRlclZpZXdDaGVja2VkLCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgbW9kZWw6IE1lbnVJdGVtW107XG5cbiAgICBASW5wdXQoKSBwb3B1cDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgbWVudVdpZHRoOiBudW1iZXIgPSAxOTA7XG4gICAgXG4gICAgQElucHV0KCkgdmlld3BvcnRIZWlnaHQ6IG51bWJlciA9IDE4MDtcbiAgICBcbiAgICBASW5wdXQoKSBlZmZlY3REdXJhdGlvbjogYW55ID0gMjUwO1xuICAgICAgICBcbiAgICBASW5wdXQoKSBlYXNpbmc6IHN0cmluZyA9ICdlYXNlLW91dCc7XG4gICAgXG4gICAgQElucHV0KCkgYmFja0xhYmVsOiBzdHJpbmcgPSAnQmFjayc7XG4gICAgXG4gICAgQElucHV0KCkgYXBwZW5kVG86IGFueTtcblxuICAgIEBJbnB1dCgpIGF1dG9aSW5kZXg6IGJvb2xlYW4gPSB0cnVlO1xuICAgIFxuICAgIEBJbnB1dCgpIGJhc2VaSW5kZXg6IG51bWJlciA9IDA7XG4gICAgXG4gICAgQElucHV0KCkgc2hvd1RyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnMjI1bXMgZWFzZS1vdXQnO1xuXG4gICAgQElucHV0KCkgaGlkZVRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnMTk1bXMgZWFzZS1pbic7XG5cbiAgICBAT3V0cHV0KCkgb25TaG93OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkhpZGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgY29udGFpbmVyVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuICAgIFxuICAgIGJhY2t3YXJkVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuICAgIFxuICAgIHNsaWRlTWVudUNvbnRlbnRWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG4gICAgIFxuICAgIGRvY3VtZW50Q2xpY2tMaXN0ZW5lcjogYW55O1xuXG4gICAgZG9jdW1lbnRSZXNpemVMaXN0ZW5lcjogYW55O1xuICAgIFxuICAgIHByZXZlbnREb2N1bWVudERlZmF1bHQ6IGJvb2xlYW47XG4gICAgICAgIFxuICAgIGxlZnQ6IG51bWJlciA9IDA7XG4gICAgXG4gICAgYW5pbWF0aW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgXG4gICAgdGFyZ2V0OiBhbnk7XG5cbiAgICB2aXNpYmxlOiBib29sZWFuO1xuXG4gICAgdmlld3BvcnRVcGRhdGVkOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgICAgIGlmICghdGhpcy52aWV3cG9ydFVwZGF0ZWQgJiYgIXRoaXMucG9wdXAgJiYgdGhpcy5jb250YWluZXJWaWV3Q2hpbGQpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlld1BvcnQoKTtcbiAgICAgICAgICAgIHRoaXMudmlld3BvcnRVcGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIHNldCBjb250YWluZXIoZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLmNvbnRhaW5lclZpZXdDaGlsZCA9IGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgQFZpZXdDaGlsZCgnYmFja3dhcmQnKSBzZXQgYmFja3dhcmQoZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLmJhY2t3YXJkVmlld0NoaWxkID0gZWxlbWVudDtcbiAgICB9XG5cbiAgICBAVmlld0NoaWxkKCdzbGlkZU1lbnVDb250ZW50Jykgc2V0IHNsaWRlTWVudUNvbnRlbnQoZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLnNsaWRlTWVudUNvbnRlbnRWaWV3Q2hpbGQgPSBlbGVtZW50O1xuICAgIH1cblxuICAgIHVwZGF0ZVZpZXdQb3J0KCkge1xuICAgICAgICB0aGlzLnNsaWRlTWVudUNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSB0aGlzLnZpZXdwb3J0SGVpZ2h0IC0gRG9tSGFuZGxlci5nZXRIaWRkZW5FbGVtZW50T3V0ZXJIZWlnaHQodGhpcy5iYWNrd2FyZFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSArICdweCc7XG4gICAgfVxuICAgIFxuICAgIHRvZ2dsZShldmVudCkge1xuICAgICAgICBpZiAodGhpcy52aXNpYmxlKVxuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuc2hvdyhldmVudCk7XG5cbiAgICAgICAgdGhpcy5wcmV2ZW50RG9jdW1lbnREZWZhdWx0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICAgIFxuICAgIHNob3coZXZlbnQpIHtcbiAgICAgICAgdGhpcy50YXJnZXQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnByZXZlbnREb2N1bWVudERlZmF1bHQgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uT3ZlcmxheUFuaW1hdGlvblN0YXJ0KGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBzd2l0Y2goZXZlbnQudG9TdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAndmlzaWJsZSc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucG9wdXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWaWV3UG9ydCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVPblRvcCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU2hvdy5lbWl0KHt9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWJzb2x1dGVQb3NpdGlvbih0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCB0aGlzLnRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3ZvaWQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25PdmVybGF5SGlkZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMub25IaWRlLmVtaXQoe30pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgYXBwZW5kT3ZlcmxheSgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFwcGVuZFRvID09PSAnYm9keScpXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsIHRoaXMuYXBwZW5kVG8pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzdG9yZU92ZXJsYXlBcHBlbmQoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiB0aGlzLmFwcGVuZFRvKSB7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbW92ZU9uVG9wKCkge1xuICAgICAgICBpZiAodGhpcy5hdXRvWkluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLnpJbmRleCA9IFN0cmluZyh0aGlzLmJhc2VaSW5kZXggKyAoKytEb21IYW5kbGVyLnppbmRleCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb25XaW5kb3dSZXNpemUoKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cbiAgICBcbiAgICBvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJldmVudERvY3VtZW50RGVmYXVsdCA9IHRydWU7XG4gICAgfVxuICAgIFxuICAgIGdvQmFjaygpIHtcbiAgICAgICAgdGhpcy5sZWZ0ICs9IHRoaXMubWVudVdpZHRoO1xuICAgIH1cblxuICAgIGJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5wcmV2ZW50RG9jdW1lbnREZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnByZXZlbnREb2N1bWVudERlZmF1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpIHtcbiAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gdGhpcy5vbldpbmRvd1Jlc2l6ZS5iaW5kKHRoaXMpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKTtcbiAgICB9XG4gICAgXG4gICAgdW5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcikge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25PdmVybGF5SGlkZSgpwqB7XG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnByZXZlbnREb2N1bWVudERlZmF1bHQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50YXJnZXQgPSBudWxsO1xuICAgICAgICB0aGlzLmxlZnQgPSAwO1xuICAgIH1cbiAgICAgICAgXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnBvcHVwKSB7XG4gICAgICAgICAgICB0aGlzLnJlc3RvcmVPdmVybGF5QXBwZW5kKCk7XG4gICAgICAgICAgICB0aGlzLm9uT3ZlcmxheUhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsUm91dGVyTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbU2xpZGVNZW51LFJvdXRlck1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbU2xpZGVNZW51LFNsaWRlTWVudVN1Yl1cbn0pXG5leHBvcnQgY2xhc3MgU2xpZGVNZW51TW9kdWxlIHsgfVxuIl19