import { __read, __values } from "tslib";
// previous version:
// https://github.com/angular-ui/bootstrap/blob/07c31d0731f7cb068a1932b8e01d2312b796b4ec/src/position/position.js
var Positioning = /** @class */ (function () {
    function Positioning() {
    }
    Positioning.prototype.getAllStyles = function (element) { return window.getComputedStyle(element); };
    Positioning.prototype.getStyle = function (element, prop) { return this.getAllStyles(element)[prop]; };
    Positioning.prototype.isStaticPositioned = function (element) {
        return (this.getStyle(element, 'position') || 'static') === 'static';
    };
    Positioning.prototype.offsetParent = function (element) {
        var offsetParentEl = element.offsetParent || document.documentElement;
        while (offsetParentEl && offsetParentEl !== document.documentElement && this.isStaticPositioned(offsetParentEl)) {
            offsetParentEl = offsetParentEl.offsetParent;
        }
        return offsetParentEl || document.documentElement;
    };
    Positioning.prototype.position = function (element, round) {
        if (round === void 0) { round = true; }
        var elPosition;
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
    Positioning.prototype.offset = function (element, round) {
        if (round === void 0) { round = true; }
        var elBcr = element.getBoundingClientRect();
        var viewportOffset = {
            top: window.pageYOffset - document.documentElement.clientTop,
            left: window.pageXOffset - document.documentElement.clientLeft
        };
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
    Positioning.prototype.positionElements = function (hostElement, targetElement, placement, appendToBody) {
        var _a = __read(placement.split('-'), 2), _b = _a[0], placementPrimary = _b === void 0 ? 'top' : _b, _c = _a[1], placementSecondary = _c === void 0 ? 'center' : _c;
        var hostElPosition = appendToBody ? this.offset(hostElement, false) : this.position(hostElement, false);
        var targetElStyles = this.getAllStyles(targetElement);
        var marginTop = parseFloat(targetElStyles.marginTop);
        var marginBottom = parseFloat(targetElStyles.marginBottom);
        var marginLeft = parseFloat(targetElStyles.marginLeft);
        var marginRight = parseFloat(targetElStyles.marginRight);
        var topPosition = 0;
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
        var targetElBCR = targetElement.getBoundingClientRect();
        var html = document.documentElement;
        var windowHeight = window.innerHeight || html.clientHeight;
        var windowWidth = window.innerWidth || html.clientWidth;
        return targetElBCR.left >= 0 && targetElBCR.top >= 0 && targetElBCR.right <= windowWidth &&
            targetElBCR.bottom <= windowHeight;
    };
    return Positioning;
}());
export { Positioning };
var placementSeparator = /\s+/;
export var positionService = new Positioning();
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
export function positionElements(hostElement, targetElement, placement, appendToBody, baseClass) {
    var e_1, _a;
    var placementVals = Array.isArray(placement) ? placement : placement.split(placementSeparator);
    var allowedPlacements = [
        'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'left-top', 'left-bottom',
        'right-top', 'right-bottom'
    ];
    var classList = targetElement.classList;
    var addClassesToTarget = function (targetPlacement) {
        var _a = __read(targetPlacement.split('-'), 2), primary = _a[0], secondary = _a[1];
        var classes = [];
        if (baseClass) {
            classes.push(baseClass + "-" + primary);
            if (secondary) {
                classes.push(baseClass + "-" + primary + "-" + secondary);
            }
            classes.forEach(function (classname) { classList.add(classname); });
        }
        return classes;
    };
    // Remove old placement classes to avoid issues
    if (baseClass) {
        allowedPlacements.forEach(function (placementToRemove) { classList.remove(baseClass + "-" + placementToRemove); });
    }
    // replace auto placement with other placements
    var hasAuto = placementVals.findIndex(function (val) { return val === 'auto'; });
    if (hasAuto >= 0) {
        allowedPlacements.forEach(function (obj) {
            if (placementVals.find(function (val) { return val.search('^' + obj) !== -1; }) == null) {
                placementVals.splice(hasAuto++, 1, obj);
            }
        });
    }
    // coordinates where to position
    // Required for transform:
    var style = targetElement.style;
    style.position = 'absolute';
    style.top = '0';
    style.left = '0';
    style['will-change'] = 'transform';
    var testPlacement = null;
    var isInViewport = false;
    try {
        for (var placementVals_1 = __values(placementVals), placementVals_1_1 = placementVals_1.next(); !placementVals_1_1.done; placementVals_1_1 = placementVals_1.next()) {
            testPlacement = placementVals_1_1.value;
            var addedClasses = addClassesToTarget(testPlacement);
            if (positionService.positionElements(hostElement, targetElement, testPlacement, appendToBody)) {
                isInViewport = true;
                break;
            }
            // Remove the baseClasses for further calculation
            if (baseClass) {
                addedClasses.forEach(function (classname) { classList.remove(classname); });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zaXRpb25pbmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInV0aWwvcG9zaXRpb25pbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9CQUFvQjtBQUNwQixpSEFBaUg7QUFDakg7SUFBQTtJQTZKQSxDQUFDO0lBNUpTLGtDQUFZLEdBQXBCLFVBQXFCLE9BQW9CLElBQUksT0FBTyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRS9FLDhCQUFRLEdBQWhCLFVBQWlCLE9BQW9CLEVBQUUsSUFBWSxJQUFZLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFakcsd0NBQWtCLEdBQTFCLFVBQTJCLE9BQW9CO1FBQzdDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxRQUFRLENBQUM7SUFDdkUsQ0FBQztJQUVPLGtDQUFZLEdBQXBCLFVBQXFCLE9BQW9CO1FBQ3ZDLElBQUksY0FBYyxHQUFnQixPQUFPLENBQUMsWUFBWSxJQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUM7UUFFbkYsT0FBTyxjQUFjLElBQUksY0FBYyxLQUFLLFFBQVEsQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQy9HLGNBQWMsR0FBZ0IsY0FBYyxDQUFDLFlBQVksQ0FBQztTQUMzRDtRQUVELE9BQU8sY0FBYyxJQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUM7SUFDcEQsQ0FBQztJQUVELDhCQUFRLEdBQVIsVUFBUyxPQUFvQixFQUFFLEtBQVk7UUFBWixzQkFBQSxFQUFBLFlBQVk7UUFDekMsSUFBSSxVQUFzQixDQUFDO1FBQzNCLElBQUksWUFBWSxHQUFlLEVBQUMsS0FBSyxF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aEIsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7SUFDakIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFHLFdBQVcsQ0FBQztJQUVuQyxJQUFJLGFBQWEsR0FBcUIsSUFBSSxDQUFDO0lBQzNDLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQzs7UUFDekIsS0FBc0IsSUFBQSxrQkFBQSxTQUFBLGFBQWEsQ0FBQSw0Q0FBQSx1RUFBRTtZQUFoQyxhQUFhLDBCQUFBO1lBQ2hCLElBQUksWUFBWSxHQUFHLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRXJELElBQUksZUFBZSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLFlBQVksQ0FBQyxFQUFFO2dCQUM3RixZQUFZLEdBQUcsSUFBSSxDQUFDO2dCQUNwQixNQUFNO2FBQ1A7WUFFRCxpREFBaUQ7WUFDakQsSUFBSSxTQUFTLEVBQUU7Z0JBQ2IsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFDLFNBQVMsSUFBTyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdkU7U0FDRjs7Ozs7Ozs7O0lBRUQsSUFBSSxDQUFDLFlBQVksRUFBRTtRQUNqQiwyREFBMkQ7UUFDM0QsYUFBYSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNsQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsWUFBWSxDQUFDLENBQUM7S0FDM0Y7SUFFRCxPQUFPLGFBQWEsQ0FBQztBQUN2QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcHJldmlvdXMgdmVyc2lvbjpcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyLXVpL2Jvb3RzdHJhcC9ibG9iLzA3YzMxZDA3MzFmN2NiMDY4YTE5MzJiOGUwMWQyMzEyYjc5NmI0ZWMvc3JjL3Bvc2l0aW9uL3Bvc2l0aW9uLmpzXG5leHBvcnQgY2xhc3MgUG9zaXRpb25pbmcge1xuICBwcml2YXRlIGdldEFsbFN0eWxlcyhlbGVtZW50OiBIVE1MRWxlbWVudCkgeyByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7IH1cblxuICBwcml2YXRlIGdldFN0eWxlKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwcm9wOiBzdHJpbmcpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5nZXRBbGxTdHlsZXMoZWxlbWVudClbcHJvcF07IH1cblxuICBwcml2YXRlIGlzU3RhdGljUG9zaXRpb25lZChlbGVtZW50OiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAodGhpcy5nZXRTdHlsZShlbGVtZW50LCAncG9zaXRpb24nKSB8fCAnc3RhdGljJykgPT09ICdzdGF0aWMnO1xuICB9XG5cbiAgcHJpdmF0ZSBvZmZzZXRQYXJlbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgbGV0IG9mZnNldFBhcmVudEVsID0gPEhUTUxFbGVtZW50PmVsZW1lbnQub2Zmc2V0UGFyZW50IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuICAgIHdoaWxlIChvZmZzZXRQYXJlbnRFbCAmJiBvZmZzZXRQYXJlbnRFbCAhPT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIHRoaXMuaXNTdGF0aWNQb3NpdGlvbmVkKG9mZnNldFBhcmVudEVsKSkge1xuICAgICAgb2Zmc2V0UGFyZW50RWwgPSA8SFRNTEVsZW1lbnQ+b2Zmc2V0UGFyZW50RWwub2Zmc2V0UGFyZW50O1xuICAgIH1cblxuICAgIHJldHVybiBvZmZzZXRQYXJlbnRFbCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gIH1cblxuICBwb3NpdGlvbihlbGVtZW50OiBIVE1MRWxlbWVudCwgcm91bmQgPSB0cnVlKTogQ2xpZW50UmVjdCB7XG4gICAgbGV0IGVsUG9zaXRpb246IENsaWVudFJlY3Q7XG4gICAgbGV0IHBhcmVudE9mZnNldDogQ2xpZW50UmVjdCA9IHt3aWR0aDogMCwgaGVpZ2h0OiAwLCB0b3A6IDAsIGJvdHRvbTogMCwgbGVmdDogMCwgcmlnaHQ6IDB9O1xuXG4gICAgaWYgKHRoaXMuZ2V0U3R5bGUoZWxlbWVudCwgJ3Bvc2l0aW9uJykgPT09ICdmaXhlZCcpIHtcbiAgICAgIGVsUG9zaXRpb24gPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgZWxQb3NpdGlvbiA9IHtcbiAgICAgICAgdG9wOiBlbFBvc2l0aW9uLnRvcCxcbiAgICAgICAgYm90dG9tOiBlbFBvc2l0aW9uLmJvdHRvbSxcbiAgICAgICAgbGVmdDogZWxQb3NpdGlvbi5sZWZ0LFxuICAgICAgICByaWdodDogZWxQb3NpdGlvbi5yaWdodCxcbiAgICAgICAgaGVpZ2h0OiBlbFBvc2l0aW9uLmhlaWdodCxcbiAgICAgICAgd2lkdGg6IGVsUG9zaXRpb24ud2lkdGhcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG9mZnNldFBhcmVudEVsID0gdGhpcy5vZmZzZXRQYXJlbnQoZWxlbWVudCk7XG5cbiAgICAgIGVsUG9zaXRpb24gPSB0aGlzLm9mZnNldChlbGVtZW50LCBmYWxzZSk7XG5cbiAgICAgIGlmIChvZmZzZXRQYXJlbnRFbCAhPT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgIHBhcmVudE9mZnNldCA9IHRoaXMub2Zmc2V0KG9mZnNldFBhcmVudEVsLCBmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIHBhcmVudE9mZnNldC50b3AgKz0gb2Zmc2V0UGFyZW50RWwuY2xpZW50VG9wO1xuICAgICAgcGFyZW50T2Zmc2V0LmxlZnQgKz0gb2Zmc2V0UGFyZW50RWwuY2xpZW50TGVmdDtcbiAgICB9XG5cbiAgICBlbFBvc2l0aW9uLnRvcCAtPSBwYXJlbnRPZmZzZXQudG9wO1xuICAgIGVsUG9zaXRpb24uYm90dG9tIC09IHBhcmVudE9mZnNldC50b3A7XG4gICAgZWxQb3NpdGlvbi5sZWZ0IC09IHBhcmVudE9mZnNldC5sZWZ0O1xuICAgIGVsUG9zaXRpb24ucmlnaHQgLT0gcGFyZW50T2Zmc2V0LmxlZnQ7XG5cbiAgICBpZiAocm91bmQpIHtcbiAgICAgIGVsUG9zaXRpb24udG9wID0gTWF0aC5yb3VuZChlbFBvc2l0aW9uLnRvcCk7XG4gICAgICBlbFBvc2l0aW9uLmJvdHRvbSA9IE1hdGgucm91bmQoZWxQb3NpdGlvbi5ib3R0b20pO1xuICAgICAgZWxQb3NpdGlvbi5sZWZ0ID0gTWF0aC5yb3VuZChlbFBvc2l0aW9uLmxlZnQpO1xuICAgICAgZWxQb3NpdGlvbi5yaWdodCA9IE1hdGgucm91bmQoZWxQb3NpdGlvbi5yaWdodCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsUG9zaXRpb247XG4gIH1cblxuICBvZmZzZXQoZWxlbWVudDogSFRNTEVsZW1lbnQsIHJvdW5kID0gdHJ1ZSk6IENsaWVudFJlY3Qge1xuICAgIGNvbnN0IGVsQmNyID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB2aWV3cG9ydE9mZnNldCA9IHtcbiAgICAgIHRvcDogd2luZG93LnBhZ2VZT2Zmc2V0IC0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFRvcCxcbiAgICAgIGxlZnQ6IHdpbmRvdy5wYWdlWE9mZnNldCAtIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRMZWZ0XG4gICAgfTtcblxuICAgIGxldCBlbE9mZnNldCA9IHtcbiAgICAgIGhlaWdodDogZWxCY3IuaGVpZ2h0IHx8IGVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxuICAgICAgd2lkdGg6IGVsQmNyLndpZHRoIHx8IGVsZW1lbnQub2Zmc2V0V2lkdGgsXG4gICAgICB0b3A6IGVsQmNyLnRvcCArIHZpZXdwb3J0T2Zmc2V0LnRvcCxcbiAgICAgIGJvdHRvbTogZWxCY3IuYm90dG9tICsgdmlld3BvcnRPZmZzZXQudG9wLFxuICAgICAgbGVmdDogZWxCY3IubGVmdCArIHZpZXdwb3J0T2Zmc2V0LmxlZnQsXG4gICAgICByaWdodDogZWxCY3IucmlnaHQgKyB2aWV3cG9ydE9mZnNldC5sZWZ0XG4gICAgfTtcblxuICAgIGlmIChyb3VuZCkge1xuICAgICAgZWxPZmZzZXQuaGVpZ2h0ID0gTWF0aC5yb3VuZChlbE9mZnNldC5oZWlnaHQpO1xuICAgICAgZWxPZmZzZXQud2lkdGggPSBNYXRoLnJvdW5kKGVsT2Zmc2V0LndpZHRoKTtcbiAgICAgIGVsT2Zmc2V0LnRvcCA9IE1hdGgucm91bmQoZWxPZmZzZXQudG9wKTtcbiAgICAgIGVsT2Zmc2V0LmJvdHRvbSA9IE1hdGgucm91bmQoZWxPZmZzZXQuYm90dG9tKTtcbiAgICAgIGVsT2Zmc2V0LmxlZnQgPSBNYXRoLnJvdW5kKGVsT2Zmc2V0LmxlZnQpO1xuICAgICAgZWxPZmZzZXQucmlnaHQgPSBNYXRoLnJvdW5kKGVsT2Zmc2V0LnJpZ2h0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxPZmZzZXQ7XG4gIH1cblxuICAvKlxuICAgIFJldHVybiBmYWxzZSBpZiB0aGUgZWxlbWVudCB0byBwb3NpdGlvbiBpcyBvdXRzaWRlIHRoZSB2aWV3cG9ydFxuICAqL1xuICBwb3NpdGlvbkVsZW1lbnRzKGhvc3RFbGVtZW50OiBIVE1MRWxlbWVudCwgdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQsIHBsYWNlbWVudDogc3RyaW5nLCBhcHBlbmRUb0JvZHk/OiBib29sZWFuKTpcbiAgICAgIGJvb2xlYW4ge1xuICAgIGNvbnN0W3BsYWNlbWVudFByaW1hcnkgPSAndG9wJywgcGxhY2VtZW50U2Vjb25kYXJ5ID0gJ2NlbnRlciddID0gcGxhY2VtZW50LnNwbGl0KCctJyk7XG5cbiAgICBjb25zdCBob3N0RWxQb3NpdGlvbiA9IGFwcGVuZFRvQm9keSA/IHRoaXMub2Zmc2V0KGhvc3RFbGVtZW50LCBmYWxzZSkgOiB0aGlzLnBvc2l0aW9uKGhvc3RFbGVtZW50LCBmYWxzZSk7XG4gICAgY29uc3QgdGFyZ2V0RWxTdHlsZXMgPSB0aGlzLmdldEFsbFN0eWxlcyh0YXJnZXRFbGVtZW50KTtcblxuICAgIGNvbnN0IG1hcmdpblRvcCA9IHBhcnNlRmxvYXQodGFyZ2V0RWxTdHlsZXMubWFyZ2luVG9wKTtcbiAgICBjb25zdCBtYXJnaW5Cb3R0b20gPSBwYXJzZUZsb2F0KHRhcmdldEVsU3R5bGVzLm1hcmdpbkJvdHRvbSk7XG4gICAgY29uc3QgbWFyZ2luTGVmdCA9IHBhcnNlRmxvYXQodGFyZ2V0RWxTdHlsZXMubWFyZ2luTGVmdCk7XG4gICAgY29uc3QgbWFyZ2luUmlnaHQgPSBwYXJzZUZsb2F0KHRhcmdldEVsU3R5bGVzLm1hcmdpblJpZ2h0KTtcblxuICAgIGxldCB0b3BQb3NpdGlvbiA9IDA7XG4gICAgbGV0IGxlZnRQb3NpdGlvbiA9IDA7XG5cbiAgICBzd2l0Y2ggKHBsYWNlbWVudFByaW1hcnkpIHtcbiAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgIHRvcFBvc2l0aW9uID0gKGhvc3RFbFBvc2l0aW9uLnRvcCAtICh0YXJnZXRFbGVtZW50Lm9mZnNldEhlaWdodCArIG1hcmdpblRvcCArIG1hcmdpbkJvdHRvbSkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgIHRvcFBvc2l0aW9uID0gKGhvc3RFbFBvc2l0aW9uLnRvcCArIGhvc3RFbFBvc2l0aW9uLmhlaWdodCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIGxlZnRQb3NpdGlvbiA9IChob3N0RWxQb3NpdGlvbi5sZWZ0IC0gKHRhcmdldEVsZW1lbnQub2Zmc2V0V2lkdGggKyBtYXJnaW5MZWZ0ICsgbWFyZ2luUmlnaHQpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIGxlZnRQb3NpdGlvbiA9IChob3N0RWxQb3NpdGlvbi5sZWZ0ICsgaG9zdEVsUG9zaXRpb24ud2lkdGgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHBsYWNlbWVudFNlY29uZGFyeSkge1xuICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgdG9wUG9zaXRpb24gPSBob3N0RWxQb3NpdGlvbi50b3A7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgdG9wUG9zaXRpb24gPSBob3N0RWxQb3NpdGlvbi50b3AgKyBob3N0RWxQb3NpdGlvbi5oZWlnaHQgLSB0YXJnZXRFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgbGVmdFBvc2l0aW9uID0gaG9zdEVsUG9zaXRpb24ubGVmdDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIGxlZnRQb3NpdGlvbiA9IGhvc3RFbFBvc2l0aW9uLmxlZnQgKyBob3N0RWxQb3NpdGlvbi53aWR0aCAtIHRhcmdldEVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgaWYgKHBsYWNlbWVudFByaW1hcnkgPT09ICd0b3AnIHx8IHBsYWNlbWVudFByaW1hcnkgPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgbGVmdFBvc2l0aW9uID0gKGhvc3RFbFBvc2l0aW9uLmxlZnQgKyBob3N0RWxQb3NpdGlvbi53aWR0aCAvIDIgLSB0YXJnZXRFbGVtZW50Lm9mZnNldFdpZHRoIC8gMik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG9wUG9zaXRpb24gPSAoaG9zdEVsUG9zaXRpb24udG9wICsgaG9zdEVsUG9zaXRpb24uaGVpZ2h0IC8gMiAtIHRhcmdldEVsZW1lbnQub2Zmc2V0SGVpZ2h0IC8gMik7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8vIFRoZSB0cmFuc2xhdGUzZC9ncHUgYWNjZWxlcmF0aW9uIHJlbmRlciBhIGJsdXJyeSB0ZXh0IG9uIGNocm9tZSwgdGhlIG5leHQgbGluZSBpcyBjb21tZW50ZWQgdW50aWwgYSBicm93c2VyIGZpeFxuICAgIC8vIHRhcmdldEVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7TWF0aC5yb3VuZChsZWZ0UG9zaXRpb24pfXB4LCAke01hdGguZmxvb3IodG9wUG9zaXRpb24pfXB4LCAwcHgpYDtcbiAgICB0YXJnZXRFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHtNYXRoLnJvdW5kKGxlZnRQb3NpdGlvbil9cHgsICR7TWF0aC5yb3VuZCh0b3BQb3NpdGlvbil9cHgpYDtcblxuICAgIC8vIENoZWNrIGlmIHRoZSB0YXJnZXRFbGVtZW50IGlzIGluc2lkZSB0aGUgdmlld3BvcnRcbiAgICBjb25zdCB0YXJnZXRFbEJDUiA9IHRhcmdldEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgaHRtbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgaHRtbC5jbGllbnRIZWlnaHQ7XG4gICAgY29uc3Qgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCB8fCBodG1sLmNsaWVudFdpZHRoO1xuXG4gICAgcmV0dXJuIHRhcmdldEVsQkNSLmxlZnQgPj0gMCAmJiB0YXJnZXRFbEJDUi50b3AgPj0gMCAmJiB0YXJnZXRFbEJDUi5yaWdodCA8PSB3aW5kb3dXaWR0aCAmJlxuICAgICAgICB0YXJnZXRFbEJDUi5ib3R0b20gPD0gd2luZG93SGVpZ2h0O1xuICB9XG59XG5cbmNvbnN0IHBsYWNlbWVudFNlcGFyYXRvciA9IC9cXHMrLztcbmV4cG9ydCBjb25zdCBwb3NpdGlvblNlcnZpY2UgPSBuZXcgUG9zaXRpb25pbmcoKTtcblxuLypcbiAqIEFjY2VwdCB0aGUgcGxhY2VtZW50IGFycmF5IGFuZCBhcHBsaWVzIHRoZSBhcHByb3ByaWF0ZSBwbGFjZW1lbnQgZGVwZW5kZW50IG9uIHRoZSB2aWV3cG9ydC5cbiAqIFJldHVybnMgdGhlIGFwcGxpZWQgcGxhY2VtZW50LlxuICogSW4gY2FzZSBvZiBhdXRvIHBsYWNlbWVudCwgcGxhY2VtZW50cyBhcmUgc2VsZWN0ZWQgaW4gb3JkZXJcbiAqICAgJ3RvcCcsICdib3R0b20nLCAnbGVmdCcsICdyaWdodCcsXG4gKiAgICd0b3AtbGVmdCcsICd0b3AtcmlnaHQnLFxuICogICAnYm90dG9tLWxlZnQnLCAnYm90dG9tLXJpZ2h0JyxcbiAqICAgJ2xlZnQtdG9wJywgJ2xlZnQtYm90dG9tJyxcbiAqICAgJ3JpZ2h0LXRvcCcsICdyaWdodC1ib3R0b20nLlxuICogKi9cbmV4cG9ydCBmdW5jdGlvbiBwb3NpdGlvbkVsZW1lbnRzKFxuICAgIGhvc3RFbGVtZW50OiBIVE1MRWxlbWVudCwgdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQsIHBsYWNlbWVudDogc3RyaW5nIHwgUGxhY2VtZW50IHwgUGxhY2VtZW50QXJyYXksXG4gICAgYXBwZW5kVG9Cb2R5PzogYm9vbGVhbiwgYmFzZUNsYXNzPzogc3RyaW5nKTogUGxhY2VtZW50IHxcbiAgICBudWxsIHtcbiAgbGV0IHBsYWNlbWVudFZhbHM6IEFycmF5PFBsYWNlbWVudD4gPVxuICAgICAgQXJyYXkuaXNBcnJheShwbGFjZW1lbnQpID8gcGxhY2VtZW50IDogcGxhY2VtZW50LnNwbGl0KHBsYWNlbWVudFNlcGFyYXRvcikgYXMgQXJyYXk8UGxhY2VtZW50PjtcblxuICBjb25zdCBhbGxvd2VkUGxhY2VtZW50cyA9IFtcbiAgICAndG9wJywgJ2JvdHRvbScsICdsZWZ0JywgJ3JpZ2h0JywgJ3RvcC1sZWZ0JywgJ3RvcC1yaWdodCcsICdib3R0b20tbGVmdCcsICdib3R0b20tcmlnaHQnLCAnbGVmdC10b3AnLCAnbGVmdC1ib3R0b20nLFxuICAgICdyaWdodC10b3AnLCAncmlnaHQtYm90dG9tJ1xuICBdO1xuXG4gIGNvbnN0IGNsYXNzTGlzdCA9IHRhcmdldEVsZW1lbnQuY2xhc3NMaXN0O1xuICBjb25zdCBhZGRDbGFzc2VzVG9UYXJnZXQgPSAodGFyZ2V0UGxhY2VtZW50OiBQbGFjZW1lbnQpOiBBcnJheTxzdHJpbmc+ID0+IHtcbiAgICBjb25zdFtwcmltYXJ5LCBzZWNvbmRhcnldID0gdGFyZ2V0UGxhY2VtZW50LnNwbGl0KCctJyk7XG4gICAgY29uc3QgY2xhc3Nlczogc3RyaW5nW10gPSBbXTtcbiAgICBpZiAoYmFzZUNsYXNzKSB7XG4gICAgICBjbGFzc2VzLnB1c2goYCR7YmFzZUNsYXNzfS0ke3ByaW1hcnl9YCk7XG4gICAgICBpZiAoc2Vjb25kYXJ5KSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChgJHtiYXNlQ2xhc3N9LSR7cHJpbWFyeX0tJHtzZWNvbmRhcnl9YCk7XG4gICAgICB9XG5cbiAgICAgIGNsYXNzZXMuZm9yRWFjaCgoY2xhc3NuYW1lKSA9PiB7IGNsYXNzTGlzdC5hZGQoY2xhc3NuYW1lKTsgfSk7XG4gICAgfVxuICAgIHJldHVybiBjbGFzc2VzO1xuICB9O1xuXG4gIC8vIFJlbW92ZSBvbGQgcGxhY2VtZW50IGNsYXNzZXMgdG8gYXZvaWQgaXNzdWVzXG4gIGlmIChiYXNlQ2xhc3MpIHtcbiAgICBhbGxvd2VkUGxhY2VtZW50cy5mb3JFYWNoKChwbGFjZW1lbnRUb1JlbW92ZSkgPT4geyBjbGFzc0xpc3QucmVtb3ZlKGAke2Jhc2VDbGFzc30tJHtwbGFjZW1lbnRUb1JlbW92ZX1gKTsgfSk7XG4gIH1cblxuICAvLyByZXBsYWNlIGF1dG8gcGxhY2VtZW50IHdpdGggb3RoZXIgcGxhY2VtZW50c1xuICBsZXQgaGFzQXV0byA9IHBsYWNlbWVudFZhbHMuZmluZEluZGV4KHZhbCA9PiB2YWwgPT09ICdhdXRvJyk7XG4gIGlmIChoYXNBdXRvID49IDApIHtcbiAgICBhbGxvd2VkUGxhY2VtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKG9iaikge1xuICAgICAgaWYgKHBsYWNlbWVudFZhbHMuZmluZCh2YWwgPT4gdmFsLnNlYXJjaCgnXicgKyBvYmopICE9PSAtMSkgPT0gbnVsbCkge1xuICAgICAgICBwbGFjZW1lbnRWYWxzLnNwbGljZShoYXNBdXRvKyssIDEsIG9iaiBhcyBQbGFjZW1lbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gY29vcmRpbmF0ZXMgd2hlcmUgdG8gcG9zaXRpb25cblxuICAvLyBSZXF1aXJlZCBmb3IgdHJhbnNmb3JtOlxuICBjb25zdCBzdHlsZSA9IHRhcmdldEVsZW1lbnQuc3R5bGU7XG4gIHN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgc3R5bGUudG9wID0gJzAnO1xuICBzdHlsZS5sZWZ0ID0gJzAnO1xuICBzdHlsZVsnd2lsbC1jaGFuZ2UnXSA9ICd0cmFuc2Zvcm0nO1xuXG4gIGxldCB0ZXN0UGxhY2VtZW50OiBQbGFjZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgbGV0IGlzSW5WaWV3cG9ydCA9IGZhbHNlO1xuICBmb3IgKHRlc3RQbGFjZW1lbnQgb2YgcGxhY2VtZW50VmFscykge1xuICAgIGxldCBhZGRlZENsYXNzZXMgPSBhZGRDbGFzc2VzVG9UYXJnZXQodGVzdFBsYWNlbWVudCk7XG5cbiAgICBpZiAocG9zaXRpb25TZXJ2aWNlLnBvc2l0aW9uRWxlbWVudHMoaG9zdEVsZW1lbnQsIHRhcmdldEVsZW1lbnQsIHRlc3RQbGFjZW1lbnQsIGFwcGVuZFRvQm9keSkpIHtcbiAgICAgIGlzSW5WaWV3cG9ydCA9IHRydWU7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgdGhlIGJhc2VDbGFzc2VzIGZvciBmdXJ0aGVyIGNhbGN1bGF0aW9uXG4gICAgaWYgKGJhc2VDbGFzcykge1xuICAgICAgYWRkZWRDbGFzc2VzLmZvckVhY2goKGNsYXNzbmFtZSkgPT4geyBjbGFzc0xpc3QucmVtb3ZlKGNsYXNzbmFtZSk7IH0pO1xuICAgIH1cbiAgfVxuXG4gIGlmICghaXNJblZpZXdwb3J0KSB7XG4gICAgLy8gSWYgbm90aGluZyBtYXRjaCwgdGhlIGZpcnN0IHBsYWNlbWVudCBpcyB0aGUgZGVmYXVsdCBvbmVcbiAgICB0ZXN0UGxhY2VtZW50ID0gcGxhY2VtZW50VmFsc1swXTtcbiAgICBhZGRDbGFzc2VzVG9UYXJnZXQodGVzdFBsYWNlbWVudCk7XG4gICAgcG9zaXRpb25TZXJ2aWNlLnBvc2l0aW9uRWxlbWVudHMoaG9zdEVsZW1lbnQsIHRhcmdldEVsZW1lbnQsIHRlc3RQbGFjZW1lbnQsIGFwcGVuZFRvQm9keSk7XG4gIH1cblxuICByZXR1cm4gdGVzdFBsYWNlbWVudDtcbn1cblxuZXhwb3J0IHR5cGUgUGxhY2VtZW50ID0gJ2F1dG8nIHwgJ3RvcCcgfCAnYm90dG9tJyB8ICdsZWZ0JyB8ICdyaWdodCcgfCAndG9wLWxlZnQnIHwgJ3RvcC1yaWdodCcgfCAnYm90dG9tLWxlZnQnIHxcbiAgICAnYm90dG9tLXJpZ2h0JyB8ICdsZWZ0LXRvcCcgfCAnbGVmdC1ib3R0b20nIHwgJ3JpZ2h0LXRvcCcgfCAncmlnaHQtYm90dG9tJztcblxuZXhwb3J0IHR5cGUgUGxhY2VtZW50QXJyYXkgPSBQbGFjZW1lbnQgfCBBcnJheTxQbGFjZW1lbnQ+fCBzdHJpbmc7XG4iXX0=