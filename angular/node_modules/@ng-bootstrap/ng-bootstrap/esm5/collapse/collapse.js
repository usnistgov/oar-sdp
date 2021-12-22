/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input } from '@angular/core';
/**
 * A directive to provide a simple way of hiding and showing elements on the page.
 */
var NgbCollapse = /** @class */ (function () {
    function NgbCollapse() {
        /**
         * If `true`, will collapse the element or show it otherwise.
         */
        this.collapsed = false;
    }
    NgbCollapse.decorators = [
        { type: Directive, args: [{
                    selector: '[ngbCollapse]',
                    exportAs: 'ngbCollapse',
                    host: { '[class.collapse]': 'true', '[class.show]': '!collapsed' }
                },] }
    ];
    NgbCollapse.propDecorators = {
        collapsed: [{ type: Input, args: ['ngbCollapse',] }]
    };
    return NgbCollapse;
}());
export { NgbCollapse };
if (false) {
    /**
     * If `true`, will collapse the element or show it otherwise.
     * @type {?}
     */
    NgbCollapse.prototype.collapsed;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImNvbGxhcHNlL2NvbGxhcHNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQzs7OztBQUsvQztJQUFBOzs7O1FBU3dCLGNBQVMsR0FBRyxLQUFLLENBQUM7SUFDMUMsQ0FBQzs7Z0JBVkEsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO29CQUN6QixRQUFRLEVBQUUsYUFBYTtvQkFDdkIsSUFBSSxFQUFFLEVBQUMsa0JBQWtCLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUM7aUJBQ2pFOzs7NEJBS0UsS0FBSyxTQUFDLGFBQWE7O0lBQ3RCLGtCQUFDO0NBQUEsQUFWRCxJQVVDO1NBTFksV0FBVzs7Ozs7O0lBSXRCLGdDQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdG8gcHJvdmlkZSBhIHNpbXBsZSB3YXkgb2YgaGlkaW5nIGFuZCBzaG93aW5nIGVsZW1lbnRzIG9uIHRoZSBwYWdlLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdiQ29sbGFwc2VdJyxcbiAgZXhwb3J0QXM6ICduZ2JDb2xsYXBzZScsXG4gIGhvc3Q6IHsnW2NsYXNzLmNvbGxhcHNlXSc6ICd0cnVlJywgJ1tjbGFzcy5zaG93XSc6ICchY29sbGFwc2VkJ31cbn0pXG5leHBvcnQgY2xhc3MgTmdiQ29sbGFwc2Uge1xuICAvKipcbiAgICogSWYgYHRydWVgLCB3aWxsIGNvbGxhcHNlIHRoZSBlbGVtZW50IG9yIHNob3cgaXQgb3RoZXJ3aXNlLlxuICAgKi9cbiAgQElucHV0KCduZ2JDb2xsYXBzZScpIGNvbGxhcHNlZCA9IGZhbHNlO1xufVxuIl19