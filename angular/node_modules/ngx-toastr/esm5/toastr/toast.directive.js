import { __decorate } from "tslib";
import { Directive, ElementRef, NgModule, } from '@angular/core';
var ToastContainerDirective = /** @class */ (function () {
    function ToastContainerDirective(el) {
        this.el = el;
    }
    ToastContainerDirective.prototype.getContainerElement = function () {
        return this.el.nativeElement;
    };
    ToastContainerDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    ToastContainerDirective = __decorate([
        Directive({
            selector: '[toastContainer]',
            exportAs: 'toastContainer',
        })
    ], ToastContainerDirective);
    return ToastContainerDirective;
}());
export { ToastContainerDirective };
var ToastContainerModule = /** @class */ (function () {
    function ToastContainerModule() {
    }
    ToastContainerModule = __decorate([
        NgModule({
            declarations: [ToastContainerDirective],
            exports: [ToastContainerDirective],
        })
    ], ToastContainerModule);
    return ToastContainerModule;
}());
export { ToastContainerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRvYXN0ci8iLCJzb3VyY2VzIjpbInRvYXN0ci90b2FzdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFFBQVEsR0FDVCxNQUFNLGVBQWUsQ0FBQztBQU12QjtJQUNFLGlDQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtJQUFJLENBQUM7SUFDdkMscURBQW1CLEdBQW5CO1FBQ0UsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQztJQUMvQixDQUFDOztnQkFIdUIsVUFBVTs7SUFEdkIsdUJBQXVCO1FBSm5DLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsUUFBUSxFQUFFLGdCQUFnQjtTQUMzQixDQUFDO09BQ1csdUJBQXVCLENBS25DO0lBQUQsOEJBQUM7Q0FBQSxBQUxELElBS0M7U0FMWSx1QkFBdUI7QUFXcEM7SUFBQTtJQUFtQyxDQUFDO0lBQXZCLG9CQUFvQjtRQUpoQyxRQUFRLENBQUM7WUFDUixZQUFZLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztZQUN2QyxPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztTQUNuQyxDQUFDO09BQ1csb0JBQW9CLENBQUc7SUFBRCwyQkFBQztDQUFBLEFBQXBDLElBQW9DO1NBQXZCLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgTmdNb2R1bGUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdG9hc3RDb250YWluZXJdJyxcbiAgZXhwb3J0QXM6ICd0b2FzdENvbnRhaW5lcicsXG59KVxuZXhwb3J0IGNsYXNzIFRvYXN0Q29udGFpbmVyRGlyZWN0aXZlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikgeyB9XG4gIGdldENvbnRhaW5lckVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbVG9hc3RDb250YWluZXJEaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbVG9hc3RDb250YWluZXJEaXJlY3RpdmVdLFxufSlcbmV4cG9ydCBjbGFzcyBUb2FzdENvbnRhaW5lck1vZHVsZSB7fVxuIl19