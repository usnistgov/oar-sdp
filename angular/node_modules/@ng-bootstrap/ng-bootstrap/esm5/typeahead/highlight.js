/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { regExpEscape, toString } from '../util/util';
/**
 * A component that helps with text highlighting.
 *
 * If splits the `result` text into parts that contain the searched `term` and generates the HTML markup to simplify
 * highlighting:
 *
 * Ex. `result="Alaska"` and `term="as"` will produce `Al<span class="ngb-highlight">as</span>ka`.
 */
var NgbHighlight = /** @class */ (function () {
    function NgbHighlight() {
        /**
         * The CSS class for `<span>` elements wrapping the `term` inside the `result`.
         */
        this.highlightClass = 'ngb-highlight';
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    NgbHighlight.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var result = toString(this.result);
        /** @type {?} */
        var terms = Array.isArray(this.term) ? this.term : [this.term];
        /** @type {?} */
        var escapedTerms = terms.map((/**
         * @param {?} term
         * @return {?}
         */
        function (term) { return regExpEscape(toString(term)); })).filter((/**
         * @param {?} term
         * @return {?}
         */
        function (term) { return term; }));
        this.parts = escapedTerms.length ? result.split(new RegExp("(" + escapedTerms.join('|') + ")", 'gmi')) : [result];
    };
    NgbHighlight.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-highlight',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: "<ng-template ngFor [ngForOf]=\"parts\" let-part let-isOdd=\"odd\">" +
                        "<span *ngIf=\"isOdd; else even\" [class]=\"highlightClass\">{{part}}</span><ng-template #even>{{part}}</ng-template>" +
                        "</ng-template>",
                    styles: [".ngb-highlight{font-weight:700}"]
                }] }
    ];
    NgbHighlight.propDecorators = {
        highlightClass: [{ type: Input }],
        result: [{ type: Input }],
        term: [{ type: Input }]
    };
    return NgbHighlight;
}());
export { NgbHighlight };
if (false) {
    /** @type {?} */
    NgbHighlight.prototype.parts;
    /**
     * The CSS class for `<span>` elements wrapping the `term` inside the `result`.
     * @type {?}
     */
    NgbHighlight.prototype.highlightClass;
    /**
     * The text highlighting is added to.
     *
     * If the `term` is found inside this text, it will be highlighted.
     * If the `term` contains array then all the items from it will be highlighted inside the text.
     * @type {?}
     */
    NgbHighlight.prototype.result;
    /**
     * The term or array of terms to be highlighted.
     * Since version `v4.2.0` term could be a `string[]`
     * @type {?}
     */
    NgbHighlight.prototype.term;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJ0eXBlYWhlYWQvaGlnaGxpZ2h0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBYSx1QkFBdUIsRUFBaUIsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckgsT0FBTyxFQUFDLFlBQVksRUFBRSxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUM7Ozs7Ozs7OztBQVVwRDtJQUFBOzs7O1FBZVcsbUJBQWMsR0FBRyxlQUFlLENBQUM7SUF3QjVDLENBQUM7Ozs7O0lBUkMsa0NBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCOztZQUMxQixNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7O1lBRTlCLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOztZQUMxRCxZQUFZLEdBQUcsS0FBSyxDQUFDLEdBQUc7Ozs7UUFBQyxVQUFBLElBQUksSUFBSSxPQUFBLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBNUIsQ0FBNEIsRUFBQyxDQUFDLE1BQU07Ozs7UUFBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksRUFBSixDQUFJLEVBQUM7UUFFekYsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE1BQUksWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0csQ0FBQzs7Z0JBdENGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxRQUFRLEVBQUUsb0VBQWdFO3dCQUN0RSxzSEFBa0g7d0JBQ2xILGdCQUFnQjs7aUJBRXJCOzs7aUNBT0UsS0FBSzt5QkFRTCxLQUFLO3VCQU1MLEtBQUs7O0lBVVIsbUJBQUM7Q0FBQSxBQXZDRCxJQXVDQztTQTlCWSxZQUFZOzs7SUFDdkIsNkJBQWdCOzs7OztJQUtoQixzQ0FBMEM7Ozs7Ozs7O0lBUTFDLDhCQUF3Qjs7Ozs7O0lBTXhCLDRCQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgU2ltcGxlQ2hhbmdlcywgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtyZWdFeHBFc2NhcGUsIHRvU3RyaW5nfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuXG4vKipcbiAqIEEgY29tcG9uZW50IHRoYXQgaGVscHMgd2l0aCB0ZXh0IGhpZ2hsaWdodGluZy5cbiAqXG4gKiBJZiBzcGxpdHMgdGhlIGByZXN1bHRgIHRleHQgaW50byBwYXJ0cyB0aGF0IGNvbnRhaW4gdGhlIHNlYXJjaGVkIGB0ZXJtYCBhbmQgZ2VuZXJhdGVzIHRoZSBIVE1MIG1hcmt1cCB0byBzaW1wbGlmeVxuICogaGlnaGxpZ2h0aW5nOlxuICpcbiAqIEV4LiBgcmVzdWx0PVwiQWxhc2thXCJgIGFuZCBgdGVybT1cImFzXCJgIHdpbGwgcHJvZHVjZSBgQWw8c3BhbiBjbGFzcz1cIm5nYi1oaWdobGlnaHRcIj5hczwvc3Bhbj5rYWAuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi1oaWdobGlnaHQnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgdGVtcGxhdGU6IGA8bmctdGVtcGxhdGUgbmdGb3IgW25nRm9yT2ZdPVwicGFydHNcIiBsZXQtcGFydCBsZXQtaXNPZGQ9XCJvZGRcIj5gICtcbiAgICAgIGA8c3BhbiAqbmdJZj1cImlzT2RkOyBlbHNlIGV2ZW5cIiBbY2xhc3NdPVwiaGlnaGxpZ2h0Q2xhc3NcIj57e3BhcnR9fTwvc3Bhbj48bmctdGVtcGxhdGUgI2V2ZW4+e3twYXJ0fX08L25nLXRlbXBsYXRlPmAgK1xuICAgICAgYDwvbmctdGVtcGxhdGU+YCwgIC8vIHRlbXBsYXRlIG5lZWRzIHRvIGJlIGZvcm1hdHRlZCBpbiBhIGNlcnRhaW4gd2F5IHNvIHdlIGRvbid0IGFkZCBlbXB0eSB0ZXh0IG5vZGVzXG4gIHN0eWxlVXJsczogWycuL2hpZ2hsaWdodC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTmdiSGlnaGxpZ2h0IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgcGFydHM6IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBUaGUgQ1NTIGNsYXNzIGZvciBgPHNwYW4+YCBlbGVtZW50cyB3cmFwcGluZyB0aGUgYHRlcm1gIGluc2lkZSB0aGUgYHJlc3VsdGAuXG4gICAqL1xuICBASW5wdXQoKSBoaWdobGlnaHRDbGFzcyA9ICduZ2ItaGlnaGxpZ2h0JztcblxuICAvKipcbiAgICogVGhlIHRleHQgaGlnaGxpZ2h0aW5nIGlzIGFkZGVkIHRvLlxuICAgKlxuICAgKiBJZiB0aGUgYHRlcm1gIGlzIGZvdW5kIGluc2lkZSB0aGlzIHRleHQsIGl0IHdpbGwgYmUgaGlnaGxpZ2h0ZWQuXG4gICAqIElmIHRoZSBgdGVybWAgY29udGFpbnMgYXJyYXkgdGhlbiBhbGwgdGhlIGl0ZW1zIGZyb20gaXQgd2lsbCBiZSBoaWdobGlnaHRlZCBpbnNpZGUgdGhlIHRleHQuXG4gICAqL1xuICBASW5wdXQoKSByZXN1bHQ6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHRlcm0gb3IgYXJyYXkgb2YgdGVybXMgdG8gYmUgaGlnaGxpZ2h0ZWQuXG4gICAqIFNpbmNlIHZlcnNpb24gYHY0LjIuMGAgdGVybSBjb3VsZCBiZSBhIGBzdHJpbmdbXWBcbiAgICovXG4gIEBJbnB1dCgpIHRlcm06IHN0cmluZyB8IHJlYWRvbmx5IHN0cmluZ1tdO1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBjb25zdCByZXN1bHQgPSB0b1N0cmluZyh0aGlzLnJlc3VsdCk7XG5cbiAgICBjb25zdCB0ZXJtcyA9IEFycmF5LmlzQXJyYXkodGhpcy50ZXJtKSA/IHRoaXMudGVybSA6IFt0aGlzLnRlcm1dO1xuICAgIGNvbnN0IGVzY2FwZWRUZXJtcyA9IHRlcm1zLm1hcCh0ZXJtID0+IHJlZ0V4cEVzY2FwZSh0b1N0cmluZyh0ZXJtKSkpLmZpbHRlcih0ZXJtID0+IHRlcm0pO1xuXG4gICAgdGhpcy5wYXJ0cyA9IGVzY2FwZWRUZXJtcy5sZW5ndGggPyByZXN1bHQuc3BsaXQobmV3IFJlZ0V4cChgKCR7ZXNjYXBlZFRlcm1zLmpvaW4oJ3wnKX0pYCwgJ2dtaScpKSA6IFtyZXN1bHRdO1xuICB9XG59XG4iXX0=