import { __decorate } from "tslib";
import { Component, Input, ViewEncapsulation } from '@angular/core';
/**
 * The outlet where currently active nav content will be displayed.
 *
 * @since 5.2.0
 */
let NgbNavOutlet = class NgbNavOutlet {
};
__decorate([
    Input()
], NgbNavOutlet.prototype, "paneRole", void 0);
__decorate([
    Input('ngbNavOutlet')
], NgbNavOutlet.prototype, "nav", void 0);
NgbNavOutlet = __decorate([
    Component({
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
              <ng-template [ngTemplateOutlet]="item.contentTpl?.templateRef || null"
                           [ngTemplateOutletContext]="{$implicit: item.active}"></ng-template>
          </div>
      </ng-template>
  `
    })
], NgbNavOutlet);
export { NgbNavOutlet };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LW91dGxldC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsibmF2L25hdi1vdXRsZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBR2xFOzs7O0dBSUc7QUFtQkgsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtDQVV4QixDQUFBO0FBTlU7SUFBUixLQUFLLEVBQUU7OENBQVU7QUFLSztJQUF0QixLQUFLLENBQUMsY0FBYyxDQUFDO3lDQUFhO0FBVHhCLFlBQVk7SUFsQnhCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsSUFBSSxFQUFFLEVBQUMscUJBQXFCLEVBQUUsTUFBTSxFQUFDO1FBQ3JDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1FBQ3JDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7O0dBWVQ7S0FDRixDQUFDO0dBQ1csWUFBWSxDQVV4QjtTQVZZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdiTmF2fSBmcm9tICcuL25hdic7XG5cbi8qKlxuICogVGhlIG91dGxldCB3aGVyZSBjdXJyZW50bHkgYWN0aXZlIG5hdiBjb250ZW50IHdpbGwgYmUgZGlzcGxheWVkLlxuICpcbiAqIEBzaW5jZSA1LjIuMFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbbmdiTmF2T3V0bGV0XScsXG4gIGhvc3Q6IHsnW2NsYXNzLnRhYi1jb250ZW50XSc6ICd0cnVlJ30sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWl0ZW0gW25nRm9yT2ZdPVwibmF2Lml0ZW1zXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRhYi1wYW5lXCJcbiAgICAgICAgICAgICAgICpuZ0lmPVwiaXRlbS5pc1BhbmVsSW5Eb20oKVwiXG4gICAgICAgICAgICAgICBbaWRdPVwiaXRlbS5wYW5lbERvbUlkXCJcbiAgICAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaXRlbS5hY3RpdmVcIlxuICAgICAgICAgICAgICAgW2F0dHIucm9sZV09XCJwYW5lUm9sZSA/IHBhbmVSb2xlIDogbmF2LnJvbGVzID8gJ3RhYnBhbmVsJyA6IHVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiaXRlbS5kb21JZFwiPlxuICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiaXRlbS5jb250ZW50VHBsPy50ZW1wbGF0ZVJlZiB8fCBudWxsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7JGltcGxpY2l0OiBpdGVtLmFjdGl2ZX1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JOYXZPdXRsZXQge1xuICAvKipcbiAgICogQSByb2xlIHRvIHNldCBvbiB0aGUgbmF2IHBhbmVcbiAgICovXG4gIEBJbnB1dCgpIHBhbmVSb2xlO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGBOZ2JOYXZgXG4gICAqL1xuICBASW5wdXQoJ25nYk5hdk91dGxldCcpIG5hdjogTmdiTmF2O1xufVxuIl19