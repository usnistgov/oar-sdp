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
export class NgbTypeaheadModule {
}
NgbTypeaheadModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgbTypeahead, NgbHighlight, NgbTypeaheadWindow],
                exports: [NgbTypeahead, NgbHighlight],
                imports: [CommonModule],
                entryComponents: [NgbTypeaheadWindow]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidHlwZWFoZWFkL3R5cGVhaGVhZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUV6QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxZQUFZLEVBQThCLE1BQU0sYUFBYSxDQUFDO0FBUXRFLE1BQU0sT0FBTyxrQkFBa0I7OztZQU45QixRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxrQkFBa0IsQ0FBQztnQkFDOUQsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQztnQkFDckMsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUN2QixlQUFlLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQzthQUN0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7TmdiSGlnaGxpZ2h0fSBmcm9tICcuL2hpZ2hsaWdodCc7XG5pbXBvcnQge05nYlR5cGVhaGVhZFdpbmRvd30gZnJvbSAnLi90eXBlYWhlYWQtd2luZG93JztcbmltcG9ydCB7TmdiVHlwZWFoZWFkfSBmcm9tICcuL3R5cGVhaGVhZCc7XG5cbmV4cG9ydCB7TmdiSGlnaGxpZ2h0fSBmcm9tICcuL2hpZ2hsaWdodCc7XG5leHBvcnQge05nYlR5cGVhaGVhZFdpbmRvd30gZnJvbSAnLi90eXBlYWhlYWQtd2luZG93JztcbmV4cG9ydCB7TmdiVHlwZWFoZWFkQ29uZmlnfSBmcm9tICcuL3R5cGVhaGVhZC1jb25maWcnO1xuZXhwb3J0IHtOZ2JUeXBlYWhlYWQsIE5nYlR5cGVhaGVhZFNlbGVjdEl0ZW1FdmVudH0gZnJvbSAnLi90eXBlYWhlYWQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOZ2JUeXBlYWhlYWQsIE5nYkhpZ2hsaWdodCwgTmdiVHlwZWFoZWFkV2luZG93XSxcbiAgZXhwb3J0czogW05nYlR5cGVhaGVhZCwgTmdiSGlnaGxpZ2h0XSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGVudHJ5Q29tcG9uZW50czogW05nYlR5cGVhaGVhZFdpbmRvd11cbn0pXG5leHBvcnQgY2xhc3MgTmdiVHlwZWFoZWFkTW9kdWxlIHtcbn1cbiJdfQ==