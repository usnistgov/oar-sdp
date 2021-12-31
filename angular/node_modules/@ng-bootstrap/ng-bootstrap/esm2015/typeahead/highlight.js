import { __decorate } from "tslib";
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
let NgbHighlight = class NgbHighlight {
    constructor() {
        /**
         * The CSS class for `<span>` elements wrapping the `term` inside the `result`.
         */
        this.highlightClass = 'ngb-highlight';
    }
    ngOnChanges(changes) {
        const result = toString(this.result);
        const terms = Array.isArray(this.term) ? this.term : [this.term];
        const escapedTerms = terms.map(term => regExpEscape(toString(term))).filter(term => term);
        this.parts = escapedTerms.length ? result.split(new RegExp(`(${escapedTerms.join('|')})`, 'gmi')) : [result];
    }
};
__decorate([
    Input()
], NgbHighlight.prototype, "highlightClass", void 0);
__decorate([
    Input()
], NgbHighlight.prototype, "result", void 0);
__decorate([
    Input()
], NgbHighlight.prototype, "term", void 0);
NgbHighlight = __decorate([
    Component({
        selector: 'ngb-highlight',
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None,
        template: `<ng-template ngFor [ngForOf]="parts" let-part let-isOdd="odd">` +
            `<span *ngIf="isOdd; else even" [class]="highlightClass">{{part}}</span><ng-template #even>{{part}}</ng-template>` +
            `</ng-template>`,
        styles: [".ngb-highlight{font-weight:700}"]
    })
], NgbHighlight);
export { NgbHighlight };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJ0eXBlYWhlYWQvaGlnaGxpZ2h0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBYSx1QkFBdUIsRUFBaUIsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckgsT0FBTyxFQUFDLFlBQVksRUFBRSxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFcEQ7Ozs7Ozs7R0FPRztBQVVILElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7SUFBekI7UUFHRTs7V0FFRztRQUNNLG1CQUFjLEdBQUcsZUFBZSxDQUFDO0lBd0I1QyxDQUFDO0lBUkMsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFckMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUxRixJQUFJLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvRyxDQUFDO0NBQ0YsQ0FBQTtBQXhCVTtJQUFSLEtBQUssRUFBRTtvREFBa0M7QUFRakM7SUFBUixLQUFLLEVBQUU7NENBQXdCO0FBTXZCO0lBQVIsS0FBSyxFQUFFOzBDQUFrQztBQXBCL0IsWUFBWTtJQVR4QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsZUFBZTtRQUN6QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtRQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtRQUNyQyxRQUFRLEVBQUUsZ0VBQWdFO1lBQ3RFLGtIQUFrSDtZQUNsSCxnQkFBZ0I7O0tBRXJCLENBQUM7R0FDVyxZQUFZLENBOEJ4QjtTQTlCWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBTaW1wbGVDaGFuZ2VzLCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge3JlZ0V4cEVzY2FwZSwgdG9TdHJpbmd9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5cbi8qKlxuICogQSBjb21wb25lbnQgdGhhdCBoZWxwcyB3aXRoIHRleHQgaGlnaGxpZ2h0aW5nLlxuICpcbiAqIElmIHNwbGl0cyB0aGUgYHJlc3VsdGAgdGV4dCBpbnRvIHBhcnRzIHRoYXQgY29udGFpbiB0aGUgc2VhcmNoZWQgYHRlcm1gIGFuZCBnZW5lcmF0ZXMgdGhlIEhUTUwgbWFya3VwIHRvIHNpbXBsaWZ5XG4gKiBoaWdobGlnaHRpbmc6XG4gKlxuICogRXguIGByZXN1bHQ9XCJBbGFza2FcImAgYW5kIGB0ZXJtPVwiYXNcImAgd2lsbCBwcm9kdWNlIGBBbDxzcGFuIGNsYXNzPVwibmdiLWhpZ2hsaWdodFwiPmFzPC9zcGFuPmthYC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmdiLWhpZ2hsaWdodCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogYDxuZy10ZW1wbGF0ZSBuZ0ZvciBbbmdGb3JPZl09XCJwYXJ0c1wiIGxldC1wYXJ0IGxldC1pc09kZD1cIm9kZFwiPmAgK1xuICAgICAgYDxzcGFuICpuZ0lmPVwiaXNPZGQ7IGVsc2UgZXZlblwiIFtjbGFzc109XCJoaWdobGlnaHRDbGFzc1wiPnt7cGFydH19PC9zcGFuPjxuZy10ZW1wbGF0ZSAjZXZlbj57e3BhcnR9fTwvbmctdGVtcGxhdGU+YCArXG4gICAgICBgPC9uZy10ZW1wbGF0ZT5gLCAgLy8gdGVtcGxhdGUgbmVlZHMgdG8gYmUgZm9ybWF0dGVkIGluIGEgY2VydGFpbiB3YXkgc28gd2UgZG9uJ3QgYWRkIGVtcHR5IHRleHQgbm9kZXNcbiAgc3R5bGVVcmxzOiBbJy4vaGlnaGxpZ2h0LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JIaWdobGlnaHQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBwYXJ0czogc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIFRoZSBDU1MgY2xhc3MgZm9yIGA8c3Bhbj5gIGVsZW1lbnRzIHdyYXBwaW5nIHRoZSBgdGVybWAgaW5zaWRlIHRoZSBgcmVzdWx0YC5cbiAgICovXG4gIEBJbnB1dCgpIGhpZ2hsaWdodENsYXNzID0gJ25nYi1oaWdobGlnaHQnO1xuXG4gIC8qKlxuICAgKiBUaGUgdGV4dCBoaWdobGlnaHRpbmcgaXMgYWRkZWQgdG8uXG4gICAqXG4gICAqIElmIHRoZSBgdGVybWAgaXMgZm91bmQgaW5zaWRlIHRoaXMgdGV4dCwgaXQgd2lsbCBiZSBoaWdobGlnaHRlZC5cbiAgICogSWYgdGhlIGB0ZXJtYCBjb250YWlucyBhcnJheSB0aGVuIGFsbCB0aGUgaXRlbXMgZnJvbSBpdCB3aWxsIGJlIGhpZ2hsaWdodGVkIGluc2lkZSB0aGUgdGV4dC5cbiAgICovXG4gIEBJbnB1dCgpIHJlc3VsdD86IHN0cmluZyB8IG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSB0ZXJtIG9yIGFycmF5IG9mIHRlcm1zIHRvIGJlIGhpZ2hsaWdodGVkLlxuICAgKiBTaW5jZSB2ZXJzaW9uIGB2NC4yLjBgIHRlcm0gY291bGQgYmUgYSBgc3RyaW5nW11gXG4gICAqL1xuICBASW5wdXQoKSB0ZXJtOiBzdHJpbmcgfCByZWFkb25seSBzdHJpbmdbXTtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gdG9TdHJpbmcodGhpcy5yZXN1bHQpO1xuXG4gICAgY29uc3QgdGVybXMgPSBBcnJheS5pc0FycmF5KHRoaXMudGVybSkgPyB0aGlzLnRlcm0gOiBbdGhpcy50ZXJtXTtcbiAgICBjb25zdCBlc2NhcGVkVGVybXMgPSB0ZXJtcy5tYXAodGVybSA9PiByZWdFeHBFc2NhcGUodG9TdHJpbmcodGVybSkpKS5maWx0ZXIodGVybSA9PiB0ZXJtKTtcblxuICAgIHRoaXMucGFydHMgPSBlc2NhcGVkVGVybXMubGVuZ3RoID8gcmVzdWx0LnNwbGl0KG5ldyBSZWdFeHAoYCgke2VzY2FwZWRUZXJtcy5qb2luKCd8Jyl9KWAsICdnbWknKSkgOiBbcmVzdWx0XTtcbiAgfVxufVxuIl19