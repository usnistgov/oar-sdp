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
var NgbNavOutlet = /** @class */ (function () {
    function NgbNavOutlet() {
    }
    NgbNavOutlet.decorators = [
        { type: Component, args: [{
                    selector: '[ngbNavOutlet]',
                    host: { '[class.tab-content]': 'true' },
                    encapsulation: ViewEncapsulation.None,
                    template: "\n      <ng-template ngFor let-item [ngForOf]=\"nav.items\">\n          <div class=\"tab-pane\"\n               *ngIf=\"item.isPanelInDom()\"\n               [id]=\"item.panelDomId\"\n               [class.active]=\"item.active\"\n               [attr.role]=\"paneRole ? paneRole : nav.roles ? 'tabpanel' : undefined\"\n               [attr.aria-labelledby]=\"item.domId\">\n              <ng-template [ngTemplateOutlet]=\"item.contentTpl?.templateRef\" [ngTemplateOutletContext]=\"{$implicit: item.active}\"></ng-template>\n          </div>\n      </ng-template>\n  "
                }] }
    ];
    NgbNavOutlet.propDecorators = {
        paneRole: [{ type: Input }],
        nav: [{ type: Input, args: ['ngbNavOutlet',] }]
    };
    return NgbNavOutlet;
}());
export { NgbNavOutlet };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LW91dGxldC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsibmF2L25hdi1vdXRsZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xFLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxPQUFPLENBQUM7Ozs7OztBQU83QjtJQUFBO0lBMkJBLENBQUM7O2dCQTNCQSxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsSUFBSSxFQUFFLEVBQUMscUJBQXFCLEVBQUUsTUFBTSxFQUFDO29CQUNyQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsUUFBUSxFQUFFLHlqQkFXVDtpQkFDRjs7OzJCQUtFLEtBQUs7c0JBS0wsS0FBSyxTQUFDLGNBQWM7O0lBQ3ZCLG1CQUFDO0NBQUEsQUEzQkQsSUEyQkM7U0FWWSxZQUFZOzs7Ozs7SUFJdkIsZ0NBQWtCOzs7OztJQUtsQiwyQkFBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdiTmF2fSBmcm9tICcuL25hdic7XG5cbi8qKlxuICogVGhlIG91dGxldCB3aGVyZSBjdXJyZW50bHkgYWN0aXZlIG5hdiBjb250ZW50IHdpbGwgYmUgZGlzcGxheWVkLlxuICpcbiAqIEBzaW5jZSA1LjIuMFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbbmdiTmF2T3V0bGV0XScsXG4gIGhvc3Q6IHsnW2NsYXNzLnRhYi1jb250ZW50XSc6ICd0cnVlJ30sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWl0ZW0gW25nRm9yT2ZdPVwibmF2Lml0ZW1zXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRhYi1wYW5lXCJcbiAgICAgICAgICAgICAgICpuZ0lmPVwiaXRlbS5pc1BhbmVsSW5Eb20oKVwiXG4gICAgICAgICAgICAgICBbaWRdPVwiaXRlbS5wYW5lbERvbUlkXCJcbiAgICAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaXRlbS5hY3RpdmVcIlxuICAgICAgICAgICAgICAgW2F0dHIucm9sZV09XCJwYW5lUm9sZSA/IHBhbmVSb2xlIDogbmF2LnJvbGVzID8gJ3RhYnBhbmVsJyA6IHVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiaXRlbS5kb21JZFwiPlxuICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiaXRlbS5jb250ZW50VHBsPy50ZW1wbGF0ZVJlZlwiIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7JGltcGxpY2l0OiBpdGVtLmFjdGl2ZX1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JOYXZPdXRsZXQge1xuICAvKipcbiAgICogQSByb2xlIHRvIHNldCBvbiB0aGUgbmF2IHBhbmVcbiAgICovXG4gIEBJbnB1dCgpIHBhbmVSb2xlO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGBOZ2JOYXZgXG4gICAqL1xuICBASW5wdXQoJ25nYk5hdk91dGxldCcpIG5hdjogTmdiTmF2O1xufVxuIl19