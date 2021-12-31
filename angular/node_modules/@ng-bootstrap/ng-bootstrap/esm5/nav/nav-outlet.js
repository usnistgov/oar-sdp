import { __decorate } from "tslib";
import { Component, Input, ViewEncapsulation } from '@angular/core';
/**
 * The outlet where currently active nav content will be displayed.
 *
 * @since 5.2.0
 */
var NgbNavOutlet = /** @class */ (function () {
    function NgbNavOutlet() {
    }
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
            template: "\n      <ng-template ngFor let-item [ngForOf]=\"nav.items\">\n          <div class=\"tab-pane\"\n               *ngIf=\"item.isPanelInDom()\"\n               [id]=\"item.panelDomId\"\n               [class.active]=\"item.active\"\n               [attr.role]=\"paneRole ? paneRole : nav.roles ? 'tabpanel' : undefined\"\n               [attr.aria-labelledby]=\"item.domId\">\n              <ng-template [ngTemplateOutlet]=\"item.contentTpl?.templateRef || null\"\n                           [ngTemplateOutletContext]=\"{$implicit: item.active}\"></ng-template>\n          </div>\n      </ng-template>\n  "
        })
    ], NgbNavOutlet);
    return NgbNavOutlet;
}());
export { NgbNavOutlet };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LW91dGxldC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsibmF2L25hdi1vdXRsZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBR2xFOzs7O0dBSUc7QUFtQkg7SUFBQTtJQVVBLENBQUM7SUFOVTtRQUFSLEtBQUssRUFBRTtrREFBVTtJQUtLO1FBQXRCLEtBQUssQ0FBQyxjQUFjLENBQUM7NkNBQWE7SUFUeEIsWUFBWTtRQWxCeEIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixJQUFJLEVBQUUsRUFBQyxxQkFBcUIsRUFBRSxNQUFNLEVBQUM7WUFDckMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsUUFBUSxFQUFFLDZsQkFZVDtTQUNGLENBQUM7T0FDVyxZQUFZLENBVXhCO0lBQUQsbUJBQUM7Q0FBQSxBQVZELElBVUM7U0FWWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nYk5hdn0gZnJvbSAnLi9uYXYnO1xuXG4vKipcbiAqIFRoZSBvdXRsZXQgd2hlcmUgY3VycmVudGx5IGFjdGl2ZSBuYXYgY29udGVudCB3aWxsIGJlIGRpc3BsYXllZC5cbiAqXG4gKiBAc2luY2UgNS4yLjBcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW25nYk5hdk91dGxldF0nLFxuICBob3N0OiB7J1tjbGFzcy50YWItY29udGVudF0nOiAndHJ1ZSd9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1pdGVtIFtuZ0Zvck9mXT1cIm5hdi5pdGVtc1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWItcGFuZVwiXG4gICAgICAgICAgICAgICAqbmdJZj1cIml0ZW0uaXNQYW5lbEluRG9tKClcIlxuICAgICAgICAgICAgICAgW2lkXT1cIml0ZW0ucGFuZWxEb21JZFwiXG4gICAgICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIml0ZW0uYWN0aXZlXCJcbiAgICAgICAgICAgICAgIFthdHRyLnJvbGVdPVwicGFuZVJvbGUgPyBwYW5lUm9sZSA6IG5hdi5yb2xlcyA/ICd0YWJwYW5lbCcgOiB1bmRlZmluZWRcIlxuICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cIml0ZW0uZG9tSWRcIj5cbiAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIml0ZW0uY29udGVudFRwbD8udGVtcGxhdGVSZWYgfHwgbnVsbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyRpbXBsaWNpdDogaXRlbS5hY3RpdmV9XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTmdiTmF2T3V0bGV0IHtcbiAgLyoqXG4gICAqIEEgcm9sZSB0byBzZXQgb24gdGhlIG5hdiBwYW5lXG4gICAqL1xuICBASW5wdXQoKSBwYW5lUm9sZTtcblxuICAvKipcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBgTmdiTmF2YFxuICAgKi9cbiAgQElucHV0KCduZ2JOYXZPdXRsZXQnKSBuYXY6IE5nYk5hdjtcbn1cbiJdfQ==