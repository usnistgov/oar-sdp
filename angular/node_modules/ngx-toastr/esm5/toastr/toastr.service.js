import { __assign, __decorate, __param, __values } from "tslib";
import { ComponentRef, Inject, Injectable, Injector, NgZone, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Overlay } from '../overlay/overlay';
import { ComponentPortal } from '../portal/portal';
import { ToastInjector, ToastRef } from './toast-injector';
import { ToastPackage, TOAST_CONFIG } from './toastr-config';
import * as i0 from "@angular/core";
import * as i1 from "./toastr-config";
import * as i2 from "../overlay/overlay";
import * as i3 from "@angular/platform-browser";
var ToastrService = /** @class */ (function () {
    function ToastrService(token, overlay, _injector, sanitizer, ngZone) {
        this.overlay = overlay;
        this._injector = _injector;
        this.sanitizer = sanitizer;
        this.ngZone = ngZone;
        this.currentlyActive = 0;
        this.toasts = [];
        this.index = 0;
        this.toastrConfig = __assign(__assign({}, token.default), token.config);
        if (token.config.iconClasses) {
            this.toastrConfig.iconClasses = __assign(__assign({}, token.default.iconClasses), token.config.iconClasses);
        }
    }
    /** show toast */
    ToastrService.prototype.show = function (message, title, override, type) {
        if (override === void 0) { override = {}; }
        if (type === void 0) { type = ''; }
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
    };
    /** show successful toast */
    ToastrService.prototype.success = function (message, title, override) {
        if (override === void 0) { override = {}; }
        var type = this.toastrConfig.iconClasses.success || '';
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
    };
    /** show error toast */
    ToastrService.prototype.error = function (message, title, override) {
        if (override === void 0) { override = {}; }
        var type = this.toastrConfig.iconClasses.error || '';
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
    };
    /** show info toast */
    ToastrService.prototype.info = function (message, title, override) {
        if (override === void 0) { override = {}; }
        var type = this.toastrConfig.iconClasses.info || '';
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
    };
    /** show warning toast */
    ToastrService.prototype.warning = function (message, title, override) {
        if (override === void 0) { override = {}; }
        var type = this.toastrConfig.iconClasses.warning || '';
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
    };
    /**
     * Remove all or a single toast by id
     */
    ToastrService.prototype.clear = function (toastId) {
        var e_1, _a;
        try {
            // Call every toastRef manualClose function
            for (var _b = __values(this.toasts), _c = _b.next(); !_c.done; _c = _b.next()) {
                var toast = _c.value;
                if (toastId !== undefined) {
                    if (toast.toastId === toastId) {
                        toast.toastRef.manualClose();
                        return;
                    }
                }
                else {
                    toast.toastRef.manualClose();
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * Remove and destroy a single toast by id
     */
    ToastrService.prototype.remove = function (toastId) {
        var found = this._findToast(toastId);
        if (!found) {
            return false;
        }
        found.activeToast.toastRef.close();
        this.toasts.splice(found.index, 1);
        this.currentlyActive = this.currentlyActive - 1;
        if (!this.toastrConfig.maxOpened || !this.toasts.length) {
            return false;
        }
        if (this.currentlyActive < this.toastrConfig.maxOpened &&
            this.toasts[this.currentlyActive]) {
            var p = this.toasts[this.currentlyActive].toastRef;
            if (!p.isInactive()) {
                this.currentlyActive = this.currentlyActive + 1;
                p.activate();
            }
        }
        return true;
    };
    /**
     * Determines if toast message is already shown
     */
    ToastrService.prototype.findDuplicate = function (message, resetOnDuplicate, countDuplicates) {
        var e_2, _a;
        try {
            for (var _b = __values(this.toasts), _c = _b.next(); !_c.done; _c = _b.next()) {
                var toast = _c.value;
                if (toast.message === message) {
                    toast.toastRef.onDuplicate(resetOnDuplicate, countDuplicates);
                    return toast;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return null;
    };
    /** create a clone of global config and apply individual settings */
    ToastrService.prototype.applyConfig = function (override) {
        if (override === void 0) { override = {}; }
        return __assign(__assign({}, this.toastrConfig), override);
    };
    /**
     * Find toast object by id
     */
    ToastrService.prototype._findToast = function (toastId) {
        for (var i = 0; i < this.toasts.length; i++) {
            if (this.toasts[i].toastId === toastId) {
                return { index: i, activeToast: this.toasts[i] };
            }
        }
        return null;
    };
    /**
     * Determines the need to run inside angular's zone then builds the toast
     */
    ToastrService.prototype._preBuildNotification = function (toastType, message, title, config) {
        var _this = this;
        if (config.onActivateTick) {
            return this.ngZone.run(function () {
                return _this._buildNotification(toastType, message, title, config);
            });
        }
        return this._buildNotification(toastType, message, title, config);
    };
    /**
     * Creates and attaches toast data to component
     * returns the active toast, or in case preventDuplicates is enabled the original/non-duplicate active toast.
     */
    ToastrService.prototype._buildNotification = function (toastType, message, title, config) {
        if (!config.toastComponent) {
            throw new Error('toastComponent required');
        }
        // max opened and auto dismiss = true
        // if timeout = 0 resetting it would result in setting this.hideTime = Date.now(). Hence, we only want to reset timeout if there is
        // a timeout at all
        var duplicate = this.findDuplicate(message, this.toastrConfig.resetTimeoutOnDuplicate && config.timeOut > 0, this.toastrConfig.countDuplicates);
        if (message && this.toastrConfig.preventDuplicates && duplicate !== null) {
            return duplicate;
        }
        this.previousToastMessage = message;
        var keepInactive = false;
        if (this.toastrConfig.maxOpened &&
            this.currentlyActive >= this.toastrConfig.maxOpened) {
            keepInactive = true;
            if (this.toastrConfig.autoDismiss) {
                this.clear(this.toasts[0].toastId);
            }
        }
        var overlayRef = this.overlay.create(config.positionClass, this.overlayContainer);
        this.index = this.index + 1;
        var sanitizedMessage = message;
        if (message && config.enableHtml) {
            sanitizedMessage = this.sanitizer.sanitize(SecurityContext.HTML, message);
        }
        var toastRef = new ToastRef(overlayRef);
        var toastPackage = new ToastPackage(this.index, config, sanitizedMessage, title, toastType, toastRef);
        var toastInjector = new ToastInjector(toastPackage, this._injector);
        var component = new ComponentPortal(config.toastComponent, toastInjector);
        var portal = overlayRef.attach(component, this.toastrConfig.newestOnTop);
        toastRef.componentInstance = portal.instance;
        var ins = {
            toastId: this.index,
            message: message || '',
            toastRef: toastRef,
            onShown: toastRef.afterActivate(),
            onHidden: toastRef.afterClosed(),
            onTap: toastPackage.onTap(),
            onAction: toastPackage.onAction(),
            portal: portal
        };
        if (!keepInactive) {
            this.currentlyActive = this.currentlyActive + 1;
            setTimeout(function () {
                ins.toastRef.activate();
            });
        }
        this.toasts.push(ins);
        return ins;
    };
    ToastrService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [TOAST_CONFIG,] }] },
        { type: Overlay },
        { type: Injector },
        { type: DomSanitizer },
        { type: NgZone }
    ]; };
    ToastrService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ToastrService_Factory() { return new ToastrService(i0.ɵɵinject(i1.TOAST_CONFIG), i0.ɵɵinject(i2.Overlay), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i3.DomSanitizer), i0.ɵɵinject(i0.NgZone)); }, token: ToastrService, providedIn: "root" });
    ToastrService = __decorate([
        Injectable({ providedIn: 'root' }),
        __param(0, Inject(TOAST_CONFIG))
    ], ToastrService);
    return ToastrService;
}());
export { ToastrService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3RyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdG9hc3RyLyIsInNvdXJjZXMiOlsidG9hc3RyL3RvYXN0ci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsWUFBWSxFQUNaLE1BQU0sRUFDTixVQUFVLEVBQ1YsUUFBUSxFQUNSLE1BQU0sRUFDTixlQUFlLEVBQ2hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUl6RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDN0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFM0QsT0FBTyxFQUFrQyxZQUFZLEVBQWMsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7O0FBc0J6RztJQVFFLHVCQUN3QixLQUFpQixFQUMvQixPQUFnQixFQUNoQixTQUFtQixFQUNuQixTQUF1QixFQUN2QixNQUFjO1FBSGQsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ25CLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFDdkIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVh4QixvQkFBZSxHQUFHLENBQUMsQ0FBQztRQUNwQixXQUFNLEdBQXVCLEVBQUUsQ0FBQztRQUd4QixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBU2hCLElBQUksQ0FBQyxZQUFZLHlCQUNaLEtBQUssQ0FBQyxPQUFPLEdBQ2IsS0FBSyxDQUFDLE1BQU0sQ0FDaEIsQ0FBQztRQUNGLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLHlCQUN4QixLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FD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UUFFRixJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7WUFDaEQsVUFBVSxDQUFDO2dCQUNULEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQzs7Z0RBblFFLE1BQU0sU0FBQyxZQUFZO2dCQUNILE9BQU87Z0JBQ0wsUUFBUTtnQkFDUixZQUFZO2dCQUNmLE1BQU07OztJQWJiLGFBQWE7UUFEekIsVUFBVSxDQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDO1FBVTlCLFdBQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFBO09BVFosYUFBYSxDQTZRekI7d0JBblREO0NBbVRDLEFBN1FELElBNlFDO1NBN1FZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5qZWN0YWJsZSxcbiAgSW5qZWN0b3IsXG4gIE5nWm9uZSxcbiAgU2VjdXJpdHlDb250ZXh0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgT3ZlcmxheSB9IGZyb20gJy4uL292ZXJsYXkvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICcuLi9wb3J0YWwvcG9ydGFsJztcbmltcG9ydCB7IFRvYXN0SW5qZWN0b3IsIFRvYXN0UmVmIH0gZnJvbSAnLi90b2FzdC1pbmplY3Rvcic7XG5pbXBvcnQgeyBUb2FzdENvbnRhaW5lckRpcmVjdGl2ZSB9IGZyb20gJy4vdG9hc3QuZGlyZWN0aXZlJztcbmltcG9ydCB7IEdsb2JhbENvbmZpZywgSW5kaXZpZHVhbENvbmZpZywgVG9hc3RQYWNrYWdlLCBUb2FzdFRva2VuLCBUT0FTVF9DT05GSUcgfSBmcm9tICcuL3RvYXN0ci1jb25maWcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFjdGl2ZVRvYXN0PEM+IHtcbiAgLyoqIFlvdXIgVG9hc3QgSUQuIFVzZSB0aGlzIHRvIGNsb3NlIGl0IGluZGl2aWR1YWxseSAqL1xuICB0b2FzdElkOiBudW1iZXI7XG4gIC8qKiB0aGUgbWVzc2FnZSBvZiB5b3VyIHRvYXN0LiBTdG9yZWQgdG8gcHJldmVudCBkdXBsaWNhdGVzICovXG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgLyoqIGEgcmVmZXJlbmNlIHRvIHRoZSBjb21wb25lbnQgc2VlIHBvcnRhbC50cyAqL1xuICBwb3J0YWw6IENvbXBvbmVudFJlZjxDPjtcbiAgLyoqIGEgcmVmZXJlbmNlIHRvIHlvdXIgdG9hc3QgKi9cbiAgdG9hc3RSZWY6IFRvYXN0UmVmPEM+O1xuICAvKiogdHJpZ2dlcmVkIHdoZW4gdG9hc3QgaXMgYWN0aXZlICovXG4gIG9uU2hvd246IE9ic2VydmFibGU8YW55PjtcbiAgLyoqIHRyaWdnZXJlZCB3aGVuIHRvYXN0IGlzIGRlc3Ryb3llZCAqL1xuICBvbkhpZGRlbjogT2JzZXJ2YWJsZTxhbnk+O1xuICAvKiogdHJpZ2dlcmVkIG9uIHRvYXN0IGNsaWNrICovXG4gIG9uVGFwOiBPYnNlcnZhYmxlPGFueT47XG4gIC8qKiBhdmFpbGFibGUgZm9yIHlvdXIgdXNlIGluIGN1c3RvbSB0b2FzdCAqL1xuICBvbkFjdGlvbjogT2JzZXJ2YWJsZTxhbnk+O1xufVxuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFRvYXN0clNlcnZpY2Uge1xuICB0b2FzdHJDb25maWc6IEdsb2JhbENvbmZpZztcbiAgY3VycmVudGx5QWN0aXZlID0gMDtcbiAgdG9hc3RzOiBBY3RpdmVUb2FzdDxhbnk+W10gPSBbXTtcbiAgb3ZlcmxheUNvbnRhaW5lcjogVG9hc3RDb250YWluZXJEaXJlY3RpdmU7XG4gIHByZXZpb3VzVG9hc3RNZXNzYWdlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgaW5kZXggPSAwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoVE9BU1RfQ09ORklHKSB0b2tlbjogVG9hc3RUb2tlbixcbiAgICBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZVxuICApIHtcbiAgICB0aGlzLnRvYXN0ckNvbmZpZyA9IHtcbiAgICAgIC4uLnRva2VuLmRlZmF1bHQsXG4gICAgICAuLi50b2tlbi5jb25maWcsXG4gICAgfTtcbiAgICBpZiAodG9rZW4uY29uZmlnLmljb25DbGFzc2VzKSB7XG4gICAgICB0aGlzLnRvYXN0ckNvbmZpZy5pY29uQ2xhc3NlcyA9IHtcbiAgICAgICAgLi4udG9rZW4uZGVmYXVsdC5pY29uQ2xhc3NlcyxcbiAgICAgICAgLi4udG9rZW4uY29uZmlnLmljb25DbGFzc2VzLFxuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgLyoqIHNob3cgdG9hc3QgKi9cbiAgc2hvdyhcbiAgICBtZXNzYWdlPzogc3RyaW5nLFxuICAgIHRpdGxlPzogc3RyaW5nLFxuICAgIG92ZXJyaWRlOiBQYXJ0aWFsPEluZGl2aWR1YWxDb25maWc+ID0ge30sXG4gICAgdHlwZSA9ICcnXG4gICkge1xuICAgIHJldHVybiB0aGlzLl9wcmVCdWlsZE5vdGlmaWNhdGlvbihcbiAgICAgIHR5cGUsXG4gICAgICBtZXNzYWdlLFxuICAgICAgdGl0bGUsXG4gICAgICB0aGlzLmFwcGx5Q29uZmlnKG92ZXJyaWRlKVxuICAgICk7XG4gIH1cbiAgLyoqIHNob3cgc3VjY2Vzc2Z1bCB0b2FzdCAqL1xuICBzdWNjZXNzKFxuICAgIG1lc3NhZ2U/OiBzdHJpbmcsXG4gICAgdGl0bGU/OiBzdHJpbmcsXG4gICAgb3ZlcnJpZGU6IFBhcnRpYWw8SW5kaXZpZHVhbENvbmZpZz4gPSB7fVxuICApIHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy50b2FzdHJDb25maWcuaWNvbkNsYXNzZXMuc3VjY2VzcyB8fCAnJztcbiAgICByZXR1cm4gdGhpcy5fcHJlQnVpbGROb3RpZmljYXRpb24oXG4gICAgICB0eXBlLFxuICAgICAgbWVzc2FnZSxcbiAgICAgIHRpdGxlLFxuICAgICAgdGhpcy5hcHBseUNvbmZpZyhvdmVycmlkZSlcbiAgICApO1xuICB9XG4gIC8qKiBzaG93IGVycm9yIHRvYXN0ICovXG4gIGVycm9yKFxuICAgIG1lc3NhZ2U/OiBzdHJpbmcsXG4gICAgdGl0bGU/OiBzdHJpbmcsXG4gICAgb3ZlcnJpZGU6IFBhcnRpYWw8SW5kaXZpZHVhbENvbmZpZz4gPSB7fVxuICApIHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy50b2FzdHJDb25maWcuaWNvbkNsYXNzZXMuZXJyb3IgfHwgJyc7XG4gICAgcmV0dXJuIHRoaXMuX3ByZUJ1aWxkTm90aWZpY2F0aW9uKFxuICAgICAgdHlwZSxcbiAgICAgIG1lc3NhZ2UsXG4gICAgICB0aXRsZSxcbiAgICAgIHRoaXMuYXBwbHlDb25maWcob3ZlcnJpZGUpXG4gICAgKTtcbiAgfVxuICAvKiogc2hvdyBpbmZvIHRvYXN0ICovXG4gIGluZm8oXG4gICAgbWVzc2FnZT86IHN0cmluZyxcbiAgICB0aXRsZT86IHN0cmluZyxcbiAgICBvdmVycmlkZTogUGFydGlhbDxJbmRpdmlkdWFsQ29uZmlnPiA9IHt9XG4gICkge1xuICAgIGNvbnN0IHR5cGUgPSB0aGlzLnRvYXN0ckNvbmZpZy5pY29uQ2xhc3Nlcy5pbmZvIHx8ICcnO1xuICAgIHJldHVybiB0aGlzLl9wcmVCdWlsZE5vdGlmaWNhdGlvbihcbiAgICAgIHR5cGUsXG4gICAgICBtZXNzYWdlLFxuICAgICAgdGl0bGUsXG4gICAgICB0aGlzLmFwcGx5Q29uZmlnKG92ZXJyaWRlKVxuICAgICk7XG4gIH1cbiAgLyoqIHNob3cgd2FybmluZyB0b2FzdCAqL1xuICB3YXJuaW5nKFxuICAgIG1lc3NhZ2U/OiBzdHJpbmcsXG4gICAgdGl0bGU/OiBzdHJpbmcsXG4gICAgb3ZlcnJpZGU6IFBhcnRpYWw8SW5kaXZpZHVhbENvbmZpZz4gPSB7fVxuICApIHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy50b2FzdHJDb25maWcuaWNvbkNsYXNzZXMud2FybmluZyB8fCAnJztcbiAgICByZXR1cm4gdGhpcy5fcHJlQnVpbGROb3RpZmljYXRpb24oXG4gICAgICB0eXBlLFxuICAgICAgbWVzc2FnZSxcbiAgICAgIHRpdGxlLFxuICAgICAgdGhpcy5hcHBseUNvbmZpZyhvdmVycmlkZSlcbiAgICApO1xuICB9XG4gIC8qKlxuICAgKiBSZW1vdmUgYWxsIG9yIGEgc2luZ2xlIHRvYXN0IGJ5IGlkXG4gICAqL1xuICBjbGVhcih0b2FzdElkPzogbnVtYmVyKSB7XG4gICAgLy8gQ2FsbCBldmVyeSB0b2FzdFJlZiBtYW51YWxDbG9zZSBmdW5jdGlvblxuICAgIGZvciAoY29uc3QgdG9hc3Qgb2YgdGhpcy50b2FzdHMpIHtcbiAgICAgIGlmICh0b2FzdElkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHRvYXN0LnRvYXN0SWQgPT09IHRvYXN0SWQpIHtcbiAgICAgICAgICB0b2FzdC50b2FzdFJlZi5tYW51YWxDbG9zZSgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9hc3QudG9hc3RSZWYubWFudWFsQ2xvc2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFJlbW92ZSBhbmQgZGVzdHJveSBhIHNpbmdsZSB0b2FzdCBieSBpZFxuICAgKi9cbiAgcmVtb3ZlKHRvYXN0SWQ6IG51bWJlcikge1xuICAgIGNvbnN0IGZvdW5kID0gdGhpcy5fZmluZFRvYXN0KHRvYXN0SWQpO1xuICAgIGlmICghZm91bmQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm91bmQuYWN0aXZlVG9hc3QudG9hc3RSZWYuY2xvc2UoKTtcbiAgICB0aGlzLnRvYXN0cy5zcGxpY2UoZm91bmQuaW5kZXgsIDEpO1xuICAgIHRoaXMuY3VycmVudGx5QWN0aXZlID0gdGhpcy5jdXJyZW50bHlBY3RpdmUgLSAxO1xuICAgIGlmICghdGhpcy50b2FzdHJDb25maWcubWF4T3BlbmVkIHx8ICF0aGlzLnRvYXN0cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgdGhpcy5jdXJyZW50bHlBY3RpdmUgPCB0aGlzLnRvYXN0ckNvbmZpZy5tYXhPcGVuZWQgJiZcbiAgICAgIHRoaXMudG9hc3RzW3RoaXMuY3VycmVudGx5QWN0aXZlXVxuICAgICkge1xuICAgICAgY29uc3QgcCA9IHRoaXMudG9hc3RzW3RoaXMuY3VycmVudGx5QWN0aXZlXS50b2FzdFJlZjtcbiAgICAgIGlmICghcC5pc0luYWN0aXZlKCkpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50bHlBY3RpdmUgPSB0aGlzLmN1cnJlbnRseUFjdGl2ZSArIDE7XG4gICAgICAgIHAuYWN0aXZhdGUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBpZiB0b2FzdCBtZXNzYWdlIGlzIGFscmVhZHkgc2hvd25cbiAgICovXG4gIGZpbmREdXBsaWNhdGUobWVzc2FnZTogc3RyaW5nLCByZXNldE9uRHVwbGljYXRlOiBib29sZWFuLCBjb3VudER1cGxpY2F0ZXM6IGJvb2xlYW4pIHtcbiAgICBmb3IgKGNvbnN0IHRvYXN0IG9mIHRoaXMudG9hc3RzKSB7XG4gICAgICBpZiAodG9hc3QubWVzc2FnZSA9PT0gbWVzc2FnZSkge1xuICAgICAgICB0b2FzdC50b2FzdFJlZi5vbkR1cGxpY2F0ZShyZXNldE9uRHVwbGljYXRlLCBjb3VudER1cGxpY2F0ZXMpO1xuICAgICAgICByZXR1cm4gdG9hc3Q7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqIGNyZWF0ZSBhIGNsb25lIG9mIGdsb2JhbCBjb25maWcgYW5kIGFwcGx5IGluZGl2aWR1YWwgc2V0dGluZ3MgKi9cbiAgcHJpdmF0ZSBhcHBseUNvbmZpZyhvdmVycmlkZTogUGFydGlhbDxJbmRpdmlkdWFsQ29uZmlnPiA9IHt9KTogR2xvYmFsQ29uZmlnIHtcbiAgICByZXR1cm4geyAuLi50aGlzLnRvYXN0ckNvbmZpZywgLi4ub3ZlcnJpZGUgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRvYXN0IG9iamVjdCBieSBpZFxuICAgKi9cbiAgcHJpdmF0ZSBfZmluZFRvYXN0KFxuICAgIHRvYXN0SWQ6IG51bWJlclxuICApOiB7IGluZGV4OiBudW1iZXI7IGFjdGl2ZVRvYXN0OiBBY3RpdmVUb2FzdDxhbnk+IH0gfCBudWxsIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudG9hc3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy50b2FzdHNbaV0udG9hc3RJZCA9PT0gdG9hc3RJZCkge1xuICAgICAgICByZXR1cm4geyBpbmRleDogaSwgYWN0aXZlVG9hc3Q6IHRoaXMudG9hc3RzW2ldIH07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgdGhlIG5lZWQgdG8gcnVuIGluc2lkZSBhbmd1bGFyJ3Mgem9uZSB0aGVuIGJ1aWxkcyB0aGUgdG9hc3RcbiAgICovXG4gIHByaXZhdGUgX3ByZUJ1aWxkTm90aWZpY2F0aW9uKFxuICAgIHRvYXN0VHlwZTogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICB0aXRsZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIGNvbmZpZzogR2xvYmFsQ29uZmlnXG4gICk6IEFjdGl2ZVRvYXN0PGFueT4gfCBudWxsIHtcbiAgICBpZiAoY29uZmlnLm9uQWN0aXZhdGVUaWNrKSB7XG4gICAgICByZXR1cm4gdGhpcy5uZ1pvbmUucnVuKCgpID0+XG4gICAgICAgIHRoaXMuX2J1aWxkTm90aWZpY2F0aW9uKHRvYXN0VHlwZSwgbWVzc2FnZSwgdGl0bGUsIGNvbmZpZylcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9idWlsZE5vdGlmaWNhdGlvbih0b2FzdFR5cGUsIG1lc3NhZ2UsIHRpdGxlLCBjb25maWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW5kIGF0dGFjaGVzIHRvYXN0IGRhdGEgdG8gY29tcG9uZW50XG4gICAqIHJldHVybnMgdGhlIGFjdGl2ZSB0b2FzdCwgb3IgaW4gY2FzZSBwcmV2ZW50RHVwbGljYXRlcyBpcyBlbmFibGVkIHRoZSBvcmlnaW5hbC9ub24tZHVwbGljYXRlIGFjdGl2ZSB0b2FzdC5cbiAgICovXG4gIHByaXZhdGUgX2J1aWxkTm90aWZpY2F0aW9uKFxuICAgIHRvYXN0VHlwZTogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICB0aXRsZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIGNvbmZpZzogR2xvYmFsQ29uZmlnXG4gICk6IEFjdGl2ZVRvYXN0PGFueT4gfCBudWxsIHtcbiAgICBpZiAoIWNvbmZpZy50b2FzdENvbXBvbmVudCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd0b2FzdENvbXBvbmVudCByZXF1aXJlZCcpO1xuICAgIH1cbiAgICAvLyBtYXggb3BlbmVkIGFuZCBhdXRvIGRpc21pc3MgPSB0cnVlXG4gICAgLy8gaWYgdGltZW91dCA9IDAgcmVzZXR0aW5nIGl0IHdvdWxkIHJlc3VsdCBpbiBzZXR0aW5nIHRoaXMuaGlkZVRpbWUgPSBEYXRlLm5vdygpLiBIZW5jZSwgd2Ugb25seSB3YW50IHRvIHJlc2V0IHRpbWVvdXQgaWYgdGhlcmUgaXNcbiAgICAvLyBhIHRpbWVvdXQgYXQgYWxsXG4gICAgY29uc3QgZHVwbGljYXRlID0gdGhpcy5maW5kRHVwbGljYXRlKFxuICAgICAgbWVzc2FnZSxcbiAgICAgIHRoaXMudG9hc3RyQ29uZmlnLnJlc2V0VGltZW91dE9uRHVwbGljYXRlICYmIGNvbmZpZy50aW1lT3V0ID4gMCxcbiAgICAgIHRoaXMudG9hc3RyQ29uZmlnLmNvdW50RHVwbGljYXRlc1xuICAgICk7XG4gICAgaWYgKG1lc3NhZ2UgJiYgdGhpcy50b2FzdHJDb25maWcucHJldmVudER1cGxpY2F0ZXMgJiYgZHVwbGljYXRlICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZHVwbGljYXRlO1xuICAgIH1cblxuICAgIHRoaXMucHJldmlvdXNUb2FzdE1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIGxldCBrZWVwSW5hY3RpdmUgPSBmYWxzZTtcbiAgICBpZiAoXG4gICAgICB0aGlzLnRvYXN0ckNvbmZpZy5tYXhPcGVuZWQgJiZcbiAgICAgIHRoaXMuY3VycmVudGx5QWN0aXZlID49IHRoaXMudG9hc3RyQ29uZmlnLm1heE9wZW5lZFxuICAgICkge1xuICAgICAga2VlcEluYWN0aXZlID0gdHJ1ZTtcbiAgICAgIGlmICh0aGlzLnRvYXN0ckNvbmZpZy5hdXRvRGlzbWlzcykge1xuICAgICAgICB0aGlzLmNsZWFyKHRoaXMudG9hc3RzWzBdLnRvYXN0SWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IG92ZXJsYXlSZWYgPSB0aGlzLm92ZXJsYXkuY3JlYXRlKFxuICAgICAgY29uZmlnLnBvc2l0aW9uQ2xhc3MsXG4gICAgICB0aGlzLm92ZXJsYXlDb250YWluZXJcbiAgICApO1xuICAgIHRoaXMuaW5kZXggPSB0aGlzLmluZGV4ICsgMTtcbiAgICBsZXQgc2FuaXRpemVkTWVzc2FnZTogc3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbCA9IG1lc3NhZ2U7XG4gICAgaWYgKG1lc3NhZ2UgJiYgY29uZmlnLmVuYWJsZUh0bWwpIHtcbiAgICAgIHNhbml0aXplZE1lc3NhZ2UgPSB0aGlzLnNhbml0aXplci5zYW5pdGl6ZShTZWN1cml0eUNvbnRleHQuSFRNTCwgbWVzc2FnZSk7XG4gICAgfVxuXG4gICAgY29uc3QgdG9hc3RSZWYgPSBuZXcgVG9hc3RSZWYob3ZlcmxheVJlZik7XG4gICAgY29uc3QgdG9hc3RQYWNrYWdlID0gbmV3IFRvYXN0UGFja2FnZShcbiAgICAgIHRoaXMuaW5kZXgsXG4gICAgICBjb25maWcsXG4gICAgICBzYW5pdGl6ZWRNZXNzYWdlLFxuICAgICAgdGl0bGUsXG4gICAgICB0b2FzdFR5cGUsXG4gICAgICB0b2FzdFJlZlxuICAgICk7XG4gICAgY29uc3QgdG9hc3RJbmplY3RvciA9IG5ldyBUb2FzdEluamVjdG9yKHRvYXN0UGFja2FnZSwgdGhpcy5faW5qZWN0b3IpO1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IG5ldyBDb21wb25lbnRQb3J0YWwoY29uZmlnLnRvYXN0Q29tcG9uZW50LCB0b2FzdEluamVjdG9yKTtcbiAgICBjb25zdCBwb3J0YWwgPSBvdmVybGF5UmVmLmF0dGFjaChjb21wb25lbnQsIHRoaXMudG9hc3RyQ29uZmlnLm5ld2VzdE9uVG9wKTtcbiAgICB0b2FzdFJlZi5jb21wb25lbnRJbnN0YW5jZSA9IHBvcnRhbC5pbnN0YW5jZTtcbiAgICBjb25zdCBpbnM6IEFjdGl2ZVRvYXN0PGFueT4gPSB7XG4gICAgICB0b2FzdElkOiB0aGlzLmluZGV4LFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSB8fCAnJyxcbiAgICAgIHRvYXN0UmVmLFxuICAgICAgb25TaG93bjogdG9hc3RSZWYuYWZ0ZXJBY3RpdmF0ZSgpLFxuICAgICAgb25IaWRkZW46IHRvYXN0UmVmLmFmdGVyQ2xvc2VkKCksXG4gICAgICBvblRhcDogdG9hc3RQYWNrYWdlLm9uVGFwKCksXG4gICAgICBvbkFjdGlvbjogdG9hc3RQYWNrYWdlLm9uQWN0aW9uKCksXG4gICAgICBwb3J0YWxcbiAgICB9O1xuXG4gICAgaWYgKCFrZWVwSW5hY3RpdmUpIHtcbiAgICAgIHRoaXMuY3VycmVudGx5QWN0aXZlID0gdGhpcy5jdXJyZW50bHlBY3RpdmUgKyAxO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlucy50b2FzdFJlZi5hY3RpdmF0ZSgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy50b2FzdHMucHVzaChpbnMpO1xuICAgIHJldHVybiBpbnM7XG4gIH1cbn1cbiJdfQ==