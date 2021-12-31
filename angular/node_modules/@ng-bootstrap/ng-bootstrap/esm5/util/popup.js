import { TemplateRef } from '@angular/core';
var ContentRef = /** @class */ (function () {
    function ContentRef(nodes, viewRef, componentRef) {
        this.nodes = nodes;
        this.viewRef = viewRef;
        this.componentRef = componentRef;
    }
    return ContentRef;
}());
export { ContentRef };
var PopupService = /** @class */ (function () {
    function PopupService(_type, _injector, _viewContainerRef, _renderer, _componentFactoryResolver, _applicationRef) {
        this._type = _type;
        this._injector = _injector;
        this._viewContainerRef = _viewContainerRef;
        this._renderer = _renderer;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._applicationRef = _applicationRef;
        this._windowRef = null;
        this._contentRef = null;
    }
    PopupService.prototype.open = function (content, context) {
        if (!this._windowRef) {
            this._contentRef = this._getContentRef(content, context);
            this._windowRef = this._viewContainerRef.createComponent(this._componentFactoryResolver.resolveComponentFactory(this._type), this._viewContainerRef.length, this._injector, this._contentRef.nodes);
        }
        return this._windowRef;
    };
    PopupService.prototype.close = function () {
        var _a;
        if (this._windowRef) {
            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._windowRef.hostView));
            this._windowRef = null;
            if ((_a = this._contentRef) === null || _a === void 0 ? void 0 : _a.viewRef) {
                this._applicationRef.detachView(this._contentRef.viewRef);
                this._contentRef.viewRef.destroy();
                this._contentRef = null;
            }
        }
    };
    PopupService.prototype._getContentRef = function (content, context) {
        if (!content) {
            return new ContentRef([]);
        }
        else if (content instanceof TemplateRef) {
            var viewRef = content.createEmbeddedView(context);
            this._applicationRef.attachView(viewRef);
            return new ContentRef([viewRef.rootNodes], viewRef);
        }
        else {
            return new ContentRef([[this._renderer.createText("" + content)]]);
        }
    };
    return PopupService;
}());
export { PopupService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInV0aWwvcG9wdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFdBQVcsRUFPWixNQUFNLGVBQWUsQ0FBQztBQUV2QjtJQUNFLG9CQUFtQixLQUFZLEVBQVMsT0FBaUIsRUFBUyxZQUFnQztRQUEvRSxVQUFLLEdBQUwsS0FBSyxDQUFPO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBVTtRQUFTLGlCQUFZLEdBQVosWUFBWSxDQUFvQjtJQUFHLENBQUM7SUFDeEcsaUJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQzs7QUFFRDtJQUlFLHNCQUNZLEtBQVUsRUFBVSxTQUFtQixFQUFVLGlCQUFtQyxFQUNwRixTQUFvQixFQUFVLHlCQUFtRCxFQUNqRixlQUErQjtRQUYvQixVQUFLLEdBQUwsS0FBSyxDQUFLO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDcEYsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUFVLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMEI7UUFDakYsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBTm5DLGVBQVUsR0FBMEIsSUFBSSxDQUFDO1FBQ3pDLGdCQUFXLEdBQXNCLElBQUksQ0FBQztJQUtBLENBQUM7SUFFL0MsMkJBQUksR0FBSixVQUFLLE9BQW1DLEVBQUUsT0FBYTtRQUNyRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FDcEQsSUFBSSxDQUFDLHlCQUF5QixDQUFDLHVCQUF1QixDQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUNwRyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0M7UUFFRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVELDRCQUFLLEdBQUw7O1FBQ0UsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDeEYsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFFdkIsVUFBSSxJQUFJLENBQUMsV0FBVywwQ0FBRSxPQUFPLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzFELElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQzthQUN6QjtTQUNGO0lBQ0gsQ0FBQztJQUVPLHFDQUFjLEdBQXRCLFVBQXVCLE9BQW1DLEVBQUUsT0FBYTtRQUN2RSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osT0FBTyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUMzQjthQUFNLElBQUksT0FBTyxZQUFZLFdBQVcsRUFBRTtZQUN6QyxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDekMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNyRDthQUFNO1lBQ0wsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsS0FBRyxPQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwRTtJQUNILENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUE1Q0QsSUE0Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJbmplY3RvcixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFJlbmRlcmVyMixcbiAgQ29tcG9uZW50UmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIEFwcGxpY2F0aW9uUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgQ29udGVudFJlZiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBub2RlczogYW55W10sIHB1YmxpYyB2aWV3UmVmPzogVmlld1JlZiwgcHVibGljIGNvbXBvbmVudFJlZj86IENvbXBvbmVudFJlZjxhbnk+KSB7fVxufVxuXG5leHBvcnQgY2xhc3MgUG9wdXBTZXJ2aWNlPFQ+IHtcbiAgcHJpdmF0ZSBfd2luZG93UmVmOiBDb21wb25lbnRSZWY8VD58IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9jb250ZW50UmVmOiBDb250ZW50UmVmIHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF90eXBlOiBhbnksIHByaXZhdGUgX2luamVjdG9yOiBJbmplY3RvciwgcHJpdmF0ZSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgX2NvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgcHJpdmF0ZSBfYXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmKSB7fVxuXG4gIG9wZW4oY29udGVudD86IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4sIGNvbnRleHQ/OiBhbnkpOiBDb21wb25lbnRSZWY8VD4ge1xuICAgIGlmICghdGhpcy5fd2luZG93UmVmKSB7XG4gICAgICB0aGlzLl9jb250ZW50UmVmID0gdGhpcy5fZ2V0Q29udGVudFJlZihjb250ZW50LCBjb250ZXh0KTtcbiAgICAgIHRoaXMuX3dpbmRvd1JlZiA9IHRoaXMuX3ZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KFxuICAgICAgICAgIHRoaXMuX2NvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeTxUPih0aGlzLl90eXBlKSwgdGhpcy5fdmlld0NvbnRhaW5lclJlZi5sZW5ndGgsXG4gICAgICAgICAgdGhpcy5faW5qZWN0b3IsIHRoaXMuX2NvbnRlbnRSZWYubm9kZXMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl93aW5kb3dSZWY7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICBpZiAodGhpcy5fd2luZG93UmVmKSB7XG4gICAgICB0aGlzLl92aWV3Q29udGFpbmVyUmVmLnJlbW92ZSh0aGlzLl92aWV3Q29udGFpbmVyUmVmLmluZGV4T2YodGhpcy5fd2luZG93UmVmLmhvc3RWaWV3KSk7XG4gICAgICB0aGlzLl93aW5kb3dSZWYgPSBudWxsO1xuXG4gICAgICBpZiAodGhpcy5fY29udGVudFJlZj8udmlld1JlZikge1xuICAgICAgICB0aGlzLl9hcHBsaWNhdGlvblJlZi5kZXRhY2hWaWV3KHRoaXMuX2NvbnRlbnRSZWYudmlld1JlZik7XG4gICAgICAgIHRoaXMuX2NvbnRlbnRSZWYudmlld1JlZi5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuX2NvbnRlbnRSZWYgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2dldENvbnRlbnRSZWYoY29udGVudD86IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4sIGNvbnRleHQ/OiBhbnkpOiBDb250ZW50UmVmIHtcbiAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgIHJldHVybiBuZXcgQ29udGVudFJlZihbXSk7XG4gICAgfSBlbHNlIGlmIChjb250ZW50IGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgIGNvbnN0IHZpZXdSZWYgPSBjb250ZW50LmNyZWF0ZUVtYmVkZGVkVmlldyhjb250ZXh0KTtcbiAgICAgIHRoaXMuX2FwcGxpY2F0aW9uUmVmLmF0dGFjaFZpZXcodmlld1JlZik7XG4gICAgICByZXR1cm4gbmV3IENvbnRlbnRSZWYoW3ZpZXdSZWYucm9vdE5vZGVzXSwgdmlld1JlZik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgQ29udGVudFJlZihbW3RoaXMuX3JlbmRlcmVyLmNyZWF0ZVRleHQoYCR7Y29udGVudH1gKV1dKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==