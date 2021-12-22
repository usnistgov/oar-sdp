/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChild, Directive, EventEmitter, Input, Output, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { getValueInRange, isNumber } from '../util/util';
import { NgbPaginationConfig } from './pagination-config';
/**
 * A context for the
 * * `NgbPaginationFirst`
 * * `NgbPaginationPrevious`
 * * `NgbPaginationNext`
 * * `NgbPaginationLast`
 * * `NgbPaginationEllipsis`
 *
 * link templates in case you want to override one.
 *
 * \@since 4.1.0
 * @record
 */
export function NgbPaginationLinkContext() { }
if (false) {
    /**
     * The currently selected page number
     * @type {?}
     */
    NgbPaginationLinkContext.prototype.currentPage;
    /**
     * If `true`, the current link is disabled
     * @type {?}
     */
    NgbPaginationLinkContext.prototype.disabled;
}
/**
 * A context for the `NgbPaginationNumber` link template in case you want to override one.
 *
 * Extends `NgbPaginationLinkContext`.
 *
 * \@since 4.1.0
 * @record
 */
export function NgbPaginationNumberContext() { }
if (false) {
    /**
     * The page number, displayed by the current page link.
     * @type {?}
     */
    NgbPaginationNumberContext.prototype.$implicit;
}
/**
 * A directive to match the 'ellipsis' link template
 *
 * \@since 4.1.0
 */
var NgbPaginationEllipsis = /** @class */ (function () {
    function NgbPaginationEllipsis(templateRef) {
        this.templateRef = templateRef;
    }
    NgbPaginationEllipsis.decorators = [
        { type: Directive, args: [{ selector: 'ng-template[ngbPaginationEllipsis]' },] }
    ];
    /** @nocollapse */
    NgbPaginationEllipsis.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return NgbPaginationEllipsis;
}());
export { NgbPaginationEllipsis };
if (false) {
    /** @type {?} */
    NgbPaginationEllipsis.prototype.templateRef;
}
/**
 * A directive to match the 'first' link template
 *
 * \@since 4.1.0
 */
var NgbPaginationFirst = /** @class */ (function () {
    function NgbPaginationFirst(templateRef) {
        this.templateRef = templateRef;
    }
    NgbPaginationFirst.decorators = [
        { type: Directive, args: [{ selector: 'ng-template[ngbPaginationFirst]' },] }
    ];
    /** @nocollapse */
    NgbPaginationFirst.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return NgbPaginationFirst;
}());
export { NgbPaginationFirst };
if (false) {
    /** @type {?} */
    NgbPaginationFirst.prototype.templateRef;
}
/**
 * A directive to match the 'last' link template
 *
 * \@since 4.1.0
 */
var NgbPaginationLast = /** @class */ (function () {
    function NgbPaginationLast(templateRef) {
        this.templateRef = templateRef;
    }
    NgbPaginationLast.decorators = [
        { type: Directive, args: [{ selector: 'ng-template[ngbPaginationLast]' },] }
    ];
    /** @nocollapse */
    NgbPaginationLast.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return NgbPaginationLast;
}());
export { NgbPaginationLast };
if (false) {
    /** @type {?} */
    NgbPaginationLast.prototype.templateRef;
}
/**
 * A directive to match the 'next' link template
 *
 * \@since 4.1.0
 */
var NgbPaginationNext = /** @class */ (function () {
    function NgbPaginationNext(templateRef) {
        this.templateRef = templateRef;
    }
    NgbPaginationNext.decorators = [
        { type: Directive, args: [{ selector: 'ng-template[ngbPaginationNext]' },] }
    ];
    /** @nocollapse */
    NgbPaginationNext.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return NgbPaginationNext;
}());
export { NgbPaginationNext };
if (false) {
    /** @type {?} */
    NgbPaginationNext.prototype.templateRef;
}
/**
 * A directive to match the page 'number' link template
 *
 * \@since 4.1.0
 */
var NgbPaginationNumber = /** @class */ (function () {
    function NgbPaginationNumber(templateRef) {
        this.templateRef = templateRef;
    }
    NgbPaginationNumber.decorators = [
        { type: Directive, args: [{ selector: 'ng-template[ngbPaginationNumber]' },] }
    ];
    /** @nocollapse */
    NgbPaginationNumber.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return NgbPaginationNumber;
}());
export { NgbPaginationNumber };
if (false) {
    /** @type {?} */
    NgbPaginationNumber.prototype.templateRef;
}
/**
 * A directive to match the 'previous' link template
 *
 * \@since 4.1.0
 */
var NgbPaginationPrevious = /** @class */ (function () {
    function NgbPaginationPrevious(templateRef) {
        this.templateRef = templateRef;
    }
    NgbPaginationPrevious.decorators = [
        { type: Directive, args: [{ selector: 'ng-template[ngbPaginationPrevious]' },] }
    ];
    /** @nocollapse */
    NgbPaginationPrevious.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return NgbPaginationPrevious;
}());
export { NgbPaginationPrevious };
if (false) {
    /** @type {?} */
    NgbPaginationPrevious.prototype.templateRef;
}
/**
 * A component that displays page numbers and allows to customize them in several ways.
 */
