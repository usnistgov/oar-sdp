/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
// previous version:
// https://github.com/angular-ui/bootstrap/blob/07c31d0731f7cb068a1932b8e01d2312b796b4ec/src/position/position.js
var 
// previous version:
// https://github.com/angular-ui/bootstrap/blob/07c31d0731f7cb068a1932b8e01d2312b796b4ec/src/position/position.js
Positioning = /** @class */ (function () {
    function Positioning() {
    }
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    Positioning.prototype.getAllStyles = /**
     * @private
     * @param {?} element
     * @return {?}
     */
    function (element) { return window.getComputedStyle(element); };
    /**
     * @private
     * @param {?} element
     * @param {?} prop
     * @return {?}
     */
    Positioning.prototype.getStyle = /**
     * @private
     * @param {?} element
     * @param {?} prop
     * @return {?}
     */
    function (element, prop) { return this.getAllStyles(element)[prop]; };
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    Positioning.prototype.isStaticPositioned = /**
     * @private
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return (this.getStyle(element, 'position') || 'static') === 'static';
    };
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    Positioning.prototype.offsetParent = /**
     * @private
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var offsetParentEl = (/** @type {?} */ (element.offsetParent)) || document.documentElement;
        while (offsetParentEl && offsetParentEl !== document.documentElement && this.isStaticPositioned(offsetParentEl)) {
            offsetParentEl = (/** @type {?} */ (offsetParentEl.offsetParent));
        }
        return offsetParentEl || document.documentElement;
    };
    /**
     * @param {?} element
     * @param {?=} round
     * @return {?}
     */
    Positioning.prototype.position = /**
     * @param {?} element
     * @param {?=} round
     * @return {?}
     */
    function (element, round) {
        if (round === void 0) { round = true; }
        /** @type {?} */
        var elPosition;
        /** @type {?} */
        var parentOffset = { width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0 };
        if (this.getStyle(element, 'position') === 'fixed') {
            elPosition = element.getBoundingClientRect();
            elPosition = {
                top: elPosition.top,
                bottom: elPosition.bottom,
                left: elPosition.left,
                right: elPosition.right,
                height: elPosition.height,
                width: elPosition.width
            };
        }
        else {
            /** @type {?} */
            var offsetParentEl = this.offsetParent(element);
            elPosition = this.offset(element, false);
            if (offsetParentEl !== document.documentElement) {
                parentOffset = this.offset(offsetParentEl, false);
            }
            parentOffset.top += offsetParentEl.clientTop;
            parentOffset.left += offsetParentEl.clientLeft;
        }
        elPosition.top -= parentOffset.top;
        elPosition.bottom -= parentOffset.top;
        elPosition.left -= parentOffset.left;
        elPosition.right -= parentOffset.left;
        if (round) {
            elPosition.top = Math.round(elPosition.top);
            elPosition.bottom = Math.round(elPosition.bottom);
            elPosition.left = Math.round(elPosition.left);
            elPosition.right = Math.round(elPosition.right);
        }
        return elPosition;
    };
    /**
     * @param {?} element
     * @param {?=} round
     * @return {?}
     */
    Positioning.prototype.offset = /**
     * @param {?} element
     * @param {?=} round
     * @return {?}
     */
    function (element, round) {
        if (round === void 0) { round = true; }
        /** @type {?} */
        var elBcr = element.getBoundingClientRect();
        /** @type {?} */
        var viewportOffset = {
            top: window.pageYOffset - document.documentElement.clientTop,
            left: window.pageXOffset - document.documentElement.clientLeft
        };
        /** @type {?} */
        var elOffset = {
            height: elBcr.height || element.offsetHeight,
            width: elBcr.width || element.offsetWidth,
            top: elBcr.top + viewportOffset.top,
            bottom: elBcr.bottom + viewportOffset.top,
            left: elBcr.left + viewportOffset.left,
            right: elBcr.right + viewportOffset.left
        };
        if (round) {
            elOffset.height = Math.round(elOffset.height);
            elOffset.width = Math.round(elOffset.width);
            elOffset.top = Math.round(elOffset.top);
            elOffset.bottom = Math.round(elOffset.bottom);
            elOffset.left = Math.round(elOffset.left);
            elOffset.right = Math.round(elOffset.right);
        }
        return elOffset;
    };
    /*
      Return false if the element to position is outside the viewport
    */
    /*
        Return false if the element to position is outside the viewport
      */
    /**
     * @param {?} hostElement
     * @param {?} targetElement
     * @param {?} placement
     * @param {?=} appendToBody
     * @return {?}
     */
    Positioning.prototype.positionElements = /*
        Return false if the element to position is outside the viewport
      */
    /**
     * @param {?} hostElement
     * @param {?} targetElement
     * @param {?} placement
     * @param {?=} appendToBody
     * @return {?}
     */
    function (hostElement, targetElement, placement, appendToBody) {
        var _a = tslib_1.__read(placement.split('-'), 2), _b = _a[0], placementPrimary = _b === void 0 ? 'top' : _b, _c = _a[1], placementSecondary = _c === void 0 ? 'center' : _c;
        /** @type {?} */
        var hostElPosition = appendToBody ? this.offset(hostElement, false) : this.position(hostElement, false);
        /** @type {?} */
        var targetElStyles = this.getAllStyles(targetElement);
        /** @type {?} */
        var marginTop = parseFloat(targetElStyles.marginTop);
        /** @type {?} */
        var marginBottom = parseFloat(targetElStyles.marginBottom);
        /** @type {?} */
        var marginLeft = parseFloat(targetElStyles.marginLeft);
        /** @type {?} */
        var marginRight = parseFloat(targetElStyles.marginRight);
        /** @type {?} */
        var topPosition = 0;
        /** @type {?} */
        var leftPosition = 0;
        switch (placementPrimary) {
            case 'top':
                topPosition = (hostElPosition.top - (targetElement.offsetHeight + marginTop + marginBottom));
                break;
            case 'bottom':
                topPosition = (hostElPosition.top + hostElPosition.height);
                break;
            case 'left':
                leftPosition = (hostElPosition.left - (targetElement.offsetWidth + marginLeft + marginRight));
                break;
            case 'right':
                leftPosition = (hostElPosition.left + hostElPosition.width);
                break;
        }
        switch (placementSecondary) {
            case 'top':
                topPosition = hostElPosition.top;
                break;
            case 'bottom':
                topPosition = hostElPosition.top + hostElPosition.height - targetElement.offsetHeight;
                break;
            case 'left':
                leftPosition = hostElPosition.left;
                break;
            case 'right':
                leftPosition = hostElPosition.left + hostElPosition.width - targetElement.offsetWidth;
                break;
            case 'center':
                if (placementPrimary === 'top' || placementPrimary === 'bottom') {
                    leftPosition = (hostElPosition.left + hostElPosition.width / 2 - targetElement.offsetWidth / 2);
                }
                else {
                    topPosition = (hostElPosition.top + hostElPosition.height / 2 - targetElement.offsetHeight / 2);
                }
                break;
        }
        /// The translate3d/gpu acceleration render a blurry text on chrome, the next line is commented until a browser fix
        // targetElement.style.transform = `translate3d(${Math.round(leftPosition)}px, ${Math.floor(topPosition)}px, 0px)`;
        targetElement.style.transform = "translate(" + Math.round(leftPosition) + "px, " + Math.round(topPosition) + "px)";
        // Check if the targetElement is inside the viewport
        /** @type {?} */
        var targetElBCR = targetElement.getBoundingClientRect();
        /** @type {?} */
        var html = document.documentElement;
        /** @type {?} */
        var windowHeight = window.innerHeight || html.clientHeight;
        /** @type {?} */
        var windowWidth = window.innerWidth || html.clientWidth;
        return targetElBCR.left >= 0 && targetElBCR.top >= 0 && targetElBCR.right <= windowWidth &&
            targetElBCR.bottom <= windowHeight;
    };
    return Positioning;
}());
// previous version:
// https://github.com/angular-ui/bootstrap/blob/07c31d0731f7cb068a1932b8e01d2312b796b4ec/src/position/position.js
export { Positioning };
/** @type {?} */
var placementSeparator = /\s+/;
/** @type {?} */
var positionService = new Positioning();
/*
 * Accept the placement array and applies the appropriate placement dependent on the viewport.
 * Returns the applied placement.
 * In case of auto placement, placements are selected in order
 *   'top', 'bottom', 'left', 'right',
 *   'top-left', 'top-right',
 *   'bottom-left', 'bottom-right',
 *   'left-top', 'left-bottom',
 *   'right-top', 'right-bottom'.
 * */
