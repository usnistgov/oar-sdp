/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbHighlight } from './highlight';
import { NgbTypeaheadWindow } from './typeahead-window';
import { NgbTypeahead } from './typeahead';
export { NgbHighlight } from './highlight';
export { NgbTypeaheadWindow } from './typeahead-window';
export { NgbTypeaheadConfig } from './typeahead-config';
export { NgbTypeahead } from './typeahead';
var NgbTypeaheadModule = /** @class */ (function () {
    function NgbTypeaheadModule() {
    }
    NgbTypeaheadModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgbTypeahead, NgbHighlight, NgbTypeaheadWindow],
                    exports: [NgbTypeahead, NgbHighlight],
                    imports: [CommonModule],
                    entryComponents: [NgbTypeaheadWindow]
                },] }
    ];
    return NgbTypeaheadModule;
}());
export { NgbTypeaheadModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidHlwZWFoZWFkL3R5cGVhaGVhZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUV6QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxZQUFZLEVBQThCLE1BQU0sYUFBYSxDQUFDO0FBRXRFO0lBQUE7SUFPQSxDQUFDOztnQkFQQSxRQUFRLFNBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxrQkFBa0IsQ0FBQztvQkFDOUQsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQztvQkFDckMsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixlQUFlLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztpQkFDdEM7O0lBRUQseUJBQUM7Q0FBQSxBQVBELElBT0M7U0FEWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge05nYkhpZ2hsaWdodH0gZnJvbSAnLi9oaWdobGlnaHQnO1xuaW1wb3J0IHtOZ2JUeXBlYWhlYWRXaW5kb3d9IGZyb20gJy4vdHlwZWFoZWFkLXdpbmRvdyc7XG5pbXBvcnQge05nYlR5cGVhaGVhZH0gZnJvbSAnLi90eXBlYWhlYWQnO1xuXG5leHBvcnQge05nYkhpZ2hsaWdodH0gZnJvbSAnLi9oaWdobGlnaHQnO1xuZXhwb3J0IHtOZ2JUeXBlYWhlYWRXaW5kb3d9IGZyb20gJy4vdHlwZWFoZWFkLXdpbmRvdyc7XG5leHBvcnQge05nYlR5cGVhaGVhZENvbmZpZ30gZnJvbSAnLi90eXBlYWhlYWQtY29uZmlnJztcbmV4cG9ydCB7TmdiVHlwZWFoZWFkLCBOZ2JUeXBlYWhlYWRTZWxlY3RJdGVtRXZlbnR9IGZyb20gJy4vdHlwZWFoZWFkJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTmdiVHlwZWFoZWFkLCBOZ2JIaWdobGlnaHQsIE5nYlR5cGVhaGVhZFdpbmRvd10sXG4gIGV4cG9ydHM6IFtOZ2JUeXBlYWhlYWQsIE5nYkhpZ2hsaWdodF0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ2JUeXBlYWhlYWRXaW5kb3ddXG59KVxuZXhwb3J0IGNsYXNzIE5nYlR5cGVhaGVhZE1vZHVsZSB7XG59XG4iXX0=