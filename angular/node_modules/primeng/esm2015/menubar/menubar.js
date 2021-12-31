var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, Input, Renderer2, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { RouterModule } from '@angular/router';
let MenubarSub = class MenubarSub {
    constructor(renderer, cd) {
        this.renderer = renderer;
        this.cd = cd;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.menuHoverActive = false;
    }
    get parentActive() {
        return this._parentActive;
    }
    set parentActive(value) {
        if (!this.root) {
            this._parentActive = value;
            if (!value)
                this.activeItem = null;
        }
    }
    onItemMenuClick(event, item, menuitem) {
        this.menuClick = true;
        if (!this.autoDisplay) {
            if (menuitem.disabled) {
                return;
            }
            this.activeItem = this.activeMenu ? (this.activeMenu.isEqualNode(item) ? null : item) : item;
            let nextElement = item.children[0].nextElementSibling;
            if (nextElement) {
                let sublist = nextElement.children[0];
                if (this.autoZIndex) {
                    sublist.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
                }
                if (this.root) {
                    sublist.style.top = DomHandler.getOuterHeight(item.children[0]) + 'px';
                    sublist.style.left = '0px';
                }
                else {
                    sublist.style.top = '0px';
                    sublist.style.left = DomHandler.getOuterWidth(item.children[0]) + 'px';
                }
            }
            this.menuHoverActive = this.activeMenu ? (!this.activeMenu.isEqualNode(item)) : true;
            this.activeMenu = this.activeMenu ? (this.activeMenu.isEqualNode(item) ? null : item) : item;
            this.bindEventListener();
        }
    }
    bindEventListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', (event) => {
                if (!this.menuClick) {
                    this.activeItem = null;
                    this.menuHoverActive = false;
                    this.activeMenu = false;
                }
                this.menuClick = false;
            });
        }
    }
    onItemMouseEnter(event, item, menuitem) {
        if (this.autoDisplay || (!this.autoDisplay && this.root && this.menuHoverActive)) {
            if (menuitem.disabled) {
                return;
            }
            if ((this.activeItem && !this.activeItem.isEqualNode(item) || !this.activeItem)) {
                this.activeItem = item;
                let nextElement = item.children[0].nextElementSibling;
                if (nextElement) {
                    let sublist = nextElement.children[0];
                    sublist.style.zIndex = String(++DomHandler.zindex);
                    if (this.root) {
                        sublist.style.top = DomHandler.getOuterHeight(item.children[0]) + 'px';
                        sublist.style.left = '0px';
                    }
                    else {
                        sublist.style.top = '0px';
                        sublist.style.left = DomHandler.getOuterWidth(item.children[0]) + 'px';
                    }
                }
                this.activeMenu = item;
            }
        }
    }
    itemClick(event, item) {
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
        this.activeItem = null;
    }
    listClick(event) {
        if (this.autoDisplay) {
            this.activeItem = null;
        }
    }
    ngOnDestroy() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
};
MenubarSub.ctorParameters = () => [
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], MenubarSub.prototype, "item", void 0);
__decorate([
    Input()
], MenubarSub.prototype, "root", void 0);
__decorate([
    Input()
], MenubarSub.prototype, "autoDisplay", void 0);
__decorate([
    Input()
], MenubarSub.prototype, "autoZIndex", void 0);
__decorate([
    Input()
], MenubarSub.prototype, "baseZIndex", void 0);
__decorate([
    Input()
], MenubarSub.prototype, "parentActive", null);
MenubarSub = __decorate([
    Component({
        selector: 'p-menubarSub',
        template: `
        <ul [ngClass]="{'ui-menubar-root-list':root, 'ui-widget-content ui-corner-all ui-submenu-list ui-shadow':!root}"
            (click)="listClick($event)">
            <ng-template ngFor let-child [ngForOf]="(root ? item : item.items)">
                <li *ngIf="child.separator" class="ui-menu-separator ui-widget-content" [ngClass]="{'ui-helper-hidden': child.visible === false}">
                <li *ngIf="!child.separator" #listItem [ngClass]="{'ui-menuitem ui-corner-all':true,
                        'ui-menu-parent':child.items,'ui-menuitem-active':listItem==activeItem,'ui-helper-hidden': child.visible === false}"
                        (mouseenter)="onItemMouseEnter($event,listItem,child)" (click)="onItemMenuClick($event, listItem, child)">
                    <a *ngIf="!child.routerLink" [attr.href]="child.url" [attr.data-automationid]="child.automationId" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id" (click)="itemClick($event, child)"
                         [ngClass]="{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':child.disabled}" [ngStyle]="child.style" [class]="child.styleClass" 
                         [attr.tabindex]="child.disabled ? null : '0'" [attr.aria-haspopup]="item.items != null" [attr.aria-expanded]="item === activeItem">
                        <span class="ui-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                        <span class="ui-submenu-icon pi pi-fw" *ngIf="child.items" [ngClass]="{'pi-caret-down':root,'pi-caret-right':!root}"></span>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" [attr.data-automationid]="child.automationId" [queryParams]="child.queryParams" [routerLinkActive]="'ui-menuitem-link-active'" [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}"
                        [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id" [attr.tabindex]="child.disabled ? null : '0'" role="menuitem"
                        (click)="itemClick($event, child)" [ngClass]="{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':child.disabled}" [ngStyle]="child.style" [class]="child.styleClass"
                        [fragment]="child.fragment" [queryParamsHandling]="child.queryParamsHandling" [preserveFragment]="child.preserveFragment" [skipLocationChange]="child.skipLocationChange" [replaceUrl]="child.replaceUrl" [state]="child.state">
                        <span class="ui-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                        <span class="ui-submenu-icon pi pi-fw" *ngIf="child.items" [ngClass]="{'pi-caret-down':root,'pi-caret-right':!root}"></span>
                    </a>
                    <p-menubarSub class="ui-submenu" [parentActive]="listItem==activeItem" [item]="child" *ngIf="child.items" [autoDisplay]="true"></p-menubarSub>
                </li>
            </ng-template>
        </ul>
    `
    })
], MenubarSub);
export { MenubarSub };
let Menubar = class Menubar {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.autoZIndex = true;
        this.baseZIndex = 0;
    }
    get autoDisplay() {
        return this._autoDisplay;
    }
    set utc(_utc) {
        console.log("AutoDisplay property is deprecated and functionality is not available.");
    }
};
Menubar.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
__decorate([
    Input()
], Menubar.prototype, "model", void 0);
__decorate([
    Input()
], Menubar.prototype, "style", void 0);
__decorate([
    Input()
], Menubar.prototype, "styleClass", void 0);
__decorate([
    Input()
], Menubar.prototype, "autoZIndex", void 0);
__decorate([
    Input()
], Menubar.prototype, "baseZIndex", void 0);
__decorate([
    Input()
], Menubar.prototype, "autoDisplay", null);
Menubar = __decorate([
    Component({
        selector: 'p-menubar',
        template: `
        <div [ngClass]="{'ui-menubar ui-widget ui-widget-content ui-corner-all':true}" [class]="styleClass" [ngStyle]="style">
            <p-menubarSub [item]="model" root="root" [baseZIndex]="baseZIndex" [autoZIndex]="autoZIndex">
                <ng-content></ng-content>
            </p-menubarSub>
            <div class="ui-menubar-custom">
                <ng-content></ng-content>
            </div>
        </div>
    `,
        changeDetection: ChangeDetectionStrategy.Default
    })
], Menubar);
export { Menubar };
let MenubarModule = class MenubarModule {
};
MenubarModule = __decorate([
    NgModule({
        imports: [CommonModule, RouterModule],
        exports: [Menubar, RouterModule],
        declarations: [Menubar, MenubarSub]
    })
], MenubarModule);
export { MenubarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudWJhci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvbWVudWJhci8iLCJzb3VyY2VzIjpbIm1lbnViYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hJLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQWlDL0MsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVTtJQXFDbkIsWUFBbUIsUUFBbUIsRUFBVSxFQUFxQjtRQUFsRCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUE3QjVELGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFM0IsZUFBVSxHQUFXLENBQUMsQ0FBQztRQXFCaEMsb0JBQWUsR0FBWSxLQUFLLENBQUM7SUFNd0MsQ0FBQztJQXpCakUsSUFBSSxZQUFZO1FBRXJCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDO0lBQ0QsSUFBSSxZQUFZLENBQUMsS0FBSztRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNaLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBRTNCLElBQUksQ0FBQyxLQUFLO2dCQUNOLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQzlCO0lBQ0wsQ0FBQztJQWdCRCxlQUFlLENBQUMsS0FBWSxFQUFFLElBQW1CLEVBQUUsUUFBa0I7UUFDN0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFFMUIsSUFBSSxDQUFDLElBQUks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QUFFLENBQVk7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBYnBELGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFM0IsZUFBVSxHQUFXLENBQUMsQ0FBQztJQVdpQyxDQUFDO0lBUHpELElBQUksV0FBVztRQUNwQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUNELElBQUksR0FBRyxDQUFDLElBQWE7UUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3RUFBd0UsQ0FBQyxDQUFDO0lBQzFGLENBQUM7Q0FHSixDQUFBOztZQUQwQixVQUFVO1lBQW1CLFNBQVM7O0FBbkJwRDtJQUFSLEtBQUssRUFBRTtzQ0FBbUI7QUFFbEI7SUFBUixLQUFLLEVBQUU7c0NBQVk7QUFFWDtJQUFSLEtBQUssRUFBRTsyQ0FBb0I7QUFFbkI7SUFBUixLQUFLLEVBQUU7MkNBQTRCO0FBRTNCO0lBQVIsS0FBSyxFQUFFOzJDQUF3QjtBQUl2QjtJQUFSLEtBQUssRUFBRTswQ0FFUDtBQWhCUSxPQUFPO0lBZG5CLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFFBQVEsRUFBRTs7Ozs7Ozs7O0tBU1Q7UUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztLQUNuRCxDQUFDO0dBQ1csT0FBTyxDQXNCbkI7U0F0QlksT0FBTztBQTZCcEIsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtDQUFJLENBQUE7QUFBakIsYUFBYTtJQUx6QixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDO1FBQ3JDLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUM7UUFDaEMsWUFBWSxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQztLQUN0QyxDQUFDO0dBQ1csYUFBYSxDQUFJO1NBQWpCLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgUmVuZGVyZXIyLCBPbkRlc3Ryb3ksQ2hhbmdlRGV0ZWN0b3JSZWYsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IE1lbnVJdGVtIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLW1lbnViYXJTdWInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDx1bCBbbmdDbGFzc109XCJ7J3VpLW1lbnViYXItcm9vdC1saXN0Jzpyb290LCAndWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCB1aS1zdWJtZW51LWxpc3QgdWktc2hhZG93Jzohcm9vdH1cIlxuICAgICAgICAgICAgKGNsaWNrKT1cImxpc3RDbGljaygkZXZlbnQpXCI+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWNoaWxkIFtuZ0Zvck9mXT1cIihyb290ID8gaXRlbSA6IGl0ZW0uaXRlbXMpXCI+XG4gICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwiY2hpbGQuc2VwYXJhdG9yXCIgY2xhc3M9XCJ1aS1tZW51LXNlcGFyYXRvciB1aS13aWRnZXQtY29udGVudFwiIFtuZ0NsYXNzXT1cInsndWktaGVscGVyLWhpZGRlbic6IGNoaWxkLnZpc2libGUgPT09IGZhbHNlfVwiPlxuICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cIiFjaGlsZC5zZXBhcmF0b3JcIiAjbGlzdEl0ZW0gW25nQ2xhc3NdPVwieyd1aS1tZW51aXRlbSB1aS1jb3JuZXItYWxsJzp0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLW1lbnUtcGFyZW50JzpjaGlsZC5pdGVtcywndWktbWVudWl0ZW0tYWN0aXZlJzpsaXN0SXRlbT09YWN0aXZlSXRlbSwndWktaGVscGVyLWhpZGRlbic6IGNoaWxkLnZpc2libGUgPT09IGZhbHNlfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAobW91c2VlbnRlcik9XCJvbkl0ZW1Nb3VzZUVudGVyKCRldmVudCxsaXN0SXRlbSxjaGlsZClcIiAoY2xpY2spPVwib25JdGVtTWVudUNsaWNrKCRldmVudCwgbGlzdEl0ZW0sIGNoaWxkKVwiPlxuICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cIiFjaGlsZC5yb3V0ZXJMaW5rXCIgW2F0dHIuaHJlZl09XCJjaGlsZC51cmxcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb25pZF09XCJjaGlsZC5hdXRvbWF0aW9uSWRcIiBbYXR0ci50YXJnZXRdPVwiY2hpbGQudGFyZ2V0XCIgW2F0dHIudGl0bGVdPVwiY2hpbGQudGl0bGVcIiBbYXR0ci5pZF09XCJjaGlsZC5pZFwiIChjbGljayk9XCJpdGVtQ2xpY2soJGV2ZW50LCBjaGlsZClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktbWVudWl0ZW0tbGluayB1aS1jb3JuZXItYWxsJzp0cnVlLCd1aS1zdGF0ZS1kaXNhYmxlZCc6Y2hpbGQuZGlzYWJsZWR9XCIgW25nU3R5bGVdPVwiY2hpbGQuc3R5bGVcIiBbY2xhc3NdPVwiY2hpbGQuc3R5bGVDbGFzc1wiIFxuICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cImNoaWxkLmRpc2FibGVkID8gbnVsbCA6ICcwJ1wiIFthdHRyLmFyaWEtaGFzcG9wdXBdPVwiaXRlbS5pdGVtcyAhPSBudWxsXCIgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJpdGVtID09PSBhY3RpdmVJdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLWljb25cIiAqbmdJZj1cImNoaWxkLmljb25cIiBbbmdDbGFzc109XCJjaGlsZC5pY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS10ZXh0XCI+e3tjaGlsZC5sYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1zdWJtZW51LWljb24gcGkgcGktZndcIiAqbmdJZj1cImNoaWxkLml0ZW1zXCIgW25nQ2xhc3NdPVwieydwaS1jYXJldC1kb3duJzpyb290LCdwaS1jYXJldC1yaWdodCc6IXJvb3R9XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiY2hpbGQucm91dGVyTGlua1wiIFtyb3V0ZXJMaW5rXT1cImNoaWxkLnJvdXRlckxpbmtcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb25pZF09XCJjaGlsZC5hdXRvbWF0aW9uSWRcIiBbcXVlcnlQYXJhbXNdPVwiY2hpbGQucXVlcnlQYXJhbXNcIiBbcm91dGVyTGlua0FjdGl2ZV09XCIndWktbWVudWl0ZW0tbGluay1hY3RpdmUnXCIgW3JvdXRlckxpbmtBY3RpdmVPcHRpb25zXT1cImNoaWxkLnJvdXRlckxpbmtBY3RpdmVPcHRpb25zfHx7ZXhhY3Q6ZmFsc2V9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhcmdldF09XCJjaGlsZC50YXJnZXRcIiBbYXR0ci50aXRsZV09XCJjaGlsZC50aXRsZVwiIFthdHRyLmlkXT1cImNoaWxkLmlkXCIgW2F0dHIudGFiaW5kZXhdPVwiY2hpbGQuZGlzYWJsZWQgPyBudWxsIDogJzAnXCIgcm9sZT1cIm1lbnVpdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJpdGVtQ2xpY2soJGV2ZW50LCBjaGlsZClcIiBbbmdDbGFzc109XCJ7J3VpLW1lbnVpdGVtLWxpbmsgdWktY29ybmVyLWFsbCc6dHJ1ZSwndWktc3RhdGUtZGlzYWJsZWQnOmNoaWxkLmRpc2FibGVkfVwiIFtuZ1N0eWxlXT1cImNoaWxkLnN0eWxlXCIgW2NsYXNzXT1cImNoaWxkLnN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2ZyYWdtZW50XT1cImNoaWxkLmZyYWdtZW50XCIgW3F1ZXJ5UGFyYW1zSGFuZGxpbmddPVwiY2hpbGQucXVlcnlQYXJhbXNIYW5kbGluZ1wiIFtwcmVzZXJ2ZUZyYWdtZW50XT1cImNoaWxkLnByZXNlcnZlRnJhZ21lbnRcIiBbc2tpcExvY2F0aW9uQ2hhbmdlXT1cImNoaWxkLnNraXBMb2NhdGlvbkNoYW5nZVwiIFtyZXBsYWNlVXJsXT1cImNoaWxkLnJlcGxhY2VVcmxcIiBbc3RhdGVdPVwiY2hpbGQuc3RhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0taWNvblwiICpuZ0lmPVwiY2hpbGQuaWNvblwiIFtuZ0NsYXNzXT1cImNoaWxkLmljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLXRleHRcIj57e2NoaWxkLmxhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXN1Ym1lbnUtaWNvbiBwaSBwaS1md1wiICpuZ0lmPVwiY2hpbGQuaXRlbXNcIiBbbmdDbGFzc109XCJ7J3BpLWNhcmV0LWRvd24nOnJvb3QsJ3BpLWNhcmV0LXJpZ2h0Jzohcm9vdH1cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPHAtbWVudWJhclN1YiBjbGFzcz1cInVpLXN1Ym1lbnVcIiBbcGFyZW50QWN0aXZlXT1cImxpc3RJdGVtPT1hY3RpdmVJdGVtXCIgW2l0ZW1dPVwiY2hpbGRcIiAqbmdJZj1cImNoaWxkLml0ZW1zXCIgW2F1dG9EaXNwbGF5XT1cInRydWVcIj48L3AtbWVudWJhclN1Yj5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC91bD5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIE1lbnViYXJTdWIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgaXRlbTogTWVudUl0ZW07XG5cbiAgICBASW5wdXQoKSByb290OiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgYXV0b0Rpc3BsYXk6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBhdXRvWkluZGV4OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGJhc2VaSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKSBnZXQgcGFyZW50QWN0aXZlKCk6Ym9vbGVhbiBcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnRBY3RpdmU7XG4gICAgfVxuICAgIHNldCBwYXJlbnRBY3RpdmUodmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLnJvb3QpIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudEFjdGl2ZSA9IHZhbHVlO1xuXG4gICAgICAgICAgICBpZiAoIXZhbHVlKVxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfcGFyZW50QWN0aXZlOmJvb2xlYW47XG5cbiAgICBkb2N1bWVudENsaWNrTGlzdGVuZXI6IGFueTtcblxuICAgIG1lbnVDbGljazogYm9vbGVhbjtcbiAgXG4gICAgbWVudUhvdmVyQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBhY3RpdmVJdGVtOiBhbnk7XG5cbiAgICBhY3RpdmVNZW51OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHsgfVxuXG4gICAgb25JdGVtTWVudUNsaWNrKGV2ZW50OiBFdmVudCwgaXRlbTogSFRNTExJRWxlbWVudCwgbWVudWl0ZW06IE1lbnVJdGVtKSB7XG4gICAgICAgICAgICB0aGlzLm1lbnVDbGljayA9IHRydWU7XG5cbiAgICAgICAgaWYgKCF0aGlzLmF1dG9EaXNwbGF5KSB7XG4gICAgICAgICAgICBpZiAobWVudWl0ZW0uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IHRoaXMuYWN0aXZlTWVudSA/ICh0aGlzLmFjdGl2ZU1lbnUuaXNFcXVhbE5vZGUoaXRlbSkgPyBudWxsIDogaXRlbSkgOiBpdGVtO1xuICAgICAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gPEhUTUxMSUVsZW1lbnQ+aXRlbS5jaGlsZHJlblswXS5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICBpZiAobmV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBsZXQgc3VibGlzdCA9IDxIVE1MVUxpc3RFbGVtZW50Pm5leHRFbGVtZW50LmNoaWxkcmVuWzBdO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF1dG9aSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VibGlzdC5zdHlsZS56SW5kZXggPSBTdHJpbmcodGhpcy5iYXNlWkluZGV4ICsgKCsrRG9tSGFuZGxlci56aW5kZXgpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yb290KSB7XG4gICAgICAgICAgICAgICAgICAgIHN1Ymxpc3Quc3R5bGUudG9wID0gRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodChpdGVtLmNoaWxkcmVuWzBdKSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIHN1Ymxpc3Quc3R5bGUubGVmdCA9ICcwcHgnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdWJsaXN0LnN0eWxlLnRvcCA9ICcwcHgnO1xuICAgICAgICAgICAgICAgICAgICBzdWJsaXN0LnN0eWxlLmxlZnQgPSBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgoaXRlbS5jaGlsZHJlblswXSkgKyAncHgnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5tZW51SG92ZXJBY3RpdmUgPSB0aGlzLmFjdGl2ZU1lbnUgPyAoIXRoaXMuYWN0aXZlTWVudS5pc0VxdWFsTm9kZShpdGVtKSkgOiB0cnVlO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVNZW51ID0gdGhpcy5hY3RpdmVNZW51ID8gKHRoaXMuYWN0aXZlTWVudS5pc0VxdWFsTm9kZShpdGVtKSA/IG51bGw6IGl0ZW0pIDogaXRlbTtcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50TGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRFdmVudExpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdjbGljaycsKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1lbnVDbGljaykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnVIb3ZlckFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZU1lbnUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5tZW51Q2xpY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JdGVtTW91c2VFbnRlcihldmVudDogRXZlbnQsIGl0ZW06IEhUTUxMSUVsZW1lbnQsIG1lbnVpdGVtOiBNZW51SXRlbSkge1xuICAgICAgICBpZiAodGhpcy5hdXRvRGlzcGxheSB8fCAoIXRoaXMuYXV0b0Rpc3BsYXkgJiYgdGhpcy5yb290ICYmIHRoaXMubWVudUhvdmVyQWN0aXZlKSkge1xuICAgICAgICAgICAgaWYgKG1lbnVpdGVtLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoKHRoaXMuYWN0aXZlSXRlbSAmJiAhdGhpcy5hY3RpdmVJdGVtLmlzRXF1YWxOb2RlKGl0ZW0pIHx8ICF0aGlzLmFjdGl2ZUl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtID0gaXRlbTtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dEVsZW1lbnQgPSA8SFRNTExJRWxlbWVudD5pdGVtLmNoaWxkcmVuWzBdLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICBpZiAobmV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN1Ymxpc3QgPSA8SFRNTFVMaXN0RWxlbWVudD5uZXh0RWxlbWVudC5jaGlsZHJlblswXTtcbiAgICAgICAgICAgICAgICAgICAgc3VibGlzdC5zdHlsZS56SW5kZXggPSBTdHJpbmcoKytEb21IYW5kbGVyLnppbmRleCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucm9vdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VibGlzdC5zdHlsZS50b3AgPSBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KGl0ZW0uY2hpbGRyZW5bMF0pICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Ymxpc3Quc3R5bGUubGVmdCA9ICcwcHgnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJsaXN0LnN0eWxlLnRvcCA9ICcwcHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VibGlzdC5zdHlsZS5sZWZ0ID0gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKGl0ZW0uY2hpbGRyZW5bMF0pICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZU1lbnUgPSBpdGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBpdGVtQ2xpY2soZXZlbnQsIGl0ZW06IE1lbnVJdGVtKSDCoHtcbiAgICAgICAgaWYgKGl0ZW0uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWl0ZW0udXJsKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ZW0uY29tbWFuZCkge1xuICAgICAgICAgICAgaXRlbS5jb21tYW5kKHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICBpdGVtOiBpdGVtXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IG51bGw7XG4gICAgfVxuXG4gICAgbGlzdENsaWNrKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmF1dG9EaXNwbGF5KSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICBpZiAodGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSBudWxsO1xuICAgICAgfVxuXG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtbWVudWJhcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3VpLW1lbnViYXIgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwnOnRydWV9XCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiPlxuICAgICAgICAgICAgPHAtbWVudWJhclN1YiBbaXRlbV09XCJtb2RlbFwiIHJvb3Q9XCJyb290XCIgW2Jhc2VaSW5kZXhdPVwiYmFzZVpJbmRleFwiIFthdXRvWkluZGV4XT1cImF1dG9aSW5kZXhcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L3AtbWVudWJhclN1Yj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1tZW51YmFyLWN1c3RvbVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxufSlcbmV4cG9ydCBjbGFzcyBNZW51YmFyIHtcblxuICAgIEBJbnB1dCgpIG1vZGVsOiBNZW51SXRlbVtdO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGF1dG9aSW5kZXg6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgYmFzZVpJbmRleDogbnVtYmVyID0gMDtcblxuICAgIHByaXZhdGUgX2F1dG9EaXNwbGF5OiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgZ2V0IGF1dG9EaXNwbGF5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXV0b0Rpc3BsYXk7XG4gICAgfVxuICAgIHNldCB1dGMoX3V0YzogYm9vbGVhbikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkF1dG9EaXNwbGF5IHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQgYW5kIGZ1bmN0aW9uYWxpdHkgaXMgbm90IGF2YWlsYWJsZS5cIik7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMikgeyB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUm91dGVyTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbTWVudWJhciwgUm91dGVyTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtNZW51YmFyLCBNZW51YmFyU3ViXVxufSlcbmV4cG9ydCBjbGFzcyBNZW51YmFyTW9kdWxlIHsgfVxuIl19