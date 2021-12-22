import * as tslib_1 from "tslib";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, HostListener, NgZone } from '@angular/core';
import { ToastPackage } from './toastr-config';
import { ToastrService } from './toastr.service';
var Toast = /** @class */ (function () {
    function Toast(toastrService, toastPackage, ngZone) {
        var _this = this;
        this.toastrService = toastrService;
        this.toastPackage = toastPackage;
        this.ngZone = ngZone;
        /** width of progress bar */
        this.width = -1;
        /** a combination of toast type and options.toastClass */
        this.toastClasses = '';
        /** controls animation */
        this.state = {
            value: 'inactive',
            params: {
                easeTime: this.toastPackage.config.easeTime,
                easing: 'ease-in'
            }
        };
        this.message = toastPackage.message;
        this.title = toastPackage.title;
        this.options = toastPackage.config;
        this.originalTimeout = toastPackage.config.timeOut;
        this.toastClasses = toastPackage.toastType + " " + toastPackage.config.toastClass;
        this.sub = toastPackage.toastRef.afterActivate().subscribe(function () {
            _this.activateToast();
        });
        this.sub1 = toastPackage.toastRef.manualClosed().subscribe(function () {
            _this.remove();
        });
        this.sub2 = toastPackage.toastRef.timeoutReset().subscribe(function () {
            _this.resetTimeout();
        });
        this.sub3 = toastPackage.toastRef.countDuplicate().subscribe(function (count) {
            _this.duplicatesCount = count;
        });
    }
    Object.defineProperty(Toast.prototype, "displayStyle", {
        /** hides component when waiting to be displayed */
        get: function () {
            if (this.state.value === 'inactive') {
                return 'none';
            }
        },
        enumerable: true,
        configurable: true
    });
    Toast.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
        this.sub1.unsubscribe();
        this.sub2.unsubscribe();
        this.sub3.unsubscribe();
        clearInterval(this.intervalId);
        clearTimeout(this.timeout);
    };
    /**
     * activates toast and sets timeout
     */
    Toast.prototype.activateToast = function () {
        var _this = this;
        this.state = tslib_1.__assign({}, this.state, { value: 'active' });
        if (!this.options.disableTimeOut && this.options.timeOut) {
            this.outsideTimeout(function () { return _this.remove(); }, this.options.timeOut);
            this.hideTime = new Date().getTime() + this.options.timeOut;
            if (this.options.progressBar) {
                this.outsideInterval(function () { return _this.updateProgress(); }, 10);
            }
        }
    };
    /**
     * updates progress bar width
     */
    Toast.prototype.updateProgress = function () {
        if (this.width === 0 || this.width === 100 || !this.options.timeOut) {
            return;
        }
        var now = new Date().getTime();
        var remaining = this.hideTime - now;
        this.width = (remaining / this.options.timeOut) * 100;
        if (this.options.progressAnimation === 'increasing') {
            this.width = 100 - this.width;
        }
        if (this.width <= 0) {
            this.width = 0;
        }
        if (this.width >= 100) {
            this.width = 100;
        }
    };
    Toast.prototype.resetTimeout = function () {
        var _this = this;
        clearTimeout(this.timeout);
        clearInterval(this.intervalId);
        this.state = tslib_1.__assign({}, this.state, { value: 'active' });
        this.outsideTimeout(function () { return _this.remove(); }, this.originalTimeout);
        this.options.timeOut = this.originalTimeout;
        this.hideTime = new Date().getTime() + (this.options.timeOut || 0);
        this.width = -1;
        if (this.options.progressBar) {
            this.outsideInterval(function () { return _this.updateProgress(); }, 10);
        }
    };
    /**
     * tells toastrService to remove this toast after animation time
     */
    Toast.prototype.remove = function () {
        var _this = this;
        if (this.state.value === 'removed') {
            return;
        }
        clearTimeout(this.timeout);
        this.state = tslib_1.__assign({}, this.state, { value: 'removed' });
        this.outsideTimeout(function () { return _this.toastrService.remove(_this.toastPackage.toastId); }, +this.toastPackage.config.easeTime);
    };
    Toast.prototype.tapToast = function () {
        if (this.state.value === 'removed') {
            return;
        }
        this.toastPackage.triggerTap();
        if (this.options.tapToDismiss) {
            this.remove();
        }
    };
    Toast.prototype.stickAround = function () {
        if (this.state.value === 'removed') {
            return;
        }
        clearTimeout(this.timeout);
        this.options.timeOut = 0;
        this.hideTime = 0;
        // disable progressBar
        clearInterval(this.intervalId);
        this.width = 0;
    };
    Toast.prototype.delayedHideToast = function () {
        var _this = this;
        if (this.options.disableTimeOut ||
            this.options.extendedTimeOut === 0 ||
            this.state.value === 'removed') {
            return;
        }
        this.outsideTimeout(function () { return _this.remove(); }, this.options.extendedTimeOut);
        this.options.timeOut = this.options.extendedTimeOut;
        this.hideTime = new Date().getTime() + (this.options.timeOut || 0);
        this.width = -1;
        if (this.options.progressBar) {
            this.outsideInterval(function () { return _this.updateProgress(); }, 10);
        }
    };
    Toast.prototype.outsideTimeout = function (func, timeout) {
        var _this = this;
        if (this.ngZone) {
            this.ngZone.runOutsideAngular(function () {
                return (_this.timeout = setTimeout(function () { return _this.runInsideAngular(func); }, timeout));
            });
        }
        else {
            this.timeout = setTimeout(function () { return func(); }, timeout);
        }
    };
    Toast.prototype.outsideInterval = function (func, timeout) {
        var _this = this;
        if (this.ngZone) {
            this.ngZone.runOutsideAngular(function () {
                return (_this.intervalId = setInterval(function () { return _this.runInsideAngular(func); }, timeout));
            });
        }
        else {
            this.intervalId = setInterval(function () { return func(); }, timeout);
        }
    };
    Toast.prototype.runInsideAngular = function (func) {
        if (this.ngZone) {
            this.ngZone.run(function () { return func(); });
        }
        else {
            func();
        }
    };
    tslib_1.__decorate([
        HostBinding('class'),
        tslib_1.__metadata("design:type", Object)
    ], Toast.prototype, "toastClasses", void 0);
    tslib_1.__decorate([
        HostBinding('@flyInOut'),
        tslib_1.__metadata("design:type", Object)
    ], Toast.prototype, "state", void 0);
    tslib_1.__decorate([
        HostBinding('style.display'),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [])
    ], Toast.prototype, "displayStyle", null);
    tslib_1.__decorate([
        HostListener('click'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], Toast.prototype, "tapToast", null);
    tslib_1.__decorate([
        HostListener('mouseenter'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], Toast.prototype, "stickAround", null);
    tslib_1.__decorate([
        HostListener('mouseleave'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], Toast.prototype, "delayedHideToast", null);
    Toast = tslib_1.__decorate([
        Component({
            selector: '[toast-component]',
            template: "\n  <button *ngIf=\"options.closeButton\" (click)=\"remove()\" class=\"toast-close-button\" aria-label=\"Close\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n  <div *ngIf=\"title\" [class]=\"options.titleClass\" [attr.aria-label]=\"title\">\n    {{ title }} <ng-container *ngIf=\"duplicatesCount\">[{{ duplicatesCount + 1 }}]</ng-container>\n  </div>\n  <div *ngIf=\"message && options.enableHtml\" role=\"alertdialog\" aria-live=\"polite\"\n    [class]=\"options.messageClass\" [innerHTML]=\"message\">\n  </div>\n  <div *ngIf=\"message && !options.enableHtml\" role=\"alertdialog\" aria-live=\"polite\"\n    [class]=\"options.messageClass\" [attr.aria-label]=\"message\">\n    {{ message }}\n  </div>\n  <div *ngIf=\"options.progressBar\">\n    <div class=\"toast-progress\" [style.width]=\"width + '%'\"></div>\n  </div>\n  ",
            animations: [
                trigger('flyInOut', [
                    state('inactive', style({ opacity: 0 })),
                    state('active', style({ opacity: 1 })),
                    state('removed', style({ opacity: 0 })),
                    transition('inactive => active', animate('{{ easeTime }}ms {{ easing }}')),
                    transition('active => removed', animate('{{ easeTime }}ms {{ easing }}'))
                ])
            ],
            preserveWhitespaces: false
        }),
        tslib_1.__metadata("design:paramtypes", [ToastrService,
            ToastPackage,
            NgZone])
    ], Toast);
    return Toast;
}());
export { Toast };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRvYXN0ci8iLCJzb3VyY2VzIjpbInRvYXN0ci90b2FzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxFQUNSLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUNMLFNBQVMsRUFDVCxXQUFXLEVBQ1gsWUFBWSxFQUNaLE1BQU0sRUFFUCxNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQW9CLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQXVDakQ7SUFvQ0UsZUFDWSxhQUE0QixFQUMvQixZQUEwQixFQUN2QixNQUFlO1FBSDNCLGlCQXdCQztRQXZCVyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUMvQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUN2QixXQUFNLEdBQU4sTUFBTSxDQUFTO1FBakMzQiw0QkFBNEI7UUFDNUIsVUFBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ1gseURBQXlEO1FBQ25DLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3hDLHlCQUF5QjtRQUV6QixVQUFLLEdBQUc7WUFDTixLQUFLLEVBQUUsVUFBVTtZQUNqQixNQUFNLEVBQUU7Z0JBQ04sUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFFBQVE7Z0JBQzNDLE1BQU0sRUFBRSxTQUFTO2FBQ2xCO1NBQ0YsQ0FBQztRQXVCQSxJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUM7UUFDcEMsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQztRQUNuQyxJQUFJLENBQUMsZUFBZSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ25ELElBQUksQ0FBQyxZQUFZLEdBQU0sWUFBWSxDQUFDLFNBQVMsU0FDM0MsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUNwQixDQUFDO1FBQ0gsSUFBSSxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUN6RCxLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ3pELEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDekQsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7WUFDaEUsS0FBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBdENELHNCQUFJLCtCQUFZO1FBRmhCLG1EQUFtRDthQUVuRDtZQUNFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssVUFBVSxFQUFFO2dCQUNuQyxPQUFPLE1BQU0sQ0FBQzthQUNmO1FBQ0gsQ0FBQzs7O09BQUE7SUFtQ0QsMkJBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDeEIsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQixZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRDs7T0FFRztJQUNILDZCQUFhLEdBQWI7UUFBQSxpQkFTQztRQVJDLElBQUksQ0FBQyxLQUFLLHdCQUFRLElBQUksQ0FBQyxLQUFLLElBQUUsS0FBSyxFQUFFLFFBQVEsR0FBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUN4RCxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsTUFBTSxFQUFFLEVBQWIsQ0FBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQzVELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxjQUFjLEVBQUUsRUFBckIsQ0FBcUIsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUN2RDtTQUNGO0lBQ0gsQ0FBQztJQUNEOztPQUVHO0lBQ0gsOEJBQWMsR0FBZDtRQUNFLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUNuRSxPQUFPO1NBQ1I7UUFDRCxJQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2pDLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDdEQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixLQUFLLFlBQVksRUFBRTtZQUNuRCxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQy9CO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRTtZQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUNoQjtRQUNELElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxHQUFHLEVBQUU7WUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7U0FDbEI7SUFDSCxDQUFDO0lBRUQsNEJBQVksR0FBWjtRQUFBLGlCQVlDO1FBWEMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQixhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLHdCQUFRLElBQUksQ0FBQyxLQUFLLElBQUUsS0FBSyxFQUFFLFFBQVEsR0FBRSxDQUFDO1FBRWhELElBQUksQ0FBQyxjQUFjLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxNQUFNLEVBQUUsRUFBYixDQUFhLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDNUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNoQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO1lBQzVCLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxjQUFjLEVBQUUsRUFBckIsQ0FBcUIsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUN2RDtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILHNCQUFNLEdBQU47UUFBQSxpQkFVQztRQVRDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ2xDLE9BQU87U0FDUjtRQUNELFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssd0JBQVEsSUFBSSxDQUFDLEtBQUssSUFBRSxLQUFLLEVBQUUsU0FBUyxHQUFFLENBQUM7UUFDakQsSUFBSSxDQUFDLGNBQWMsQ0FDakIsY0FBTSxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQXBELENBQW9ELEVBQzFELENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUNuQyxDQUFDO0lBQ0osQ0FBQztJQUVELHdCQUFRLEdBQVI7UUFDRSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUNsQyxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQy9CLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUU7WUFDN0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2Y7SUFDSCxDQUFDO0lBRUQsMkJBQVcsR0FBWDtRQUNFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ2xDLE9BQU87U0FDUjtRQUNELFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRWxCLHNCQUFzQjtRQUN0QixhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxnQ0FBZ0IsR0FBaEI7UUFEQSxpQkFnQkM7UUFkQyxJQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYztZQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsS0FBSyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFDOUI7WUFDQSxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsTUFBTSxFQUFFLEVBQWIsQ0FBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUM7UUFDcEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNoQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO1lBQzVCLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxjQUFjLEVBQUUsRUFBckIsQ0FBcUIsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUN2RDtJQUNILENBQUM7SUFFRCw4QkFBYyxHQUFkLFVBQWUsSUFBYyxFQUFFLE9BQWU7UUFBOUMsaUJBWUM7UUFYQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUMzQjtnQkFDRSxPQUFBLENBQUMsS0FBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQ3hCLGNBQU0sT0FBQSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQTNCLENBQTJCLEVBQ2pDLE9BQU8sQ0FDUixDQUFDO1lBSEYsQ0FHRSxDQUNMLENBQUM7U0FDSDthQUFNO1lBQ0wsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsY0FBTSxPQUFBLElBQUksRUFBRSxFQUFOLENBQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNsRDtJQUNILENBQUM7SUFFRCwrQkFBZSxHQUFmLFVBQWdCLElBQWMsRUFBRSxPQUFlO1FBQS9DLGlCQVlDO1FBWEMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FDM0I7Z0JBQ0UsT0FBQSxDQUFDLEtBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUM1QixjQUFNLE9BQUEsS0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUEzQixDQUEyQixFQUNqQyxPQUFPLENBQ1IsQ0FBQztZQUhGLENBR0UsQ0FDTCxDQUFDO1NBQ0g7YUFBTTtZQUNMLElBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDLGNBQU0sT0FBQSxJQUFJLEVBQUUsRUFBTixDQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDdEQ7SUFDSCxDQUFDO0lBRU8sZ0NBQWdCLEdBQXhCLFVBQXlCLElBQWM7UUFDckMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLElBQUksRUFBRSxFQUFOLENBQU0sQ0FBQyxDQUFDO1NBQy9CO2FBQU07WUFDTCxJQUFJLEVBQUUsQ0FBQztTQUNSO0lBQ0gsQ0FBQztJQXJNcUI7UUFBckIsV0FBVyxDQUFDLE9BQU8sQ0FBQzs7K0NBQW1CO0lBR3hDO1FBREMsV0FBVyxDQUFDLFdBQVcsQ0FBQzs7d0NBT3ZCO0lBSUY7UUFEQyxXQUFXLENBQUMsZUFBZSxDQUFDOzs7NkNBSzVCO0lBMEdEO1FBREMsWUFBWSxDQUFDLE9BQU8sQ0FBQzs7Ozt5Q0FTckI7SUFFRDtRQURDLFlBQVksQ0FBQyxZQUFZLENBQUM7Ozs7NENBWTFCO0lBRUQ7UUFEQyxZQUFZLENBQUMsWUFBWSxDQUFDOzs7O2lEQWdCMUI7SUExS1UsS0FBSztRQXJDakIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixRQUFRLEVBQUUsODBCQWlCVDtZQUNELFVBQVUsRUFBRTtnQkFDVixPQUFPLENBQUMsVUFBVSxFQUFFO29CQUNsQixLQUFLLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUN4QyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUN0QyxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUN2QyxVQUFVLENBQ1Isb0JBQW9CLEVBQ3BCLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQyxDQUN6QztvQkFDRCxVQUFVLENBQ1IsbUJBQW1CLEVBQ25CLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQyxDQUN6QztpQkFDRixDQUFDO2FBQ0g7WUFDRCxtQkFBbUIsRUFBRSxLQUFLO1NBQzNCLENBQUM7aURBc0MyQixhQUFhO1lBQ2pCLFlBQVk7WUFDZCxNQUFNO09BdkNoQixLQUFLLENBK01qQjtJQUFELFlBQUM7Q0FBQSxBQS9NRCxJQStNQztTQS9NWSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgYW5pbWF0ZSxcbiAgc3RhdGUsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uLFxuICB0cmlnZ2VyXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNhZmVIdG1sIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEluZGl2aWR1YWxDb25maWcsIFRvYXN0UGFja2FnZSB9IGZyb20gJy4vdG9hc3RyLWNvbmZpZyc7XG5pbXBvcnQgeyBUb2FzdHJTZXJ2aWNlIH0gZnJvbSAnLi90b2FzdHIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1t0b2FzdC1jb21wb25lbnRdJyxcbiAgdGVtcGxhdGU6IGBcbiAgPGJ1dHRvbiAqbmdJZj1cIm9wdGlvbnMuY2xvc2VCdXR0b25cIiAoY2xpY2spPVwicmVtb3ZlKClcIiBjbGFzcz1cInRvYXN0LWNsb3NlLWJ1dHRvblwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPlxuICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XG4gIDwvYnV0dG9uPlxuICA8ZGl2ICpuZ0lmPVwidGl0bGVcIiBbY2xhc3NdPVwib3B0aW9ucy50aXRsZUNsYXNzXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJ0aXRsZVwiPlxuICAgIHt7IHRpdGxlIH19IDxuZy1jb250YWluZXIgKm5nSWY9XCJkdXBsaWNhdGVzQ291bnRcIj5be3sgZHVwbGljYXRlc0NvdW50ICsgMSB9fV08L25nLWNvbnRhaW5lcj5cbiAgPC9kaXY+XG4gIDxkaXYgKm5nSWY9XCJtZXNzYWdlICYmIG9wdGlvbnMuZW5hYmxlSHRtbFwiIHJvbGU9XCJhbGVydGRpYWxvZ1wiIGFyaWEtbGl2ZT1cInBvbGl0ZVwiXG4gICAgW2NsYXNzXT1cIm9wdGlvbnMubWVzc2FnZUNsYXNzXCIgW2lubmVySFRNTF09XCJtZXNzYWdlXCI+XG4gIDwvZGl2PlxuICA8ZGl2ICpuZ0lmPVwibWVzc2FnZSAmJiAhb3B0aW9ucy5lbmFibGVIdG1sXCIgcm9sZT1cImFsZXJ0ZGlhbG9nXCIgYXJpYS1saXZlPVwicG9saXRlXCJcbiAgICBbY2xhc3NdPVwib3B0aW9ucy5tZXNzYWdlQ2xhc3NcIiBbYXR0ci5hcmlhLWxhYmVsXT1cIm1lc3NhZ2VcIj5cbiAgICB7eyBtZXNzYWdlIH19XG4gIDwvZGl2PlxuICA8ZGl2ICpuZ0lmPVwib3B0aW9ucy5wcm9ncmVzc0JhclwiPlxuICAgIDxkaXYgY2xhc3M9XCJ0b2FzdC1wcm9ncmVzc1wiIFtzdHlsZS53aWR0aF09XCJ3aWR0aCArICclJ1wiPjwvZGl2PlxuICA8L2Rpdj5cbiAgYCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2ZseUluT3V0JywgW1xuICAgICAgc3RhdGUoJ2luYWN0aXZlJywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKSxcbiAgICAgIHN0YXRlKCdhY3RpdmUnLCBzdHlsZSh7IG9wYWNpdHk6IDEgfSkpLFxuICAgICAgc3RhdGUoJ3JlbW92ZWQnLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpLFxuICAgICAgdHJhbnNpdGlvbihcbiAgICAgICAgJ2luYWN0aXZlID0+IGFjdGl2ZScsXG4gICAgICAgIGFuaW1hdGUoJ3t7IGVhc2VUaW1lIH19bXMge3sgZWFzaW5nIH19JylcbiAgICAgICksXG4gICAgICB0cmFuc2l0aW9uKFxuICAgICAgICAnYWN0aXZlID0+IHJlbW92ZWQnLFxuICAgICAgICBhbmltYXRlKCd7eyBlYXNlVGltZSB9fW1zIHt7IGVhc2luZyB9fScpXG4gICAgICApXG4gICAgXSlcbiAgXSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgVG9hc3QgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBtZXNzYWdlPzogc3RyaW5nIHwgU2FmZUh0bWwgfCBudWxsO1xuICB0aXRsZT86IHN0cmluZztcbiAgb3B0aW9uczogSW5kaXZpZHVhbENvbmZpZztcbiAgZHVwbGljYXRlc0NvdW50OiBudW1iZXI7XG4gIG9yaWdpbmFsVGltZW91dDogbnVtYmVyO1xuICAvKiogd2lkdGggb2YgcHJvZ3Jlc3MgYmFyICovXG4gIHdpZHRoID0gLTE7XG4gIC8qKiBhIGNvbWJpbmF0aW9uIG9mIHRvYXN0IHR5cGUgYW5kIG9wdGlvbnMudG9hc3RDbGFzcyAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgdG9hc3RDbGFzc2VzID0gJyc7XG4gIC8qKiBjb250cm9scyBhbmltYXRpb24gKi9cbiAgQEhvc3RCaW5kaW5nKCdAZmx5SW5PdXQnKVxuICBzdGF0ZSA9IHtcbiAgICB2YWx1ZTogJ2luYWN0aXZlJyxcbiAgICBwYXJhbXM6IHtcbiAgICAgIGVhc2VUaW1lOiB0aGlzLnRvYXN0UGFja2FnZS5jb25maWcuZWFzZVRpbWUsXG4gICAgICBlYXNpbmc6ICdlYXNlLWluJ1xuICAgIH1cbiAgfTtcblxuICAvKiogaGlkZXMgY29tcG9uZW50IHdoZW4gd2FpdGluZyB0byBiZSBkaXNwbGF5ZWQgKi9cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5kaXNwbGF5JylcbiAgZ2V0IGRpc3BsYXlTdHlsZSgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS52YWx1ZSA9PT0gJ2luYWN0aXZlJykge1xuICAgICAgcmV0dXJuICdub25lJztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRpbWVvdXQ6IGFueTtcbiAgcHJpdmF0ZSBpbnRlcnZhbElkOiBhbnk7XG4gIHByaXZhdGUgaGlkZVRpbWU6IG51bWJlcjtcbiAgcHJpdmF0ZSBzdWI6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBzdWIxOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgc3ViMjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHN1YjM6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgdG9hc3RyU2VydmljZTogVG9hc3RyU2VydmljZSxcbiAgICBwdWJsaWMgdG9hc3RQYWNrYWdlOiBUb2FzdFBhY2thZ2UsXG4gICAgcHJvdGVjdGVkIG5nWm9uZT86IE5nWm9uZVxuICApIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSB0b2FzdFBhY2thZ2UubWVzc2FnZTtcbiAgICB0aGlzLnRpdGxlID0gdG9hc3RQYWNrYWdlLnRpdGxlO1xuICAgIHRoaXMub3B0aW9ucyA9IHRvYXN0UGFja2FnZS5jb25maWc7XG4gICAgdGhpcy5vcmlnaW5hbFRpbWVvdXQgPSB0b2FzdFBhY2thZ2UuY29uZmlnLnRpbWVPdXQ7XG4gICAgdGhpcy50b2FzdENsYXNzZXMgPSBgJHt0b2FzdFBhY2thZ2UudG9hc3RUeXBlfSAke1xuICAgICAgdG9hc3RQYWNrYWdlLmNvbmZpZy50b2FzdENsYXNzXG4gICAgfWA7XG4gICAgdGhpcy5zdWIgPSB0b2FzdFBhY2thZ2UudG9hc3RSZWYuYWZ0ZXJBY3RpdmF0ZSgpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmFjdGl2YXRlVG9hc3QoKTtcbiAgICB9KTtcbiAgICB0aGlzLnN1YjEgPSB0b2FzdFBhY2thZ2UudG9hc3RSZWYubWFudWFsQ2xvc2VkKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgfSk7XG4gICAgdGhpcy5zdWIyID0gdG9hc3RQYWNrYWdlLnRvYXN0UmVmLnRpbWVvdXRSZXNldCgpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnJlc2V0VGltZW91dCgpO1xuICAgIH0pO1xuICAgIHRoaXMuc3ViMyA9IHRvYXN0UGFja2FnZS50b2FzdFJlZi5jb3VudER1cGxpY2F0ZSgpLnN1YnNjcmliZShjb3VudCA9PiB7XG4gICAgICB0aGlzLmR1cGxpY2F0ZXNDb3VudCA9IGNvdW50O1xuICAgIH0pO1xuICB9XG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWIxLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWIyLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWIzLnVuc3Vic2NyaWJlKCk7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWQpO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICB9XG4gIC8qKlxuICAgKiBhY3RpdmF0ZXMgdG9hc3QgYW5kIHNldHMgdGltZW91dFxuICAgKi9cbiAgYWN0aXZhdGVUb2FzdCgpIHtcbiAgICB0aGlzLnN0YXRlID0geyAuLi50aGlzLnN0YXRlLCB2YWx1ZTogJ2FjdGl2ZScgfTtcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5kaXNhYmxlVGltZU91dCAmJiB0aGlzLm9wdGlvbnMudGltZU91dCkge1xuICAgICAgdGhpcy5vdXRzaWRlVGltZW91dCgoKSA9PiB0aGlzLnJlbW92ZSgpLCB0aGlzLm9wdGlvbnMudGltZU91dCk7XG4gICAgICB0aGlzLmhpZGVUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgKyB0aGlzLm9wdGlvbnMudGltZU91dDtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMucHJvZ3Jlc3NCYXIpIHtcbiAgICAgICAgdGhpcy5vdXRzaWRlSW50ZXJ2YWwoKCkgPT4gdGhpcy51cGRhdGVQcm9ncmVzcygpLCAxMCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiB1cGRhdGVzIHByb2dyZXNzIGJhciB3aWR0aFxuICAgKi9cbiAgdXBkYXRlUHJvZ3Jlc3MoKSB7XG4gICAgaWYgKHRoaXMud2lkdGggPT09IDAgfHwgdGhpcy53aWR0aCA9PT0gMTAwIHx8ICF0aGlzLm9wdGlvbnMudGltZU91dCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBjb25zdCByZW1haW5pbmcgPSB0aGlzLmhpZGVUaW1lIC0gbm93O1xuICAgIHRoaXMud2lkdGggPSAocmVtYWluaW5nIC8gdGhpcy5vcHRpb25zLnRpbWVPdXQpICogMTAwO1xuICAgIGlmICh0aGlzLm9wdGlvbnMucHJvZ3Jlc3NBbmltYXRpb24gPT09ICdpbmNyZWFzaW5nJykge1xuICAgICAgdGhpcy53aWR0aCA9IDEwMCAtIHRoaXMud2lkdGg7XG4gICAgfVxuICAgIGlmICh0aGlzLndpZHRoIDw9IDApIHtcbiAgICAgIHRoaXMud2lkdGggPSAwO1xuICAgIH1cbiAgICBpZiAodGhpcy53aWR0aCA+PSAxMDApIHtcbiAgICAgIHRoaXMud2lkdGggPSAxMDA7XG4gICAgfVxuICB9XG5cbiAgcmVzZXRUaW1lb3V0KCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkKTtcbiAgICB0aGlzLnN0YXRlID0geyAuLi50aGlzLnN0YXRlLCB2YWx1ZTogJ2FjdGl2ZScgfTtcblxuICAgIHRoaXMub3V0c2lkZVRpbWVvdXQoKCkgPT4gdGhpcy5yZW1vdmUoKSwgdGhpcy5vcmlnaW5hbFRpbWVvdXQpO1xuICAgIHRoaXMub3B0aW9ucy50aW1lT3V0ID0gdGhpcy5vcmlnaW5hbFRpbWVvdXQ7XG4gICAgdGhpcy5oaWRlVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgKHRoaXMub3B0aW9ucy50aW1lT3V0IHx8IDApO1xuICAgIHRoaXMud2lkdGggPSAtMTtcbiAgICBpZiAodGhpcy5vcHRpb25zLnByb2dyZXNzQmFyKSB7XG4gICAgICB0aGlzLm91dHNpZGVJbnRlcnZhbCgoKSA9PiB0aGlzLnVwZGF0ZVByb2dyZXNzKCksIDEwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogdGVsbHMgdG9hc3RyU2VydmljZSB0byByZW1vdmUgdGhpcyB0b2FzdCBhZnRlciBhbmltYXRpb24gdGltZVxuICAgKi9cbiAgcmVtb3ZlKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLnZhbHVlID09PSAncmVtb3ZlZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgdGhpcy5zdGF0ZSA9IHsgLi4udGhpcy5zdGF0ZSwgdmFsdWU6ICdyZW1vdmVkJyB9O1xuICAgIHRoaXMub3V0c2lkZVRpbWVvdXQoXG4gICAgICAoKSA9PiB0aGlzLnRvYXN0clNlcnZpY2UucmVtb3ZlKHRoaXMudG9hc3RQYWNrYWdlLnRvYXN0SWQpLFxuICAgICAgK3RoaXMudG9hc3RQYWNrYWdlLmNvbmZpZy5lYXNlVGltZVxuICAgICk7XG4gIH1cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICB0YXBUb2FzdCgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS52YWx1ZSA9PT0gJ3JlbW92ZWQnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudG9hc3RQYWNrYWdlLnRyaWdnZXJUYXAoKTtcbiAgICBpZiAodGhpcy5vcHRpb25zLnRhcFRvRGlzbWlzcykge1xuICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICB9XG4gIH1cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXG4gIHN0aWNrQXJvdW5kKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLnZhbHVlID09PSAncmVtb3ZlZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgdGhpcy5vcHRpb25zLnRpbWVPdXQgPSAwO1xuICAgIHRoaXMuaGlkZVRpbWUgPSAwO1xuXG4gICAgLy8gZGlzYWJsZSBwcm9ncmVzc0JhclxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkKTtcbiAgICB0aGlzLndpZHRoID0gMDtcbiAgfVxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgZGVsYXllZEhpZGVUb2FzdCgpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLm9wdGlvbnMuZGlzYWJsZVRpbWVPdXQgfHxcbiAgICAgIHRoaXMub3B0aW9ucy5leHRlbmRlZFRpbWVPdXQgPT09IDAgfHxcbiAgICAgIHRoaXMuc3RhdGUudmFsdWUgPT09ICdyZW1vdmVkJ1xuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm91dHNpZGVUaW1lb3V0KCgpID0+IHRoaXMucmVtb3ZlKCksIHRoaXMub3B0aW9ucy5leHRlbmRlZFRpbWVPdXQpO1xuICAgIHRoaXMub3B0aW9ucy50aW1lT3V0ID0gdGhpcy5vcHRpb25zLmV4dGVuZGVkVGltZU91dDtcbiAgICB0aGlzLmhpZGVUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgKyAodGhpcy5vcHRpb25zLnRpbWVPdXQgfHwgMCk7XG4gICAgdGhpcy53aWR0aCA9IC0xO1xuICAgIGlmICh0aGlzLm9wdGlvbnMucHJvZ3Jlc3NCYXIpIHtcbiAgICAgIHRoaXMub3V0c2lkZUludGVydmFsKCgpID0+IHRoaXMudXBkYXRlUHJvZ3Jlc3MoKSwgMTApO1xuICAgIH1cbiAgfVxuXG4gIG91dHNpZGVUaW1lb3V0KGZ1bmM6IEZ1bmN0aW9uLCB0aW1lb3V0OiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5uZ1pvbmUpIHtcbiAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKFxuICAgICAgICAoKSA9PlxuICAgICAgICAgICh0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgKCkgPT4gdGhpcy5ydW5JbnNpZGVBbmd1bGFyKGZ1bmMpLFxuICAgICAgICAgICAgdGltZW91dFxuICAgICAgICAgICkpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IGZ1bmMoKSwgdGltZW91dCk7XG4gICAgfVxuICB9XG5cbiAgb3V0c2lkZUludGVydmFsKGZ1bmM6IEZ1bmN0aW9uLCB0aW1lb3V0OiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5uZ1pvbmUpIHtcbiAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKFxuICAgICAgICAoKSA9PlxuICAgICAgICAgICh0aGlzLmludGVydmFsSWQgPSBzZXRJbnRlcnZhbChcbiAgICAgICAgICAgICgpID0+IHRoaXMucnVuSW5zaWRlQW5ndWxhcihmdW5jKSxcbiAgICAgICAgICAgIHRpbWVvdXRcbiAgICAgICAgICApKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4gZnVuYygpLCB0aW1lb3V0KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJ1bkluc2lkZUFuZ3VsYXIoZnVuYzogRnVuY3Rpb24pIHtcbiAgICBpZiAodGhpcy5uZ1pvbmUpIHtcbiAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiBmdW5jKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmdW5jKCk7XG4gICAgfVxuICB9XG59XG4iXX0=