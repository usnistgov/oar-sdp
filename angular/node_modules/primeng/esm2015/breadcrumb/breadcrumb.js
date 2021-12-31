var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
export { Breadcrumb };
let BreadcrumbModule = class BreadcrumbModule {
};
BreadcrumbModule = __decorate([
    NgModule({
        imports: [CommonModule, RouterModule],
        exports: [Breadcrumb, RouterModule],
        declarations: [Breadcrumb]
    })
], BreadcrumbModule);
export { BreadcrumbModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWRjcnVtYi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvYnJlYWRjcnVtYi8iLCJzb3VyY2VzIjpbImJyZWFkY3J1bWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckcsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQXdDN0MsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVTtJQUF2QjtRQVVjLGdCQUFXLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUE4QmxFLENBQUM7SUE1QkcsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFjO1FBQzNCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNYLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMxQjtRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1QsYUFBYSxFQUFFLEtBQUs7Z0JBQ3BCLElBQUksRUFBRSxJQUFJO2FBQ2IsQ0FBQyxDQUFDO1NBQ047UUFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUNsQixhQUFhLEVBQUUsS0FBSztZQUNwQixJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBSztRQUNiLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwQztJQUNMLENBQUM7Q0FDSixDQUFBO0FBdENZO0lBQVIsS0FBSyxFQUFFO3lDQUFtQjtBQUVsQjtJQUFSLEtBQUssRUFBRTt5Q0FBWTtBQUVYO0lBQVIsS0FBSyxFQUFFOzhDQUFvQjtBQUVuQjtJQUFSLEtBQUssRUFBRTt3Q0FBZ0I7QUFFZDtJQUFULE1BQU0sRUFBRTsrQ0FBcUQ7QUFWckQsVUFBVTtJQXRDdEIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGNBQWM7UUFDeEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FpQ1Q7UUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztLQUNuRCxDQUFDO0dBQ1csVUFBVSxDQXdDdEI7U0F4Q1ksVUFBVTtBQStDdkIsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7Q0FBSSxDQUFBO0FBQXBCLGdCQUFnQjtJQUw1QixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUMsWUFBWSxDQUFDO1FBQ3BDLE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBQyxZQUFZLENBQUM7UUFDbEMsWUFBWSxFQUFFLENBQUMsVUFBVSxDQUFDO0tBQzdCLENBQUM7R0FDVyxnQkFBZ0IsQ0FBSTtTQUFwQixnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge01lbnVJdGVtfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQge1JvdXRlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWJyZWFkY3J1bWInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtuZ0NsYXNzXT1cIid1aS1icmVhZGNydW1iIHVpLXdpZGdldCB1aS13aWRnZXQtaGVhZGVyIHVpLWhlbHBlci1jbGVhcmZpeCB1aS1jb3JuZXItYWxsJ1wiPlxuICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgIDxsaSBbY2xhc3NdPVwiaG9tZS5zdHlsZUNsYXNzXCIgW25nQ2xhc3NdPVwiJ3VpLWJyZWFkY3J1bWItaG9tZSdcIiBbbmdTdHlsZV09XCJob21lLnN0eWxlXCIgKm5nSWY9XCJob21lXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiIWhvbWUucm91dGVyTGlua1wiIFtocmVmXT1cImhvbWUudXJsID8gaG9tZS51cmwgOiBudWxsXCIgY2xhc3M9XCJ1aS1tZW51aXRlbS1saW5rXCIgKGNsaWNrKT1cIml0ZW1DbGljaygkZXZlbnQsIGhvbWUpXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWRpc2FibGVkJzpob21lLmRpc2FibGVkfVwiIFthdHRyLnRhcmdldF09XCJob21lLnRhcmdldFwiIFthdHRyLnRpdGxlXT1cImhvbWUudGl0bGVcIiBbYXR0ci5pZF09XCJob21lLmlkXCJbYXR0ci50YWJpbmRleF09XCJob21lLmRpc2FibGVkID8gbnVsbCA6ICcwJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gW25nQ2xhc3NdPVwiaG9tZS5pY29ufHwncGkgcGktaG9tZSdcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCJob21lLnJvdXRlckxpbmtcIiBbcm91dGVyTGlua109XCJob21lLnJvdXRlckxpbmtcIiBbcXVlcnlQYXJhbXNdPVwiaG9tZS5xdWVyeVBhcmFtc1wiIFtyb3V0ZXJMaW5rQWN0aXZlXT1cIid1aS1tZW51aXRlbS1saW5rLWFjdGl2ZSdcIiBbcm91dGVyTGlua0FjdGl2ZU9wdGlvbnNdPVwiaG9tZS5yb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc3x8e2V4YWN0OmZhbHNlfVwiIGNsYXNzPVwidWktbWVudWl0ZW0tbGlua1wiIChjbGljayk9XCJpdGVtQ2xpY2soJGV2ZW50LCBob21lKVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1kaXNhYmxlZCc6aG9tZS5kaXNhYmxlZH1cIiBbYXR0ci50YXJnZXRdPVwiaG9tZS50YXJnZXRcIiBbYXR0ci50aXRsZV09XCJob21lLnRpdGxlXCIgW2F0dHIuaWRdPVwiaG9tZS5pZFwiIFthdHRyLnRhYmluZGV4XT1cImhvbWUuZGlzYWJsZWQgPyBudWxsIDogJzAnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtmcmFnbWVudF09XCJob21lLmZyYWdtZW50XCIgW3F1ZXJ5UGFyYW1zSGFuZGxpbmddPVwiaG9tZS5xdWVyeVBhcmFtc0hhbmRsaW5nXCIgW3ByZXNlcnZlRnJhZ21lbnRdPVwiaG9tZS5wcmVzZXJ2ZUZyYWdtZW50XCIgW3NraXBMb2NhdGlvbkNoYW5nZV09XCJob21lLnNraXBMb2NhdGlvbkNoYW5nZVwiIFtyZXBsYWNlVXJsXT1cImhvbWUucmVwbGFjZVVybFwiIFtzdGF0ZV09XCJob21lLnN0YXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBbbmdDbGFzc109XCJob21lLmljb258fCdwaSBwaS1ob21lJ1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwidWktYnJlYWRjcnVtYi1jaGV2cm9uIHBpIHBpLWNoZXZyb24tcmlnaHRcIiAqbmdJZj1cIm1vZGVsJiZob21lXCI+PC9saT5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWl0ZW0gbGV0LWVuZD1cImxhc3RcIiBbbmdGb3JPZl09XCJtb2RlbFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGkgW2NsYXNzXT1cIml0ZW0uc3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cIml0ZW0uc3R5bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiIWl0ZW0ucm91dGVyTGlua1wiIFthdHRyLmhyZWZdPVwiaXRlbS51cmwgPyBpdGVtLnVybCA6IG51bGxcIiBjbGFzcz1cInVpLW1lbnVpdGVtLWxpbmtcIiAoY2xpY2spPVwiaXRlbUNsaWNrKCRldmVudCwgaXRlbSlcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWRpc2FibGVkJzppdGVtLmRpc2FibGVkfVwiIFthdHRyLnRhcmdldF09XCJpdGVtLnRhcmdldFwiIFthdHRyLnRpdGxlXT1cIml0ZW0udGl0bGVcIiBbYXR0ci5pZF09XCJpdGVtLmlkXCIgW2F0dHIudGFiaW5kZXhdPVwiaXRlbS5kaXNhYmxlZCA/IG51bGwgOiAnMCdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIml0ZW0uaWNvblwiIGNsYXNzPVwidWktbWVudWl0ZW0taWNvblwiIFtuZ0NsYXNzXT1cIml0ZW0uaWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLXRleHRcIj57e2l0ZW0ubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiaXRlbS5yb3V0ZXJMaW5rXCIgW3JvdXRlckxpbmtdPVwiaXRlbS5yb3V0ZXJMaW5rXCIgW3F1ZXJ5UGFyYW1zXT1cIml0ZW0ucXVlcnlQYXJhbXNcIiBbcm91dGVyTGlua0FjdGl2ZV09XCIndWktbWVudWl0ZW0tbGluay1hY3RpdmUnXCIgIFtyb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc109XCJpdGVtLnJvdXRlckxpbmtBY3RpdmVPcHRpb25zfHx7ZXhhY3Q6ZmFsc2V9XCIgY2xhc3M9XCJ1aS1tZW51aXRlbS1saW5rXCIgKGNsaWNrKT1cIml0ZW1DbGljaygkZXZlbnQsIGl0ZW0pXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1kaXNhYmxlZCc6aXRlbS5kaXNhYmxlZH1cIiBbYXR0ci50YXJnZXRdPVwiaXRlbS50YXJnZXRcIiBbYXR0ci50aXRsZV09XCJpdGVtLnRpdGxlXCIgW2F0dHIuaWRdPVwiaXRlbS5pZFwiIFthdHRyLnRhYmluZGV4XT1cIml0ZW0uZGlzYWJsZWQgPyBudWxsIDogJzAnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZnJhZ21lbnRdPVwiaXRlbS5mcmFnbWVudFwiIFtxdWVyeVBhcmFtc0hhbmRsaW5nXT1cIml0ZW0ucXVlcnlQYXJhbXNIYW5kbGluZ1wiIFtwcmVzZXJ2ZUZyYWdtZW50XT1cIml0ZW0ucHJlc2VydmVGcmFnbWVudFwiIFtza2lwTG9jYXRpb25DaGFuZ2VdPVwiaXRlbS5za2lwTG9jYXRpb25DaGFuZ2VcIiBbcmVwbGFjZVVybF09XCJpdGVtLnJlcGxhY2VVcmxcIiBbc3RhdGVdPVwiaXRlbS5zdGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXRlbS5pY29uXCIgY2xhc3M9XCJ1aS1tZW51aXRlbS1pY29uXCIgW25nQ2xhc3NdPVwiaXRlbS5pY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0tdGV4dFwiPnt7aXRlbS5sYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJ1aS1icmVhZGNydW1iLWNoZXZyb24gcGkgcGktY2hldnJvbi1yaWdodFwiICpuZ0lmPVwiIWVuZFwiPjwvbGk+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XG59KVxuZXhwb3J0IGNsYXNzIEJyZWFkY3J1bWIge1xuXG4gICAgQElucHV0KCkgbW9kZWw6IE1lbnVJdGVtW107XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIGhvbWU6IE1lbnVJdGVtO1xuXG4gICAgQE91dHB1dCgpIG9uSXRlbUNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgXG4gICAgaXRlbUNsaWNrKGV2ZW50LCBpdGVtOiBNZW51SXRlbSnCoHtcbiAgICAgICAgaWYgKGl0ZW0uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICghaXRlbS51cmwpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChpdGVtLmNvbW1hbmQpIHsgICAgICAgICAgICBcbiAgICAgICAgICAgIGl0ZW0uY29tbWFuZCh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgaXRlbTogaXRlbVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uSXRlbUNsaWNrLmVtaXQoe1xuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICBpdGVtOiBpdGVtXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBvbkhvbWVDbGljayhldmVudCkge1xuICAgICAgICBpZiAodGhpcy5ob21lKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1DbGljayhldmVudCwgdGhpcy5ob21lKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLFJvdXRlck1vZHVsZV0sXG4gICAgZXhwb3J0czogW0JyZWFkY3J1bWIsUm91dGVyTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtCcmVhZGNydW1iXVxufSlcbmV4cG9ydCBjbGFzcyBCcmVhZGNydW1iTW9kdWxlIHsgfVxuIl19