/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NgbNav } from './nav';
/**
 * The outlet where currently active nav content will be displayed.
 *
 * \@since 5.2.0
 */
export class NgbNavOutlet {
}
NgbNavOutlet.decorators = [
    { type: Component, args: [{
                selector: '[ngbNavOutlet]',
                host: { '[class.tab-content]': 'true' },
                encapsulation: ViewEncapsulation.None,
                template: `
      <ng-template ngFor let-item [ngForOf]="nav.items">
          <div class="tab-pane"
               *ngIf="item.isPanelInDom()"
               [id]="item.panelDomId"
               [class.active]="item.active"
               [attr.role]="paneRole ? paneRole : nav.roles ? 'tabpanel' : undefined"
               [attr.aria-labelledby]="item.domId">
              <ng-template [ngTemplateOutlet]="item.contentTpl?.templateRef" [ngTemplateOutletContext]="{$implicit: item.active}"></ng-template>
          </div>
      </ng-template>
  `
            }] }
];
NgbNavOutlet.propDecorators = {
    paneRole: [{ type: Input }],
    nav: [{ type: Input, args: ['ngbNavOutlet',] }]
};
if (false) {
    /**
     * A role to set on the nav pane
     * @type {?}
     */
    NgbNavOutlet.prototype.paneRole;
    /**
     * Reference to the `NgbNav`
     * @type {?}
     */
    NgbNavOutlet.prototype.nav;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LW91dGxldC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsibmF2L25hdi1vdXRsZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xFLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxPQUFPLENBQUM7Ozs7OztBQXdCN0IsTUFBTSxPQUFPLFlBQVk7OztZQWpCeEIsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLElBQUksRUFBRSxFQUFDLHFCQUFxQixFQUFFLE1BQU0sRUFBQztnQkFDckMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7R0FXVDthQUNGOzs7dUJBS0UsS0FBSztrQkFLTCxLQUFLLFNBQUMsY0FBYzs7Ozs7OztJQUxyQixnQ0FBa0I7Ozs7O0lBS2xCLDJCQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ2JOYXZ9IGZyb20gJy4vbmF2JztcblxuLyoqXG4gKiBUaGUgb3V0bGV0IHdoZXJlIGN1cnJlbnRseSBhY3RpdmUgbmF2IGNvbnRlbnQgd2lsbCBiZSBkaXNwbGF5ZWQuXG4gKlxuICogQHNpbmNlIDUuMi4wXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1tuZ2JOYXZPdXRsZXRdJyxcbiAgaG9zdDogeydbY2xhc3MudGFiLWNvbnRlbnRdJzogJ3RydWUnfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtaXRlbSBbbmdGb3JPZl09XCJuYXYuaXRlbXNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFiLXBhbmVcIlxuICAgICAgICAgICAgICAgKm5nSWY9XCJpdGVtLmlzUGFuZWxJbkRvbSgpXCJcbiAgICAgICAgICAgICAgIFtpZF09XCJpdGVtLnBhbmVsRG9tSWRcIlxuICAgICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJpdGVtLmFjdGl2ZVwiXG4gICAgICAgICAgICAgICBbYXR0ci5yb2xlXT1cInBhbmVSb2xlID8gcGFuZVJvbGUgOiBuYXYucm9sZXMgPyAndGFicGFuZWwnIDogdW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJpdGVtLmRvbUlkXCI+XG4gICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJpdGVtLmNvbnRlbnRUcGw/LnRlbXBsYXRlUmVmXCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInskaW1wbGljaXQ6IGl0ZW0uYWN0aXZlfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE5nYk5hdk91dGxldCB7XG4gIC8qKlxuICAgKiBBIHJvbGUgdG8gc2V0IG9uIHRoZSBuYXYgcGFuZVxuICAgKi9cbiAgQElucHV0KCkgcGFuZVJvbGU7XG5cbiAgLyoqXG4gICAqIFJlZmVyZW5jZSB0byB0aGUgYE5nYk5hdmBcbiAgICovXG4gIEBJbnB1dCgnbmdiTmF2T3V0bGV0JykgbmF2OiBOZ2JOYXY7XG59XG4iXX0=