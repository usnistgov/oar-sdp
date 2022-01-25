import { Component, ContentChild, Directive, EventEmitter, Input, Output, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { getValueInRange, isNumber } from '../util/util';
import { NgbPaginationConfig } from './pagination-config';
/**
 * A directive to match the 'ellipsis' link template
 *
 * @since 4.1.0
 */
export class NgbPaginationEllipsis {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationEllipsis.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbPaginationEllipsis]' },] }
];
NgbPaginationEllipsis.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * A directive to match the 'first' link template
 *
 * @since 4.1.0
 */
export class NgbPaginationFirst {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationFirst.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbPaginationFirst]' },] }
];
NgbPaginationFirst.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * A directive to match the 'last' link template
 *
 * @since 4.1.0
 */
export class NgbPaginationLast {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationLast.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbPaginationLast]' },] }
];
NgbPaginationLast.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * A directive to match the 'next' link template
 *
 * @since 4.1.0
 */
export class NgbPaginationNext {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationNext.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbPaginationNext]' },] }
];
NgbPaginationNext.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * A directive to match the page 'number' link template
 *
 * @since 4.1.0
 */
export class NgbPaginationNumber {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationNumber.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbPaginationNumber]' },] }
];
NgbPaginationNumber.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * A directive to match the 'previous' link template
 *
 * @since 4.1.0
 */
export class NgbPaginationPrevious {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationPrevious.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbPaginationPrevious]' },] }
];
NgbPaginationPrevious.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * A directive to match the 'pages' whole content
 *
 * @since 9.1.0
 */
export class NgbPaginationPages {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NgbPaginationPages.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[ngbPaginationPages]' },] }
];
NgbPaginationPages.ctorParameters = () => [
    { type: TemplateRef }
];
/**
 * A component that displays page numbers and allows to customize them in several ways.
 */
