import { EventEmitter, Input, Output, Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let Breadcrumb = class Breadcrumb {
    constructor() {
        this.onItemClick = new EventEmitter();
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
        this.onItemClick.emit({
            originalEvent: event,
            item: item
        });
    }
    onHomeClick(event) {
        if (this.home) {
            this.itemClick(event, this.home);
        }
    }
};
__decorate([
    Input()
], Breadcrumb.prototype, "model", void 0);
__decorate([
    Input()
], Breadcrumb.prototype, "style", void 0);
__decorate([
    Input()
], Breadcrumb.prototype, "styleClass", void 0);
__decorate([
    Input()
], Breadcrumb.prototype, "home", void 0);
__decorate([
    Output()
], Breadcrumb.prototype, "onItemClick", void 0);
Breadcrumb = __decorate([
    Component({
        selector: 'p-breadcrumb',
        template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'ui-breadcrumb ui-widget ui-widget-header ui-helper-clearfix ui-corner-all'">
            <ul>
                <li [class]="home.styleClass" [ngClass]="'ui-breadcrumb-home'" [ngStyle]="home.style" *ngIf="home">
                    <a *ngIf="!home.routerLink" [href]="home.url ? home.url : null" class="ui-menuitem-link" (click)="itemClick($event, home)" 
                        [ngClass]="{'ui-state-disabled':home.disabled}" [attr.target]="home.target" [attr.title]="home.title" [attr.id]="home.id"[attr.tabindex]="home.disabled ? null : '0'">
                        <span [ngClass]="home.icon||'pi pi-home'"></span>
                    </a>
                    <a *ngIf="home.routerLink" [routerLink]="home.routerLink" [queryParams]="home.queryParams" [routerLinkActive]="'ui-menuitem-link-active'" [routerLinkActiveOptions]="home.routerLinkActiveOptions||{exact:false}" class="ui-menuitem-link" (click)="itemClick($event, home)" 
                        [ngClass]="{'ui-state-disabled':home.disabled}" [attr.target]="home.target" [attr.title]="home.title" [attr.id]="home.id" [attr.tabindex]="home.disabled ? null : '0'"
                        [fragment]="home.fragment" [queryParamsHandling]="home.queryParamsHandling" [preserveFragment]="home.preserveFragment" [skipLocationChange]="home.skipLocationChange" [replaceUrl]="home.replaceUrl" [state]="home.state">
                        <span [ngClass]="home.icon||'pi pi-home'"></span>
                    </a>
                </li>
                <li class="ui-breadcrumb-chevron pi pi-chevron-right" *ngIf="model&&home"></li>
                <ng-template ngFor let-item let-end="last" [ngForOf]="model">
                    <li [class]="item.styleClass" [ngStyle]="item.style">
                        <a *ngIf="!item.routerLink" [attr.href]="item.url ? item.url : null" class="ui-menuitem-link" (click)="itemClick($event, item)" 
                            [ngClass]="{'ui-state-disabled':item.disabled}" [attr.target]="item.target" [attr.title]="item.title" [attr.id]="item.id" [attr.tabindex]="item.disabled ? null : '0'">
                            <span *ngIf="item.icon" class="ui-menuitem-icon" [ngClass]="item.icon"></span>
                            <span class="ui-menuitem-text">{{item.label}}</span>
                        </a>
                        <a *ngIf="item.routerLink" [routerLink]="item.routerLink" [queryParams]="item.queryParams" [routerLinkActive]="'ui-menuitem-link-active'"  [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}" class="ui-menuitem-link" (click)="itemClick($event, item)" 
                            [ngClass]="{'ui-state-disabled':item.disabled}" [attr.target]="item.target" [attr.title]="item.title" [attr.id]="item.id" [attr.tabindex]="item.disabled ? null : '0'"
                            [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state">
                            <span *ngIf="item.icon" class="ui-menuitem-icon" [ngClass]="item.icon"></span>
                            <span class="ui-menuitem-text">{{item.label}}</span>
                        </a>
                    </li>
                    <li class="ui-breadcrumb-chevron pi pi-chevron-right" *ngIf="!end"></li>
                </ng-template>
            </ul>
        </div>
    `,
        changeDetection: ChangeDetectionStrategy.Default
    })
], Breadcrumb);
let BreadcrumbModule = class BreadcrumbModule {
};
BreadcrumbModule = __decorate([
    NgModule({
        imports: [CommonModule, RouterModule],
        exports: [Breadcrumb, RouterModule],
        declarations: [Breadcrumb]
    })
], BreadcrumbModule);

/**
 * Generated bundle index. Do not edit.
 */

export { Breadcrumb, BreadcrumbModule };
//# sourceMappingURL=primeng-breadcrumb.js.map