/**
 * @param {?} hostElement
 * @param {?} targetElement
 * @param {?} placement
 * @param {?=} appendToBody
 * @param {?=} baseClass
 * @return {?}
 */
export function positionElements(hostElement, targetElement, placement, appendToBody, baseClass) {
    var e_1, _a;
    /** @type {?} */
    var placementVals = Array.isArray(placement) ? placement : (/** @type {?} */ (placement.split(placementSeparator)));
    /** @type {?} */
    var allowedPlacements = [
        'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'left-top', 'left-bottom',
        'right-top', 'right-bottom'
    ];
    /** @type {?} */
    var classList = targetElement.classList;
    /** @type {?} */
    var addClassesToTarget = (/**
     * @param {?} targetPlacement
     * @return {?}
     */
    function (targetPlacement) {
        var _a = tslib_1.__read(targetPlacement.split('-'), 2), primary = _a[0], secondary = _a[1];
        /** @type {?} */
        var classes = [];
        if (baseClass) {
            classes.push(baseClass + "-" + primary);
            if (secondary) {
                classes.push(baseClass + "-" + primary + "-" + secondary);
            }
            classes.forEach((/**
             * @param {?} classname
             * @return {?}
             */
            function (classname) { classList.add(classname); }));
        }
        return classes;
    });
    // Remove old placement classes to avoid issues
    if (baseClass) {
        allowedPlacements.forEach((/**
         * @param {?} placementToRemove
         * @return {?}
         */
        function (placementToRemove) { classList.remove(baseClass + "-" + placementToRemove); }));
    }
    // replace auto placement with other placements
    /** @type {?} */
    var hasAuto = placementVals.findIndex((/**
     * @param {?} val
     * @return {?}
     */
    function (val) { return val === 'auto'; }));
    if (hasAuto >= 0) {
        allowedPlacements.forEach((/**
         * @param {?} obj
         * @return {?}
         */
        function (obj) {
            if (placementVals.find((/**
             * @param {?} val
             * @return {?}
             */
            function (val) { return val.search('^' + obj) !== -1; })) == null) {
                placementVals.splice(hasAuto++, 1, (/** @type {?} */ (obj)));
            }
        }));
    }
    // coordinates where to position
    // Required for transform:
    /** @type {?} */
    var style = targetElement.style;
    style.position = 'absolute';
    style.top = '0';
    style.left = '0';
    style['will-change'] = 'transform';
    /** @type {?} */
    var testPlacement;
    /** @type {?} */
    var isInViewport = false;
    try {
        for (var placementVals_1 = tslib_1.__values(placementVals), placementVals_1_1 = placementVals_1.next(); !placementVals_1_1.done; placementVals_1_1 = placementVals_1.next()) {
            testPlacement = placementVals_1_1.value;
            /** @type {?} */
            var addedClasses = addClassesToTarget(testPlacement);
            if (positionService.positionElements(hostElement, targetElement, testPlacement, appendToBody)) {
                isInViewport = true;
                break;
            }
            // Remove the baseClasses for further calculation
            if (baseClass) {
                addedClasses.forEach((/**
                 * @param {?} classname
                 * @return {?}
                 */
                function (classname) { classList.remove(classname); }));
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (placementVals_1_1 && !placementVals_1_1.done && (_a = placementVals_1.return)) _a.call(placementVals_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    if (!isInViewport) {
        // If nothing match, the first placement is the default one
        testPlacement = placementVals[0];
        addClassesToTarget(testPlacement);
        positionService.positionElements(hostElement, targetElement, testPlacement, appendToBody);
    }
    return testPlacement;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zaXRpb25pbmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInV0aWwvcG9zaXRpb25pbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOzs7O0lBQUE7SUE2SkEsQ0FBQzs7Ozs7O0lBNUpTLGtDQUFZOzs7OztJQUFwQixVQUFxQixPQUFvQixJQUFJLE9BQU8sTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7OztJQUUvRSw4QkFBUTs7Ozs7O0lBQWhCLFVBQWlCLE9BQW9CLEVBQUUsSUFBWSxJQUFZLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUVqRyx3Q0FBa0I7Ozs7O0lBQTFCLFVBQTJCLE9BQW9CO1FBQzdDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxRQUFRLENBQUM7SUFDdkUsQ0FBQzs7Ozs7O0lBRU8sa0NBQVk7Ozs7O0lBQXBCLFVBQXFCLE9BQW9COztZQUNuQyxjQUFjLEdBQUcsbUJBQWEsT0FBTyxDQUFDLFlBQVksRUFBQSxJQUFJLFFBQVEsQ0FBQyxlQUFlO1FBRWxGLE9BQU8sY0FBYyxJQUFJLGNBQWMsS0FBSyxRQUFRLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUMvRyxjQUFjLEdBQUcsbUJBQWEsY0FBYyxDQUFDLFlBQVksRUFBQSxDQUFDO1NBQzNEO1FBRUQsT0FBTyxjQUFjLElBQUksUUFBUSxDQUFDLGVBQWUsQ0FBQztJQUNwRCxDQUFDOzs7Ozs7SUFFRCw4QkFBUTs7Ozs7SUFBUixVQUFTLE9BQW9CLEVBQUUsS0FBWTtRQUFaLHNCQUFBLEVBQUEsWUFBWTs7WUFDckMsVUFBc0I7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QkFBa0IsQ0FBQyxhQUFhLENBQUM7WUFFcEQsSUFBSSxlQUFlLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsWUFBWSxDQUFDLEVBQUU7Z0JBQzdGLFlBQVksR0FBRyxJQUFJLENBQUM7Z0JBQ3BCLE1BQU07YUFDUDtZQUVELGlEQUFpRDtZQUNqRCxJQUFJLFNBQVMsRUFBRTtnQkFDYixZQUFZLENBQUMsT0FBTzs7OztnQkFBQyxVQUFDLFNBQVMsSUFBTyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7YUFDdkU7U0FDRjs7Ozs7Ozs7O0lBRUQsSUFBSSxDQUFDLFlBQVksRUFBRTtRQUNqQiwyREFBMkQ7UUFDM0QsYUFBYSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNsQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsWUFBWSxDQUFDLENBQUM7S0FDM0Y7SUFFRCxPQUFPLGFBQWEsQ0FBQztBQUN2QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcHJldmlvdXMgdmVyc2lvbjpcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyLXVpL2Jvb3RzdHJhcC9ibG9iLzA3YzMxZDA3MzFmN2NiMDY4YTE5MzJiOGUwMWQyMzEyYjc5NmI0ZWMvc3JjL3Bvc2l0aW9uL3Bvc2l0aW9uLmpzXG5leHBvcnQgY2xhc3MgUG9zaXRpb25pbmcge1xuICBwcml2YXRlIGdldEFsbFN0eWxlcyhlbGVtZW50OiBIVE1MRWxlbWVudCkgeyByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7IH1cblxuICBwcml2YXRlIGdldFN0eWxlKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwcm9wOiBzdHJpbmcpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5nZXRBbGxTdHlsZXMoZWxlbWVudClbcHJvcF07IH1cblxuICBwcml2YXRlIGlzU3RhdGljUG9zaXRpb25lZChlbGVtZW50OiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAodGhpcy5nZXRTdHlsZShlbGVtZW50LCAncG9zaXRpb24nKSB8fCAnc3RhdGljJykgPT09ICdzdGF0aWMnO1xuICB9XG5cbiAgcHJpdmF0ZSBvZmZzZXRQYXJlbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgbGV0IG9mZnNldFBhcmVudEVsID0gPEhUTUxFbGVtZW50PmVsZW1lbnQub2Zmc2V0UGFyZW50IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuICAgIHdoaWxlIChvZmZzZXRQYXJlbnRFbCAmJiBvZmZzZXRQYXJlbnRFbCAhPT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIHRoaXMuaXNTdGF0aWNQb3NpdGlvbmVkKG9mZnNldFBhcmVudEVsKSkge1xuICAgICAgb2Zmc2V0UGFyZW50RWwgPSA8SFRNTEVsZW1lbnQ+b2Zmc2V0UGFyZW50RWwub2Zmc2V0UGFyZW50O1xuICAgIH1cblxuICAgIHJldHVybiBvZmZzZXRQYXJlbnRFbCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gIH1cblxuICBwb3NpdGlvbihlbGVtZW50OiBIVE1MRWxlbWVudCwgcm91bmQgPSB0cnVlKTogQ2xpZW50UmVjdCB7XG4gICAgbGV0IGVsUG9zaXRpb246IENsaWVudFJlY3Q7XG4gICAgbGV0IHBhcmVudE9mZnNldDogQ2xpZW50UmVjdCA9IHt3aWR0aDogMCwgaGVpZ2h0OiAwLCB0b3A6IDAsIGJvdHRvbTogMCwgbGVmdDogMCwgcmlnaHQ6IDB9O1xuXG4gICAgaWYgKHRoaXMuZ2V0U3R5bGUoZWxlbWVudCwgJ3Bvc2l0aW9uJykgPT09ICdmaXhlZCcpIHtcbiAgICAgIGVsUG9zaXRpb24gPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgZWxQb3NpdGlvbiA9IHtcbiAgICAgICAgdG9wOiBlbFBvc2l0aW9uLnRvcCxcbiAgICAgICAgYm90dG9tOiBlbFBvc2l0aW9uLmJvdHRvbSxcbiAgICAgICAgbGVmdDogZWxQb3NpdGlvbi5sZWZ0LFxuICAgICAgICByaWdodDogZWxQb3NpdGlvbi5yaWdodCxcbiAgICAgICAgaGVpZ2h0OiBlbFBvc2l0aW9uLmhlaWdodCxcbiAgICAgICAgd2lkdGg6IGVsUG9zaXRpb24ud2lkdGhcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG9mZnNldFBhcmVudEVsID0gdGhpcy5vZmZzZXRQYXJlbnQoZWxlbWVudCk7XG5cbiAgICAgIGVsUG9zaXRpb24gPSB0aGlzLm9mZnNldChlbGVtZW50LCBmYWxzZSk7XG5cbiAgICAgIGlmIChvZmZzZXRQYXJlbnRFbCAhPT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgIHBhcmVudE9mZnNldCA9IHRoaXMub2Zmc2V0KG9mZnNldFBhcmVudEVsLCBmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIHBhcmVudE9mZnNldC50b3AgKz0gb2Zmc2V0UGFyZW50RWwuY2xpZW50VG9wO1xuICAgICAgcGFyZW50T2Zmc2V0LmxlZnQgKz0gb2Zmc2V0UGFyZW50RWwuY2xpZW50TGVmdDtcbiAgICB9XG5cbiAgICBlbFBvc2l0aW9uLnRvcCAtPSBwYXJlbnRPZmZzZXQudG9wO1xuICAgIGVsUG9zaXRpb24uYm90dG9tIC09IHBhcmVudE9mZnNldC50b3A7XG4gICAgZWxQb3NpdGlvbi5sZWZ0IC09IHBhcmVudE9mZnNldC5sZWZ0O1xuICAgIGVsUG9zaXRpb24ucmlnaHQgLT0gcGFyZW50T2Zmc2V0LmxlZnQ7XG5cbiAgICBpZiAocm91bmQpIHtcbiAgICAgIGVsUG9zaXRpb24udG9wID0gTWF0aC5yb3VuZChlbFBvc2l0aW9uLnRvcCk7XG4gICAgICBlbFBvc2l0aW9uLmJvdHRvbSA9IE1hdGgucm91bmQoZWxQb3NpdGlvbi5ib3R0b20pO1xuICAgICAgZWxQb3NpdGlvbi5sZWZ0ID0gTWF0aC5yb3VuZChlbFBvc2l0aW9uLmxlZnQpO1xuICAgICAgZWxQb3NpdGlvbi5yaWdodCA9IE1hdGgucm91bmQoZWxQb3NpdGlvbi5yaWdodCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsUG9zaXRpb247XG4gIH1cblxuICBvZmZzZXQoZWxlbWVudDogSFRNTEVsZW1lbnQsIHJvdW5kID0gdHJ1ZSk6IENsaWVudFJlY3Qge1xuICAgIGNvbnN0IGVsQmNyID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB2aWV3cG9ydE9mZnNldCA9IHtcbiAgICAgIHRvcDogd2luZG93LnBhZ2VZT2Zmc2V0IC0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFRvcCxcbiAgICAgIGxlZnQ6IHdpbmRvdy5wYWdlWE9mZnNldCAtIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRMZWZ0XG4gICAgfTtcblxuICAgIGxldCBlbE9mZnNldCA9IHtcbiAgICAgIGhlaWdodDogZWxCY3IuaGVpZ2h0IHx8IGVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxuICAgICAgd2lkdGg6IGVsQmNyLndpZHRoIHx8IGVsZW1lbnQub2Zmc2V0V2lkdGgsXG4gICAgICB0b3A6IGVsQmNyLnRvcCArIHZpZXdwb3J0T2Zmc2V0LnRvcCxcbiAgICAgIGJvdHRvbTogZWxCY3IuYm90dG9tICsgdmlld3BvcnRPZmZzZXQudG9wLFxuICAgICAgbGVmdDogZWxCY3IubGVmdCArIHZpZXdwb3J0T2Zmc2V0LmxlZnQsXG4gICAgICByaWdodDogZWxCY3IucmlnaHQgKyB2aWV3cG9ydE9mZnNldC5sZWZ0XG4gICAgfTtcblxuICAgIGlmIChyb3VuZCkge1xuICAgICAgZWxPZmZzZXQuaGVpZ2h0ID0gTWF0aC5yb3VuZChlbE9mZnNldC5oZWlnaHQpO1xuICAgICAgZWxPZmZzZXQud2lkdGggPSBNYXRoLnJvdW5kKGVsT2Zmc2V0LndpZHRoKTtcbiAgICAgIGVsT2Zmc2V0LnRvcCA9IE1hdGgucm91bmQoZWxPZmZzZXQudG9wKTtcbiAgICAgIGVsT2Zmc2V0LmJvdHRvbSA9IE1hdGgucm91bmQoZWxPZmZzZXQuYm90dG9tKTtcbiAgICAgIGVsT2Zmc2V0LmxlZnQgPSBNYXRoLnJvdW5kKGVsT2Zmc2V0LmxlZnQpO1xuICAgICAgZWxPZmZzZXQucmlnaHQgPSBNYXRoLnJvdW5kKGVsT2Zmc2V0LnJpZ2h0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxPZmZzZXQ7XG4gIH1cblxuICAvKlxuICAgIFJldHVybiBmYWxzZSBpZiB0aGUgZWxlbWVudCB0byBwb3NpdGlvbiBpcyBvdXRzaWRlIHRoZSB2aWV3cG9ydFxuICAqL1xuICBwb3NpdGlvbkVsZW1lbnRzKGhvc3RFbGVtZW50OiBIVE1MRWxlbWVudCwgdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQsIHBsYWNlbWVudDogc3RyaW5nLCBhcHBlbmRUb0JvZHk/OiBib29sZWFuKTpcbiAgICAgIGJvb2xlYW4ge1xuICAgIGNvbnN0W3BsYWNlbWVudFByaW1hcnkgPSAndG9wJywgcGxhY2VtZW50U2Vjb25kYXJ5ID0gJ2NlbnRlciddID0gcGxhY2VtZW50LnNwbGl0KCctJyk7XG5cbiAgICBjb25zdCBob3N0RWxQb3NpdGlvbiA9IGFwcGVuZFRvQm9keSA/IHRoaXMub2Zmc2V0KGhvc3RFbGVtZW50LCBmYWxzZSkgOiB0aGlzLnBvc2l0aW9uKGhvc3RFbGVtZW50LCBmYWxzZSk7XG4gICAgY29uc3QgdGFyZ2V0RWxTdHlsZXMgPSB0aGlzLmdldEFsbFN0eWxlcyh0YXJnZXRFbGVtZW50KTtcblxuICAgIGNvbnN0IG1hcmdpblRvcCA9IHBhcnNlRmxvYXQodGFyZ2V0RWxTdHlsZXMubWFyZ2luVG9wKTtcbiAgICBjb25zdCBtYXJnaW5Cb3R0b20gPSBwYXJzZUZsb2F0KHRhcmdldEVsU3R5bGVzLm1hcmdpbkJvdHRvbSk7XG4gICAgY29uc3QgbWFyZ2luTGVmdCA9IHBhcnNlRmxvYXQodGFyZ2V0RWxTdHlsZXMubWFyZ2luTGVmdCk7XG4gICAgY29uc3QgbWFyZ2luUmlnaHQgPSBwYXJzZUZsb2F0KHRhcmdldEVsU3R5bGVzLm1hcmdpblJpZ2h0KTtcblxuICAgIGxldCB0b3BQb3NpdGlvbiA9IDA7XG4gICAgbGV0IGxlZnRQb3NpdGlvbiA9IDA7XG5cbiAgICBzd2l0Y2ggKHBsYWNlbWVudFByaW1hcnkpIHtcbiAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgIHRvcFBvc2l0aW9uID0gKGhvc3RFbFBvc2l0aW9uLnRvcCAtICh0YXJnZXRFbGVtZW50Lm9mZnNldEhlaWdodCArIG1hcmdpblRvcCArIG1hcmdpbkJvdHRvbSkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgIHRvcFBvc2l0aW9uID0gKGhvc3RFbFBvc2l0aW9uLnRvcCArIGhvc3RFbFBvc2l0aW9uLmhlaWdodCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIGxlZnRQb3NpdGlvbiA9IChob3N0RWxQb3NpdGlvbi5sZWZ0IC0gKHRhcmdldEVsZW1lbnQub2Zmc2V0V2lkdGggKyBtYXJnaW5MZWZ0ICsgbWFyZ2luUmlnaHQpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIGxlZnRQb3NpdGlvbiA9IChob3N0RWxQb3NpdGlvbi5sZWZ0ICsgaG9zdEVsUG9zaXRpb24ud2lkdGgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHBsYWNlbWVudFNlY29uZGFyeSkge1xuICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgdG9wUG9zaXRpb24gPSBob3N0RWxQb3NpdGlvbi50b3A7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgdG9wUG9zaXRpb24gPSBob3N0RWxQb3NpdGlvbi50b3AgKyBob3N0RWxQb3NpdGlvbi5oZWlnaHQgLSB0YXJnZXRFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgbGVmdFBvc2l0aW9uID0gaG9zdEVsUG9zaXRpb24ubGVmdDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIGxlZnRQb3NpdGlvbiA9IGhvc3RFbFBvc2l0aW9uLmxlZnQgKyBob3N0RWxQb3NpdGlvbi53aWR0aCAtIHRhcmdldEVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgaWYgKHBsYWNlbWVudFByaW1hcnkgPT09ICd0b3AnIHx8IHBsYWNlbWVudFByaW1hcnkgPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgbGVmdFBvc2l0aW9uID0gKGhvc3RFbFBvc2l0aW9uLmxlZnQgKyBob3N0RWxQb3NpdGlvbi53aWR0aCAvIDIgLSB0YXJnZXRFbGVtZW50Lm9mZnNldFdpZHRoIC8gMik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG9wUG9zaXRpb24gPSAoaG9zdEVsUG9zaXRpb24udG9wICsgaG9zdEVsUG9zaXRpb24uaGVpZ2h0IC8gMiAtIHRhcmdldEVsZW1lbnQub2Zmc2V0SGVpZ2h0IC8gMik7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8vIFRoZSB0cmFuc2xhdGUzZC9ncHUgYWNjZWxlcmF0aW9uIHJlbmRlciBhIGJsdXJyeSB0ZXh0IG9uIGNocm9tZSwgdGhlIG5leHQgbGluZSBpcyBjb21tZW50ZWQgdW50aWwgYSBicm93c2VyIGZpeFxuICAgIC8vIHRhcmdldEVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7TWF0aC5yb3VuZChsZWZ0UG9zaXRpb24pfXB4LCAke01hdGguZmxvb3IodG9wUG9zaXRpb24pfXB4LCAwcHgpYDtcbiAgICB0YXJnZXRFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHtNYXRoLnJvdW5kKGxlZnRQb3NpdGlvbil9cHgsICR7TWF0aC5yb3VuZCh0b3BQb3NpdGlvbil9cHgpYDtcblxuICAgIC8vIENoZWNrIGlmIHRoZSB0YXJnZXRFbGVtZW50IGlzIGluc2lkZSB0aGUgdmlld3BvcnRcbiAgICBjb25zdCB0YXJnZXRFbEJDUiA9IHRhcmdldEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgaHRtbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgaHRtbC5jbGllbnRIZWlnaHQ7XG4gICAgY29uc3Qgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCB8fCBodG1sLmNsaWVudFdpZHRoO1xuXG4gICAgcmV0dXJuIHRhcmdldEVsQkNSLmxlZnQgPj0gMCAmJiB0YXJnZXRFbEJDUi50b3AgPj0gMCAmJiB0YXJnZXRFbEJDUi5yaWdodCA8PSB3aW5kb3dXaWR0aCAmJlxuICAgICAgICB0YXJnZXRFbEJDUi5ib3R0b20gPD0gd2luZG93SGVpZ2h0O1xuICB9XG59XG5cbmNvbnN0IHBsYWNlbWVudFNlcGFyYXRvciA9IC9cXHMrLztcbmNvbnN0IHBvc2l0aW9uU2VydmljZSA9IG5ldyBQb3NpdGlvbmluZygpO1xuXG4vKlxuICogQWNjZXB0IHRoZSBwbGFjZW1lbnQgYXJyYXkgYW5kIGFwcGxpZXMgdGhlIGFwcHJvcHJpYXRlIHBsYWNlbWVudCBkZXBlbmRlbnQgb24gdGhlIHZpZXdwb3J0LlxuICogUmV0dXJucyB0aGUgYXBwbGllZCBwbGFjZW1lbnQuXG4gKiBJbiBjYXNlIG9mIGF1dG8gcGxhY2VtZW50LCBwbGFjZW1lbnRzIGFyZSBzZWxlY3RlZCBpbiBvcmRlclxuICogICAndG9wJywgJ2JvdHRvbScsICdsZWZ0JywgJ3JpZ2h0JyxcbiAqICAgJ3RvcC1sZWZ0JywgJ3RvcC1yaWdodCcsXG4gKiAgICdib3R0b20tbGVmdCcsICdib3R0b20tcmlnaHQnLFxuICogICAnbGVmdC10b3AnLCAnbGVmdC1ib3R0b20nLFxuICogICAncmlnaHQtdG9wJywgJ3JpZ2h0LWJvdHRvbScuXG4gKiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBvc2l0aW9uRWxlbWVudHMoXG4gICAgaG9zdEVsZW1lbnQ6IEhUTUxFbGVtZW50LCB0YXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCwgcGxhY2VtZW50OiBzdHJpbmcgfCBQbGFjZW1lbnQgfCBQbGFjZW1lbnRBcnJheSxcbiAgICBhcHBlbmRUb0JvZHk/OiBib29sZWFuLCBiYXNlQ2xhc3M/OiBzdHJpbmcpOiBQbGFjZW1lbnQge1xuICBsZXQgcGxhY2VtZW50VmFsczogQXJyYXk8UGxhY2VtZW50PiA9XG4gICAgICBBcnJheS5pc0FycmF5KHBsYWNlbWVudCkgPyBwbGFjZW1lbnQgOiBwbGFjZW1lbnQuc3BsaXQocGxhY2VtZW50U2VwYXJhdG9yKSBhcyBBcnJheTxQbGFjZW1lbnQ+O1xuXG4gIGNvbnN0IGFsbG93ZWRQbGFjZW1lbnRzID0gW1xuICAgICd0b3AnLCAnYm90dG9tJywgJ2xlZnQnLCAncmlnaHQnLCAndG9wLWxlZnQnLCAndG9wLXJpZ2h0JywgJ2JvdHRvbS1sZWZ0JywgJ2JvdHRvbS1yaWdodCcsICdsZWZ0LXRvcCcsICdsZWZ0LWJvdHRvbScsXG4gICAgJ3JpZ2h0LXRvcCcsICdyaWdodC1ib3R0b20nXG4gIF07XG5cbiAgY29uc3QgY2xhc3NMaXN0ID0gdGFyZ2V0RWxlbWVudC5jbGFzc0xpc3Q7XG4gIGNvbnN0IGFkZENsYXNzZXNUb1RhcmdldCA9ICh0YXJnZXRQbGFjZW1lbnQ6IFBsYWNlbWVudCk6IEFycmF5PHN0cmluZz4gPT4ge1xuICAgIGNvbnN0W3ByaW1hcnksIHNlY29uZGFyeV0gPSB0YXJnZXRQbGFjZW1lbnQuc3BsaXQoJy0nKTtcbiAgICBjb25zdCBjbGFzc2VzID0gW107XG4gICAgaWYgKGJhc2VDbGFzcykge1xuICAgICAgY2xhc3Nlcy5wdXNoKGAke2Jhc2VDbGFzc30tJHtwcmltYXJ5fWApO1xuICAgICAgaWYgKHNlY29uZGFyeSkge1xuICAgICAgICBjbGFzc2VzLnB1c2goYCR7YmFzZUNsYXNzfS0ke3ByaW1hcnl9LSR7c2Vjb25kYXJ5fWApO1xuICAgICAgfVxuXG4gICAgICBjbGFzc2VzLmZvckVhY2goKGNsYXNzbmFtZSkgPT4geyBjbGFzc0xpc3QuYWRkKGNsYXNzbmFtZSk7IH0pO1xuICAgIH1cbiAgICByZXR1cm4gY2xhc3NlcztcbiAgfTtcblxuICAvLyBSZW1vdmUgb2xkIHBsYWNlbWVudCBjbGFzc2VzIHRvIGF2b2lkIGlzc3Vlc1xuICBpZiAoYmFzZUNsYXNzKSB7XG4gICAgYWxsb3dlZFBsYWNlbWVudHMuZm9yRWFjaCgocGxhY2VtZW50VG9SZW1vdmUpID0+IHsgY2xhc3NMaXN0LnJlbW92ZShgJHtiYXNlQ2xhc3N9LSR7cGxhY2VtZW50VG9SZW1vdmV9YCk7IH0pO1xuICB9XG5cbiAgLy8gcmVwbGFjZSBhdXRvIHBsYWNlbWVudCB3aXRoIG90aGVyIHBsYWNlbWVudHNcbiAgbGV0IGhhc0F1dG8gPSBwbGFjZW1lbnRWYWxzLmZpbmRJbmRleCh2YWwgPT4gdmFsID09PSAnYXV0bycpO1xuICBpZiAoaGFzQXV0byA+PSAwKSB7XG4gICAgYWxsb3dlZFBsYWNlbWVudHMuZm9yRWFjaChmdW5jdGlvbihvYmopIHtcbiAgICAgIGlmIChwbGFjZW1lbnRWYWxzLmZpbmQodmFsID0+IHZhbC5zZWFyY2goJ14nICsgb2JqKSAhPT0gLTEpID09IG51bGwpIHtcbiAgICAgICAgcGxhY2VtZW50VmFscy5zcGxpY2UoaGFzQXV0bysrLCAxLCBvYmogYXMgUGxhY2VtZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIGNvb3JkaW5hdGVzIHdoZXJlIHRvIHBvc2l0aW9uXG5cbiAgLy8gUmVxdWlyZWQgZm9yIHRyYW5zZm9ybTpcbiAgY29uc3Qgc3R5bGUgPSB0YXJnZXRFbGVtZW50LnN0eWxlO1xuICBzdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gIHN0eWxlLnRvcCA9ICcwJztcbiAgc3R5bGUubGVmdCA9ICcwJztcbiAgc3R5bGVbJ3dpbGwtY2hhbmdlJ10gPSAndHJhbnNmb3JtJztcblxuICBsZXQgdGVzdFBsYWNlbWVudDogUGxhY2VtZW50O1xuICBsZXQgaXNJblZpZXdwb3J0ID0gZmFsc2U7XG4gIGZvciAodGVzdFBsYWNlbWVudCBvZiBwbGFjZW1lbnRWYWxzKSB7XG4gICAgbGV0IGFkZGVkQ2xhc3NlcyA9IGFkZENsYXNzZXNUb1RhcmdldCh0ZXN0UGxhY2VtZW50KTtcblxuICAgIGlmIChwb3NpdGlvblNlcnZpY2UucG9zaXRpb25FbGVtZW50cyhob3N0RWxlbWVudCwgdGFyZ2V0RWxlbWVudCwgdGVzdFBsYWNlbWVudCwgYXBwZW5kVG9Cb2R5KSkge1xuICAgICAgaXNJblZpZXdwb3J0ID0gdHJ1ZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIC8vIFJlbW92ZSB0aGUgYmFzZUNsYXNzZXMgZm9yIGZ1cnRoZXIgY2FsY3VsYXRpb25cbiAgICBpZiAoYmFzZUNsYXNzKSB7XG4gICAgICBhZGRlZENsYXNzZXMuZm9yRWFjaCgoY2xhc3NuYW1lKSA9PiB7IGNsYXNzTGlzdC5yZW1vdmUoY2xhc3NuYW1lKTsgfSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFpc0luVmlld3BvcnQpIHtcbiAgICAvLyBJZiBub3RoaW5nIG1hdGNoLCB0aGUgZmlyc3QgcGxhY2VtZW50IGlzIHRoZSBkZWZhdWx0IG9uZVxuICAgIHRlc3RQbGFjZW1lbnQgPSBwbGFjZW1lbnRWYWxzWzBdO1xuICAgIGFkZENsYXNzZXNUb1RhcmdldCh0ZXN0UGxhY2VtZW50KTtcbiAgICBwb3NpdGlvblNlcnZpY2UucG9zaXRpb25FbGVtZW50cyhob3N0RWxlbWVudCwgdGFyZ2V0RWxlbWVudCwgdGVzdFBsYWNlbWVudCwgYXBwZW5kVG9Cb2R5KTtcbiAgfVxuXG4gIHJldHVybiB0ZXN0UGxhY2VtZW50O1xufVxuXG5leHBvcnQgdHlwZSBQbGFjZW1lbnQgPSAnYXV0bycgfCAndG9wJyB8ICdib3R0b20nIHwgJ2xlZnQnIHwgJ3JpZ2h0JyB8ICd0b3AtbGVmdCcgfCAndG9wLXJpZ2h0JyB8ICdib3R0b20tbGVmdCcgfFxuICAgICdib3R0b20tcmlnaHQnIHwgJ2xlZnQtdG9wJyB8ICdsZWZ0LWJvdHRvbScgfCAncmlnaHQtdG9wJyB8ICdyaWdodC1ib3R0b20nO1xuXG5leHBvcnQgdHlwZSBQbGFjZW1lbnRBcnJheSA9IFBsYWNlbWVudCB8IEFycmF5PFBsYWNlbWVudD58IHN0cmluZztcbiJdfQ==