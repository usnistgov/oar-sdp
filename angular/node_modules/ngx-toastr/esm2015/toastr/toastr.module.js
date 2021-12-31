var ToastrModule_1;
import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Toast } from './toast.component';
import { DefaultNoComponentGlobalConfig, TOAST_CONFIG, } from './toastr-config';
export const DefaultGlobalConfig = Object.assign(Object.assign({}, DefaultNoComponentGlobalConfig), { toastComponent: Toast });
let ToastrModule = ToastrModule_1 = class ToastrModule {
    static forRoot(config = {}) {
        return {
            ngModule: ToastrModule_1,
            providers: [
                {
                    provide: TOAST_CONFIG,
                    useValue: {
                        default: DefaultGlobalConfig,
                        config,
                    },
                },
            ],
        };
    }
};
ToastrModule = ToastrModule_1 = __decorate([
    NgModule({
        imports: [CommonModule],
        declarations: [Toast],
        exports: [Toast],
        entryComponents: [Toast],
    })
], ToastrModule);
export { ToastrModule };
let ToastrComponentlessModule = class ToastrComponentlessModule {
    static forRoot(config = {}) {
        return {
            ngModule: ToastrModule,
            providers: [
                {
                    provide: TOAST_CONFIG,
                    useValue: {
                        default: DefaultNoComponentGlobalConfig,
                        config,
                    },
                },
            ],
        };
    }
};
ToastrComponentlessModule = __decorate([
    NgModule({
        imports: [CommonModule],
    })
], ToastrComponentlessModule);
export { ToastrComponentlessModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3RyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC10b2FzdHIvIiwic291cmNlcyI6WyJ0b2FzdHIvdG9hc3RyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDMUMsT0FBTyxFQUNMLDhCQUE4QixFQUU5QixZQUFZLEdBQ2IsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QixNQUFNLENBQUMsTUFBTSxtQkFBbUIsbUNBQzNCLDhCQUE4QixLQUNqQyxjQUFjLEVBQUUsS0FBSyxHQUN0QixDQUFDO0FBUUYsSUFBYSxZQUFZLG9CQUF6QixNQUFhLFlBQVk7SUFDdkIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFnQyxFQUFFO1FBQy9DLE9BQU87WUFDTCxRQUFRLEVBQUUsY0FBWTtZQUN0QixTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLFlBQVk7b0JBQ3JCLFFBQVEsRUFBRTt3QkFDUixPQUFPLEVBQUUsbUJBQW1CO3dCQUM1QixNQUFNO3FCQUNQO2lCQUNGO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUFmWSxZQUFZO0lBTnhCLFFBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztRQUN2QixZQUFZLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDckIsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDO1FBQ2hCLGVBQWUsRUFBRSxDQUFDLEtBQUssQ0FBQztLQUN6QixDQUFDO0dBQ1csWUFBWSxDQWV4QjtTQWZZLFlBQVk7QUFvQnpCLElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQXlCO0lBQ3BDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBZ0MsRUFBRTtRQUMvQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLFlBQVk7WUFDdEIsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxZQUFZO29CQUNyQixRQUFRLEVBQUU7d0JBQ1IsT0FBTyxFQUFFLDhCQUE4Qjt3QkFDdkMsTUFBTTtxQkFDUDtpQkFDRjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBZlkseUJBQXlCO0lBSHJDLFFBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztLQUN4QixDQUFDO0dBQ1cseUJBQXlCLENBZXJDO1NBZlkseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFRvYXN0IH0gZnJvbSAnLi90b2FzdC5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgRGVmYXVsdE5vQ29tcG9uZW50R2xvYmFsQ29uZmlnLFxuICBHbG9iYWxDb25maWcsXG4gIFRPQVNUX0NPTkZJRyxcbn0gZnJvbSAnLi90b2FzdHItY29uZmlnJztcblxuZXhwb3J0IGNvbnN0IERlZmF1bHRHbG9iYWxDb25maWc6IEdsb2JhbENvbmZpZyA9IHtcbiAgLi4uRGVmYXVsdE5vQ29tcG9uZW50R2xvYmFsQ29uZmlnLFxuICB0b2FzdENvbXBvbmVudDogVG9hc3QsXG59O1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbVG9hc3RdLFxuICBleHBvcnRzOiBbVG9hc3RdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtUb2FzdF0sXG59KVxuZXhwb3J0IGNsYXNzIFRvYXN0ck1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogUGFydGlhbDxHbG9iYWxDb25maWc+ID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFRvYXN0ck1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogVG9hc3RyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBUT0FTVF9DT05GSUcsXG4gICAgICAgICAgdXNlVmFsdWU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IERlZmF1bHRHbG9iYWxDb25maWcsXG4gICAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgVG9hc3RyQ29tcG9uZW50bGVzc01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogUGFydGlhbDxHbG9iYWxDb25maWc+ID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFRvYXN0ck1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogVG9hc3RyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBUT0FTVF9DT05GSUcsXG4gICAgICAgICAgdXNlVmFsdWU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IERlZmF1bHROb0NvbXBvbmVudEdsb2JhbENvbmZpZyxcbiAgICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXX0=