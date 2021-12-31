import { Subject } from 'rxjs';
var DynamicDialogRef = /** @class */ (function () {
    function DynamicDialogRef() {
        this._onClose = new Subject();
        this.onClose = this._onClose.asObservable();
        this._onDestroy = new Subject();
        this.onDestroy = this._onDestroy.asObservable();
    }
    DynamicDialogRef.prototype.close = function (result) {
        this._onClose.next(result);
    };
    DynamicDialogRef.prototype.destroy = function () {
        this._onDestroy.next();
    };
    return DynamicDialogRef;
}());
export { DynamicDialogRef };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pY2RpYWxvZy1yZWYuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2R5bmFtaWNkaWFsb2cvIiwic291cmNlcyI6WyJkeW5hbWljZGlhbG9nLXJlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNDO0lBQ0M7UUFVaUIsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7UUFDNUMsWUFBTyxHQUFvQixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXZDLGVBQVUsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBQ3BELGNBQVMsR0FBb0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQWQ1QyxDQUFDO0lBRWpCLGdDQUFLLEdBQUwsVUFBTSxNQUFZO1FBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxrQ0FBTyxHQUFQO1FBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBT0YsdUJBQUM7QUFBRCxDQUFDLEFBaEJELElBZ0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIER5bmFtaWNEaWFsb2dSZWYge1xyXG5cdGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG5cdGNsb3NlKHJlc3VsdD86IGFueSkge1xyXG5cdFx0dGhpcy5fb25DbG9zZS5uZXh0KHJlc3VsdCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGRlc3Ryb3koKSB7XHJcblx0XHR0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSByZWFkb25seSBfb25DbG9zZSA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuICAgIG9uQ2xvc2U6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuX29uQ2xvc2UuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG5cdG9uRGVzdHJveTogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5fb25EZXN0cm95LmFzT2JzZXJ2YWJsZSgpO1xyXG59XHJcbiJdfQ==