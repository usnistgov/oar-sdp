import * as tslib_1 from "tslib";
import { Inject, Injectable, Injector, NgZone, SecurityContext } from '@angular/core';
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
        this.toastrConfig = tslib_1.__assign({}, token.default, token.config);
        if (token.config.iconClasses) {
            this.toastrConfig.iconClasses = tslib_1.__assign({}, token.default.iconClasses, token.config.iconClasses);
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
            for (var _b = tslib_1.__values(this.toasts), _c = _b.next(); !_c.done; _c = _b.next()) {
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
        for (var i = 0; i < this.toasts.length; i++) {
            var toast = this.toasts[i];
            if (toast.message === message) {
                toast.toastRef.onDuplicate(resetOnDuplicate, countDuplicates);
                return toast;
            }
        }
        return null;
    };
    /** create a clone of global config and apply individual settings */
    ToastrService.prototype.applyConfig = function (override) {
        if (override === void 0) { override = {}; }
        return tslib_1.__assign({}, this.toastrConfig, override);
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
        var _this = this;
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
        toastRef.componentInstance = portal._component;
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
            setTimeout(function () {
                ins.toastRef.activate();
                _this.currentlyActive = _this.currentlyActive + 1;
            });
        }
        this.toasts.push(ins);
        return ins;
    };
    ToastrService.ngInjectableDef = i0.defineInjectable({ factory: function ToastrService_Factory() { return new ToastrService(i0.inject(i1.TOAST_CONFIG), i0.inject(i2.Overlay), i0.inject(i0.INJECTOR), i0.inject(i3.DomSanitizer), i0.inject(i0.NgZone)); }, token: ToastrService, providedIn: "root" });
    ToastrService = tslib_1.__decorate([
        Injectable({ providedIn: 'root' }),
        tslib_1.__param(0, Inject(TOAST_CONFIG)),
        tslib_1.__metadata("design:paramtypes", [Object, Overlay,
            Injector,
            DomSanitizer,
            NgZone])
    ], ToastrService);
    return ToastrService;
}());
export { ToastrService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3RyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdG9hc3RyLyIsInNvdXJjZXMiOlsidG9hc3RyL3RvYXN0ci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBRUwsTUFBTSxFQUNOLFVBQVUsRUFDVixRQUFRLEVBQ1IsTUFBTSxFQUNOLGVBQWUsRUFDaEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBSW5FLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUUzRCxPQUFPLEVBQWtDLFlBQVksRUFBYyxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7QUFzQnpHO0lBUUUsdUJBQ3dCLEtBQWlCLEVBQy9CLE9BQWdCLEVBQ2hCLFNBQW1CLEVBQ25CLFNBQXVCLEVBQ3ZCLE1BQWM7UUFIZCxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFDbkIsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUN2QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBWHhCLG9CQUFlLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLFdBQU0sR0FBdUIsRUFBRSxDQUFDO1FBR3hCLFVBQUssR0FBRyxDQUFDLENBQUM7UUFTaEIsSUFBSSxDQUFDLFlBQVksd0JBQ1osS0FBSyxDQUFDLE9BQU8sRUFDYixLQUFLLENBQUMsTUFBTSxDQUNoQixDQUFDO1FBQ0YsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRTtZQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsd0JBQ3hCLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUN6QixLQUFLLENB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M0IsUUFBUSxFQUFFLFlBQVksQ0FBQyxRQUFRLEVBQUU7WUFDakMsTUFBTSxRQUFBO1NBQ1AsQ0FBQztRQUVGLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDakIsVUFBVSxDQUFDO2dCQUNULEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3hCLEtBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQzs7SUE3UVUsYUFBYTtRQUR6QixVQUFVLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUM7UUFVOUIsbUJBQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFBO3lEQUNKLE9BQU87WUFDTCxRQUFRO1lBQ1IsWUFBWTtZQUNmLE1BQU07T0FiYixhQUFhLENBOFF6Qjt3QkFwVEQ7Q0FvVEMsQUE5UUQsSUE4UUM7U0E5UVksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudFJlZixcbiAgSW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBJbmplY3RvcixcbiAgTmdab25lLFxuICBTZWN1cml0eUNvbnRleHRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVIdG1sIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgT3ZlcmxheSB9IGZyb20gJy4uL292ZXJsYXkvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICcuLi9wb3J0YWwvcG9ydGFsJztcbmltcG9ydCB7IFRvYXN0SW5qZWN0b3IsIFRvYXN0UmVmIH0gZnJvbSAnLi90b2FzdC1pbmplY3Rvcic7XG5pbXBvcnQgeyBUb2FzdENvbnRhaW5lckRpcmVjdGl2ZSB9IGZyb20gJy4vdG9hc3QuZGlyZWN0aXZlJztcbmltcG9ydCB7IEdsb2JhbENvbmZpZywgSW5kaXZpZHVhbENvbmZpZywgVG9hc3RQYWNrYWdlLCBUb2FzdFRva2VuLCBUT0FTVF9DT05GSUcgfSBmcm9tICcuL3RvYXN0ci1jb25maWcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFjdGl2ZVRvYXN0PEM+IHtcbiAgLyoqIFlvdXIgVG9hc3QgSUQuIFVzZSB0aGlzIHRvIGNsb3NlIGl0IGluZGl2aWR1YWxseSAqL1xuICB0b2FzdElkOiBudW1iZXI7XG4gIC8qKiB0aGUgbWVzc2FnZSBvZiB5b3VyIHRvYXN0LiBTdG9yZWQgdG8gcHJldmVudCBkdXBsaWNhdGVzICovXG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgLyoqIGEgcmVmZXJlbmNlIHRvIHRoZSBjb21wb25lbnQgc2VlIHBvcnRhbC50cyAqL1xuICBwb3J0YWw6IENvbXBvbmVudFJlZjxDPjtcbiAgLyoqIGEgcmVmZXJlbmNlIHRvIHlvdXIgdG9hc3QgKi9cbiAgdG9hc3RSZWY6IFRvYXN0UmVmPEM+O1xuICAvKiogdHJpZ2dlcmVkIHdoZW4gdG9hc3QgaXMgYWN0aXZlICovXG4gIG9uU2hvd246IE9ic2VydmFibGU8YW55PjtcbiAgLyoqIHRyaWdnZXJlZCB3aGVuIHRvYXN0IGlzIGRlc3Ryb3llZCAqL1xuICBvbkhpZGRlbjogT2JzZXJ2YWJsZTxhbnk+O1xuICAvKiogdHJpZ2dlcmVkIG9uIHRvYXN0IGNsaWNrICovXG4gIG9uVGFwOiBPYnNlcnZhYmxlPGFueT47XG4gIC8qKiBhdmFpbGFibGUgZm9yIHlvdXIgdXNlIGluIGN1c3RvbSB0b2FzdCAqL1xuICBvbkFjdGlvbjogT2JzZXJ2YWJsZTxhbnk+O1xufVxuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFRvYXN0clNlcnZpY2Uge1xuICB0b2FzdHJDb25maWc6IEdsb2JhbENvbmZpZztcbiAgY3VycmVudGx5QWN0aXZlID0gMDtcbiAgdG9hc3RzOiBBY3RpdmVUb2FzdDxhbnk+W10gPSBbXTtcbiAgb3ZlcmxheUNvbnRhaW5lcjogVG9hc3RDb250YWluZXJEaXJlY3RpdmU7XG4gIHByZXZpb3VzVG9hc3RNZXNzYWdlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgaW5kZXggPSAwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoVE9BU1RfQ09ORklHKSB0b2tlbjogVG9hc3RUb2tlbixcbiAgICBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZVxuICApIHtcbiAgICB0aGlzLnRvYXN0ckNvbmZpZyA9IHtcbiAgICAgIC4uLnRva2VuLmRlZmF1bHQsXG4gICAgICAuLi50b2tlbi5jb25maWcsXG4gICAgfTtcbiAgICBpZiAodG9rZW4uY29uZmlnLmljb25DbGFzc2VzKSB7XG4gICAgICB0aGlzLnRvYXN0ckNvbmZpZy5pY29uQ2xhc3NlcyA9IHtcbiAgICAgICAgLi4udG9rZW4uZGVmYXVsdC5pY29uQ2xhc3NlcyxcbiAgICAgICAgLi4udG9rZW4uY29uZmlnLmljb25DbGFzc2VzLFxuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgLyoqIHNob3cgdG9hc3QgKi9cbiAgc2hvdyhcbiAgICBtZXNzYWdlPzogc3RyaW5nLFxuICAgIHRpdGxlPzogc3RyaW5nLFxuICAgIG92ZXJyaWRlOiBQYXJ0aWFsPEluZGl2aWR1YWxDb25maWc+ID0ge30sXG4gICAgdHlwZSA9ICcnXG4gICkge1xuICAgIHJldHVybiB0aGlzLl9wcmVCdWlsZE5vdGlmaWNhdGlvbihcbiAgICAgIHR5cGUsXG4gICAgICBtZXNzYWdlLFxuICAgICAgdGl0bGUsXG4gICAgICB0aGlzLmFwcGx5Q29uZmlnKG92ZXJyaWRlKVxuICAgICk7XG4gIH1cbiAgLyoqIHNob3cgc3VjY2Vzc2Z1bCB0b2FzdCAqL1xuICBzdWNjZXNzKFxuICAgIG1lc3NhZ2U/OiBzdHJpbmcsXG4gICAgdGl0bGU/OiBzdHJpbmcsXG4gICAgb3ZlcnJpZGU6IFBhcnRpYWw8SW5kaXZpZHVhbENvbmZpZz4gPSB7fVxuICApIHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy50b2FzdHJDb25maWcuaWNvbkNsYXNzZXMuc3VjY2VzcyB8fCAnJztcbiAgICByZXR1cm4gdGhpcy5fcHJlQnVpbGROb3RpZmljYXRpb24oXG4gICAgICB0eXBlLFxuICAgICAgbWVzc2FnZSxcbiAgICAgIHRpdGxlLFxuICAgICAgdGhpcy5hcHBseUNvbmZpZyhvdmVycmlkZSlcbiAgICApO1xuICB9XG4gIC8qKiBzaG93IGVycm9yIHRvYXN0ICovXG4gIGVycm9yKFxuICAgIG1lc3NhZ2U/OiBzdHJpbmcsXG4gICAgdGl0bGU/OiBzdHJpbmcsXG4gICAgb3ZlcnJpZGU6IFBhcnRpYWw8SW5kaXZpZHVhbENvbmZpZz4gPSB7fVxuICApIHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy50b2FzdHJDb25maWcuaWNvbkNsYXNzZXMuZXJyb3IgfHwgJyc7XG4gICAgcmV0dXJuIHRoaXMuX3ByZUJ1aWxkTm90aWZpY2F0aW9uKFxuICAgICAgdHlwZSxcbiAgICAgIG1lc3NhZ2UsXG4gICAgICB0aXRsZSxcbiAgICAgIHRoaXMuYXBwbHlDb25maWcob3ZlcnJpZGUpXG4gICAgKTtcbiAgfVxuICAvKiogc2hvdyBpbmZvIHRvYXN0ICovXG4gIGluZm8oXG4gICAgbWVzc2FnZT86IHN0cmluZyxcbiAgICB0aXRsZT86IHN0cmluZyxcbiAgICBvdmVycmlkZTogUGFydGlhbDxJbmRpdmlkdWFsQ29uZmlnPiA9IHt9XG4gICkge1xuICAgIGNvbnN0IHR5cGUgPSB0aGlzLnRvYXN0ckNvbmZpZy5pY29uQ2xhc3Nlcy5pbmZvIHx8ICcnO1xuICAgIHJldHVybiB0aGlzLl9wcmVCdWlsZE5vdGlmaWNhdGlvbihcbiAgICAgIHR5cGUsXG4gICAgICBtZXNzYWdlLFxuICAgICAgdGl0bGUsXG4gICAgICB0aGlzLmFwcGx5Q29uZmlnKG92ZXJyaWRlKVxuICAgICk7XG4gIH1cbiAgLyoqIHNob3cgd2FybmluZyB0b2FzdCAqL1xuICB3YXJuaW5nKFxuICAgIG1lc3NhZ2U/OiBzdHJpbmcsXG4gICAgdGl0bGU/OiBzdHJpbmcsXG4gICAgb3ZlcnJpZGU6IFBhcnRpYWw8SW5kaXZpZHVhbENvbmZpZz4gPSB7fVxuICApIHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy50b2FzdHJDb25maWcuaWNvbkNsYXNzZXMud2FybmluZyB8fCAnJztcbiAgICByZXR1cm4gdGhpcy5fcHJlQnVpbGROb3RpZmljYXRpb24oXG4gICAgICB0eXBlLFxuICAgICAgbWVzc2FnZSxcbiAgICAgIHRpdGxlLFxuICAgICAgdGhpcy5hcHBseUNvbmZpZyhvdmVycmlkZSlcbiAgICApO1xuICB9XG4gIC8qKlxuICAgKiBSZW1vdmUgYWxsIG9yIGEgc2luZ2xlIHRvYXN0IGJ5IGlkXG4gICAqL1xuICBjbGVhcih0b2FzdElkPzogbnVtYmVyKSB7XG4gICAgLy8gQ2FsbCBldmVyeSB0b2FzdFJlZiBtYW51YWxDbG9zZSBmdW5jdGlvblxuICAgIGZvciAoY29uc3QgdG9hc3Qgb2YgdGhpcy50b2FzdHMpIHtcbiAgICAgIGlmICh0b2FzdElkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHRvYXN0LnRvYXN0SWQgPT09IHRvYXN0SWQpIHtcbiAgICAgICAgICB0b2FzdC50b2FzdFJlZi5tYW51YWxDbG9zZSgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9hc3QudG9hc3RSZWYubWFudWFsQ2xvc2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFJlbW92ZSBhbmQgZGVzdHJveSBhIHNpbmdsZSB0b2FzdCBieSBpZFxuICAgKi9cbiAgcmVtb3ZlKHRvYXN0SWQ6IG51bWJlcikge1xuICAgIGNvbnN0IGZvdW5kID0gdGhpcy5fZmluZFRvYXN0KHRvYXN0SWQpO1xuICAgIGlmICghZm91bmQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm91bmQuYWN0aXZlVG9hc3QudG9hc3RSZWYuY2xvc2UoKTtcbiAgICB0aGlzLnRvYXN0cy5zcGxpY2UoZm91bmQuaW5kZXgsIDEpO1xuICAgIHRoaXMuY3VycmVudGx5QWN0aXZlID0gdGhpcy5jdXJyZW50bHlBY3RpdmUgLSAxO1xuICAgIGlmICghdGhpcy50b2FzdHJDb25maWcubWF4T3BlbmVkIHx8ICF0aGlzLnRvYXN0cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgdGhpcy5jdXJyZW50bHlBY3RpdmUgPCB0aGlzLnRvYXN0ckNvbmZpZy5tYXhPcGVuZWQgJiZcbiAgICAgIHRoaXMudG9hc3RzW3RoaXMuY3VycmVudGx5QWN0aXZlXVxuICAgICkge1xuICAgICAgY29uc3QgcCA9IHRoaXMudG9hc3RzW3RoaXMuY3VycmVudGx5QWN0aXZlXS50b2FzdFJlZjtcbiAgICAgIGlmICghcC5pc0luYWN0aXZlKCkpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50bHlBY3RpdmUgPSB0aGlzLmN1cnJlbnRseUFjdGl2ZSArIDE7XG4gICAgICAgIHAuYWN0aXZhdGUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBpZiB0b2FzdCBtZXNzYWdlIGlzIGFscmVhZHkgc2hvd25cbiAgICovXG4gIGZpbmREdXBsaWNhdGUobWVzc2FnZTogc3RyaW5nLCByZXNldE9uRHVwbGljYXRlOiBib29sZWFuLCBjb3VudER1cGxpY2F0ZXM6IGJvb2xlYW4pIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudG9hc3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB0b2FzdCA9IHRoaXMudG9hc3RzW2ldO1xuICAgICAgaWYgKHRvYXN0Lm1lc3NhZ2UgPT09IG1lc3NhZ2UpIHtcbiAgICAgICAgdG9hc3QudG9hc3RSZWYub25EdXBsaWNhdGUocmVzZXRPbkR1cGxpY2F0ZSwgY291bnREdXBsaWNhdGVzKTtcbiAgICAgICAgcmV0dXJuIHRvYXN0O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKiBjcmVhdGUgYSBjbG9uZSBvZiBnbG9iYWwgY29uZmlnIGFuZCBhcHBseSBpbmRpdmlkdWFsIHNldHRpbmdzICovXG4gIHByaXZhdGUgYXBwbHlDb25maWcob3ZlcnJpZGU6IFBhcnRpYWw8SW5kaXZpZHVhbENvbmZpZz4gPSB7fSk6IEdsb2JhbENvbmZpZyB7XG4gICAgcmV0dXJuIHsgLi4udGhpcy50b2FzdHJDb25maWcsIC4uLm92ZXJyaWRlIH07XG4gIH1cblxuICAvKipcbiAgICogRmluZCB0b2FzdCBvYmplY3QgYnkgaWRcbiAgICovXG4gIHByaXZhdGUgX2ZpbmRUb2FzdChcbiAgICB0b2FzdElkOiBudW1iZXJcbiAgKTogeyBpbmRleDogbnVtYmVyOyBhY3RpdmVUb2FzdDogQWN0aXZlVG9hc3Q8YW55PiB9IHwgbnVsbCB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRvYXN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMudG9hc3RzW2ldLnRvYXN0SWQgPT09IHRvYXN0SWQpIHtcbiAgICAgICAgcmV0dXJuIHsgaW5kZXg6IGksIGFjdGl2ZVRvYXN0OiB0aGlzLnRvYXN0c1tpXSB9O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHRoZSBuZWVkIHRvIHJ1biBpbnNpZGUgYW5ndWxhcidzIHpvbmUgdGhlbiBidWlsZHMgdGhlIHRvYXN0XG4gICAqL1xuICBwcml2YXRlIF9wcmVCdWlsZE5vdGlmaWNhdGlvbihcbiAgICB0b2FzdFR5cGU6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgdGl0bGU6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICBjb25maWc6IEdsb2JhbENvbmZpZ1xuICApOiBBY3RpdmVUb2FzdDxhbnk+IHwgbnVsbCB7XG4gICAgaWYgKGNvbmZpZy5vbkFjdGl2YXRlVGljaykge1xuICAgICAgcmV0dXJuIHRoaXMubmdab25lLnJ1bigoKSA9PlxuICAgICAgICB0aGlzLl9idWlsZE5vdGlmaWNhdGlvbih0b2FzdFR5cGUsIG1lc3NhZ2UsIHRpdGxlLCBjb25maWcpXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fYnVpbGROb3RpZmljYXRpb24odG9hc3RUeXBlLCBtZXNzYWdlLCB0aXRsZSwgY29uZmlnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuZCBhdHRhY2hlcyB0b2FzdCBkYXRhIHRvIGNvbXBvbmVudFxuICAgKiByZXR1cm5zIHRoZSBhY3RpdmUgdG9hc3QsIG9yIGluIGNhc2UgcHJldmVudER1cGxpY2F0ZXMgaXMgZW5hYmxlZCB0aGUgb3JpZ2luYWwvbm9uLWR1cGxpY2F0ZSBhY3RpdmUgdG9hc3QuXG4gICAqL1xuICBwcml2YXRlIF9idWlsZE5vdGlmaWNhdGlvbihcbiAgICB0b2FzdFR5cGU6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgdGl0bGU6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICBjb25maWc6IEdsb2JhbENvbmZpZ1xuICApOiBBY3RpdmVUb2FzdDxhbnk+IHwgbnVsbCB7XG4gICAgaWYgKCFjb25maWcudG9hc3RDb21wb25lbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigndG9hc3RDb21wb25lbnQgcmVxdWlyZWQnKTtcbiAgICB9XG4gICAgLy8gbWF4IG9wZW5lZCBhbmQgYXV0byBkaXNtaXNzID0gdHJ1ZVxuICAgIC8vIGlmIHRpbWVvdXQgPSAwIHJlc2V0dGluZyBpdCB3b3VsZCByZXN1bHQgaW4gc2V0dGluZyB0aGlzLmhpZGVUaW1lID0gRGF0ZS5ub3coKS4gSGVuY2UsIHdlIG9ubHkgd2FudCB0byByZXNldCB0aW1lb3V0IGlmIHRoZXJlIGlzXG4gICAgLy8gYSB0aW1lb3V0IGF0IGFsbFxuICAgIGNvbnN0IGR1cGxpY2F0ZSA9IHRoaXMuZmluZER1cGxpY2F0ZShcbiAgICAgIG1lc3NhZ2UsXG4gICAgICB0aGlzLnRvYXN0ckNvbmZpZy5yZXNldFRpbWVvdXRPbkR1cGxpY2F0ZSAmJiBjb25maWcudGltZU91dCA+IDAsXG4gICAgICB0aGlzLnRvYXN0ckNvbmZpZy5jb3VudER1cGxpY2F0ZXNcbiAgICApO1xuICAgIGlmIChtZXNzYWdlICYmIHRoaXMudG9hc3RyQ29uZmlnLnByZXZlbnREdXBsaWNhdGVzICYmIGR1cGxpY2F0ZSAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGR1cGxpY2F0ZTtcbiAgICB9XG5cbiAgICB0aGlzLnByZXZpb3VzVG9hc3RNZXNzYWdlID0gbWVzc2FnZTtcbiAgICBsZXQga2VlcEluYWN0aXZlID0gZmFsc2U7XG4gICAgaWYgKFxuICAgICAgdGhpcy50b2FzdHJDb25maWcubWF4T3BlbmVkICYmXG4gICAgICB0aGlzLmN1cnJlbnRseUFjdGl2ZSA+PSB0aGlzLnRvYXN0ckNvbmZpZy5tYXhPcGVuZWRcbiAgICApIHtcbiAgICAgIGtlZXBJbmFjdGl2ZSA9IHRydWU7XG4gICAgICBpZiAodGhpcy50b2FzdHJDb25maWcuYXV0b0Rpc21pc3MpIHtcbiAgICAgICAgdGhpcy5jbGVhcih0aGlzLnRvYXN0c1swXS50b2FzdElkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBvdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZShcbiAgICAgIGNvbmZpZy5wb3NpdGlvbkNsYXNzLFxuICAgICAgdGhpcy5vdmVybGF5Q29udGFpbmVyXG4gICAgKTtcbiAgICB0aGlzLmluZGV4ID0gdGhpcy5pbmRleCArIDE7XG4gICAgbGV0IHNhbml0aXplZE1lc3NhZ2U6IHN0cmluZyB8IFNhZmVIdG1sIHwgdW5kZWZpbmVkIHwgbnVsbCA9IG1lc3NhZ2U7XG4gICAgaWYgKG1lc3NhZ2UgJiYgY29uZmlnLmVuYWJsZUh0bWwpIHtcbiAgICAgIHNhbml0aXplZE1lc3NhZ2UgPSB0aGlzLnNhbml0aXplci5zYW5pdGl6ZShTZWN1cml0eUNvbnRleHQuSFRNTCwgbWVzc2FnZSk7XG4gICAgfVxuXG4gICAgY29uc3QgdG9hc3RSZWYgPSBuZXcgVG9hc3RSZWYob3ZlcmxheVJlZik7XG4gICAgY29uc3QgdG9hc3RQYWNrYWdlID0gbmV3IFRvYXN0UGFja2FnZShcbiAgICAgIHRoaXMuaW5kZXgsXG4gICAgICBjb25maWcsXG4gICAgICBzYW5pdGl6ZWRNZXNzYWdlLFxuICAgICAgdGl0bGUsXG4gICAgICB0b2FzdFR5cGUsXG4gICAgICB0b2FzdFJlZlxuICAgICk7XG4gICAgY29uc3QgdG9hc3RJbmplY3RvciA9IG5ldyBUb2FzdEluamVjdG9yKHRvYXN0UGFja2FnZSwgdGhpcy5faW5qZWN0b3IpO1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IG5ldyBDb21wb25lbnRQb3J0YWwoY29uZmlnLnRvYXN0Q29tcG9uZW50LCB0b2FzdEluamVjdG9yKTtcbiAgICBjb25zdCBwb3J0YWwgPSBvdmVybGF5UmVmLmF0dGFjaChjb21wb25lbnQsIHRoaXMudG9hc3RyQ29uZmlnLm5ld2VzdE9uVG9wKTtcbiAgICB0b2FzdFJlZi5jb21wb25lbnRJbnN0YW5jZSA9ICg8YW55PnBvcnRhbCkuX2NvbXBvbmVudDtcbiAgICBjb25zdCBpbnM6IEFjdGl2ZVRvYXN0PGFueT4gPSB7XG4gICAgICB0b2FzdElkOiB0aGlzLmluZGV4LFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSB8fCAnJyxcbiAgICAgIHRvYXN0UmVmLFxuICAgICAgb25TaG93bjogdG9hc3RSZWYuYWZ0ZXJBY3RpdmF0ZSgpLFxuICAgICAgb25IaWRkZW46IHRvYXN0UmVmLmFmdGVyQ2xvc2VkKCksXG4gICAgICBvblRhcDogdG9hc3RQYWNrYWdlLm9uVGFwKCksXG4gICAgICBvbkFjdGlvbjogdG9hc3RQYWNrYWdlLm9uQWN0aW9uKCksXG4gICAgICBwb3J0YWxcbiAgICB9O1xuXG4gICAgaWYgKCFrZWVwSW5hY3RpdmUpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpbnMudG9hc3RSZWYuYWN0aXZhdGUoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50bHlBY3RpdmUgPSB0aGlzLmN1cnJlbnRseUFjdGl2ZSArIDE7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnRvYXN0cy5wdXNoKGlucyk7XG4gICAgcmV0dXJuIGlucztcbiAgfVxufVxuIl19