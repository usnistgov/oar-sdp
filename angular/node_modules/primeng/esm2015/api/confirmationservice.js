var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let ConfirmationService = class ConfirmationService {
    constructor() {
        this.requireConfirmationSource = new Subject();
        this.acceptConfirmationSource = new Subject();
        this.requireConfirmation$ = this.requireConfirmationSource.asObservable();
        this.accept = this.acceptConfirmationSource.asObservable();
    }
    confirm(confirmation) {
        this.requireConfirmationSource.next(confirmation);
        return this;
    }
    close() {
        this.requireConfirmationSource.next(null);
        return this;
    }
    onAccept() {
        this.acceptConfirmationSource.next();
    }
};
ConfirmationService = __decorate([
    Injectable()
], ConfirmationService);
export { ConfirmationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybWF0aW9uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvYXBpLyIsInNvdXJjZXMiOlsiY29uZmlybWF0aW9uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJL0IsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFBaEM7UUFFWSw4QkFBeUIsR0FBRyxJQUFJLE9BQU8sRUFBZ0IsQ0FBQztRQUN4RCw2QkFBd0IsR0FBRyxJQUFJLE9BQU8sRUFBZ0IsQ0FBQztRQUUvRCx5QkFBb0IsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDckUsV0FBTSxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQWUxRCxDQUFDO0lBYkcsT0FBTyxDQUFDLFlBQTBCO1FBQzlCLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pDLENBQUM7Q0FDSixDQUFBO0FBckJZLG1CQUFtQjtJQUQvQixVQUFVLEVBQUU7R0FDQSxtQkFBbUIsQ0FxQi9CO1NBckJZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbmZpcm1hdGlvbiB9IGZyb20gJy4vY29uZmlybWF0aW9uJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbmZpcm1hdGlvblNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSByZXF1aXJlQ29uZmlybWF0aW9uU291cmNlID0gbmV3IFN1YmplY3Q8Q29uZmlybWF0aW9uPigpO1xuICAgIHByaXZhdGUgYWNjZXB0Q29uZmlybWF0aW9uU291cmNlID0gbmV3IFN1YmplY3Q8Q29uZmlybWF0aW9uPigpO1xuXG4gICAgcmVxdWlyZUNvbmZpcm1hdGlvbiQgPSB0aGlzLnJlcXVpcmVDb25maXJtYXRpb25Tb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG4gICAgYWNjZXB0ID0gdGhpcy5hY2NlcHRDb25maXJtYXRpb25Tb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICBjb25maXJtKGNvbmZpcm1hdGlvbjogQ29uZmlybWF0aW9uKSB7XG4gICAgICAgIHRoaXMucmVxdWlyZUNvbmZpcm1hdGlvblNvdXJjZS5uZXh0KGNvbmZpcm1hdGlvbik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNsb3NlKCkge1xuICAgICAgICB0aGlzLnJlcXVpcmVDb25maXJtYXRpb25Tb3VyY2UubmV4dChudWxsKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgb25BY2NlcHQoKSB7XG4gICAgICAgIHRoaXMuYWNjZXB0Q29uZmlybWF0aW9uU291cmNlLm5leHQoKTtcbiAgICB9XG59Il19