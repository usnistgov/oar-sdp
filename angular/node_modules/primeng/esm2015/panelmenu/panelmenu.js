var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
export class BasePanelMenuItem {
    constructor(ref) {
        this.ref = ref;
    }
    handleClick(event, item) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        item.expanded = !item.expanded;
        this.ref.detectChanges();
        if (!item.url) {
            event.preventDefault();
        }
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
    }
}
let PanelMenuSub = class PanelMenuSub extends BasePanelMenuItem {
    constructor(ref) {
        super(ref);
    }
};
PanelMenuSub.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], PanelMenuSub.prototype, "item", void 0);
__decorate([
    Input()
], PanelMenuSub.prototype, "expanded", void 0);
__decorate([
    Input()
], PanelMenuSub.prototype, "transitionOptions", void 0);
PanelMenuSub = __decorate([
    Component({
        selector: 'p-panelMenuSub',
        template: `
        <ul class="ui-submenu-list" [@submenu]="expanded ? {value: 'visible', params: {transitionParams: transitionOptions, height: '*'}} : {value: 'hidden', params: {transitionParams: transitionOptions, height: '0'}}" role="tree">
            <ng-template ngFor let-child [ngForOf]="item.items">
                <li *ngIf="child.separator" class="ui-menu-separator ui-widget-content" role="separator">
                <li *ngIf="!child.separator" class="ui-menuitem ui-corner-all" [ngClass]="child.styleClass" [class.ui-helper-hidden]="child.visible === false" [ngStyle]="child.style">
                    <a *ngIf="!child.routerLink" [attr.href]="child.url" class="ui-menuitem-link ui-corner-all" [attr.tabindex]="!item.expanded ? null : child.disabled ? null : '0'" [attr.id]="child.id"
                        [ngClass]="{'ui-state-disabled':child.disabled, 'ui-state-active': child.expanded}" role="treeitem" [attr.aria-expanded]="child.expanded"
                        (click)="handleClick($event,child)" [attr.target]="child.target" [attr.title]="child.title">
                        <span class="ui-panelmenu-icon pi pi-fw" [ngClass]="{'pi-caret-right':!child.expanded,'pi-caret-down':child.expanded}" *ngIf="child.items"></span
                        ><span class="ui-menuitem-icon" [ngClass]="child.icon" *ngIf="child.icon"></span
                        ><span class="ui-menuitem-text">{{child.label}}</span>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" [queryParams]="child.queryParams" [routerLinkActive]="'ui-menuitem-link-active'" [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}" class="ui-menuitem-link ui-corner-all" 
                        [ngClass]="{'ui-state-disabled':child.disabled}" [attr.tabindex]="!item.expanded ? null : child.disabled ? null : '0'" [attr.id]="child.id" role="treeitem" [attr.aria-expanded]="child.expanded"
                        (click)="handleClick($event,child)" [attr.target]="child.target" [attr.title]="child.title"
                        [fragment]="child.fragment" [queryParamsHandling]="child.queryParamsHandling" [preserveFragment]="child.preserveFragment" [skipLocationChange]="child.skipLocationChange" [replaceUrl]="child.replaceUrl" [state]="child.state">
                        <span class="ui-panelmenu-icon pi pi-fw" [ngClass]="{'pi-caret-right':!child.expanded,'pi-caret-down':child.expanded}" *ngIf="child.items"></span
                        ><span class="ui-menuitem-icon" [ngClass]="child.icon" *ngIf="child.icon"></span
                        ><span class="ui-menuitem-text">{{child.label}}</span>
                    </a>
                    <p-panelMenuSub [item]="child" [expanded]="child.expanded" [transitionOptions]="transitionOptions" *ngIf="child.items"></p-panelMenuSub>
                </li>
            </ng-template>
        </ul>
    `,
        animations: [
            trigger('submenu', [
                state('hidden', style({
                    height: '0px'
                })),
                state('void', style({
                    height: '{{height}}'
                }), { params: { height: '0' } }),
                state('visible', style({
                    height: '*'
                })),
                transition('visible => hidden', animate('{{transitionParams}}')),
                transition('hidden => visible', animate('{{transitionParams}}')),
                transition('void => hidden', animate('{{transitionParams}}')),
                transition('void => visible', animate('{{transitionParams}}'))
            ])
        ]
    })
], PanelMenuSub);
export { PanelMenuSub };
let PanelMenu = class PanelMenu extends BasePanelMenuItem {
    constructor(ref) {
        super(ref);
        this.multiple = true;
        this.transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
    }
    collapseAll() {
        for (let item of this.model) {
            if (item.expanded) {
                item.expanded = false;
            }
        }
    }
    handleClick(event, item) {
        if (!this.multiple) {
            for (let modelItem of this.model) {
                if (item !== modelItem && modelItem.expanded) {
                    modelItem.expanded = false;
                }
            }
        }
        this.animating = true;
        super.handleClick(event, item);
    }
    onToggleDone() {
        this.animating = false;
    }
};
PanelMenu.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], PanelMenu.prototype, "model", void 0);
__decorate([
    Input()
], PanelMenu.prototype, "style", void 0);
__decorate([
    Input()
], PanelMenu.prototype, "styleClass", void 0);
__decorate([
    Input()
], PanelMenu.prototype, "multiple", void 0);
__decorate([
    Input()
], PanelMenu.prototype, "transitionOptions", void 0);
PanelMenu = __decorate([
    Component({
        selector: 'p-panelMenu',
        template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'ui-panelmenu ui-widget'">
            <ng-container *ngFor="let item of model;let f=first;let l=last;">
                <div class="ui-panelmenu-panel" [ngClass]="{'ui-helper-hidden': item.visible === false}">
                    <div [ngClass]="{'ui-widget ui-panelmenu-header ui-state-default':true,'ui-corner-top':f,'ui-corner-bottom':l&&!item.expanded,
                    'ui-state-active':item.expanded,'ui-state-disabled':item.disabled}" [class]="item.styleClass" [ngStyle]="item.style">
                        <a *ngIf="!item.routerLink" [attr.href]="item.url" (click)="handleClick($event,item)" [attr.tabindex]="item.disabled ? null : '0'" [attr.id]="item.id"
                           [attr.target]="item.target" [attr.title]="item.title" class="ui-panelmenu-header-link" [attr.aria-expanded]="item.expanded" [attr.id]="item.id + '_header'" [attr.aria-controls]="item.id +'_content'">
                        <span *ngIf="item.items" class="ui-panelmenu-icon pi pi-fw" [ngClass]="{'pi-chevron-right':!item.expanded,'pi-chevron-down':item.expanded}"></span
                        ><span class="ui-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon"></span
                        ><span class="ui-menuitem-text">{{item.label}}</span>
                        </a>
                        <a *ngIf="item.routerLink" [routerLink]="item.routerLink" [queryParams]="item.queryParams" [routerLinkActive]="'ui-menuitem-link-active'" [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}"
                           (click)="handleClick($event,item)" [attr.target]="item.target" [attr.title]="item.title" class="ui-panelmenu-header-link" [attr.id]="item.id" [attr.tabindex]="item.disabled ? null : '0'"
                           [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state">
                        <span *ngIf="item.items" class="ui-panelmenu-icon pi pi-fw" [ngClass]="{'pi-chevron-right':!item.expanded,'pi-chevron-down':item.expanded}"></span
                        ><span class="ui-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon"></span
                        ><span class="ui-menuitem-text">{{item.label}}</span>
                        </a>
                    </div>
                    <div *ngIf="item.items" class="ui-panelmenu-content-wrapper" [@rootItem]="item.expanded ? {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*'}} : {value: 'hidden', params: {transitionParams: transitionOptions, height: '0'}}"  (@rootItem.done)="onToggleDone()"
                         [ngClass]="{'ui-panelmenu-content-wrapper-overflown': !item.expanded||animating}">
                        <div class="ui-panelmenu-content ui-widget-content" role="region" [attr.id]="item.id +'_content' " [attr.aria-labelledby]="item.id +'_header'">
                            <p-panelMenuSub [item]="item" [expanded]="true" [transitionOptions]="transitionOptions" class="ui-panelmenu-root-submenu"></p-panelMenuSub>
                        </div>
                    </div>
                </div>
            </ng-container>
        </div>
    `,
        animations: [
            trigger('rootItem', [
                state('hidden', style({
                    height: '0px'
                })),
                state('void', style({
                    height: '{{height}}'
                }), { params: { height: '0' } }),
                state('visible', style({
                    height: '*'
                })),
                transition('visible => hidden', animate('{{transitionParams}}')),
                transition('hidden => visible', animate('{{transitionParams}}')),
                transition('void => hidden', animate('{{transitionParams}}')),
                transition('void => visible', animate('{{transitionParams}}'))
            ])
        ],
        changeDetection: ChangeDetectionStrategy.Default
    })
], PanelMenu);
export { PanelMenu };
let PanelMenuModule = class PanelMenuModule {
};
PanelMenuModule = __decorate([
    NgModule({
        imports: [CommonModule, RouterModule],
        exports: [PanelMenu, RouterModule],
        declarations: [PanelMenu, PanelMenuSub]
    })
], PanelMenuModule);
export { PanelMenuModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWxtZW51LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9wYW5lbG1lbnUvIiwic291cmNlcyI6WyJwYW5lbG1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLGlCQUFpQixFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pHLE9BQU8sRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDM0UsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUU3QyxNQUFNLE9BQU8saUJBQWlCO0lBRTFCLFlBQW9CLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO0lBQUcsQ0FBQztJQUU5QyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUk7UUFDbkIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFekIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDWCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDMUI7UUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNULGFBQWEsRUFBRSxLQUFLO2dCQUNwQixJQUFJLEVBQUUsSUFBSTthQUNiLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztDQUNKO0FBK0NELElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQWEsU0FB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dXQsQ2hhbmdlRGV0ZWN0b3JSZWYsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHt0cmlnZ2VyLHN0YXRlLHN0eWxlLHRyYW5zaXRpb24sYW5pbWF0ZX0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TWVudUl0ZW19IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7Um91dGVyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5leHBvcnQgY2xhc3MgQmFzZVBhbmVsTWVudUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuICAgICAgICBcbiAgICBoYW5kbGVDbGljayhldmVudCwgaXRlbSkge1xuICAgICAgICBpZiAoaXRlbS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaXRlbS5leHBhbmRlZCA9ICFpdGVtLmV4cGFuZGVkO1xuICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoIWl0ZW0udXJsKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgIGlmIChpdGVtLmNvbW1hbmQpIHtcbiAgICAgICAgICAgIGl0ZW0uY29tbWFuZCh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgaXRlbTogaXRlbVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1wYW5lbE1lbnVTdWInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDx1bCBjbGFzcz1cInVpLXN1Ym1lbnUtbGlzdFwiIFtAc3VibWVudV09XCJleHBhbmRlZCA/IHt2YWx1ZTogJ3Zpc2libGUnLCBwYXJhbXM6IHt0cmFuc2l0aW9uUGFyYW1zOiB0cmFuc2l0aW9uT3B0aW9ucywgaGVpZ2h0OiAnKid9fSA6IHt2YWx1ZTogJ2hpZGRlbicsIHBhcmFtczoge3RyYW5zaXRpb25QYXJhbXM6IHRyYW5zaXRpb25PcHRpb25zLCBoZWlnaHQ6ICcwJ319XCIgcm9sZT1cInRyZWVcIj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtY2hpbGQgW25nRm9yT2ZdPVwiaXRlbS5pdGVtc1wiPlxuICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cImNoaWxkLnNlcGFyYXRvclwiIGNsYXNzPVwidWktbWVudS1zZXBhcmF0b3IgdWktd2lkZ2V0LWNvbnRlbnRcIiByb2xlPVwic2VwYXJhdG9yXCI+XG4gICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwiIWNoaWxkLnNlcGFyYXRvclwiIGNsYXNzPVwidWktbWVudWl0ZW0gdWktY29ybmVyLWFsbFwiIFtuZ0NsYXNzXT1cImNoaWxkLnN0eWxlQ2xhc3NcIiBbY2xhc3MudWktaGVscGVyLWhpZGRlbl09XCJjaGlsZC52aXNpYmxlID09PSBmYWxzZVwiIFtuZ1N0eWxlXT1cImNoaWxkLnN0eWxlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiIWNoaWxkLnJvdXRlckxpbmtcIiBbYXR0ci5ocmVmXT1cImNoaWxkLnVybFwiIGNsYXNzPVwidWktbWVudWl0ZW0tbGluayB1aS1jb3JuZXItYWxsXCIgW2F0dHIudGFiaW5kZXhdPVwiIWl0ZW0uZXhwYW5kZWQgPyBudWxsIDogY2hpbGQuZGlzYWJsZWQgPyBudWxsIDogJzAnXCIgW2F0dHIuaWRdPVwiY2hpbGQuaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1kaXNhYmxlZCc6Y2hpbGQuZGlzYWJsZWQsICd1aS1zdGF0ZS1hY3RpdmUnOiBjaGlsZC5leHBhbmRlZH1cIiByb2xlPVwidHJlZWl0ZW1cIiBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cImNoaWxkLmV4cGFuZGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQsY2hpbGQpXCIgW2F0dHIudGFyZ2V0XT1cImNoaWxkLnRhcmdldFwiIFthdHRyLnRpdGxlXT1cImNoaWxkLnRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXBhbmVsbWVudS1pY29uIHBpIHBpLWZ3XCIgW25nQ2xhc3NdPVwieydwaS1jYXJldC1yaWdodCc6IWNoaWxkLmV4cGFuZGVkLCdwaS1jYXJldC1kb3duJzpjaGlsZC5leHBhbmRlZH1cIiAqbmdJZj1cImNoaWxkLml0ZW1zXCI+PC9zcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICA+PHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS1pY29uXCIgW25nQ2xhc3NdPVwiY2hpbGQuaWNvblwiICpuZ0lmPVwiY2hpbGQuaWNvblwiPjwvc3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgPjxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0tdGV4dFwiPnt7Y2hpbGQubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cImNoaWxkLnJvdXRlckxpbmtcIiBbcm91dGVyTGlua109XCJjaGlsZC5yb3V0ZXJMaW5rXCIgW3F1ZXJ5UGFyYW1zXT1cImNoaWxkLnF1ZXJ5UGFyYW1zXCIgW3JvdXRlckxpbmtBY3RpdmVdPVwiJ3VpLW1lbnVpdGVtLWxpbmstYWN0aXZlJ1wiIFtyb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc109XCJjaGlsZC5yb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc3x8e2V4YWN0OmZhbHNlfVwiIGNsYXNzPVwidWktbWVudWl0ZW0tbGluayB1aS1jb3JuZXItYWxsXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWRpc2FibGVkJzpjaGlsZC5kaXNhYmxlZH1cIiBbYXR0ci50YWJpbmRleF09XCIhaXRlbS5leHBhbmRlZCA/IG51bGwgOiBjaGlsZC5kaXNhYmxlZCA/IG51bGwgOiAnMCdcIiBbYXR0ci5pZF09XCJjaGlsZC5pZFwiIHJvbGU9XCJ0cmVlaXRlbVwiIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiY2hpbGQuZXhwYW5kZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudCxjaGlsZClcIiBbYXR0ci50YXJnZXRdPVwiY2hpbGQudGFyZ2V0XCIgW2F0dHIudGl0bGVdPVwiY2hpbGQudGl0bGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2ZyYWdtZW50XT1cImNoaWxkLmZyYWdtZW50XCIgW3F1ZXJ5UGFyYW1zSGFuZGxpbmddPVwiY2hpbGQucXVlcnlQYXJhbXNIYW5kbGluZ1wiIFtwcmVzZXJ2ZUZyYWdtZW50XT1cImNoaWxkLnByZXNlcnZlRnJhZ21lbnRcIiBbc2tpcExvY2F0aW9uQ2hhbmdlXT1cImNoaWxkLnNraXBMb2NhdGlvbkNoYW5nZVwiIFtyZXBsYWNlVXJsXT1cImNoaWxkLnJlcGxhY2VVcmxcIiBbc3RhdGVdPVwiY2hpbGQuc3RhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktcGFuZWxtZW51LWljb24gcGkgcGktZndcIiBbbmdDbGFzc109XCJ7J3BpLWNhcmV0LXJpZ2h0JzohY2hpbGQuZXhwYW5kZWQsJ3BpLWNhcmV0LWRvd24nOmNoaWxkLmV4cGFuZGVkfVwiICpuZ0lmPVwiY2hpbGQuaXRlbXNcIj48L3NwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgID48c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLWljb25cIiBbbmdDbGFzc109XCJjaGlsZC5pY29uXCIgKm5nSWY9XCJjaGlsZC5pY29uXCI+PC9zcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICA+PHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS10ZXh0XCI+e3tjaGlsZC5sYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDxwLXBhbmVsTWVudVN1YiBbaXRlbV09XCJjaGlsZFwiIFtleHBhbmRlZF09XCJjaGlsZC5leHBhbmRlZFwiIFt0cmFuc2l0aW9uT3B0aW9uc109XCJ0cmFuc2l0aW9uT3B0aW9uc1wiICpuZ0lmPVwiY2hpbGQuaXRlbXNcIj48L3AtcGFuZWxNZW51U3ViPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L3VsPlxuICAgIGAsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdzdWJtZW51JywgW1xuICAgICAgICAgICAgc3RhdGUoJ2hpZGRlbicsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcwcHgnXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICBzdGF0ZSgndm9pZCcsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICd7e2hlaWdodH19J1xuICAgICAgICAgICAgfSksIHtwYXJhbXM6IHtoZWlnaHQ6ICcwJ319KSxcbiAgICAgICAgICAgIHN0YXRlKCd2aXNpYmxlJywgc3R5bGUoe1xuICAgICAgICAgICAgICAgIGhlaWdodDogJyonXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IGhpZGRlbicsIGFuaW1hdGUoJ3t7dHJhbnNpdGlvblBhcmFtc319JykpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbignaGlkZGVuID0+IHZpc2libGUnLCBhbmltYXRlKCd7e3RyYW5zaXRpb25QYXJhbXN9fScpKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gaGlkZGVuJywgYW5pbWF0ZSgne3t0cmFuc2l0aW9uUGFyYW1zfX0nKSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHZpc2libGUnLCBhbmltYXRlKCd7e3RyYW5zaXRpb25QYXJhbXN9fScpKVxuICAgICAgICBdKVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgUGFuZWxNZW51U3ViIGV4dGVuZHMgQmFzZVBhbmVsTWVudUl0ZW0ge1xuICAgIFxuICAgIEBJbnB1dCgpIGl0ZW06IE1lbnVJdGVtO1xuICAgIFxuICAgIEBJbnB1dCgpIGV4cGFuZGVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgdHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgc3VwZXIocmVmKTtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1wYW5lbE1lbnUnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtuZ0NsYXNzXT1cIid1aS1wYW5lbG1lbnUgdWktd2lkZ2V0J1wiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXRlbSBvZiBtb2RlbDtsZXQgZj1maXJzdDtsZXQgbD1sYXN0O1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1wYW5lbG1lbnUtcGFuZWxcIiBbbmdDbGFzc109XCJ7J3VpLWhlbHBlci1oaWRkZW4nOiBpdGVtLnZpc2libGUgPT09IGZhbHNlfVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInsndWktd2lkZ2V0IHVpLXBhbmVsbWVudS1oZWFkZXIgdWktc3RhdGUtZGVmYXVsdCc6dHJ1ZSwndWktY29ybmVyLXRvcCc6ZiwndWktY29ybmVyLWJvdHRvbSc6bCYmIWl0ZW0uZXhwYW5kZWQsXG4gICAgICAgICAgICAgICAgICAgICd1aS1zdGF0ZS1hY3RpdmUnOml0ZW0uZXhwYW5kZWQsJ3VpLXN0YXRlLWRpc2FibGVkJzppdGVtLmRpc2FibGVkfVwiIFtjbGFzc109XCJpdGVtLnN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJpdGVtLnN0eWxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cIiFpdGVtLnJvdXRlckxpbmtcIiBbYXR0ci5ocmVmXT1cIml0ZW0udXJsXCIgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudCxpdGVtKVwiIFthdHRyLnRhYmluZGV4XT1cIml0ZW0uZGlzYWJsZWQgPyBudWxsIDogJzAnXCIgW2F0dHIuaWRdPVwiaXRlbS5pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YXJnZXRdPVwiaXRlbS50YXJnZXRcIiBbYXR0ci50aXRsZV09XCJpdGVtLnRpdGxlXCIgY2xhc3M9XCJ1aS1wYW5lbG1lbnUtaGVhZGVyLWxpbmtcIiBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cIml0ZW0uZXhwYW5kZWRcIiBbYXR0ci5pZF09XCJpdGVtLmlkICsgJ19oZWFkZXInXCIgW2F0dHIuYXJpYS1jb250cm9sc109XCJpdGVtLmlkICsnX2NvbnRlbnQnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIml0ZW0uaXRlbXNcIiBjbGFzcz1cInVpLXBhbmVsbWVudS1pY29uIHBpIHBpLWZ3XCIgW25nQ2xhc3NdPVwieydwaS1jaGV2cm9uLXJpZ2h0JzohaXRlbS5leHBhbmRlZCwncGktY2hldnJvbi1kb3duJzppdGVtLmV4cGFuZGVkfVwiPjwvc3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgPjxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0taWNvblwiIFtuZ0NsYXNzXT1cIml0ZW0uaWNvblwiICpuZ0lmPVwiaXRlbS5pY29uXCI+PC9zcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICA+PHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS10ZXh0XCI+e3tpdGVtLmxhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cIml0ZW0ucm91dGVyTGlua1wiIFtyb3V0ZXJMaW5rXT1cIml0ZW0ucm91dGVyTGlua1wiIFtxdWVyeVBhcmFtc109XCJpdGVtLnF1ZXJ5UGFyYW1zXCIgW3JvdXRlckxpbmtBY3RpdmVdPVwiJ3VpLW1lbnVpdGVtLWxpbmstYWN0aXZlJ1wiIFtyb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc109XCJpdGVtLnJvdXRlckxpbmtBY3RpdmVPcHRpb25zfHx7ZXhhY3Q6ZmFsc2V9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQsaXRlbSlcIiBbYXR0ci50YXJnZXRdPVwiaXRlbS50YXJnZXRcIiBbYXR0ci50aXRsZV09XCJpdGVtLnRpdGxlXCIgY2xhc3M9XCJ1aS1wYW5lbG1lbnUtaGVhZGVyLWxpbmtcIiBbYXR0ci5pZF09XCJpdGVtLmlkXCIgW2F0dHIudGFiaW5kZXhdPVwiaXRlbS5kaXNhYmxlZCA/IG51bGwgOiAnMCdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW2ZyYWdtZW50XT1cIml0ZW0uZnJhZ21lbnRcIiBbcXVlcnlQYXJhbXNIYW5kbGluZ109XCJpdGVtLnF1ZXJ5UGFyYW1zSGFuZGxpbmdcIiBbcHJlc2VydmVGcmFnbWVudF09XCJpdGVtLnByZXNlcnZlRnJhZ21lbnRcIiBbc2tpcExvY2F0aW9uQ2hhbmdlXT1cIml0ZW0uc2tpcExvY2F0aW9uQ2hhbmdlXCIgW3JlcGxhY2VVcmxdPVwiaXRlbS5yZXBsYWNlVXJsXCIgW3N0YXRlXT1cIml0ZW0uc3RhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXRlbS5pdGVtc1wiIGNsYXNzPVwidWktcGFuZWxtZW51LWljb24gcGkgcGktZndcIiBbbmdDbGFzc109XCJ7J3BpLWNoZXZyb24tcmlnaHQnOiFpdGVtLmV4cGFuZGVkLCdwaS1jaGV2cm9uLWRvd24nOml0ZW0uZXhwYW5kZWR9XCI+PC9zcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICA+PHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS1pY29uXCIgW25nQ2xhc3NdPVwiaXRlbS5pY29uXCIgKm5nSWY9XCJpdGVtLmljb25cIj48L3NwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgID48c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLXRleHRcIj57e2l0ZW0ubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJpdGVtLml0ZW1zXCIgY2xhc3M9XCJ1aS1wYW5lbG1lbnUtY29udGVudC13cmFwcGVyXCIgW0Byb290SXRlbV09XCJpdGVtLmV4cGFuZGVkID8ge3ZhbHVlOiAndmlzaWJsZScsIHBhcmFtczoge3RyYW5zaXRpb25QYXJhbXM6IGFuaW1hdGluZyA/IHRyYW5zaXRpb25PcHRpb25zIDogJzBtcycsIGhlaWdodDogJyonfX0gOiB7dmFsdWU6ICdoaWRkZW4nLCBwYXJhbXM6IHt0cmFuc2l0aW9uUGFyYW1zOiB0cmFuc2l0aW9uT3B0aW9ucywgaGVpZ2h0OiAnMCd9fVwiICAoQHJvb3RJdGVtLmRvbmUpPVwib25Ub2dnbGVEb25lKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktcGFuZWxtZW51LWNvbnRlbnQtd3JhcHBlci1vdmVyZmxvd24nOiAhaXRlbS5leHBhbmRlZHx8YW5pbWF0aW5nfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXBhbmVsbWVudS1jb250ZW50IHVpLXdpZGdldC1jb250ZW50XCIgcm9sZT1cInJlZ2lvblwiIFthdHRyLmlkXT1cIml0ZW0uaWQgKydfY29udGVudCcgXCIgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cIml0ZW0uaWQgKydfaGVhZGVyJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwLXBhbmVsTWVudVN1YiBbaXRlbV09XCJpdGVtXCIgW2V4cGFuZGVkXT1cInRydWVcIiBbdHJhbnNpdGlvbk9wdGlvbnNdPVwidHJhbnNpdGlvbk9wdGlvbnNcIiBjbGFzcz1cInVpLXBhbmVsbWVudS1yb290LXN1Ym1lbnVcIj48L3AtcGFuZWxNZW51U3ViPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdyb290SXRlbScsIFtcbiAgICAgICAgICAgIHN0YXRlKCdoaWRkZW4nLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnMHB4J1xuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgc3RhdGUoJ3ZvaWQnLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAne3toZWlnaHR9fSdcbiAgICAgICAgICAgIH0pLCB7cGFyYW1zOiB7aGVpZ2h0OiAnMCd9fSksXG4gICAgICAgICAgICBzdGF0ZSgndmlzaWJsZScsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcqJ1xuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndmlzaWJsZSA9PiBoaWRkZW4nLCBhbmltYXRlKCd7e3RyYW5zaXRpb25QYXJhbXN9fScpKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ2hpZGRlbiA9PiB2aXNpYmxlJywgYW5pbWF0ZSgne3t0cmFuc2l0aW9uUGFyYW1zfX0nKSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IGhpZGRlbicsIGFuaW1hdGUoJ3t7dHJhbnNpdGlvblBhcmFtc319JykpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiB2aXNpYmxlJywgYW5pbWF0ZSgne3t0cmFuc2l0aW9uUGFyYW1zfX0nKSlcbiAgICAgICAgXSlcbiAgICBdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxufSlcbmV4cG9ydCBjbGFzcyBQYW5lbE1lbnUgZXh0ZW5kcyBCYXNlUGFuZWxNZW51SXRlbSB7XG4gICAgXG4gICAgQElucHV0KCkgbW9kZWw6IE1lbnVJdGVtW107XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgbXVsdGlwbGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgdHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICc0MDBtcyBjdWJpYy1iZXppZXIoMC44NiwgMCwgMC4wNywgMSknO1xuICAgIFxuICAgIHB1YmxpYyBhbmltYXRpbmc6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihyZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHN1cGVyKHJlZik7XG4gICAgfVxuICAgICAgICAgICAgICAgIFxuICAgIGNvbGxhcHNlQWxsKCkge1xuICAgIFx0Zm9yKGxldCBpdGVtIG9mIHRoaXMubW9kZWwpIHtcbiAgICBcdFx0aWYgKGl0ZW0uZXhwYW5kZWQpIHtcbiAgICBcdFx0XHRpdGVtLmV4cGFuZGVkID0gZmFsc2U7XG4gICAgXHRcdH1cbiAgICBcdH1cbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayhldmVudCwgaXRlbSkge1xuICAgIFx0aWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICBmb3IobGV0IG1vZGVsSXRlbSBvZiB0aGlzLm1vZGVsKSB7XG4gICAgICAgIFx0XHRpZiAoaXRlbSAhPT0gbW9kZWxJdGVtICYmIG1vZGVsSXRlbS5leHBhbmRlZCkge1xuICAgICAgICBcdFx0XHRtb2RlbEl0ZW0uZXhwYW5kZWQgPSBmYWxzZTtcbiAgICAgICAgXHRcdH1cbiAgICAgICAgXHR9XG4gICAgXHR9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmFuaW1hdGluZyA9IHRydWU7XG4gICAgICAgIHN1cGVyLmhhbmRsZUNsaWNrKGV2ZW50LCBpdGVtKTtcbiAgICB9XG4gICAgXG4gICAgb25Ub2dnbGVEb25lKCkge1xuICAgICAgICB0aGlzLmFuaW1hdGluZyA9IGZhbHNlO1xuICAgIH1cblxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsUm91dGVyTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbUGFuZWxNZW51LFJvdXRlck1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbUGFuZWxNZW51LFBhbmVsTWVudVN1Yl1cbn0pXG5leHBvcnQgY2xhc3MgUGFuZWxNZW51TW9kdWxlIHsgfVxuIl19