var NgbPagination = /** @class */ (function () {
    function NgbPagination(config) {
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
    /**
     * @return {?}
     */
    NgbPagination.prototype.hasPrevious = /**
     * @return {?}
     */
    function () { return this.page > 1; };
    /**
     * @return {?}
     */
    NgbPagination.prototype.hasNext = /**
     * @return {?}
     */
    function () { return this.page < this.pageCount; };
    /**
     * @return {?}
     */
    NgbPagination.prototype.nextDisabled = /**
     * @return {?}
     */
    function () { return !this.hasNext() || this.disabled; };
    /**
     * @return {?}
     */
    NgbPagination.prototype.previousDisabled = /**
     * @return {?}
     */
    function () { return !this.hasPrevious() || this.disabled; };
    /**
     * @param {?} pageNumber
     * @return {?}
     */
    NgbPagination.prototype.selectPage = /**
     * @param {?} pageNumber
     * @return {?}
     */
    function (pageNumber) { this._updatePages(pageNumber); };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgbPagination.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) { this._updatePages(this.page); };
    /**
     * @param {?} pageNumber
     * @return {?}
     */
    NgbPagination.prototype.isEllipsis = /**
     * @param {?} pageNumber
     * @return {?}
     */
    function (pageNumber) { return pageNumber === -1; };
    /**
     * Appends ellipses and first/last page number to the displayed pages
     */
    /**
     * Appends ellipses and first/last page number to the displayed pages
     * @private
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    NgbPagination.prototype._applyEllipses = /**
     * Appends ellipses and first/last page number to the displayed pages
     * @private
     * @param {?} start
     * @param {?} end
     * @return {?}
     */
    function (start, end) {
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
    };
    /**
     * Rotates page numbers based on maxSize items visible.
     * Currently selected page stays in the middle:
     *
     * Ex. for selected page = 6:
     * [5,*6*,7] for maxSize = 3
     * [4,5,*6*,7] for maxSize = 4
     */
    /**
     * Rotates page numbers based on maxSize items visible.
     * Currently selected page stays in the middle:
     *
     * Ex. for selected page = 6:
     * [5,*6*,7] for maxSize = 3
     * [4,5,*6*,7] for maxSize = 4
     * @private
     * @return {?}
     */
    NgbPagination.prototype._applyRotation = /**
     * Rotates page numbers based on maxSize items visible.
     * Currently selected page stays in the middle:
     *
     * Ex. for selected page = 6:
     * [5,*6*,7] for maxSize = 3
     * [4,5,*6*,7] for maxSize = 4
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var start = 0;
        /** @type {?} */
        var end = this.pageCount;
        /** @type {?} */
        var leftOffset = Math.floor(this.maxSize / 2);
        /** @type {?} */
        var rightOffset = this.maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;
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
    };
    /**
     * Paginates page numbers based on maxSize items per page.
     */
    /**
     * Paginates page numbers based on maxSize items per page.
     * @private
     * @return {?}
     */
    NgbPagination.prototype._applyPagination = /**
     * Paginates page numbers based on maxSize items per page.
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var page = Math.ceil(this.page / this.maxSize) - 1;
        /** @type {?} */
        var start = page * this.maxSize;
        /** @type {?} */
        var end = start + this.maxSize;
        return [start, end];
    };
    /**
     * @private
     * @param {?} newPageNo
     * @return {?}
     */
    NgbPagination.prototype._setPageInRange = /**
     * @private
     * @param {?} newPageNo
     * @return {?}
     */
    function (newPageNo) {
        /** @type {?} */
        var prevPageNo = this.page;
        this.page = getValueInRange(newPageNo, this.pageCount, 1);
        if (this.page !== prevPageNo && isNumber(this.collectionSize)) {
            this.pageChange.emit(this.page);
        }
    };
    /**
     * @private
     * @param {?} newPage
     * @return {?}
     */
    NgbPagination.prototype._updatePages = /**
     * @private
     * @param {?} newPage
     * @return {?}
     */
    function (newPage) {
        var _a, _b;
        this.pageCount = Math.ceil(this.collectionSize / this.pageSize);
        if (!isNumber(this.pageCount)) {
            this.pageCount = 0;
        }
        // fill-in model needed to render pages
        this.pages.length = 0;
        for (var i = 1; i <= this.pageCount; i++) {
            this.pages.push(i);
        }
        // set page within 1..max range
        this._setPageInRange(newPage);
        // apply maxSize if necessary
        if (this.maxSize > 0 && this.pageCount > this.maxSize) {
            /** @type {?} */
            var start = 0;
            /** @type {?} */
            var end = this.pageCount;
            // either paginating or rotating page numbers
            if (this.rotate) {
                _a = tslib_1.__read(this._applyRotation(), 2), start = _a[0], end = _a[1];
            }
            else {
                _b = tslib_1.__read(this._applyPagination(), 2), start = _b[0], end = _b[1];
            }
            this.pages = this.pages.slice(start, end);
            // adding ellipses
            this._applyEllipses(start, end);
        }
    };
    NgbPagination.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-pagination',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: { 'role': 'navigation' },
                    template: "\n    <ng-template #first><span aria-hidden=\"true\" i18n=\"@@ngb.pagination.first\">&laquo;&laquo;</span></ng-template>\n    <ng-template #previous><span aria-hidden=\"true\" i18n=\"@@ngb.pagination.previous\">&laquo;</span></ng-template>\n    <ng-template #next><span aria-hidden=\"true\" i18n=\"@@ngb.pagination.next\">&raquo;</span></ng-template>\n    <ng-template #last><span aria-hidden=\"true\" i18n=\"@@ngb.pagination.last\">&raquo;&raquo;</span></ng-template>\n    <ng-template #ellipsis>...</ng-template>\n    <ng-template #defaultNumber let-page let-currentPage=\"currentPage\">\n      {{ page }}\n      <span *ngIf=\"page === currentPage\" class=\"sr-only\">(current)</span>\n    </ng-template>\n    <ul [class]=\"'pagination' + (size ? ' pagination-' + size : '')\">\n      <li *ngIf=\"boundaryLinks\" class=\"page-item\"\n        [class.disabled]=\"previousDisabled()\">\n        <a aria-label=\"First\" i18n-aria-label=\"@@ngb.pagination.first-aria\" class=\"page-link\" href\n          (click)=\"selectPage(1); $event.preventDefault()\" [attr.tabindex]=\"previousDisabled() ? '-1' : null\"\n          [attr.aria-disabled]=\"previousDisabled() ? 'true' : null\">\n          <ng-template [ngTemplateOutlet]=\"tplFirst?.templateRef || first\"\n                       [ngTemplateOutletContext]=\"{disabled: previousDisabled(), currentPage: page}\"></ng-template>\n        </a>\n      </li>\n\n      <li *ngIf=\"directionLinks\" class=\"page-item\"\n        [class.disabled]=\"previousDisabled()\">\n        <a aria-label=\"Previous\" i18n-aria-label=\"@@ngb.pagination.previous-aria\" class=\"page-link\" href\n          (click)=\"selectPage(page-1); $event.preventDefault()\" [attr.tabindex]=\"previousDisabled() ? '-1' : null\"\n          [attr.aria-disabled]=\"previousDisabled() ? 'true' : null\">\n          <ng-template [ngTemplateOutlet]=\"tplPrevious?.templateRef || previous\"\n                       [ngTemplateOutletContext]=\"{disabled: previousDisabled()}\"></ng-template>\n        </a>\n      </li>\n      <li *ngFor=\"let pageNumber of pages\" class=\"page-item\" [class.active]=\"pageNumber === page\"\n        [class.disabled]=\"isEllipsis(pageNumber) || disabled\" [attr.aria-current]=\"(pageNumber === page ? 'page' : null)\">\n        <a *ngIf=\"isEllipsis(pageNumber)\" class=\"page-link\" tabindex=\"-1\" aria-disabled=\"true\">\n          <ng-template [ngTemplateOutlet]=\"tplEllipsis?.templateRef || ellipsis\"\n                       [ngTemplateOutletContext]=\"{disabled: true, currentPage: page}\"></ng-template>\n        </a>\n        <a *ngIf=\"!isEllipsis(pageNumber)\" class=\"page-link\" href (click)=\"selectPage(pageNumber); $event.preventDefault()\" [attr.tabindex]=\"disabled ? '-1' : null\"\n          [attr.aria-disabled]=\"disabled ? 'true' : null\">\n          <ng-template [ngTemplateOutlet]=\"tplNumber?.templateRef || defaultNumber\"\n                       [ngTemplateOutletContext]=\"{disabled: disabled, $implicit: pageNumber, currentPage: page}\"></ng-template>\n        </a>\n      </li>\n      <li *ngIf=\"directionLinks\" class=\"page-item\" [class.disabled]=\"nextDisabled()\">\n        <a aria-label=\"Next\" i18n-aria-label=\"@@ngb.pagination.next-aria\" class=\"page-link\" href\n          (click)=\"selectPage(page+1); $event.preventDefault()\" [attr.tabindex]=\"nextDisabled() ? '-1' : null\"\n          [attr.aria-disabled]=\"nextDisabled() ? 'true' : null\">\n          <ng-template [ngTemplateOutlet]=\"tplNext?.templateRef || next\"\n                       [ngTemplateOutletContext]=\"{disabled: nextDisabled(), currentPage: page}\"></ng-template>\n        </a>\n      </li>\n\n      <li *ngIf=\"boundaryLinks\" class=\"page-item\" [class.disabled]=\"nextDisabled()\">\n        <a aria-label=\"Last\" i18n-aria-label=\"@@ngb.pagination.last-aria\" class=\"page-link\" href\n          (click)=\"selectPage(pageCount); $event.preventDefault()\" [attr.tabindex]=\"nextDisabled() ? '-1' : null\"\n          [attr.aria-disabled]=\"nextDisabled() ? 'true' : null\">\n          <ng-template [ngTemplateOutlet]=\"tplLast?.templateRef || last\"\n                       [ngTemplateOutletContext]=\"{disabled: nextDisabled(), currentPage: page}\"></ng-template>\n        </a>\n      </li>\n    </ul>\n  "
                }] }
    ];
    /** @nocollapse */
    NgbPagination.ctorParameters = function () { return [
        { type: NgbPaginationConfig }
    ]; };
    NgbPagination.propDecorators = {
        tplEllipsis: [{ type: ContentChild, args: [NgbPaginationEllipsis, { static: false },] }],
        tplFirst: [{ type: ContentChild, args: [NgbPaginationFirst, { static: false },] }],
        tplLast: [{ type: ContentChild, args: [NgbPaginationLast, { static: false },] }],
        tplNext: [{ type: ContentChild, args: [NgbPaginationNext, { static: false },] }],
        tplNumber: [{ type: ContentChild, args: [NgbPaginationNumber, { static: false },] }],
        tplPrevious: [{ type: ContentChild, args: [NgbPaginationPrevious, { static: false },] }],
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
    return NgbPagination;
}());
export { NgbPagination };
if (false) {
    /** @type {?} */
    NgbPagination.prototype.pageCount;
    /** @type {?} */
    NgbPagination.prototype.pages;
    /** @type {?} */
    NgbPagination.prototype.tplEllipsis;
    /** @type {?} */
    NgbPagination.prototype.tplFirst;
    /** @type {?} */
    NgbPagination.prototype.tplLast;
    /** @type {?} */
    NgbPagination.prototype.tplNext;
    /** @type {?} */
    NgbPagination.prototype.tplNumber;
    /** @type {?} */
    NgbPagination.prototype.tplPrevious;
    /**
     * If `true`, pagination links will be disabled.
     * @type {?}
     */
    NgbPagination.prototype.disabled;
    /**
     * If `true`, the "First" and "Last" page links are shown.
     * @type {?}
     */
    NgbPagination.prototype.boundaryLinks;
    /**
     * If `true`, the "Next" and "Previous" page links are shown.
     * @type {?}
     */
    NgbPagination.prototype.directionLinks;
    /**
     * If `true`, the ellipsis symbols and first/last page numbers will be shown when `maxSize` > number of pages.
     * @type {?}
     */
    NgbPagination.prototype.ellipses;
    /**
     * Whether to rotate pages when `maxSize` > number of pages.
     *
     * The current page always stays in the middle if `true`.
     * @type {?}
     */
    NgbPagination.prototype.rotate;
    /**
     *  The number of items in your paginated collection.
     *
     *  Note, that this is not the number of pages. Page numbers are calculated dynamically based on
     *  `collectionSize` and `pageSize`. Ex. if you have 100 items in your collection and displaying 20 items per page,
     *  you'll end up with 5 pages.
     * @type {?}
     */
    NgbPagination.prototype.collectionSize;
    /**
     *  The maximum number of pages to display.
     * @type {?}
     */
    NgbPagination.prototype.maxSize;
    /**
     *  The current page.
     *
     *  Page numbers start with `1`.
     * @type {?}
     */
    NgbPagination.prototype.page;
    /**
     *  The number of items per page.
     * @type {?}
     */
    NgbPagination.prototype.pageSize;
    /**
     *  An event fired when the page is changed. Will fire only if collection size is set and all values are valid.
     *
     *  Event payload is the number of the newly selected page.
     *
     *  Page numbers start with `1`.
     * @type {?}
     */
    NgbPagination.prototype.pageChange;
    /**
     * The pagination display size.
     *
     * Bootstrap currently supports small and large sizes.
     * @type {?}
     */
    NgbPagination.prototype.size;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsicGFnaW5hdGlvbi9wYWdpbmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUVOLHVCQUF1QixFQUV2QixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGVBQWUsRUFBRSxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDdkQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUJBQXFCLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FBY3hELDhDQVVDOzs7Ozs7SUFOQywrQ0FBb0I7Ozs7O0lBS3BCLDRDQUFrQjs7Ozs7Ozs7OztBQVVwQixnREFLQzs7Ozs7O0lBREMsK0NBQWtCOzs7Ozs7O0FBUXBCO0lBRUUsK0JBQW1CLFdBQWtEO1FBQWxELGdCQUFXLEdBQVgsV0FBVyxDQUF1QztJQUFHLENBQUM7O2dCQUYxRSxTQUFTLFNBQUMsRUFBQyxRQUFRLEVBQUUsb0NBQW9DLEVBQUM7Ozs7Z0JBaER6RCxXQUFXOztJQW1EYiw0QkFBQztDQUFBLEFBSEQsSUFHQztTQUZZLHFCQUFxQjs7O0lBQ3BCLDRDQUF5RDs7Ozs7OztBQVF2RTtJQUVFLDRCQUFtQixXQUFrRDtRQUFsRCxnQkFBVyxHQUFYLFdBQVcsQ0FBdUM7SUFBRyxDQUFDOztnQkFGMUUsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLGlDQUFpQyxFQUFDOzs7O2dCQTFEdEQsV0FBVzs7SUE2RGIseUJBQUM7Q0FBQSxBQUhELElBR0M7U0FGWSxrQkFBa0I7OztJQUNqQix5Q0FBeUQ7Ozs7Ozs7QUFRdkU7SUFFRSwyQkFBbUIsV0FBa0Q7UUFBbEQsZ0JBQVcsR0FBWCxXQUFXLENBQXVDO0lBQUcsQ0FBQzs7Z0JBRjFFLFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSxnQ0FBZ0MsRUFBQzs7OztnQkFwRXJELFdBQVc7O0lBdUViLHdCQUFDO0NBQUEsQUFIRCxJQUdDO1NBRlksaUJBQWlCOzs7SUFDaEIsd0NBQXlEOzs7Ozs7O0FBUXZFO0lBRUUsMkJBQW1CLFdBQWtEO1FBQWxELGdCQUFXLEdBQVgsV0FBVyxDQUF1QztJQUFHLENBQUM7O2dCQUYxRSxTQUFTLFNBQUMsRUFBQyxRQUFRLEVBQUUsZ0NBQWdDLEVBQUM7Ozs7Z0JBOUVyRCxXQUFXOztJQWlGYix3QkFBQztDQUFBLEFBSEQsSUFHQztTQUZZLGlCQUFpQjs7O0lBQ2hCLHdDQUF5RDs7Ozs7OztBQVF2RTtJQUVFLDZCQUFtQixXQUFvRDtRQUFwRCxnQkFBVyxHQUFYLFdBQVcsQ0FBeUM7SUFBRyxDQUFDOztnQkFGNUUsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLGtDQUFrQyxFQUFDOzs7O2dCQXhGdkQsV0FBVzs7SUEyRmIsMEJBQUM7Q0FBQSxBQUhELElBR0M7U0FGWSxtQkFBbUI7OztJQUNsQiwwQ0FBMkQ7Ozs7Ozs7QUFRekU7SUFFRSwrQkFBbUIsV0FBa0Q7UUFBbEQsZ0JBQVcsR0FBWCxXQUFXLENBQXVDO0lBQUcsQ0FBQzs7Z0JBRjFFLFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSxvQ0FBb0MsRUFBQzs7OztnQkFsR3pELFdBQVc7O0lBcUdiLDRCQUFDO0NBQUEsQUFIRCxJQUdDO1NBRlkscUJBQXFCOzs7SUFDcEIsNENBQXlEOzs7OztBQU12RTtJQWtKRSx1QkFBWSxNQUEyQjtRQS9FdkMsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLFVBQUssR0FBYSxFQUFFLENBQUM7Ozs7OztRQXVEWixTQUFJLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7OztRQWNSLGVBQVUsR0FBRyxJQUFJLFlBQVksQ0FBUyxJQUFJLENBQUMsQ0FBQztRQVVwRCxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDO1FBQzFDLElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQztRQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQzFCLENBQUM7Ozs7SUFFRCxtQ0FBVzs7O0lBQVgsY0FBeUIsT0FBTyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7SUFFaEQsK0JBQU87OztJQUFQLGNBQXFCLE9BQU8sSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7OztJQUV6RCxvQ0FBWTs7O0lBQVosY0FBMEIsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7OztJQUVwRSx3Q0FBZ0I7OztJQUFoQixjQUE4QixPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7OztJQUU1RSxrQ0FBVTs7OztJQUFWLFVBQVcsVUFBa0IsSUFBVSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFFdkUsbUNBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCLElBQVUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OztJQUUzRSxrQ0FBVTs7OztJQUFWLFVBQVcsVUFBVSxJQUFhLE9BQU8sVUFBVSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUU3RDs7T0FFRzs7Ozs7Ozs7SUFDSyxzQ0FBYzs7Ozs7OztJQUF0QixVQUF1QixLQUFhLEVBQUUsR0FBVztRQUMvQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO2dCQUNiLGlFQUFpRTtnQkFDakUsbUVBQW1FO2dCQUNuRSxnRUFBZ0U7Z0JBQ2hFLG1FQUFtRTtnQkFDbkUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO29CQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3hCO3FCQUFNLElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtvQkFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3ZCO2dCQUNELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3ZCO1lBQ0QsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDeEIsZ0VBQWdFO2dCQUNoRSx1RUFBdUU7Z0JBQ3ZFLG9FQUFvRTtnQkFDcEUsbUVBQW1FO2dCQUNuRSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3JCO3FCQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRTtvQkFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDckM7Z0JBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ2pDO1NBQ0Y7SUFDSCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRzs7Ozs7Ozs7Ozs7SUFDSyxzQ0FBYzs7Ozs7Ozs7OztJQUF0Qjs7WUFDTSxLQUFLLEdBQUcsQ0FBQzs7WUFDVCxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVM7O1lBQ3BCLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDOztZQUN6QyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVO1FBRXRFLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxVQUFVLEVBQUU7WUFDM0IsOENBQThDO1lBQzlDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ3BCO2FBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxFQUFFO1lBQ2xELDhDQUE4QztZQUM5QyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ3ZDO2FBQU07WUFDTCxTQUFTO1lBQ1QsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUNuQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7U0FDL0I7UUFFRCxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0ssd0NBQWdCOzs7OztJQUF4Qjs7WUFDTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDOztZQUM5QyxLQUFLLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPOztZQUMzQixHQUFHLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPO1FBRTlCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQzs7Ozs7O0lBRU8sdUNBQWU7Ozs7O0lBQXZCLFVBQXdCLFNBQVM7O1lBQ3pCLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSTtRQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUUxRCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDN0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQzs7Ozs7O0lBRU8sb0NBQVk7Ozs7O0lBQXBCLFVBQXFCLE9BQWU7O1FBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVoRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztTQUNwQjtRQUVELHVDQUF1QztRQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEI7UUFFRCwrQkFBK0I7UUFDL0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU5Qiw2QkFBNkI7UUFDN0IsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUU7O2dCQUNqRCxLQUFLLEdBQUcsQ0FBQzs7Z0JBQ1QsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTO1lBRXhCLDZDQUE2QztZQUM3QyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsNkNBQW9DLEVBQW5DLGFBQUssRUFBRSxXQUFHLENBQTBCO2FBQ3RDO2lCQUFNO2dCQUNMLCtDQUFzQyxFQUFyQyxhQUFLLEVBQUUsV0FBRyxDQUE0QjthQUN4QztZQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRTFDLGtCQUFrQjtZQUNsQixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNqQztJQUNILENBQUM7O2dCQTdSRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLElBQUksRUFBRSxFQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUM7b0JBQzVCLFFBQVEsRUFBRSwwcUlBNERUO2lCQUNGOzs7O2dCQXhLTyxtQkFBbUI7Ozs4QkE2S3hCLFlBQVksU0FBQyxxQkFBcUIsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7MkJBQ25ELFlBQVksU0FBQyxrQkFBa0IsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7MEJBQ2hELFlBQVksU0FBQyxpQkFBaUIsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7MEJBQy9DLFlBQVksU0FBQyxpQkFBaUIsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7NEJBQy9DLFlBQVksU0FBQyxtQkFBbUIsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7OEJBQ2pELFlBQVksU0FBQyxxQkFBcUIsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7MkJBS25ELEtBQUs7Z0NBS0wsS0FBSztpQ0FLTCxLQUFLOzJCQUtMLEtBQUs7eUJBT0wsS0FBSztpQ0FTTCxLQUFLOzBCQUtMLEtBQUs7dUJBT0wsS0FBSzsyQkFLTCxLQUFLOzZCQVNMLE1BQU07dUJBT04sS0FBSzs7SUE4SVIsb0JBQUM7Q0FBQSxBQTlSRCxJQThSQztTQTVOWSxhQUFhOzs7SUFDeEIsa0NBQWM7O0lBQ2QsOEJBQXFCOztJQUVyQixvQ0FBeUY7O0lBQ3pGLGlDQUFnRjs7SUFDaEYsZ0NBQTZFOztJQUM3RSxnQ0FBNkU7O0lBQzdFLGtDQUFtRjs7SUFDbkYsb0NBQXlGOzs7OztJQUt6RixpQ0FBMkI7Ozs7O0lBSzNCLHNDQUFnQzs7Ozs7SUFLaEMsdUNBQWlDOzs7OztJQUtqQyxpQ0FBMkI7Ozs7Ozs7SUFPM0IsK0JBQXlCOzs7Ozs7Ozs7SUFTekIsdUNBQWdDOzs7OztJQUtoQyxnQ0FBeUI7Ozs7Ozs7SUFPekIsNkJBQWtCOzs7OztJQUtsQixpQ0FBMEI7Ozs7Ozs7OztJQVMxQixtQ0FBc0Q7Ozs7Ozs7SUFPdEQsNkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBPbkNoYW5nZXMsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Z2V0VmFsdWVJblJhbmdlLCBpc051bWJlcn0gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7TmdiUGFnaW5hdGlvbkNvbmZpZ30gZnJvbSAnLi9wYWdpbmF0aW9uLWNvbmZpZyc7XG5cbi8qKlxuICogQSBjb250ZXh0IGZvciB0aGVcbiAqICogYE5nYlBhZ2luYXRpb25GaXJzdGBcbiAqICogYE5nYlBhZ2luYXRpb25QcmV2aW91c2BcbiAqICogYE5nYlBhZ2luYXRpb25OZXh0YFxuICogKiBgTmdiUGFnaW5hdGlvbkxhc3RgXG4gKiAqIGBOZ2JQYWdpbmF0aW9uRWxsaXBzaXNgXG4gKlxuICogbGluayB0ZW1wbGF0ZXMgaW4gY2FzZSB5b3Ugd2FudCB0byBvdmVycmlkZSBvbmUuXG4gKlxuICogQHNpbmNlIDQuMS4wXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdiUGFnaW5hdGlvbkxpbmtDb250ZXh0IHtcbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgcGFnZSBudW1iZXJcbiAgICovXG4gIGN1cnJlbnRQYWdlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgdGhlIGN1cnJlbnQgbGluayBpcyBkaXNhYmxlZFxuICAgKi9cbiAgZGlzYWJsZWQ6IGJvb2xlYW47XG59XG5cbi8qKlxuICogQSBjb250ZXh0IGZvciB0aGUgYE5nYlBhZ2luYXRpb25OdW1iZXJgIGxpbmsgdGVtcGxhdGUgaW4gY2FzZSB5b3Ugd2FudCB0byBvdmVycmlkZSBvbmUuXG4gKlxuICogRXh0ZW5kcyBgTmdiUGFnaW5hdGlvbkxpbmtDb250ZXh0YC5cbiAqXG4gKiBAc2luY2UgNC4xLjBcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ2JQYWdpbmF0aW9uTnVtYmVyQ29udGV4dCBleHRlbmRzIE5nYlBhZ2luYXRpb25MaW5rQ29udGV4dCB7XG4gIC8qKlxuICAgKiBUaGUgcGFnZSBudW1iZXIsIGRpc3BsYXllZCBieSB0aGUgY3VycmVudCBwYWdlIGxpbmsuXG4gICAqL1xuICAkaW1wbGljaXQ6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byBtYXRjaCB0aGUgJ2VsbGlwc2lzJyBsaW5rIHRlbXBsYXRlXG4gKlxuICogQHNpbmNlIDQuMS4wXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiUGFnaW5hdGlvbkVsbGlwc2lzXSd9KVxuZXhwb3J0IGNsYXNzIE5nYlBhZ2luYXRpb25FbGxpcHNpcyB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8TmdiUGFnaW5hdGlvbkxpbmtDb250ZXh0Pikge31cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byBtYXRjaCB0aGUgJ2ZpcnN0JyBsaW5rIHRlbXBsYXRlXG4gKlxuICogQHNpbmNlIDQuMS4wXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiUGFnaW5hdGlvbkZpcnN0XSd9KVxuZXhwb3J0IGNsYXNzIE5nYlBhZ2luYXRpb25GaXJzdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8TmdiUGFnaW5hdGlvbkxpbmtDb250ZXh0Pikge31cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byBtYXRjaCB0aGUgJ2xhc3QnIGxpbmsgdGVtcGxhdGVcbiAqXG4gKiBAc2luY2UgNC4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JQYWdpbmF0aW9uTGFzdF0nfSlcbmV4cG9ydCBjbGFzcyBOZ2JQYWdpbmF0aW9uTGFzdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8TmdiUGFnaW5hdGlvbkxpbmtDb250ZXh0Pikge31cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byBtYXRjaCB0aGUgJ25leHQnIGxpbmsgdGVtcGxhdGVcbiAqXG4gKiBAc2luY2UgNC4xLjBcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JQYWdpbmF0aW9uTmV4dF0nfSlcbmV4cG9ydCBjbGFzcyBOZ2JQYWdpbmF0aW9uTmV4dCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8TmdiUGFnaW5hdGlvbkxpbmtDb250ZXh0Pikge31cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byBtYXRjaCB0aGUgcGFnZSAnbnVtYmVyJyBsaW5rIHRlbXBsYXRlXG4gKlxuICogQHNpbmNlIDQuMS4wXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnbmctdGVtcGxhdGVbbmdiUGFnaW5hdGlvbk51bWJlcl0nfSlcbmV4cG9ydCBjbGFzcyBOZ2JQYWdpbmF0aW9uTnVtYmVyIHtcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxOZ2JQYWdpbmF0aW9uTnVtYmVyQ29udGV4dD4pIHt9XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdG8gbWF0Y2ggdGhlICdwcmV2aW91cycgbGluayB0ZW1wbGF0ZVxuICpcbiAqIEBzaW5jZSA0LjEuMFxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nLXRlbXBsYXRlW25nYlBhZ2luYXRpb25QcmV2aW91c10nfSlcbmV4cG9ydCBjbGFzcyBOZ2JQYWdpbmF0aW9uUHJldmlvdXMge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPE5nYlBhZ2luYXRpb25MaW5rQ29udGV4dD4pIHt9XG59XG5cbi8qKlxuICogQSBjb21wb25lbnQgdGhhdCBkaXNwbGF5cyBwYWdlIG51bWJlcnMgYW5kIGFsbG93cyB0byBjdXN0b21pemUgdGhlbSBpbiBzZXZlcmFsIHdheXMuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi1wYWdpbmF0aW9uJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHsncm9sZSc6ICduYXZpZ2F0aW9uJ30sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNmaXJzdD48c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIiBpMThuPVwiQEBuZ2IucGFnaW5hdGlvbi5maXJzdFwiPiZsYXF1bzsmbGFxdW87PC9zcGFuPjwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlICNwcmV2aW91cz48c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIiBpMThuPVwiQEBuZ2IucGFnaW5hdGlvbi5wcmV2aW91c1wiPiZsYXF1bzs8L3NwYW4+PC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgI25leHQ+PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCIgaTE4bj1cIkBAbmdiLnBhZ2luYXRpb24ubmV4dFwiPiZyYXF1bzs8L3NwYW4+PC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgI2xhc3Q+PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCIgaTE4bj1cIkBAbmdiLnBhZ2luYXRpb24ubGFzdFwiPiZyYXF1bzsmcmFxdW87PC9zcGFuPjwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlICNlbGxpcHNpcz4uLi48L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdE51bWJlciBsZXQtcGFnZSBsZXQtY3VycmVudFBhZ2U9XCJjdXJyZW50UGFnZVwiPlxuICAgICAge3sgcGFnZSB9fVxuICAgICAgPHNwYW4gKm5nSWY9XCJwYWdlID09PSBjdXJyZW50UGFnZVwiIGNsYXNzPVwic3Itb25seVwiPihjdXJyZW50KTwvc3Bhbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDx1bCBbY2xhc3NdPVwiJ3BhZ2luYXRpb24nICsgKHNpemUgPyAnIHBhZ2luYXRpb24tJyArIHNpemUgOiAnJylcIj5cbiAgICAgIDxsaSAqbmdJZj1cImJvdW5kYXJ5TGlua3NcIiBjbGFzcz1cInBhZ2UtaXRlbVwiXG4gICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJwcmV2aW91c0Rpc2FibGVkKClcIj5cbiAgICAgICAgPGEgYXJpYS1sYWJlbD1cIkZpcnN0XCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IucGFnaW5hdGlvbi5maXJzdC1hcmlhXCIgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmXG4gICAgICAgICAgKGNsaWNrKT1cInNlbGVjdFBhZ2UoMSk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCIgW2F0dHIudGFiaW5kZXhdPVwicHJldmlvdXNEaXNhYmxlZCgpID8gJy0xJyA6IG51bGxcIlxuICAgICAgICAgIFthdHRyLmFyaWEtZGlzYWJsZWRdPVwicHJldmlvdXNEaXNhYmxlZCgpID8gJ3RydWUnIDogbnVsbFwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJ0cGxGaXJzdD8udGVtcGxhdGVSZWYgfHwgZmlyc3RcIlxuICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2Rpc2FibGVkOiBwcmV2aW91c0Rpc2FibGVkKCksIGN1cnJlbnRQYWdlOiBwYWdlfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvbGk+XG5cbiAgICAgIDxsaSAqbmdJZj1cImRpcmVjdGlvbkxpbmtzXCIgY2xhc3M9XCJwYWdlLWl0ZW1cIlxuICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwicHJldmlvdXNEaXNhYmxlZCgpXCI+XG4gICAgICAgIDxhIGFyaWEtbGFiZWw9XCJQcmV2aW91c1wiIGkxOG4tYXJpYS1sYWJlbD1cIkBAbmdiLnBhZ2luYXRpb24ucHJldmlvdXMtYXJpYVwiIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZlxuICAgICAgICAgIChjbGljayk9XCJzZWxlY3RQYWdlKHBhZ2UtMSk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCIgW2F0dHIudGFiaW5kZXhdPVwicHJldmlvdXNEaXNhYmxlZCgpID8gJy0xJyA6IG51bGxcIlxuICAgICAgICAgIFthdHRyLmFyaWEtZGlzYWJsZWRdPVwicHJldmlvdXNEaXNhYmxlZCgpID8gJ3RydWUnIDogbnVsbFwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJ0cGxQcmV2aW91cz8udGVtcGxhdGVSZWYgfHwgcHJldmlvdXNcIlxuICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2Rpc2FibGVkOiBwcmV2aW91c0Rpc2FibGVkKCl9XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9hPlxuICAgICAgPC9saT5cbiAgICAgIDxsaSAqbmdGb3I9XCJsZXQgcGFnZU51bWJlciBvZiBwYWdlc1wiIGNsYXNzPVwicGFnZS1pdGVtXCIgW2NsYXNzLmFjdGl2ZV09XCJwYWdlTnVtYmVyID09PSBwYWdlXCJcbiAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImlzRWxsaXBzaXMocGFnZU51bWJlcikgfHwgZGlzYWJsZWRcIiBbYXR0ci5hcmlhLWN1cnJlbnRdPVwiKHBhZ2VOdW1iZXIgPT09IHBhZ2UgPyAncGFnZScgOiBudWxsKVwiPlxuICAgICAgICA8YSAqbmdJZj1cImlzRWxsaXBzaXMocGFnZU51bWJlcilcIiBjbGFzcz1cInBhZ2UtbGlua1wiIHRhYmluZGV4PVwiLTFcIiBhcmlhLWRpc2FibGVkPVwidHJ1ZVwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJ0cGxFbGxpcHNpcz8udGVtcGxhdGVSZWYgfHwgZWxsaXBzaXNcIlxuICAgICAgICAgICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2Rpc2FibGVkOiB0cnVlLCBjdXJyZW50UGFnZTogcGFnZX1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2E+XG4gICAgICAgIDxhICpuZ0lmPVwiIWlzRWxsaXBzaXMocGFnZU51bWJlcilcIiBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWYgKGNsaWNrKT1cInNlbGVjdFBhZ2UocGFnZU51bWJlcik7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCIgW2F0dHIudGFiaW5kZXhdPVwiZGlzYWJsZWQgPyAnLTEnIDogbnVsbFwiXG4gICAgICAgICAgW2F0dHIuYXJpYS1kaXNhYmxlZF09XCJkaXNhYmxlZCA/ICd0cnVlJyA6IG51bGxcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidHBsTnVtYmVyPy50ZW1wbGF0ZVJlZiB8fCBkZWZhdWx0TnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntkaXNhYmxlZDogZGlzYWJsZWQsICRpbXBsaWNpdDogcGFnZU51bWJlciwgY3VycmVudFBhZ2U6IHBhZ2V9XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9hPlxuICAgICAgPC9saT5cbiAgICAgIDxsaSAqbmdJZj1cImRpcmVjdGlvbkxpbmtzXCIgY2xhc3M9XCJwYWdlLWl0ZW1cIiBbY2xhc3MuZGlzYWJsZWRdPVwibmV4dERpc2FibGVkKClcIj5cbiAgICAgICAgPGEgYXJpYS1sYWJlbD1cIk5leHRcIiBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5wYWdpbmF0aW9uLm5leHQtYXJpYVwiIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZlxuICAgICAgICAgIChjbGljayk9XCJzZWxlY3RQYWdlKHBhZ2UrMSk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCIgW2F0dHIudGFiaW5kZXhdPVwibmV4dERpc2FibGVkKCkgPyAnLTEnIDogbnVsbFwiXG4gICAgICAgICAgW2F0dHIuYXJpYS1kaXNhYmxlZF09XCJuZXh0RGlzYWJsZWQoKSA/ICd0cnVlJyA6IG51bGxcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidHBsTmV4dD8udGVtcGxhdGVSZWYgfHwgbmV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ZGlzYWJsZWQ6IG5leHREaXNhYmxlZCgpLCBjdXJyZW50UGFnZTogcGFnZX1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2E+XG4gICAgICA8L2xpPlxuXG4gICAgICA8bGkgKm5nSWY9XCJib3VuZGFyeUxpbmtzXCIgY2xhc3M9XCJwYWdlLWl0ZW1cIiBbY2xhc3MuZGlzYWJsZWRdPVwibmV4dERpc2FibGVkKClcIj5cbiAgICAgICAgPGEgYXJpYS1sYWJlbD1cIkxhc3RcIiBpMThuLWFyaWEtbGFiZWw9XCJAQG5nYi5wYWdpbmF0aW9uLmxhc3QtYXJpYVwiIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZlxuICAgICAgICAgIChjbGljayk9XCJzZWxlY3RQYWdlKHBhZ2VDb3VudCk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCIgW2F0dHIudGFiaW5kZXhdPVwibmV4dERpc2FibGVkKCkgPyAnLTEnIDogbnVsbFwiXG4gICAgICAgICAgW2F0dHIuYXJpYS1kaXNhYmxlZF09XCJuZXh0RGlzYWJsZWQoKSA/ICd0cnVlJyA6IG51bGxcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidHBsTGFzdD8udGVtcGxhdGVSZWYgfHwgbGFzdFwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ZGlzYWJsZWQ6IG5leHREaXNhYmxlZCgpLCBjdXJyZW50UGFnZTogcGFnZX1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2E+XG4gICAgICA8L2xpPlxuICAgIDwvdWw+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTmdiUGFnaW5hdGlvbiBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIHBhZ2VDb3VudCA9IDA7XG4gIHBhZ2VzOiBudW1iZXJbXSA9IFtdO1xuXG4gIEBDb250ZW50Q2hpbGQoTmdiUGFnaW5hdGlvbkVsbGlwc2lzLCB7c3RhdGljOiBmYWxzZX0pIHRwbEVsbGlwc2lzOiBOZ2JQYWdpbmF0aW9uRWxsaXBzaXM7XG4gIEBDb250ZW50Q2hpbGQoTmdiUGFnaW5hdGlvbkZpcnN0LCB7c3RhdGljOiBmYWxzZX0pIHRwbEZpcnN0OiBOZ2JQYWdpbmF0aW9uRmlyc3Q7XG4gIEBDb250ZW50Q2hpbGQoTmdiUGFnaW5hdGlvbkxhc3QsIHtzdGF0aWM6IGZhbHNlfSkgdHBsTGFzdDogTmdiUGFnaW5hdGlvbkxhc3Q7XG4gIEBDb250ZW50Q2hpbGQoTmdiUGFnaW5hdGlvbk5leHQsIHtzdGF0aWM6IGZhbHNlfSkgdHBsTmV4dDogTmdiUGFnaW5hdGlvbk5leHQ7XG4gIEBDb250ZW50Q2hpbGQoTmdiUGFnaW5hdGlvbk51bWJlciwge3N0YXRpYzogZmFsc2V9KSB0cGxOdW1iZXI6IE5nYlBhZ2luYXRpb25OdW1iZXI7XG4gIEBDb250ZW50Q2hpbGQoTmdiUGFnaW5hdGlvblByZXZpb3VzLCB7c3RhdGljOiBmYWxzZX0pIHRwbFByZXZpb3VzOiBOZ2JQYWdpbmF0aW9uUHJldmlvdXM7XG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgcGFnaW5hdGlvbiBsaW5rcyB3aWxsIGJlIGRpc2FibGVkLlxuICAgKi9cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgdGhlIFwiRmlyc3RcIiBhbmQgXCJMYXN0XCIgcGFnZSBsaW5rcyBhcmUgc2hvd24uXG4gICAqL1xuICBASW5wdXQoKSBib3VuZGFyeUxpbmtzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHRoZSBcIk5leHRcIiBhbmQgXCJQcmV2aW91c1wiIHBhZ2UgbGlua3MgYXJlIHNob3duLlxuICAgKi9cbiAgQElucHV0KCkgZGlyZWN0aW9uTGlua3M6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgdGhlIGVsbGlwc2lzIHN5bWJvbHMgYW5kIGZpcnN0L2xhc3QgcGFnZSBudW1iZXJzIHdpbGwgYmUgc2hvd24gd2hlbiBgbWF4U2l6ZWAgPiBudW1iZXIgb2YgcGFnZXMuXG4gICAqL1xuICBASW5wdXQoKSBlbGxpcHNlczogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2hldGhlciB0byByb3RhdGUgcGFnZXMgd2hlbiBgbWF4U2l6ZWAgPiBudW1iZXIgb2YgcGFnZXMuXG4gICAqXG4gICAqIFRoZSBjdXJyZW50IHBhZ2UgYWx3YXlzIHN0YXlzIGluIHRoZSBtaWRkbGUgaWYgYHRydWVgLlxuICAgKi9cbiAgQElucHV0KCkgcm90YXRlOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiAgVGhlIG51bWJlciBvZiBpdGVtcyBpbiB5b3VyIHBhZ2luYXRlZCBjb2xsZWN0aW9uLlxuICAgKlxuICAgKiAgTm90ZSwgdGhhdCB0aGlzIGlzIG5vdCB0aGUgbnVtYmVyIG9mIHBhZ2VzLiBQYWdlIG51bWJlcnMgYXJlIGNhbGN1bGF0ZWQgZHluYW1pY2FsbHkgYmFzZWQgb25cbiAgICogIGBjb2xsZWN0aW9uU2l6ZWAgYW5kIGBwYWdlU2l6ZWAuIEV4LiBpZiB5b3UgaGF2ZSAxMDAgaXRlbXMgaW4geW91ciBjb2xsZWN0aW9uIGFuZCBkaXNwbGF5aW5nIDIwIGl0ZW1zIHBlciBwYWdlLFxuICAgKiAgeW91J2xsIGVuZCB1cCB3aXRoIDUgcGFnZXMuXG4gICAqL1xuICBASW5wdXQoKSBjb2xsZWN0aW9uU2l6ZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiAgVGhlIG1heGltdW0gbnVtYmVyIG9mIHBhZ2VzIHRvIGRpc3BsYXkuXG4gICAqL1xuICBASW5wdXQoKSBtYXhTaXplOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqICBUaGUgY3VycmVudCBwYWdlLlxuICAgKlxuICAgKiAgUGFnZSBudW1iZXJzIHN0YXJ0IHdpdGggYDFgLlxuICAgKi9cbiAgQElucHV0KCkgcGFnZSA9IDE7XG5cbiAgLyoqXG4gICAqICBUaGUgbnVtYmVyIG9mIGl0ZW1zIHBlciBwYWdlLlxuICAgKi9cbiAgQElucHV0KCkgcGFnZVNpemU6IG51bWJlcjtcblxuICAvKipcbiAgICogIEFuIGV2ZW50IGZpcmVkIHdoZW4gdGhlIHBhZ2UgaXMgY2hhbmdlZC4gV2lsbCBmaXJlIG9ubHkgaWYgY29sbGVjdGlvbiBzaXplIGlzIHNldCBhbmQgYWxsIHZhbHVlcyBhcmUgdmFsaWQuXG4gICAqXG4gICAqICBFdmVudCBwYXlsb2FkIGlzIHRoZSBudW1iZXIgb2YgdGhlIG5ld2x5IHNlbGVjdGVkIHBhZ2UuXG4gICAqXG4gICAqICBQYWdlIG51bWJlcnMgc3RhcnQgd2l0aCBgMWAuXG4gICAqL1xuICBAT3V0cHV0KCkgcGFnZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPih0cnVlKTtcblxuICAvKipcbiAgICogVGhlIHBhZ2luYXRpb24gZGlzcGxheSBzaXplLlxuICAgKlxuICAgKiBCb290c3RyYXAgY3VycmVudGx5IHN1cHBvcnRzIHNtYWxsIGFuZCBsYXJnZSBzaXplcy5cbiAgICovXG4gIEBJbnB1dCgpIHNpemU6ICdzbScgfCAnbGcnO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogTmdiUGFnaW5hdGlvbkNvbmZpZykge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBjb25maWcuZGlzYWJsZWQ7XG4gICAgdGhpcy5ib3VuZGFyeUxpbmtzID0gY29uZmlnLmJvdW5kYXJ5TGlua3M7XG4gICAgdGhpcy5kaXJlY3Rpb25MaW5rcyA9IGNvbmZpZy5kaXJlY3Rpb25MaW5rcztcbiAgICB0aGlzLmVsbGlwc2VzID0gY29uZmlnLmVsbGlwc2VzO1xuICAgIHRoaXMubWF4U2l6ZSA9IGNvbmZpZy5tYXhTaXplO1xuICAgIHRoaXMucGFnZVNpemUgPSBjb25maWcucGFnZVNpemU7XG4gICAgdGhpcy5yb3RhdGUgPSBjb25maWcucm90YXRlO1xuICAgIHRoaXMuc2l6ZSA9IGNvbmZpZy5zaXplO1xuICB9XG5cbiAgaGFzUHJldmlvdXMoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnBhZ2UgPiAxOyB9XG5cbiAgaGFzTmV4dCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMucGFnZSA8IHRoaXMucGFnZUNvdW50OyB9XG5cbiAgbmV4dERpc2FibGVkKCk6IGJvb2xlYW4geyByZXR1cm4gIXRoaXMuaGFzTmV4dCgpIHx8IHRoaXMuZGlzYWJsZWQ7IH1cblxuICBwcmV2aW91c0Rpc2FibGVkKCk6IGJvb2xlYW4geyByZXR1cm4gIXRoaXMuaGFzUHJldmlvdXMoKSB8fCB0aGlzLmRpc2FibGVkOyB9XG5cbiAgc2VsZWN0UGFnZShwYWdlTnVtYmVyOiBudW1iZXIpOiB2b2lkIHsgdGhpcy5fdXBkYXRlUGFnZXMocGFnZU51bWJlcik7IH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7IHRoaXMuX3VwZGF0ZVBhZ2VzKHRoaXMucGFnZSk7IH1cblxuICBpc0VsbGlwc2lzKHBhZ2VOdW1iZXIpOiBib29sZWFuIHsgcmV0dXJuIHBhZ2VOdW1iZXIgPT09IC0xOyB9XG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgZWxsaXBzZXMgYW5kIGZpcnN0L2xhc3QgcGFnZSBudW1iZXIgdG8gdGhlIGRpc3BsYXllZCBwYWdlc1xuICAgKi9cbiAgcHJpdmF0ZSBfYXBwbHlFbGxpcHNlcyhzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcikge1xuICAgIGlmICh0aGlzLmVsbGlwc2VzKSB7XG4gICAgICBpZiAoc3RhcnQgPiAwKSB7XG4gICAgICAgIC8vIFRoZSBmaXJzdCBwYWdlIHdpbGwgYWx3YXlzIGJlIGluY2x1ZGVkLiBJZiB0aGUgZGlzcGxheWVkIHJhbmdlXG4gICAgICAgIC8vIHN0YXJ0cyBhZnRlciB0aGUgdGhpcmQgcGFnZSwgdGhlbiBhZGQgZWxsaXBzaXMuIEJ1dCBpZiB0aGUgcmFuZ2VcbiAgICAgICAgLy8gc3RhcnRzIG9uIHRoZSB0aGlyZCBwYWdlLCB0aGVuIGFkZCB0aGUgc2Vjb25kIHBhZ2UgaW5zdGVhZCBvZlxuICAgICAgICAvLyBhbiBlbGxpcHNpcywgYmVjYXVzZSB0aGUgZWxsaXBzaXMgd291bGQgb25seSBoaWRlIGEgc2luZ2xlIHBhZ2UuXG4gICAgICAgIGlmIChzdGFydCA+IDIpIHtcbiAgICAgICAgICB0aGlzLnBhZ2VzLnVuc2hpZnQoLTEpO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0ID09PSAyKSB7XG4gICAgICAgICAgdGhpcy5wYWdlcy51bnNoaWZ0KDIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFnZXMudW5zaGlmdCgxKTtcbiAgICAgIH1cbiAgICAgIGlmIChlbmQgPCB0aGlzLnBhZ2VDb3VudCkge1xuICAgICAgICAvLyBUaGUgbGFzdCBwYWdlIHdpbGwgYWx3YXlzIGJlIGluY2x1ZGVkLiBJZiB0aGUgZGlzcGxheWVkIHJhbmdlXG4gICAgICAgIC8vIGVuZHMgYmVmb3JlIHRoZSB0aGlyZC1sYXN0IHBhZ2UsIHRoZW4gYWRkIGVsbGlwc2lzLiBCdXQgaWYgdGhlIHJhbmdlXG4gICAgICAgIC8vIGVuZHMgb24gdGhpcmQtbGFzdCBwYWdlLCB0aGVuIGFkZCB0aGUgc2Vjb25kLWxhc3QgcGFnZSBpbnN0ZWFkIG9mXG4gICAgICAgIC8vIGFuIGVsbGlwc2lzLCBiZWNhdXNlIHRoZSBlbGxpcHNpcyB3b3VsZCBvbmx5IGhpZGUgYSBzaW5nbGUgcGFnZS5cbiAgICAgICAgaWYgKGVuZCA8ICh0aGlzLnBhZ2VDb3VudCAtIDIpKSB7XG4gICAgICAgICAgdGhpcy5wYWdlcy5wdXNoKC0xKTtcbiAgICAgICAgfSBlbHNlIGlmIChlbmQgPT09ICh0aGlzLnBhZ2VDb3VudCAtIDIpKSB7XG4gICAgICAgICAgdGhpcy5wYWdlcy5wdXNoKHRoaXMucGFnZUNvdW50IC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYWdlcy5wdXNoKHRoaXMucGFnZUNvdW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUm90YXRlcyBwYWdlIG51bWJlcnMgYmFzZWQgb24gbWF4U2l6ZSBpdGVtcyB2aXNpYmxlLlxuICAgKiBDdXJyZW50bHkgc2VsZWN0ZWQgcGFnZSBzdGF5cyBpbiB0aGUgbWlkZGxlOlxuICAgKlxuICAgKiBFeC4gZm9yIHNlbGVjdGVkIHBhZ2UgPSA2OlxuICAgKiBbNSwqNiosN10gZm9yIG1heFNpemUgPSAzXG4gICAqIFs0LDUsKjYqLDddIGZvciBtYXhTaXplID0gNFxuICAgKi9cbiAgcHJpdmF0ZSBfYXBwbHlSb3RhdGlvbigpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgICBsZXQgc3RhcnQgPSAwO1xuICAgIGxldCBlbmQgPSB0aGlzLnBhZ2VDb3VudDtcbiAgICBsZXQgbGVmdE9mZnNldCA9IE1hdGguZmxvb3IodGhpcy5tYXhTaXplIC8gMik7XG4gICAgbGV0IHJpZ2h0T2Zmc2V0ID0gdGhpcy5tYXhTaXplICUgMiA9PT0gMCA/IGxlZnRPZmZzZXQgLSAxIDogbGVmdE9mZnNldDtcblxuICAgIGlmICh0aGlzLnBhZ2UgPD0gbGVmdE9mZnNldCkge1xuICAgICAgLy8gdmVyeSBiZWdpbm5pbmcsIG5vIHJvdGF0aW9uIC0+IFswLi5tYXhTaXplXVxuICAgICAgZW5kID0gdGhpcy5tYXhTaXplO1xuICAgIH0gZWxzZSBpZiAodGhpcy5wYWdlQ291bnQgLSB0aGlzLnBhZ2UgPCBsZWZ0T2Zmc2V0KSB7XG4gICAgICAvLyB2ZXJ5IGVuZCwgbm8gcm90YXRpb24gLT4gW2xlbi1tYXhTaXplLi5sZW5dXG4gICAgICBzdGFydCA9IHRoaXMucGFnZUNvdW50IC0gdGhpcy5tYXhTaXplO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyByb3RhdGVcbiAgICAgIHN0YXJ0ID0gdGhpcy5wYWdlIC0gbGVmdE9mZnNldCAtIDE7XG4gICAgICBlbmQgPSB0aGlzLnBhZ2UgKyByaWdodE9mZnNldDtcbiAgICB9XG5cbiAgICByZXR1cm4gW3N0YXJ0LCBlbmRdO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhZ2luYXRlcyBwYWdlIG51bWJlcnMgYmFzZWQgb24gbWF4U2l6ZSBpdGVtcyBwZXIgcGFnZS5cbiAgICovXG4gIHByaXZhdGUgX2FwcGx5UGFnaW5hdGlvbigpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgICBsZXQgcGFnZSA9IE1hdGguY2VpbCh0aGlzLnBhZ2UgLyB0aGlzLm1heFNpemUpIC0gMTtcbiAgICBsZXQgc3RhcnQgPSBwYWdlICogdGhpcy5tYXhTaXplO1xuICAgIGxldCBlbmQgPSBzdGFydCArIHRoaXMubWF4U2l6ZTtcblxuICAgIHJldHVybiBbc3RhcnQsIGVuZF07XG4gIH1cblxuICBwcml2YXRlIF9zZXRQYWdlSW5SYW5nZShuZXdQYWdlTm8pIHtcbiAgICBjb25zdCBwcmV2UGFnZU5vID0gdGhpcy5wYWdlO1xuICAgIHRoaXMucGFnZSA9IGdldFZhbHVlSW5SYW5nZShuZXdQYWdlTm8sIHRoaXMucGFnZUNvdW50LCAxKTtcblxuICAgIGlmICh0aGlzLnBhZ2UgIT09IHByZXZQYWdlTm8gJiYgaXNOdW1iZXIodGhpcy5jb2xsZWN0aW9uU2l6ZSkpIHtcbiAgICAgIHRoaXMucGFnZUNoYW5nZS5lbWl0KHRoaXMucGFnZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlUGFnZXMobmV3UGFnZTogbnVtYmVyKSB7XG4gICAgdGhpcy5wYWdlQ291bnQgPSBNYXRoLmNlaWwodGhpcy5jb2xsZWN0aW9uU2l6ZSAvIHRoaXMucGFnZVNpemUpO1xuXG4gICAgaWYgKCFpc051bWJlcih0aGlzLnBhZ2VDb3VudCkpIHtcbiAgICAgIHRoaXMucGFnZUNvdW50ID0gMDtcbiAgICB9XG5cbiAgICAvLyBmaWxsLWluIG1vZGVsIG5lZWRlZCB0byByZW5kZXIgcGFnZXNcbiAgICB0aGlzLnBhZ2VzLmxlbmd0aCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gdGhpcy5wYWdlQ291bnQ7IGkrKykge1xuICAgICAgdGhpcy5wYWdlcy5wdXNoKGkpO1xuICAgIH1cblxuICAgIC8vIHNldCBwYWdlIHdpdGhpbiAxLi5tYXggcmFuZ2VcbiAgICB0aGlzLl9zZXRQYWdlSW5SYW5nZShuZXdQYWdlKTtcblxuICAgIC8vIGFwcGx5IG1heFNpemUgaWYgbmVjZXNzYXJ5XG4gICAgaWYgKHRoaXMubWF4U2l6ZSA+IDAgJiYgdGhpcy5wYWdlQ291bnQgPiB0aGlzLm1heFNpemUpIHtcbiAgICAgIGxldCBzdGFydCA9IDA7XG4gICAgICBsZXQgZW5kID0gdGhpcy5wYWdlQ291bnQ7XG5cbiAgICAgIC8vIGVpdGhlciBwYWdpbmF0aW5nIG9yIHJvdGF0aW5nIHBhZ2UgbnVtYmVyc1xuICAgICAgaWYgKHRoaXMucm90YXRlKSB7XG4gICAgICAgIFtzdGFydCwgZW5kXSA9IHRoaXMuX2FwcGx5Um90YXRpb24oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFtzdGFydCwgZW5kXSA9IHRoaXMuX2FwcGx5UGFnaW5hdGlvbigpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnBhZ2VzID0gdGhpcy5wYWdlcy5zbGljZShzdGFydCwgZW5kKTtcblxuICAgICAgLy8gYWRkaW5nIGVsbGlwc2VzXG4gICAgICB0aGlzLl9hcHBseUVsbGlwc2VzKHN0YXJ0LCBlbmQpO1xuICAgIH1cbiAgfVxufVxuIl19