export class NgbPagination {
    constructor(config) {
        this.pageCount = 0;
        this.pages = [];
        /**
         *  The current page.
         *
         *  Page numbers start with `1`.
         */
        this.page = 1;
        /**
         *  An event fired when the page is changed. Will fire only if collection size is set and all values are valid.
         *
         *  Event payload is the number of the newly selected page.
         *
         *  Page numbers start with `1`.
         */
        this.pageChange = new EventEmitter(true);
        this.disabled = config.disabled;
        this.boundaryLinks = config.boundaryLinks;
        this.directionLinks = config.directionLinks;
        this.ellipses = config.ellipses;
        this.maxSize = config.maxSize;
        this.pageSize = config.pageSize;
        this.rotate = config.rotate;
        this.size = config.size;
    }
    hasPrevious() { return this.page > 1; }
    hasNext() { return this.page < this.pageCount; }
    nextDisabled() { return !this.hasNext() || this.disabled; }
    previousDisabled() { return !this.hasPrevious() || this.disabled; }
    selectPage(pageNumber) { this._updatePages(pageNumber); }
    ngOnChanges(changes) { this._updatePages(this.page); }
    isEllipsis(pageNumber) { return pageNumber === -1; }
    /**
     * Appends ellipses and first/last page number to the displayed pages
     */
    _applyEllipses(start, end) {
        if (this.ellipses) {
            if (start > 0) {
                // The first page will always be included. If the displayed range
                // starts after the third page, then add ellipsis. But if the range
                // starts on the third page, then add the second page instead of
                // an ellipsis, because the ellipsis would only hide a single page.
                if (start > 2) {
                    this.pages.unshift(-1);
                }
                else if (start === 2) {
                    this.pages.unshift(2);
                }
                this.pages.unshift(1);
            }
            if (end < this.pageCount) {
                // The last page will always be included. If the displayed range
                // ends before the third-last page, then add ellipsis. But if the range
                // ends on third-last page, then add the second-last page instead of
                // an ellipsis, because the ellipsis would only hide a single page.
                if (end < (this.pageCount - 2)) {
                    this.pages.push(-1);
                }
                else if (end === (this.pageCount - 2)) {
                    this.pages.push(this.pageCount - 1);
                }
                this.pages.push(this.pageCount);
            }
        }
    }
    /**
     * Rotates page numbers based on maxSize items visible.
     * Currently selected page stays in the middle:
     *
     * Ex. for selected page = 6:
     * [5,*6*,7] for maxSize = 3
     * [4,5,*6*,7] for maxSize = 4
     */
    _applyRotation() {
        let start = 0;
        let end = this.pageCount;
        let leftOffset = Math.floor(this.maxSize / 2);
        let rightOffset = this.maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;
        if (this.page <= leftOffset) {
            // very beginning, no rotation -> [0..maxSize]
            end = this.maxSize;
        }
        else if (this.pageCount - this.page < leftOffset) {
            // very end, no rotation -> [len-maxSize..len]
            start = this.pageCount - this.maxSize;
        }
        else {
            // rotate
            start = this.page - leftOffset - 1;
            end = this.page + rightOffset;
        }
        return [start, end];
    }
    /**
     * Paginates page numbers based on maxSize items per page.
     */
    _applyPagination() {
        let page = Math.ceil(this.page / this.maxSize) - 1;
        let start = page * this.maxSize;
        let end = start + this.maxSize;
        return [start, end];
    }
    _setPageInRange(newPageNo) {
        const prevPageNo = this.page;
        this.page = getValueInRange(newPageNo, this.pageCount, 1);
        if (this.page !== prevPageNo && isNumber(this.collectionSize)) {
            this.pageChange.emit(this.page);
        }
    }
    _updatePages(newPage) {
        this.pageCount = Math.ceil(this.collectionSize / this.pageSize);
        if (!isNumber(this.pageCount)) {
            this.pageCount = 0;
        }
        // fill-in model needed to render pages
        this.pages.length = 0;
        for (let i = 1; i <= this.pageCount; i++) {
            this.pages.push(i);
        }
        // set page within 1..max range
        this._setPageInRange(newPage);
        // apply maxSize if necessary
        if (this.maxSize > 0 && this.pageCount > this.maxSize) {
            let start = 0;
            let end = this.pageCount;
            // either paginating or rotating page numbers
            if (this.rotate) {
                [start, end] = this._applyRotation();
            }
            else {
                [start, end] = this._applyPagination();
            }
            this.pages = this.pages.slice(start, end);
            // adding ellipses
            this._applyEllipses(start, end);
        }
    }
}
NgbPagination.decorators = [
    { type: Component, args: [{
                selector: 'ngb-pagination',
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: { 'role': 'navigation' },
                template: `
    <ng-template #first><span aria-hidden="true" i18n="@@ngb.pagination.first">&laquo;&laquo;</span></ng-template>
    <ng-template #previous><span aria-hidden="true" i18n="@@ngb.pagination.previous">&laquo;</span></ng-template>
    <ng-template #next><span aria-hidden="true" i18n="@@ngb.pagination.next">&raquo;</span></ng-template>
    <ng-template #last><span aria-hidden="true" i18n="@@ngb.pagination.last">&raquo;&raquo;</span></ng-template>
    <ng-template #ellipsis>...</ng-template>
    <ng-template #defaultNumber let-page let-currentPage="currentPage">
      {{ page }}
      <span *ngIf="page === currentPage" class="sr-only">(current)</span>
    </ng-template>
    <ng-template #defaultPages let-page let-pages="pages" let-disabled="disabled">
      <li *ngFor="let pageNumber of pages" class="page-item" [class.active]="pageNumber === page"
        [class.disabled]="isEllipsis(pageNumber) || disabled" [attr.aria-current]="(pageNumber === page ? 'page' : null)">
        <a *ngIf="isEllipsis(pageNumber)" class="page-link" tabindex="-1" aria-disabled="true">
          <ng-template [ngTemplateOutlet]="tplEllipsis?.templateRef || ellipsis"
                      [ngTemplateOutletContext]="{disabled: true, currentPage: page}"></ng-template>
        </a>
        <a *ngIf="!isEllipsis(pageNumber)" class="page-link" href (click)="selectPage(pageNumber); $event.preventDefault()"
          [attr.tabindex]="disabled ? '-1' : null" [attr.aria-disabled]="disabled ? 'true' : null">
          <ng-template [ngTemplateOutlet]="tplNumber?.templateRef || defaultNumber"
                      [ngTemplateOutletContext]="{disabled: disabled, $implicit: pageNumber, currentPage: page}"></ng-template>
        </a>
      </li>
    </ng-template>
    <ul [class]="'pagination' + (size ? ' pagination-' + size : '')">
      <li *ngIf="boundaryLinks" class="page-item"
        [class.disabled]="previousDisabled()">
        <a aria-label="First" i18n-aria-label="@@ngb.pagination.first-aria" class="page-link" href
          (click)="selectPage(1); $event.preventDefault()" [attr.tabindex]="previousDisabled() ? '-1' : null"
          [attr.aria-disabled]="previousDisabled() ? 'true' : null">
          <ng-template [ngTemplateOutlet]="tplFirst?.templateRef || first"
                       [ngTemplateOutletContext]="{disabled: previousDisabled(), currentPage: page}"></ng-template>
        </a>
      </li>

      <li *ngIf="directionLinks" class="page-item"
        [class.disabled]="previousDisabled()">
        <a aria-label="Previous" i18n-aria-label="@@ngb.pagination.previous-aria" class="page-link" href
          (click)="selectPage(page-1); $event.preventDefault()" [attr.tabindex]="previousDisabled() ? '-1' : null"
          [attr.aria-disabled]="previousDisabled() ? 'true' : null">
          <ng-template [ngTemplateOutlet]="tplPrevious?.templateRef || previous"
                       [ngTemplateOutletContext]="{disabled: previousDisabled()}"></ng-template>
        </a>
      </li>
      <ng-template
        [ngTemplateOutlet]="tplPages?.templateRef || defaultPages"
        [ngTemplateOutletContext]="{ $implicit: page, pages: pages, disabled: disabled }"
      >
      </ng-template>
      <li *ngIf="directionLinks" class="page-item" [class.disabled]="nextDisabled()">
        <a aria-label="Next" i18n-aria-label="@@ngb.pagination.next-aria" class="page-link" href
          (click)="selectPage(page+1); $event.preventDefault()" [attr.tabindex]="nextDisabled() ? '-1' : null"
          [attr.aria-disabled]="nextDisabled() ? 'true' : null">
          <ng-template [ngTemplateOutlet]="tplNext?.templateRef || next"
                       [ngTemplateOutletContext]="{disabled: nextDisabled(), currentPage: page}"></ng-template>
        </a>
      </li>

      <li *ngIf="boundaryLinks" class="page-item" [class.disabled]="nextDisabled()">
        <a aria-label="Last" i18n-aria-label="@@ngb.pagination.last-aria" class="page-link" href
          (click)="selectPage(pageCount); $event.preventDefault()" [attr.tabindex]="nextDisabled() ? '-1' : null"
          [attr.aria-disabled]="nextDisabled() ? 'true' : null">
          <ng-template [ngTemplateOutlet]="tplLast?.templateRef || last"
                       [ngTemplateOutletContext]="{disabled: nextDisabled(), currentPage: page}"></ng-template>
        </a>
      </li>
    </ul>
  `
            },] }
];
NgbPagination.ctorParameters = () => [
    { type: NgbPaginationConfig }
];
NgbPagination.propDecorators = {
    tplEllipsis: [{ type: ContentChild, args: [NgbPaginationEllipsis, { static: false },] }],
    tplFirst: [{ type: ContentChild, args: [NgbPaginationFirst, { static: false },] }],
    tplLast: [{ type: ContentChild, args: [NgbPaginationLast, { static: false },] }],
    tplNext: [{ type: ContentChild, args: [NgbPaginationNext, { static: false },] }],
    tplNumber: [{ type: ContentChild, args: [NgbPaginationNumber, { static: false },] }],
    tplPrevious: [{ type: ContentChild, args: [NgbPaginationPrevious, { static: false },] }],
    tplPages: [{ type: ContentChild, args: [NgbPaginationPages, { static: false },] }],
    disabled: [{ type: Input }],
    boundaryLinks: [{ type: Input }],
    directionLinks: [{ type: Input }],
    ellipses: [{ type: Input }],
    rotate: [{ type: Input }],
    collectionSize: [{ type: Input }],
    maxSize: [{ type: Input }],
    page: [{ type: Input }],
    pageSize: [{ type: Input }],
    pageChange: [{ type: Output }],
    size: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wYWdpbmF0aW9uL3BhZ2luYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUVOLHVCQUF1QixFQUV2QixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGVBQWUsRUFBRSxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDdkQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFnRXhEOzs7O0dBSUc7QUFFSCxNQUFNLE9BQU8scUJBQXFCO0lBQ2hDLFlBQW1CLFdBQWtEO1FBQWxELGdCQUFXLEdBQVgsV0FBVyxDQUF1QztJQUFHLENBQUM7OztZQUYxRSxTQUFTLFNBQUMsRUFBQyxRQUFRLEVBQUUsb0NBQW9DLEVBQUM7OztZQXhFekQsV0FBVzs7QUE2RWI7Ozs7R0FJRztBQUVILE1BQU0sT0FBTyxrQkFBa0I7SUFDN0IsWUFBbUIsV0FBa0Q7UUFBbEQsZ0JBQVcsR0FBWCxXQUFXLENBQXVDO0lBQUcsQ0FBQzs7O1lBRjFFLFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSxpQ0FBaUMsRUFBQzs7O1lBbEZ0RCxXQUFXOztBQXVGYjs7OztHQUlHO0FBRUgsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QixZQUFtQixXQUFrRDtRQUFsRCxnQkFBVyxHQUFYLFdBQVcsQ0FBdUM7SUFBRyxDQUFDOzs7WUFGMUUsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLGdDQUFnQyxFQUFDOzs7WUE1RnJELFdBQVc7O0FBaUdiOzs7O0dBSUc7QUFFSCxNQUFNLE9BQU8saUJBQWlCO0lBQzVCLFlBQW1CLFdBQWtEO1FBQWxELGdCQUFXLEdBQVgsV0FBVyxDQUF1QztJQUFHLENBQUM7OztZQUYxRSxTQUFT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dXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgT25DaGFuZ2VzLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2dldFZhbHVlSW5SYW5nZSwgaXNOdW1iZXJ9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5pbXBvcnQge05nYlBhZ2luYXRpb25Db25maWd9IGZyb20gJy4vcGFnaW5hdGlvbi1jb25maWcnO1xuXG4vKipcbiAqIEEgY29udGV4dCBmb3IgdGhlXG4gKiAqIGBOZ2JQYWdpbmF0aW9uRmlyc3RgXG4gKiAqIGBOZ2JQYWdpbmF0aW9uUHJldmlvdXNgXG4gKiAqIGBOZ2JQYWdpbmF0aW9uTmV4dGBcbiAqICogYE5nYlBhZ2luYXRpb25MYXN0YFxuICogKiBgTmdiUGFnaW5hdGlvbkVsbGlwc2lzYFxuICogKiBgTmdiUGFnaW5hdGlvblBhZ2VzYFxuICpcbiAqIGxpbmsgdGVtcGxhdGVzIGluIGNhc2UgeW91IHdhbnQgdG8gb3ZlcnJpZGUgb25lLlxuICpcbiAqIEBzaW5jZSA0LjEuMFxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYlBhZ2luYXRpb25MaW5rQ29udGV4dCB7XG4gIC8qKlxuICAgKiBQYWdlIG51bWJlciBkaXNwbGF5ZWQgYnkgdGhlIGN1cnJlbnQgbGluay5cbiAgICovXG4gIGN1cnJlbnRQYWdlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgdGhlIGN1cnJlbnQgbGluayBpcyBkaXNhYmxlZC5cbiAgICovXG4gIGRpc2FibGVkOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEEgY29udGV4dCBmb3IgdGhlIGBOZ2JQYWdpbmF0aW9uTnVtYmVyYCBsaW5rIHRlbXBsYXRlIGluIGNhc2UgeW91IHdhbnQgdG8gb3ZlcnJpZGUgb25lLlxuICpcbiAqIEV4dGVuZHMgYE5nYlBhZ2luYXRpb25MaW5rQ29udGV4dGAuXG4gKlxuICogQHNpbmNlIDQuMS4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiUGFnaW5hdGlvbk51bWJlckNvbnRleHQgZXh0ZW5kcyBOZ2JQYWdpbmF0aW9uTGlua0NvbnRleHQge1xuICAvKipcbiAgICogVGhlIHBhZ2UgbnVtYmVyLCBkaXNwbGF5ZWQgYnkgdGhlIGN1cnJlbnQgcGFnZSBsaW5rLlxuICAgKi9cbiAgJGltcGxpY2l0OiBudW1iZXI7XG59XG5cbi8qKlxuICogQSBjb250ZXh0IGZvciB0aGUgYE5nYlBhZ2luYXRpb25QYWdlc2AgcGFnZXMgdGVtcGxhdGUgaW4gY2FzZSB5b3Ugd2FudCB0byBvdmVycmlkZVxuICogdGhlIHdheSBhbGwgcGFnZXMgYXJlIGRpc3BsYXllZC5cbiAqXG4gKiBAc2luY2UgOS4xLjBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ2JQYWdpbmF0aW9uUGFnZXNDb250ZXh0IHtcbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgcGFnZSBudW1iZXIuXG4gICAqL1xuICAkaW1wbGljaXQ6IG51bWJlcjtcblxuICAvKipcbiAgICogSWYgYHRydWVgLCBwYWdpbmF0aW9uIGlzIGRpc2FibGVkLlxuICAgKi9cbiAgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFBhZ2VzIG51bWJlcnMgdGhhdCBzaG91bGQgYmUgcmVuZGVyZWQgc3RhcnRpbmcgd2l0aCAxLlxuICAgKi9cbiAgcGFnZXM6IG51bWJlcltdO1xufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRvIG1hdGNoIHRoZSAnZWxsaXBzaXMnIGxpbmsgdGVtcGxhdGVcbiAqXG4gKiBAc2luY2UgNC4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JQYWdpbmF0aW9uRWxsaXBzaXNdJ30pXG5leHBvcnQgY2xhc3MgTmdiUGFnaW5hdGlvbkVsbGlwc2lzIHtcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxOZ2JQYWdpbmF0aW9uTGlua0NvbnRleHQ+KSB7fVxufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRvIG1hdGNoIHRoZSAnZmlyc3QnIGxpbmsgdGVtcGxhdGVcbiAqXG4gKiBAc2luY2UgNC4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JQYWdpbmF0aW9uRmlyc3RdJ30pXG5leHBvcnQgY2xhc3MgTmdiUGFnaW5hdGlvbkZpcnN0IHtcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxOZ2JQYWdpbmF0aW9uTGlua0NvbnRleHQ+KSB7fVxufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRvIG1hdGNoIHRoZSAnbGFzdCcgbGluayB0ZW1wbGF0ZVxuICpcbiAqIEBzaW5jZSA0LjEuMFxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nLXRlbXBsYXRlW25nYlBhZ2luYXRpb25MYXN0XSd9KVxuZXhwb3J0IGNsYXNzIE5nYlBhZ2luYXRpb25MYXN0IHtcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxOZ2JQYWdpbmF0aW9uTGlua0NvbnRleHQ+KSB7fVxufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRvIG1hdGNoIHRoZSAnbmV4dCcgbGluayB0ZW1wbGF0ZVxuICpcbiAqIEBzaW5jZSA0LjEuMFxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nLXRlbXBsYXRlW25nYlBhZ2luYXRpb25OZXh0XSd9KVxuZXhwb3J0IGNsYXNzIE5nYlBhZ2luYXRpb25OZXh0IHtcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxOZ2JQYWdpbmF0aW9uTGlua0NvbnRleHQ+KSB7fVxufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRvIG1hdGNoIHRoZSBwYWdlICdudW1iZXInIGxpbmsgdGVtcGxhdGVcbiAqXG4gKiBAc2luY2UgNC4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JQYWdpbmF0aW9uTnVtYmVyXSd9KVxuZXhwb3J0IGNsYXNzIE5nYlBhZ2luYXRpb25OdW1iZXIge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPE5nYlBhZ2luYXRpb25OdW1iZXJDb250ZXh0Pikge31cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byBtYXRjaCB0aGUgJ3ByZXZpb3VzJyBsaW5rIHRlbXBsYXRlXG4gKlxuICogQHNpbmNlIDQuMS4wXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiUGFnaW5hdGlvblByZXZpb3VzXSd9KVxuZXhwb3J0IGNsYXNzIE5nYlBhZ2luYXRpb25QcmV2aW91cyB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8TmdiUGFnaW5hdGlvbkxpbmtDb250ZXh0Pikge31cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byBtYXRjaCB0aGUgJ3BhZ2VzJyB3aG9sZSBjb250ZW50XG4gKlxuICogQHNpbmNlIDkuMS4wXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiUGFnaW5hdGlvblBhZ2VzXSd9KVxuZXhwb3J0IGNsYXNzIE5nYlBhZ2luYXRpb25QYWdlcyB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8TmdiUGFnaW5hdGlvblBhZ2VzQ29udGV4dD4pIHt9XG59XG5cbi8qKlxuICogQSBjb21wb25lbnQgdGhhdCBkaXNwbGF5cyBwYWdlIG51bWJlcnMgYW5kIGFsbG93cyB0byBjdXN0b21pemUgdGhlbSBpbiBzZXZlcmFsIHdheXMuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi1wYWdpbmF0aW9uJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHsncm9sZSc6ICduYXZpZ2F0aW9uJ30sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNmaXJzdD48c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIiBpMThuPVwiQEBuZ2IucGFnaW5hdGlvbi5maXJzdFwiPiZsYXF1bzsmbGFxdW87PC9zcGFuPjwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlICNwcmV2aW91cz48c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIiBpMThuPVwiQEBuZ2IucGFnaW5hdGlvbi5wcmV2aW91c1wiPiZsYXF1bzs8L3NwYW4+PC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgI25leHQ+PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCIgaTE4bj1cIkBAbmdiLnBhZ2luYXRpb24ubmV4dFwiPiZyYXF1bzs8L3NwYW4+PC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgI2xhc3Q+PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCIgaTE4bj1cIkBAbmdiLnBhZ2luYXRpb24ubGFzdFwiPiZyYXF1bzsmcmFxdW87PC9zcGFuPjwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlICNlbGxpcHNpcz4uLi48L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdE51bWJlciBsZXQtcGFnZSBsZXQtY3VycmVudFBhZ2U9XCJjdXJyZW50UGFnZVwiPlxuICAgICAge3sgcGFnZSB9fVxuICAgICAgPHNwYW4gKm5nSWY9XCJwYWdlID09PSBjdXJyZW50UGFnZVwiIGNsYXNzPVwic3Itb25seVwiPihjdXJyZW50KTwvc3Bhbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFBhZ2VzIGxldC1wYWdlIGxldC1wYWdlcz1cInBhZ2VzXCIgbGV0LWRpc2FibGVkPVwiZGlzYWJsZWRcIj5cbiAgICAgIDxsaSAqbmdGb3I9XCJsZXQgcGFnZU51bWJlciBvZiBwYWdlc1wiIGNsYXNzPVwicGFnZS1pdGVtXCIgW2NsYXNzLmFjdGl2ZV09XCJwYWdlTnVtYmVyID09PSBwYWdlXCJcbiAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImlzRWxsaXBzaXMocGFnZU51bWJlcikgfHwgZGlzYWJsZWRcIiBbYXR0ci5hcmlhLWN1cnJlbnRdPVwiKHBhZ2VOdW1iZXIgPT09IHBhZ2UgPyAncGFnZScgOiBudWxsKVwiPlxuICAgICAgICA8YSAqbmdJZj1cImlzRWxsaXBzaXMocGFnZU51bWJlcilcIiBjbGFzcz1cInBhZ2UtbGlua1wiIHRhYmluZGV4PVwiLTFcIiBhcmlhLWRpc2FibGVkPVwidHJ1ZVwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJ0cGxFbGxpcHNpcz8udGVtcGxhdGVSZWYgfHwgZWxsaXBzaXNcIlxuICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ZGlzYWJsZWQ6IHRydWUsIGN1cnJlbnRQYWdlOiBwYWdlfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvYT5cbiAgICAgICAgPGEgKm5nSWY9XCIhaXNFbGxpcHNpcyhwYWdlTnVtYmVyKVwiIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZiAoY2xpY2spPVwic2VsZWN0UGFnZShwYWdlTnVtYmVyKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIlxuICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cImRpc2FibGVkID8gJy0xJyA6IG51bGxcIiBbYXR0ci5hcmlhLWRpc2FibGVkXT1cImRpc2FibGVkID8gJ3RydWUnIDogbnVsbFwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJ0cGxOdW1iZXI/LnRlbXBsYXRlUmVmIHx8IGRlZmF1bHROdW1iZXJcIlxuICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ZGlzYWJsZWQ6IGRpc2FibGVkLCAkaW1wbGljaXQ6IHBhZ2VOdW1iZXIsIGN1cnJlbnRQYWdlOiBwYWdlfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvbGk+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8dWwgW2NsYXNzXT1cIidwYWdpbmF0aW9uJyArIChzaXplID8gJyBwYWdpbmF0aW9uLScgKyBzaXplIDogJycpXCI+XG4gICAgICA8bGkgKm5nSWY9XCJib3VuZGFyeUxpbmtzXCIgY2xhc3M9XCJwYWdlLWl0ZW1cIlxuICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwicHJldmlvdXNEaXNhYmxlZCgpXCI+XG4gICAgICAgIDxhIGFyaWEtbGFiZWw9XCJGaXJzdFwiIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLnBhZ2luYXRpb24uZmlyc3QtYXJpYVwiIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZlxuICAgICAgICAgIChjbGljayk9XCJzZWxlY3RQYWdlKDEpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiIFthdHRyLnRhYmluZGV4XT1cInByZXZpb3VzRGlzYWJsZWQoKSA/ICctMScgOiBudWxsXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLWRpc2FibGVkXT1cInByZXZpb3VzRGlzYWJsZWQoKSA/ICd0cnVlJyA6IG51bGxcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidHBsRmlyc3Q/LnRlbXBsYXRlUmVmIHx8IGZpcnN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntkaXNhYmxlZDogcHJldmlvdXNEaXNhYmxlZCgpLCBjdXJyZW50UGFnZTogcGFnZX1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2E+XG4gICAgICA8L2xpPlxuXG4gICAgICA8bGkgKm5nSWY9XCJkaXJlY3Rpb25MaW5rc1wiIGNsYXNzPVwicGFnZS1pdGVtXCJcbiAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cInByZXZpb3VzRGlzYWJsZWQoKVwiPlxuICAgICAgICA8YSBhcmlhLWxhYmVsPVwiUHJldmlvdXNcIiBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5wYWdpbmF0aW9uLnByZXZpb3VzLWFyaWFcIiBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWZcbiAgICAgICAgICAoY2xpY2spPVwic2VsZWN0UGFnZShwYWdlLTEpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiIFthdHRyLnRhYmluZGV4XT1cInByZXZpb3VzRGlzYWJsZWQoKSA/ICctMScgOiBudWxsXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLWRpc2FibGVkXT1cInByZXZpb3VzRGlzYWJsZWQoKSA/ICd0cnVlJyA6IG51bGxcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidHBsUHJldmlvdXM/LnRlbXBsYXRlUmVmIHx8IHByZXZpb3VzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntkaXNhYmxlZDogcHJldmlvdXNEaXNhYmxlZCgpfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvbGk+XG4gICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidHBsUGFnZXM/LnRlbXBsYXRlUmVmIHx8IGRlZmF1bHRQYWdlc1wiXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogcGFnZSwgcGFnZXM6IHBhZ2VzLCBkaXNhYmxlZDogZGlzYWJsZWQgfVwiXG4gICAgICA+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPGxpICpuZ0lmPVwiZGlyZWN0aW9uTGlua3NcIiBjbGFzcz1cInBhZ2UtaXRlbVwiIFtjbGFzcy5kaXNhYmxlZF09XCJuZXh0RGlzYWJsZWQoKVwiPlxuICAgICAgICA8YSBhcmlhLWxhYmVsPVwiTmV4dFwiIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLnBhZ2luYXRpb24ubmV4dC1hcmlhXCIgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmXG4gICAgICAgICAgKGNsaWNrKT1cInNlbGVjdFBhZ2UocGFnZSsxKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIiBbYXR0ci50YWJpbmRleF09XCJuZXh0RGlzYWJsZWQoKSA/ICctMScgOiBudWxsXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLWRpc2FibGVkXT1cIm5leHREaXNhYmxlZCgpID8gJ3RydWUnIDogbnVsbFwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJ0cGxOZXh0Py50ZW1wbGF0ZVJlZiB8fCBuZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntkaXNhYmxlZDogbmV4dERpc2FibGVkKCksIGN1cnJlbnRQYWdlOiBwYWdlfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvbGk+XG5cbiAgICAgIDxsaSAqbmdJZj1cImJvdW5kYXJ5TGlua3NcIiBjbGFzcz1cInBhZ2UtaXRlbVwiIFtjbGFzcy5kaXNhYmxlZF09XCJuZXh0RGlzYWJsZWQoKVwiPlxuICAgICAgICA8YSBhcmlhLWxhYmVsPVwiTGFzdFwiIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLnBhZ2luYXRpb24ubGFzdC1hcmlhXCIgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmXG4gICAgICAgICAgKGNsaWNrKT1cInNlbGVjdFBhZ2UocGFnZUNvdW50KTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIiBbYXR0ci50YWJpbmRleF09XCJuZXh0RGlzYWJsZWQoKSA/ICctMScgOiBudWxsXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLWRpc2FibGVkXT1cIm5leHREaXNhYmxlZCgpID8gJ3RydWUnIDogbnVsbFwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJ0cGxMYXN0Py50ZW1wbGF0ZVJlZiB8fCBsYXN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntkaXNhYmxlZDogbmV4dERpc2FibGVkKCksIGN1cnJlbnRQYWdlOiBwYWdlfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JQYWdpbmF0aW9uIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgcGFnZUNvdW50ID0gMDtcbiAgcGFnZXM6IG51bWJlcltdID0gW107XG5cbiAgQENvbnRlbnRDaGlsZChOZ2JQYWdpbmF0aW9uRWxsaXBzaXMsIHtzdGF0aWM6IGZhbHNlfSkgdHBsRWxsaXBzaXM6IE5nYlBhZ2luYXRpb25FbGxpcHNpcztcbiAgQENvbnRlbnRDaGlsZChOZ2JQYWdpbmF0aW9uRmlyc3QsIHtzdGF0aWM6IGZhbHNlfSkgdHBsRmlyc3Q6IE5nYlBhZ2luYXRpb25GaXJzdDtcbiAgQENvbnRlbnRDaGlsZChOZ2JQYWdpbmF0aW9uTGFzdCwge3N0YXRpYzogZmFsc2V9KSB0cGxMYXN0OiBOZ2JQYWdpbmF0aW9uTGFzdDtcbiAgQENvbnRlbnRDaGlsZChOZ2JQYWdpbmF0aW9uTmV4dCwge3N0YXRpYzogZmFsc2V9KSB0cGxOZXh0OiBOZ2JQYWdpbmF0aW9uTmV4dDtcbiAgQENvbnRlbnRDaGlsZChOZ2JQYWdpbmF0aW9uTnVtYmVyLCB7c3RhdGljOiBmYWxzZX0pIHRwbE51bWJlcjogTmdiUGFnaW5hdGlvbk51bWJlcjtcbiAgQENvbnRlbnRDaGlsZChOZ2JQYWdpbmF0aW9uUHJldmlvdXMsIHtzdGF0aWM6IGZhbHNlfSkgdHBsUHJldmlvdXM6IE5nYlBhZ2luYXRpb25QcmV2aW91cztcbiAgQENvbnRlbnRDaGlsZChOZ2JQYWdpbmF0aW9uUGFnZXMsIHtzdGF0aWM6IGZhbHNlfSkgdHBsUGFnZXM6IE5nYlBhZ2luYXRpb25QYWdlcztcblxuICAvKipcbiAgICogSWYgYHRydWVgLCBwYWdpbmF0aW9uIGxpbmtzIHdpbGwgYmUgZGlzYWJsZWQuXG4gICAqL1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAvKipcbiAgICogSWYgYHRydWVgLCB0aGUgXCJGaXJzdFwiIGFuZCBcIkxhc3RcIiBwYWdlIGxpbmtzIGFyZSBzaG93bi5cbiAgICovXG4gIEBJbnB1dCgpIGJvdW5kYXJ5TGlua3M6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgdGhlIFwiTmV4dFwiIGFuZCBcIlByZXZpb3VzXCIgcGFnZSBsaW5rcyBhcmUgc2hvd24uXG4gICAqL1xuICBASW5wdXQoKSBkaXJlY3Rpb25MaW5rczogYm9vbGVhbjtcblxuICAvKipcbiAgICogSWYgYHRydWVgLCB0aGUgZWxsaXBzaXMgc3ltYm9scyBhbmQgZmlyc3QvbGFzdCBwYWdlIG51bWJlcnMgd2lsbCBiZSBzaG93biB3aGVuIGBtYXhTaXplYCA+IG51bWJlciBvZiBwYWdlcy5cbiAgICovXG4gIEBJbnB1dCgpIGVsbGlwc2VzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIHJvdGF0ZSBwYWdlcyB3aGVuIGBtYXhTaXplYCA+IG51bWJlciBvZiBwYWdlcy5cbiAgICpcbiAgICogVGhlIGN1cnJlbnQgcGFnZSBhbHdheXMgc3RheXMgaW4gdGhlIG1pZGRsZSBpZiBgdHJ1ZWAuXG4gICAqL1xuICBASW5wdXQoKSByb3RhdGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqICBUaGUgbnVtYmVyIG9mIGl0ZW1zIGluIHlvdXIgcGFnaW5hdGVkIGNvbGxlY3Rpb24uXG4gICAqXG4gICAqICBOb3RlLCB0aGF0IHRoaXMgaXMgbm90IHRoZSBudW1iZXIgb2YgcGFnZXMuIFBhZ2UgbnVtYmVycyBhcmUgY2FsY3VsYXRlZCBkeW5hbWljYWxseSBiYXNlZCBvblxuICAgKiAgYGNvbGxlY3Rpb25TaXplYCBhbmQgYHBhZ2VTaXplYC4gRXguIGlmIHlvdSBoYXZlIDEwMCBpdGVtcyBpbiB5b3VyIGNvbGxlY3Rpb24gYW5kIGRpc3BsYXlpbmcgMjAgaXRlbXMgcGVyIHBhZ2UsXG4gICAqICB5b3UnbGwgZW5kIHVwIHdpdGggNSBwYWdlcy5cbiAgICovXG4gIEBJbnB1dCgpIGNvbGxlY3Rpb25TaXplOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqICBUaGUgbWF4aW11bSBudW1iZXIgb2YgcGFnZXMgdG8gZGlzcGxheS5cbiAgICovXG4gIEBJbnB1dCgpIG1heFNpemU6IG51bWJlcjtcblxuICAvKipcbiAgICogIFRoZSBjdXJyZW50IHBhZ2UuXG4gICAqXG4gICAqICBQYWdlIG51bWJlcnMgc3RhcnQgd2l0aCBgMWAuXG4gICAqL1xuICBASW5wdXQoKSBwYWdlID0gMTtcblxuICAvKipcbiAgICogIFRoZSBudW1iZXIgb2YgaXRlbXMgcGVyIHBhZ2UuXG4gICAqL1xuICBASW5wdXQoKSBwYWdlU2l6ZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiAgQW4gZXZlbnQgZmlyZWQgd2hlbiB0aGUgcGFnZSBpcyBjaGFuZ2VkLiBXaWxsIGZpcmUgb25seSBpZiBjb2xsZWN0aW9uIHNpemUgaXMgc2V0IGFuZCBhbGwgdmFsdWVzIGFyZSB2YWxpZC5cbiAgICpcbiAgICogIEV2ZW50IHBheWxvYWQgaXMgdGhlIG51bWJlciBvZiB0aGUgbmV3bHkgc2VsZWN0ZWQgcGFnZS5cbiAgICpcbiAgICogIFBhZ2UgbnVtYmVycyBzdGFydCB3aXRoIGAxYC5cbiAgICovXG4gIEBPdXRwdXQoKSBwYWdlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KHRydWUpO1xuXG4gIC8qKlxuICAgKiBUaGUgcGFnaW5hdGlvbiBkaXNwbGF5IHNpemUuXG4gICAqXG4gICAqIEJvb3RzdHJhcCBjdXJyZW50bHkgc3VwcG9ydHMgc21hbGwgYW5kIGxhcmdlIHNpemVzLlxuICAgKi9cbiAgQElucHV0KCkgc2l6ZTogJ3NtJyB8ICdsZyc7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBOZ2JQYWdpbmF0aW9uQ29uZmlnKSB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGNvbmZpZy5kaXNhYmxlZDtcbiAgICB0aGlzLmJvdW5kYXJ5TGlua3MgPSBjb25maWcuYm91bmRhcnlMaW5rcztcbiAgICB0aGlzLmRpcmVjdGlvbkxpbmtzID0gY29uZmlnLmRpcmVjdGlvbkxpbmtzO1xuICAgIHRoaXMuZWxsaXBzZXMgPSBjb25maWcuZWxsaXBzZXM7XG4gICAgdGhpcy5tYXhTaXplID0gY29uZmlnLm1heFNpemU7XG4gICAgdGhpcy5wYWdlU2l6ZSA9IGNvbmZpZy5wYWdlU2l6ZTtcbiAgICB0aGlzLnJvdGF0ZSA9IGNvbmZpZy5yb3RhdGU7XG4gICAgdGhpcy5zaXplID0gY29uZmlnLnNpemU7XG4gIH1cblxuICBoYXNQcmV2aW91cygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMucGFnZSA+IDE7IH1cblxuICBoYXNOZXh0KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5wYWdlIDwgdGhpcy5wYWdlQ291bnQ7IH1cblxuICBuZXh0RGlzYWJsZWQoKTogYm9vbGVhbiB7IHJldHVybiAhdGhpcy5oYXNOZXh0KCkgfHwgdGhpcy5kaXNhYmxlZDsgfVxuXG4gIHByZXZpb3VzRGlzYWJsZWQoKTogYm9vbGVhbiB7IHJldHVybiAhdGhpcy5oYXNQcmV2aW91cygpIHx8IHRoaXMuZGlzYWJsZWQ7IH1cblxuICBzZWxlY3RQYWdlKHBhZ2VOdW1iZXI6IG51bWJlcik6IHZvaWQgeyB0aGlzLl91cGRhdGVQYWdlcyhwYWdlTnVtYmVyKTsgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHsgdGhpcy5fdXBkYXRlUGFnZXModGhpcy5wYWdlKTsgfVxuXG4gIGlzRWxsaXBzaXMocGFnZU51bWJlcik6IGJvb2xlYW4geyByZXR1cm4gcGFnZU51bWJlciA9PT0gLTE7IH1cblxuICAvKipcbiAgICogQXBwZW5kcyBlbGxpcHNlcyBhbmQgZmlyc3QvbGFzdCBwYWdlIG51bWJlciB0byB0aGUgZGlzcGxheWVkIHBhZ2VzXG4gICAqL1xuICBwcml2YXRlIF9hcHBseUVsbGlwc2VzKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuZWxsaXBzZXMpIHtcbiAgICAgIGlmIChzdGFydCA+IDApIHtcbiAgICAgICAgLy8gVGhlIGZpcnN0IHBhZ2Ugd2lsbCBhbHdheXMgYmUgaW5jbHVkZWQuIElmIHRoZSBkaXNwbGF5ZWQgcmFuZ2VcbiAgICAgICAgLy8gc3RhcnRzIGFmdGVyIHRoZSB0aGlyZCBwYWdlLCB0aGVuIGFkZCBlbGxpcHNpcy4gQnV0IGlmIHRoZSByYW5nZVxuICAgICAgICAvLyBzdGFydHMgb24gdGhlIHRoaXJkIHBhZ2UsIHRoZW4gYWRkIHRoZSBzZWNvbmQgcGFnZSBpbnN0ZWFkIG9mXG4gICAgICAgIC8vIGFuIGVsbGlwc2lzLCBiZWNhdXNlIHRoZSBlbGxpcHNpcyB3b3VsZCBvbmx5IGhpZGUgYSBzaW5nbGUgcGFnZS5cbiAgICAgICAgaWYgKHN0YXJ0ID4gMikge1xuICAgICAgICAgIHRoaXMucGFnZXMudW5zaGlmdCgtMSk7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhcnQgPT09IDIpIHtcbiAgICAgICAgICB0aGlzLnBhZ2VzLnVuc2hpZnQoMik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYWdlcy51bnNoaWZ0KDEpO1xuICAgICAgfVxuICAgICAgaWYgKGVuZCA8IHRoaXMucGFnZUNvdW50KSB7XG4gICAgICAgIC8vIFRoZSBsYXN0IHBhZ2Ugd2lsbCBhbHdheXMgYmUgaW5jbHVkZWQuIElmIHRoZSBkaXNwbGF5ZWQgcmFuZ2VcbiAgICAgICAgLy8gZW5kcyBiZWZvcmUgdGhlIHRoaXJkLWxhc3QgcGFnZSwgdGhlbiBhZGQgZWxsaXBzaXMuIEJ1dCBpZiB0aGUgcmFuZ2VcbiAgICAgICAgLy8gZW5kcyBvbiB0aGlyZC1sYXN0IHBhZ2UsIHRoZW4gYWRkIHRoZSBzZWNvbmQtbGFzdCBwYWdlIGluc3RlYWQgb2ZcbiAgICAgICAgLy8gYW4gZWxsaXBzaXMsIGJlY2F1c2UgdGhlIGVsbGlwc2lzIHdvdWxkIG9ubHkgaGlkZSBhIHNpbmdsZSBwYWdlLlxuICAgICAgICBpZiAoZW5kIDwgKHRoaXMucGFnZUNvdW50IC0gMikpIHtcbiAgICAgICAgICB0aGlzLnBhZ2VzLnB1c2goLTEpO1xuICAgICAgICB9IGVsc2UgaWYgKGVuZCA9PT0gKHRoaXMucGFnZUNvdW50IC0gMikpIHtcbiAgICAgICAgICB0aGlzLnBhZ2VzLnB1c2godGhpcy5wYWdlQ291bnQgLSAxKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhZ2VzLnB1c2godGhpcy5wYWdlQ291bnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSb3RhdGVzIHBhZ2UgbnVtYmVycyBiYXNlZCBvbiBtYXhTaXplIGl0ZW1zIHZpc2libGUuXG4gICAqIEN1cnJlbnRseSBzZWxlY3RlZCBwYWdlIHN0YXlzIGluIHRoZSBtaWRkbGU6XG4gICAqXG4gICAqIEV4LiBmb3Igc2VsZWN0ZWQgcGFnZSA9IDY6XG4gICAqIFs1LCo2Kiw3XSBmb3IgbWF4U2l6ZSA9IDNcbiAgICogWzQsNSwqNiosN10gZm9yIG1heFNpemUgPSA0XG4gICAqL1xuICBwcml2YXRlIF9hcHBseVJvdGF0aW9uKCk6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgIGxldCBzdGFydCA9IDA7XG4gICAgbGV0IGVuZCA9IHRoaXMucGFnZUNvdW50O1xuICAgIGxldCBsZWZ0T2Zmc2V0ID0gTWF0aC5mbG9vcih0aGlzLm1heFNpemUgLyAyKTtcbiAgICBsZXQgcmlnaHRPZmZzZXQgPSB0aGlzLm1heFNpemUgJSAyID09PSAwID8gbGVmdE9mZnNldCAtIDEgOiBsZWZ0T2Zmc2V0O1xuXG4gICAgaWYgKHRoaXMucGFnZSA8PSBsZWZ0T2Zmc2V0KSB7XG4gICAgICAvLyB2ZXJ5IGJlZ2lubmluZywgbm8gcm90YXRpb24gLT4gWzAuLm1heFNpemVdXG4gICAgICBlbmQgPSB0aGlzLm1heFNpemU7XG4gICAgfSBlbHNlIGlmICh0aGlzLnBhZ2VDb3VudCAtIHRoaXMucGFnZSA8IGxlZnRPZmZzZXQpIHtcbiAgICAgIC8vIHZlcnkgZW5kLCBubyByb3RhdGlvbiAtPiBbbGVuLW1heFNpemUuLmxlbl1cbiAgICAgIHN0YXJ0ID0gdGhpcy5wYWdlQ291bnQgLSB0aGlzLm1heFNpemU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJvdGF0ZVxuICAgICAgc3RhcnQgPSB0aGlzLnBhZ2UgLSBsZWZ0T2Zmc2V0IC0gMTtcbiAgICAgIGVuZCA9IHRoaXMucGFnZSArIHJpZ2h0T2Zmc2V0O1xuICAgIH1cblxuICAgIHJldHVybiBbc3RhcnQsIGVuZF07XG4gIH1cblxuICAvKipcbiAgICogUGFnaW5hdGVzIHBhZ2UgbnVtYmVycyBiYXNlZCBvbiBtYXhTaXplIGl0ZW1zIHBlciBwYWdlLlxuICAgKi9cbiAgcHJpdmF0ZSBfYXBwbHlQYWdpbmF0aW9uKCk6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgIGxldCBwYWdlID0gTWF0aC5jZWlsKHRoaXMucGFnZSAvIHRoaXMubWF4U2l6ZSkgLSAxO1xuICAgIGxldCBzdGFydCA9IHBhZ2UgKiB0aGlzLm1heFNpemU7XG4gICAgbGV0IGVuZCA9IHN0YXJ0ICsgdGhpcy5tYXhTaXplO1xuXG4gICAgcmV0dXJuIFtzdGFydCwgZW5kXTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldFBhZ2VJblJhbmdlKG5ld1BhZ2VObykge1xuICAgIGNvbnN0IHByZXZQYWdlTm8gPSB0aGlzLnBhZ2U7XG4gICAgdGhpcy5wYWdlID0gZ2V0VmFsdWVJblJhbmdlKG5ld1BhZ2VObywgdGhpcy5wYWdlQ291bnQsIDEpO1xuXG4gICAgaWYgKHRoaXMucGFnZSAhPT0gcHJldlBhZ2VObyAmJiBpc051bWJlcih0aGlzLmNvbGxlY3Rpb25TaXplKSkge1xuICAgICAgdGhpcy5wYWdlQ2hhbmdlLmVtaXQodGhpcy5wYWdlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVQYWdlcyhuZXdQYWdlOiBudW1iZXIpIHtcbiAgICB0aGlzLnBhZ2VDb3VudCA9IE1hdGguY2VpbCh0aGlzLmNvbGxlY3Rpb25TaXplIC8gdGhpcy5wYWdlU2l6ZSk7XG5cbiAgICBpZiAoIWlzTnVtYmVyKHRoaXMucGFnZUNvdW50KSkge1xuICAgICAgdGhpcy5wYWdlQ291bnQgPSAwO1xuICAgIH1cblxuICAgIC8vIGZpbGwtaW4gbW9kZWwgbmVlZGVkIHRvIHJlbmRlciBwYWdlc1xuICAgIHRoaXMucGFnZXMubGVuZ3RoID0gMDtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSB0aGlzLnBhZ2VDb3VudDsgaSsrKSB7XG4gICAgICB0aGlzLnBhZ2VzLnB1c2goaSk7XG4gICAgfVxuXG4gICAgLy8gc2V0IHBhZ2Ugd2l0aGluIDEuLm1heCByYW5nZVxuICAgIHRoaXMuX3NldFBhZ2VJblJhbmdlKG5ld1BhZ2UpO1xuXG4gICAgLy8gYXBwbHkgbWF4U2l6ZSBpZiBuZWNlc3NhcnlcbiAgICBpZiAodGhpcy5tYXhTaXplID4gMCAmJiB0aGlzLnBhZ2VDb3VudCA+IHRoaXMubWF4U2l6ZSkge1xuICAgICAgbGV0IHN0YXJ0ID0gMDtcbiAgICAgIGxldCBlbmQgPSB0aGlzLnBhZ2VDb3VudDtcblxuICAgICAgLy8gZWl0aGVyIHBhZ2luYXRpbmcgb3Igcm90YXRpbmcgcGFnZSBudW1iZXJzXG4gICAgICBpZiAodGhpcy5yb3RhdGUpIHtcbiAgICAgICAgW3N0YXJ0LCBlbmRdID0gdGhpcy5fYXBwbHlSb3RhdGlvbigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgW3N0YXJ0LCBlbmRdID0gdGhpcy5fYXBwbHlQYWdpbmF0aW9uKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucGFnZXMgPSB0aGlzLnBhZ2VzLnNsaWNlKHN0YXJ0LCBlbmQpO1xuXG4gICAgICAvLyBhZGRpbmcgZWxsaXBzZXNcbiAgICAgIHRoaXMuX2FwcGx5RWxsaXBzZXMoc3RhcnQsIGVuZCk7XG4gICAgfVxuICB9XG59XG4iXX0=