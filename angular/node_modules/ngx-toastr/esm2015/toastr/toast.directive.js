import { __decorate } from "tslib";
import { Directive, ElementRef, NgModule, } from '@angular/core';
let ToastContainerDirective = class ToastContainerDirective {
    constructor(el) {
        this.el = el;
    }
    getContainerElement() {
        return this.el.nativeElement;
    }
};
ToastContainerDirective.ctorParameters = () => [
    { type: ElementRef }
];
ToastContainerDirective = __decorate([
    Directive({
        selector: '[toastContainer]',
        exportAs: 'toastContainer',
    })
], ToastContainerDirective);
export { ToastContainerDirective };
let ToastContainerModule = class ToastContainerModule {
};
ToastContainerModule = __decorate([
    NgModule({
        declarations: [ToastContainerDirective],
        exports: [ToastContainerDirective],
    })
], ToastContainerModule);
export { ToastContainerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRvYXN0ci8iLCJzb3VyY2VzIjpbInRvYXN0ci90b2FzdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFFBQVEsR0FDVCxNQUFNLGVBQWUsQ0FBQztBQU12QixJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF1QjtJQUNsQyxZQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtJQUFJLENBQUM7SUFDdkMsbUJBQW1CO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUM7SUFDL0IsQ0FBQztDQUNGLENBQUE7O1lBSnlCLFVBQVU7O0FBRHZCLHVCQUF1QjtJQUpuQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFFBQVEsRUFBRSxnQkFBZ0I7S0FDM0IsQ0FBQztHQUNXLHVCQUF1QixDQUtuQztTQUxZLHVCQUF1QjtBQVdwQyxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtDQUFHLENBQUE7QUFBdkIsb0JBQW9CO0lBSmhDLFFBQVEsQ0FBQztRQUNSLFlBQVksRUFBRSxDQUFDLHVCQUF1QixDQUFDO1FBQ3ZDLE9BQU8sRUFBRSxDQUFDLHVCQUF1QixDQUFDO0tBQ25DLENBQUM7R0FDVyxvQkFBb0IsQ0FBRztTQUF2QixvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIE5nTW9kdWxlLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3RvYXN0Q29udGFpbmVyXScsXG4gIGV4cG9ydEFzOiAndG9hc3RDb250YWluZXInLFxufSlcbmV4cG9ydCBjbGFzcyBUb2FzdENvbnRhaW5lckRpcmVjdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHsgfVxuICBnZXRDb250YWluZXJFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1RvYXN0Q29udGFpbmVyRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW1RvYXN0Q29udGFpbmVyRGlyZWN0aXZlXSxcbn0pXG5leHBvcnQgY2xhc3MgVG9hc3RDb250YWluZXJNb2R1bGUge31cbiJdfQ==