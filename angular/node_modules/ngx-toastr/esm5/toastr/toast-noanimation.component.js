import { __assign, __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { ApplicationRef, Component, HostBinding, HostListener, NgModule, OnDestroy, } from '@angular/core';
import { DefaultNoComponentGlobalConfig, GlobalConfig, IndividualConfig, ToastPackage, TOAST_CONFIG, } from './toastr-config';
import { ToastrService } from './toastr.service';
var ToastNoAnimation = /** @class */ (function () {
    function ToastNoAnimation(toastrService, toastPackage, appRef) {
        var _this = this;
        this.toastrService = toastrService;
        this.toastPackage = toastPackage;
        this.appRef = appRef;
        /** width of progress bar */
        this.width = -1;
        /** a combination of toast type and options.toastClass */
        this.toastClasses = '';
        /** controls animation */
        this.state = 'inactive';
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
    Object.defineProperty(ToastNoAnimation.prototype, "displayStyle", {
        /** hides component when waiting to be displayed */
        get: function () {
            if (this.state === 'inactive') {
                return 'none';
            }
        },
        enumerable: true,
        configurable: true
    });
    ToastNoAnimation.prototype.ngOnDestroy = function () {
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
    ToastNoAnimation.prototype.activateToast = function () {
        var _this = this;
        this.state = 'active';
        if (!(this.options.disableTimeOut === true || this.options.disableTimeOut === 'timeOut') && this.options.timeOut) {
            this.timeout = setTimeout(function () {
                _this.remove();
            }, this.options.timeOut);
            this.hideTime = new Date().getTime() + this.options.timeOut;
            if (this.options.progressBar) {
                this.intervalId = setInterval(function () { return _this.updateProgress(); }, 10);
            }
        }
        if (this.options.onActivateTick) {
            this.appRef.tick();
        }
    };
    /**
     * updates progress bar width
     */
    ToastNoAnimation.prototype.updateProgress = function () {
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
    ToastNoAnimation.prototype.resetTimeout = function () {
        var _this = this;
        clearTimeout(this.timeout);
        clearInterval(this.intervalId);
        this.state = 'active';
        this.options.timeOut = this.originalTimeout;
        this.timeout = setTimeout(function () { return _this.remove(); }, this.originalTimeout);
        this.hideTime = new Date().getTime() + (this.originalTimeout || 0);
        this.width = -1;
        if (this.options.progressBar) {
            this.intervalId = setInterval(function () { return _this.updateProgress(); }, 10);
        }
    };
    /**
     * tells toastrService to remove this toast after animation time
     */
    ToastNoAnimation.prototype.remove = function () {
        var _this = this;
        if (this.state === 'removed') {
            return;
        }
        clearTimeout(this.timeout);
        this.state = 'removed';
        this.timeout = setTimeout(function () {
            return _this.toastrService.remove(_this.toastPackage.toastId);
        });
    };
    ToastNoAnimation.prototype.tapToast = function () {
        if (this.state === 'removed') {
            return;
        }
        this.toastPackage.triggerTap();
        if (this.options.tapToDismiss) {
            this.remove();
        }
    };
    ToastNoAnimation.prototype.stickAround = function () {
        if (this.state === 'removed') {
            return;
        }
        clearTimeout(this.timeout);
        this.options.timeOut = 0;
        this.hideTime = 0;
        // disable progressBar
        clearInterval(this.intervalId);
        this.width = 0;
    };
    ToastNoAnimation.prototype.delayedHideToast = function () {
        var _this = this;
        if ((this.options.disableTimeOut === true || this.options.disableTimeOut === 'extendedTimeOut') ||
            this.options.extendedTimeOut === 0 ||
            this.state === 'removed') {
            return;
        }
        this.timeout = setTimeout(function () { return _this.remove(); }, this.options.extendedTimeOut);
        this.options.timeOut = this.options.extendedTimeOut;
        this.hideTime = new Date().getTime() + (this.options.timeOut || 0);
        this.width = -1;
        if (this.options.progressBar) {
            this.intervalId = setInterval(function () { return _this.updateProgress(); }, 10);
        }
    };
    ToastNoAnimation.ctorParameters = function () { return [
        { type: ToastrService },
        { type: ToastPackage },
        { type: ApplicationRef }
    ]; };
    __decorate([
        HostBinding('class')
    ], ToastNoAnimation.prototype, "toastClasses", void 0);
    __decorate([
        HostBinding('style.display')
    ], ToastNoAnimation.prototype, "displayStyle", null);
    __decorate([
        HostListener('click')
    ], ToastNoAnimation.prototype, "tapToast", null);
    __decorate([
        HostListener('mouseenter')
    ], ToastNoAnimation.prototype, "stickAround", null);
    __decorate([
        HostListener('mouseleave')
    ], ToastNoAnimation.prototype, "delayedHideToast", null);
    ToastNoAnimation = __decorate([
        Component({
            selector: '[toast-component]',
            template: "\n  <button *ngIf=\"options.closeButton\" (click)=\"remove()\" class=\"toast-close-button\" aria-label=\"Close\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n  <div *ngIf=\"title\" [class]=\"options.titleClass\" [attr.aria-label]=\"title\">\n    {{ title }} <ng-container *ngIf=\"duplicatesCount\">[{{ duplicatesCount + 1 }}]</ng-container>\n  </div>\n  <div *ngIf=\"message && options.enableHtml\" role=\"alert\" aria-live=\"polite\"\n    [class]=\"options.messageClass\" [innerHTML]=\"message\">\n  </div>\n  <div *ngIf=\"message && !options.enableHtml\" role=\"alert\" aria-live=\"polite\"\n    [class]=\"options.messageClass\" [attr.aria-label]=\"message\">\n    {{ message }}\n  </div>\n  <div *ngIf=\"options.progressBar\">\n    <div class=\"toast-progress\" [style.width]=\"width + '%'\"></div>\n  </div>\n  "
        })
    ], ToastNoAnimation);
    return ToastNoAnimation;
}());
export { ToastNoAnimation };
export var DefaultNoAnimationsGlobalConfig = __assign(__assign({}, DefaultNoComponentGlobalConfig), { toastComponent: ToastNoAnimation });
var ToastNoAnimationModule = /** @class */ (function () {
    function ToastNoAnimationModule() {
    }
    ToastNoAnimationModule_1 = ToastNoAnimationModule;
    ToastNoAnimationModule.forRoot = function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: ToastNoAnimationModule_1,
            providers: [
                {
                    provide: TOAST_CONFIG,
                    useValue: {
                        default: DefaultNoAnimationsGlobalConfig,
                        config: config,
                    },
                },
            ],
        };
    };
    var ToastNoAnimationModule_1;
    ToastNoAnimationModule = ToastNoAnimationModule_1 = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [ToastNoAnimation],
            exports: [ToastNoAnimation],
            entryComponents: [ToastNoAnimation],
        })
    ], ToastNoAnimationModule);
    return ToastNoAnimationModule;
}());
export { ToastNoAnimationModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Qtbm9hbmltYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRvYXN0ci8iLCJzb3VyY2VzIjpbInRvYXN0ci90b2FzdC1ub2FuaW1hdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQ0wsY0FBYyxFQUNkLFNBQVMsRUFDVCxXQUFXLEVBQ1gsWUFBWSxFQUNaLFFBQVEsRUFDUixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFJdkIsT0FBTyxFQUNMLDhCQUE4QixFQUM5QixZQUFZLEVBQ1osZ0JBQWdCLEVBQ2hCLFlBQVksRUFDWixZQUFZLEdBQ2IsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUF1QmpEO0lBNkJFLDBCQUNZLGFBQTRCLEVBQy9CLFlBQTBCLEVBQ3ZCLE1BQXNCO1FBSGxDLGlCQXdCQztRQXZCVyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUMvQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUN2QixXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQTFCbEMsNEJBQTRCO1FBQzVCLFVBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNYLHlEQUF5RDtRQUNuQyxpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQVV4Qyx5QkFBeUI7UUFDekIsVUFBSyxHQUFHLFVBQVUsQ0FBQztRQWNqQixJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUM7UUFDcEMsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQztRQUNuQyxJQUFJLENBQUMsZUFBZSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ25ELElBQUksQ0FB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SUFnSEQ7UUFEQyxZQUFZLENBQUMsT0FBTyxDQUFDO29EQVNyQjtJQUVEO1FBREMsWUFBWSxDQUFDLFlBQVksQ0FBQzt1REFZMUI7SUFFRDtRQURDLFlBQVksQ0FBQyxZQUFZLENBQUM7NERBbUIxQjtJQTFLVSxnQkFBZ0I7UUFyQjVCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsUUFBUSxFQUFFLGswQkFpQlQ7U0FDRixDQUFDO09BQ1csZ0JBQWdCLENBMks1QjtJQUFELHVCQUFDO0NBQUEsQUEzS0QsSUEyS0M7U0EzS1ksZ0JBQWdCO0FBNks3QixNQUFNLENBQUMsSUFBTSwrQkFBK0IseUJBQ3ZDLDhCQUE4QixLQUNqQyxjQUFjLEVBQUUsZ0JBQWdCLEdBQ2pDLENBQUM7QUFRRjtJQUFBO0lBZUEsQ0FBQzsrQkFmWSxzQkFBc0I7SUFDMUIsOEJBQU8sR0FBZCxVQUFlLE1BQWtDO1FBQWxDLHVCQUFBLEVBQUEsV0FBa0M7UUFDL0MsT0FBTztZQUNMLFFBQVEsRUFBRSx3QkFBc0I7WUFDaEMsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxZQUFZO29CQUNyQixRQUFRLEVBQUU7d0JBQ1IsT0FBTyxFQUFFLCtCQUErQjt3QkFDeEMsTUFBTSxRQUFBO3FCQUNQO2lCQUNGO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQzs7SUFkVSxzQkFBc0I7UUFObEMsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLFlBQVksRUFBRSxDQUFDLGdCQUFnQixDQUFDO1lBQ2hDLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDO1lBQzNCLGVBQWUsRUFBRSxDQUFDLGdCQUFnQixDQUFDO1NBQ3BDLENBQUM7T0FDVyxzQkFBc0IsQ0FlbEM7SUFBRCw2QkFBQztDQUFBLEFBZkQsSUFlQztTQWZZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBBcHBsaWNhdGlvblJlZixcbiAgQ29tcG9uZW50LFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBOZ01vZHVsZSxcbiAgT25EZXN0cm95LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7XG4gIERlZmF1bHROb0NvbXBvbmVudEdsb2JhbENvbmZpZyxcbiAgR2xvYmFsQ29uZmlnLFxuICBJbmRpdmlkdWFsQ29uZmlnLFxuICBUb2FzdFBhY2thZ2UsXG4gIFRPQVNUX0NPTkZJRyxcbn0gZnJvbSAnLi90b2FzdHItY29uZmlnJztcbmltcG9ydCB7IFRvYXN0clNlcnZpY2UgfSBmcm9tICcuL3RvYXN0ci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW3RvYXN0LWNvbXBvbmVudF0nLFxuICB0ZW1wbGF0ZTogYFxuICA8YnV0dG9uICpuZ0lmPVwib3B0aW9ucy5jbG9zZUJ1dHRvblwiIChjbGljayk9XCJyZW1vdmUoKVwiIGNsYXNzPVwidG9hc3QtY2xvc2UtYnV0dG9uXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+XG4gICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cbiAgPC9idXR0b24+XG4gIDxkaXYgKm5nSWY9XCJ0aXRsZVwiIFtjbGFzc109XCJvcHRpb25zLnRpdGxlQ2xhc3NcIiBbYXR0ci5hcmlhLWxhYmVsXT1cInRpdGxlXCI+XG4gICAge3sgdGl0bGUgfX0gPG5nLWNvbnRhaW5lciAqbmdJZj1cImR1cGxpY2F0ZXNDb3VudFwiPlt7eyBkdXBsaWNhdGVzQ291bnQgKyAxIH19XTwvbmctY29udGFpbmVyPlxuICA8L2Rpdj5cbiAgPGRpdiAqbmdJZj1cIm1lc3NhZ2UgJiYgb3B0aW9ucy5lbmFibGVIdG1sXCIgcm9sZT1cImFsZXJ0XCIgYXJpYS1saXZlPVwicG9saXRlXCJcbiAgICBbY2xhc3NdPVwib3B0aW9ucy5tZXNzYWdlQ2xhc3NcIiBbaW5uZXJIVE1MXT1cIm1lc3NhZ2VcIj5cbiAgPC9kaXY+XG4gIDxkaXYgKm5nSWY9XCJtZXNzYWdlICYmICFvcHRpb25zLmVuYWJsZUh0bWxcIiByb2xlPVwiYWxlcnRcIiBhcmlhLWxpdmU9XCJwb2xpdGVcIlxuICAgIFtjbGFzc109XCJvcHRpb25zLm1lc3NhZ2VDbGFzc1wiIFthdHRyLmFyaWEtbGFiZWxdPVwibWVzc2FnZVwiPlxuICAgIHt7IG1lc3NhZ2UgfX1cbiAgPC9kaXY+XG4gIDxkaXYgKm5nSWY9XCJvcHRpb25zLnByb2dyZXNzQmFyXCI+XG4gICAgPGRpdiBjbGFzcz1cInRvYXN0LXByb2dyZXNzXCIgW3N0eWxlLndpZHRoXT1cIndpZHRoICsgJyUnXCI+PC9kaXY+XG4gIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBUb2FzdE5vQW5pbWF0aW9uIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgbWVzc2FnZT86IHN0cmluZyB8IG51bGw7XG4gIHRpdGxlPzogc3RyaW5nO1xuICBvcHRpb25zOiBJbmRpdmlkdWFsQ29uZmlnO1xuICBkdXBsaWNhdGVzQ291bnQ6IG51bWJlcjtcbiAgb3JpZ2luYWxUaW1lb3V0OiBudW1iZXI7XG4gIC8qKiB3aWR0aCBvZiBwcm9ncmVzcyBiYXIgKi9cbiAgd2lkdGggPSAtMTtcbiAgLyoqIGEgY29tYmluYXRpb24gb2YgdG9hc3QgdHlwZSBhbmQgb3B0aW9ucy50b2FzdENsYXNzICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSB0b2FzdENsYXNzZXMgPSAnJztcblxuICAvKiogaGlkZXMgY29tcG9uZW50IHdoZW4gd2FpdGluZyB0byBiZSBkaXNwbGF5ZWQgKi9cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5kaXNwbGF5JylcbiAgZ2V0IGRpc3BsYXlTdHlsZSgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZSA9PT0gJ2luYWN0aXZlJykge1xuICAgICAgcmV0dXJuICdub25lJztcbiAgICB9XG4gIH1cblxuICAvKiogY29udHJvbHMgYW5pbWF0aW9uICovXG4gIHN0YXRlID0gJ2luYWN0aXZlJztcbiAgcHJpdmF0ZSB0aW1lb3V0OiBhbnk7XG4gIHByaXZhdGUgaW50ZXJ2YWxJZDogYW55O1xuICBwcml2YXRlIGhpZGVUaW1lOiBudW1iZXI7XG4gIHByaXZhdGUgc3ViOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgc3ViMTogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHN1YjI6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBzdWIzOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHRvYXN0clNlcnZpY2U6IFRvYXN0clNlcnZpY2UsXG4gICAgcHVibGljIHRvYXN0UGFja2FnZTogVG9hc3RQYWNrYWdlLFxuICAgIHByb3RlY3RlZCBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLFxuICApIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSB0b2FzdFBhY2thZ2UubWVzc2FnZTtcbiAgICB0aGlzLnRpdGxlID0gdG9hc3RQYWNrYWdlLnRpdGxlO1xuICAgIHRoaXMub3B0aW9ucyA9IHRvYXN0UGFja2FnZS5jb25maWc7XG4gICAgdGhpcy5vcmlnaW5hbFRpbWVvdXQgPSB0b2FzdFBhY2thZ2UuY29uZmlnLnRpbWVPdXQ7XG4gICAgdGhpcy50b2FzdENsYXNzZXMgPSBgJHt0b2FzdFBhY2thZ2UudG9hc3RUeXBlfSAke1xuICAgICAgdG9hc3RQYWNrYWdlLmNvbmZpZy50b2FzdENsYXNzXG4gICAgfWA7XG4gICAgdGhpcy5zdWIgPSB0b2FzdFBhY2thZ2UudG9hc3RSZWYuYWZ0ZXJBY3RpdmF0ZSgpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmFjdGl2YXRlVG9hc3QoKTtcbiAgICB9KTtcbiAgICB0aGlzLnN1YjEgPSB0b2FzdFBhY2thZ2UudG9hc3RSZWYubWFudWFsQ2xvc2VkKCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgfSk7XG4gICAgdGhpcy5zdWIyID0gdG9hc3RQYWNrYWdlLnRvYXN0UmVmLnRpbWVvdXRSZXNldCgpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnJlc2V0VGltZW91dCgpO1xuICAgIH0pO1xuICAgIHRoaXMuc3ViMyA9IHRvYXN0UGFja2FnZS50b2FzdFJlZi5jb3VudER1cGxpY2F0ZSgpLnN1YnNjcmliZShjb3VudCA9PiB7XG4gICAgICB0aGlzLmR1cGxpY2F0ZXNDb3VudCA9IGNvdW50O1xuICAgIH0pO1xuICB9XG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWIxLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWIyLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWIzLnVuc3Vic2NyaWJlKCk7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWQpO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICB9XG4gIC8qKlxuICAgKiBhY3RpdmF0ZXMgdG9hc3QgYW5kIHNldHMgdGltZW91dFxuICAgKi9cbiAgYWN0aXZhdGVUb2FzdCgpIHtcbiAgICB0aGlzLnN0YXRlID0gJ2FjdGl2ZSc7XG4gICAgaWYgKCEodGhpcy5vcHRpb25zLmRpc2FibGVUaW1lT3V0ID09PSB0cnVlIHx8IHRoaXMub3B0aW9ucy5kaXNhYmxlVGltZU91dCA9PT0gJ3RpbWVPdXQnKSAmJiB0aGlzLm9wdGlvbnMudGltZU91dCkge1xuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICB9LCB0aGlzLm9wdGlvbnMudGltZU91dCk7XG4gICAgICB0aGlzLmhpZGVUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgKyB0aGlzLm9wdGlvbnMudGltZU91dDtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMucHJvZ3Jlc3NCYXIpIHtcbiAgICAgICAgdGhpcy5pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy51cGRhdGVQcm9ncmVzcygpLCAxMCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMub25BY3RpdmF0ZVRpY2spIHtcbiAgICAgIHRoaXMuYXBwUmVmLnRpY2soKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIHVwZGF0ZXMgcHJvZ3Jlc3MgYmFyIHdpZHRoXG4gICAqL1xuICB1cGRhdGVQcm9ncmVzcygpIHtcbiAgICBpZiAodGhpcy53aWR0aCA9PT0gMCB8fCB0aGlzLndpZHRoID09PSAxMDAgfHwgIXRoaXMub3B0aW9ucy50aW1lT3V0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGNvbnN0IHJlbWFpbmluZyA9IHRoaXMuaGlkZVRpbWUgLSBub3c7XG4gICAgdGhpcy53aWR0aCA9IChyZW1haW5pbmcgLyB0aGlzLm9wdGlvbnMudGltZU91dCkgKiAxMDA7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5wcm9ncmVzc0FuaW1hdGlvbiA9PT0gJ2luY3JlYXNpbmcnKSB7XG4gICAgICB0aGlzLndpZHRoID0gMTAwIC0gdGhpcy53aWR0aDtcbiAgICB9XG4gICAgaWYgKHRoaXMud2lkdGggPD0gMCkge1xuICAgICAgdGhpcy53aWR0aCA9IDA7XG4gICAgfVxuICAgIGlmICh0aGlzLndpZHRoID49IDEwMCkge1xuICAgICAgdGhpcy53aWR0aCA9IDEwMDtcbiAgICB9XG4gIH1cblxuICByZXNldFRpbWVvdXQoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWQpO1xuICAgIHRoaXMuc3RhdGUgPSAnYWN0aXZlJztcblxuICAgIHRoaXMub3B0aW9ucy50aW1lT3V0ID0gdGhpcy5vcmlnaW5hbFRpbWVvdXQ7XG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlbW92ZSgpLCB0aGlzLm9yaWdpbmFsVGltZW91dCk7XG4gICAgdGhpcy5oaWRlVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgKHRoaXMub3JpZ2luYWxUaW1lb3V0IHx8IDApO1xuICAgIHRoaXMud2lkdGggPSAtMTtcbiAgICBpZiAodGhpcy5vcHRpb25zLnByb2dyZXNzQmFyKSB7XG4gICAgICB0aGlzLmludGVydmFsSWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLnVwZGF0ZVByb2dyZXNzKCksIDEwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogdGVsbHMgdG9hc3RyU2VydmljZSB0byByZW1vdmUgdGhpcyB0b2FzdCBhZnRlciBhbmltYXRpb24gdGltZVxuICAgKi9cbiAgcmVtb3ZlKCkge1xuICAgIGlmICh0aGlzLnN0YXRlID09PSAncmVtb3ZlZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgdGhpcy5zdGF0ZSA9ICdyZW1vdmVkJztcbiAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+XG4gICAgICB0aGlzLnRvYXN0clNlcnZpY2UucmVtb3ZlKHRoaXMudG9hc3RQYWNrYWdlLnRvYXN0SWQpLFxuICAgICk7XG4gIH1cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICB0YXBUb2FzdCgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZSA9PT0gJ3JlbW92ZWQnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudG9hc3RQYWNrYWdlLnRyaWdnZXJUYXAoKTtcbiAgICBpZiAodGhpcy5vcHRpb25zLnRhcFRvRGlzbWlzcykge1xuICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICB9XG4gIH1cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXG4gIHN0aWNrQXJvdW5kKCkge1xuICAgIGlmICh0aGlzLnN0YXRlID09PSAncmVtb3ZlZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgdGhpcy5vcHRpb25zLnRpbWVPdXQgPSAwO1xuICAgIHRoaXMuaGlkZVRpbWUgPSAwO1xuXG4gICAgLy8gZGlzYWJsZSBwcm9ncmVzc0JhclxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkKTtcbiAgICB0aGlzLndpZHRoID0gMDtcbiAgfVxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgZGVsYXllZEhpZGVUb2FzdCgpIHtcbiAgICBpZiAoXG4gICAgICAodGhpcy5vcHRpb25zLmRpc2FibGVUaW1lT3V0ID09PSB0cnVlIHx8IHRoaXMub3B0aW9ucy5kaXNhYmxlVGltZU91dCA9PT0gJ2V4dGVuZGVkVGltZU91dCcpIHx8XG4gICAgICB0aGlzLm9wdGlvbnMuZXh0ZW5kZWRUaW1lT3V0ID09PSAwIHx8XG4gICAgICB0aGlzLnN0YXRlID09PSAncmVtb3ZlZCdcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChcbiAgICAgICgpID0+IHRoaXMucmVtb3ZlKCksXG4gICAgICB0aGlzLm9wdGlvbnMuZXh0ZW5kZWRUaW1lT3V0LFxuICAgICk7XG4gICAgdGhpcy5vcHRpb25zLnRpbWVPdXQgPSB0aGlzLm9wdGlvbnMuZXh0ZW5kZWRUaW1lT3V0O1xuICAgIHRoaXMuaGlkZVRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSArICh0aGlzLm9wdGlvbnMudGltZU91dCB8fCAwKTtcbiAgICB0aGlzLndpZHRoID0gLTE7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5wcm9ncmVzc0Jhcikge1xuICAgICAgdGhpcy5pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy51cGRhdGVQcm9ncmVzcygpLCAxMCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0Tm9BbmltYXRpb25zR2xvYmFsQ29uZmlnOiBHbG9iYWxDb25maWcgPSB7XG4gIC4uLkRlZmF1bHROb0NvbXBvbmVudEdsb2JhbENvbmZpZyxcbiAgdG9hc3RDb21wb25lbnQ6IFRvYXN0Tm9BbmltYXRpb24sXG59O1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbVG9hc3ROb0FuaW1hdGlvbl0sXG4gIGV4cG9ydHM6IFtUb2FzdE5vQW5pbWF0aW9uXSxcbiAgZW50cnlDb21wb25lbnRzOiBbVG9hc3ROb0FuaW1hdGlvbl0sXG59KVxuZXhwb3J0IGNsYXNzIFRvYXN0Tm9BbmltYXRpb25Nb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IFBhcnRpYWw8R2xvYmFsQ29uZmlnPiA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVyczxUb2FzdE5vQW5pbWF0aW9uTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBUb2FzdE5vQW5pbWF0aW9uTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBUT0FTVF9DT05GSUcsXG4gICAgICAgICAgdXNlVmFsdWU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IERlZmF1bHROb0FuaW1hdGlvbnNHbG9iYWxDb25maWcsXG4gICAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19