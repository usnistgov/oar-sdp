/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/language-service/ivy/compiler_factory", ["require", "exports", "@angular/compiler-cli/src/ngtsc/core", "@angular/compiler-cli/src/ngtsc/incremental"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CompilerFactory = void 0;
    var core_1 = require("@angular/compiler-cli/src/ngtsc/core");
    var incremental_1 = require("@angular/compiler-cli/src/ngtsc/incremental");
    /**
     * Manages the `NgCompiler` instance which backs the language service, updating or replacing it as
     * needed to produce an up-to-date understanding of the current program.
     *
     * TODO(alxhub): currently the options used for the compiler are specified at `CompilerFactory`
     * construction, and are not changable. In a real project, users can update `tsconfig.json`. We need
     * to properly handle a change in the compiler options, either by having an API to update the
     * `CompilerFactory` to use new options, or by replacing it entirely.
     */
    var CompilerFactory = /** @class */ (function () {
        function CompilerFactory(adapter, programStrategy, options) {
            this.adapter = adapter;
            this.programStrategy = programStrategy;
            this.options = options;
            this.incrementalStrategy = new incremental_1.TrackedIncrementalBuildStrategy();
            this.compiler = null;
            this.lastKnownProgram = null;
        }
        CompilerFactory.prototype.getOrCreate = function () {
            var _a;
            var program = this.programStrategy.getProgram();
            var modifiedResourceFiles = (_a = this.adapter.getModifiedResourceFiles()) !== null && _a !== void 0 ? _a : new Set();
            if (this.compiler !== null && program === this.lastKnownProgram) {
                if (modifiedResourceFiles.size > 0) {
                    // Only resource files have changed since the last NgCompiler was created.
                    var ticket_1 = core_1.resourceChangeTicket(this.compiler, modifiedResourceFiles);
                    this.compiler = core_1.NgCompiler.fromTicket(ticket_1, this.adapter);
                }
                else {
                    // The previous NgCompiler is being reused, but we still want to reset its performance
                    // tracker to capture only the operations that are needed to service the current request.
                    this.compiler.perfRecorder.reset();
                }
                return this.compiler;
            }
            var ticket;
            if (this.compiler === null || this.lastKnownProgram === null) {
                ticket = core_1.freshCompilationTicket(program, this.options, this.incrementalStrategy, this.programStrategy, 
                /* perfRecorder */ null, true, true);
            }
            else {
                ticket = core_1.incrementalFromCompilerTicket(this.compiler, program, this.incrementalStrategy, this.programStrategy, modifiedResourceFiles, /* perfRecorder */ null);
            }
            this.compiler = core_1.NgCompiler.fromTicket(ticket, this.adapter);
            this.lastKnownProgram = program;
            return this.compiler;
        };
        CompilerFactory.prototype.registerLastKnownProgram = function () {
            this.lastKnownProgram = this.programStrategy.getProgram();
        };
        return CompilerFactory;
    }());
    exports.CompilerFactory = CompilerFactory;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXJfZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2xhbmd1YWdlLXNlcnZpY2UvaXZ5L2NvbXBpbGVyX2ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7O0lBRUgsNkRBQWdLO0lBRWhLLDJFQUE0RjtJQVE1Rjs7Ozs7Ozs7T0FRRztJQUNIO1FBS0UseUJBQ3FCLE9BQStCLEVBQy9CLGVBQTRDLEVBQzVDLE9BQTBCO1lBRjFCLFlBQU8sR0FBUCxPQUFPLENBQXdCO1lBQy9CLG9CQUFlLEdBQWYsZUFBZSxDQUE2QjtZQUM1QyxZQUFPLEdBQVAsT0FBTyxDQUFtQjtZQVA5Qix3QkFBbUIsR0FBRyxJQUFJLDZDQUErQixFQUFFLENBQUM7WUFDckUsYUFBUSxHQUFvQixJQUFJLENBQUM7WUFDakMscUJBQWdCLEdBQW9CLElBQUksQ0FBQztRQU05QyxDQUFDO1FBRUoscUNBQVcsR0FBWDs7WUFDRSxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xELElBQU0scUJBQXFCLFNBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxtQ0FBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBRW5GLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDL0QsSUFBSSxxQkFBcUIsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFO29CQUNsQywwRUFBMEU7b0JBQzFFLElBQU0sUUFBTSxHQUFHLDJCQUFvQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUscUJBQXFCLENBQUMsQ0FBQztvQkFDMUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxpQkFBVSxDQUFDLFVBQVUsQ0FBQyxRQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUM3RDtxQkFBTTtvQkFDTCxzRkFBc0Y7b0JBQ3RGLHlGQUF5RjtvQkFDekYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ3BDO2dCQUVELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUN0QjtZQUVELElBQUksTUFBeUIsQ0FBQztZQUM5QixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxJQUFJLEVBQUU7Z0JBQzVELE1BQU0sR0FBRyw2QkFBc0IsQ0FDM0IsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxlQUFlO2dCQUNyRSxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzFDO2lCQUFNO2dCQUNMLE1BQU0sR0FBRyxvQ0FBNkIsQ0FDbEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxlQUFlLEVBQ3RFLHFCQUFxQixFQUFFLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3JEO1lBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxpQkFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUM7WUFDaEMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3ZCLENBQUM7UUFFRCxrREFBd0IsR0FBeEI7WUFDRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM1RCxDQUFDO1FBQ0gsc0JBQUM7SUFBRCxDQUFDLEFBL0NELElBK0NDO0lBL0NZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcGlsYXRpb25UaWNrZXQsIGZyZXNoQ29tcGlsYXRpb25UaWNrZXQsIGluY3JlbWVudGFsRnJvbUNvbXBpbGVyVGlja2V0LCBOZ0NvbXBpbGVyLCByZXNvdXJjZUNoYW5nZVRpY2tldH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXItY2xpL3NyYy9uZ3RzYy9jb3JlJztcbmltcG9ydCB7TmdDb21waWxlck9wdGlvbnN9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyLWNsaS9zcmMvbmd0c2MvY29yZS9hcGknO1xuaW1wb3J0IHtUcmFja2VkSW5jcmVtZW50YWxCdWlsZFN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb21waWxlci1jbGkvc3JjL25ndHNjL2luY3JlbWVudGFsJztcbmltcG9ydCB7QWN0aXZlUGVyZlJlY29yZGVyfSBmcm9tICdAYW5ndWxhci9jb21waWxlci1jbGkvc3JjL25ndHNjL3BlcmYnO1xuaW1wb3J0IHtUeXBlQ2hlY2tpbmdQcm9ncmFtU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyLWNsaS9zcmMvbmd0c2MvdHlwZWNoZWNrL2FwaSc7XG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0L2xpYi90c3NlcnZlcmxpYnJhcnknO1xuXG5pbXBvcnQge0xhbmd1YWdlU2VydmljZUFkYXB0ZXJ9IGZyb20gJy4vYWRhcHRlcnMnO1xuaW1wb3J0IHtpc0V4dGVybmFsVGVtcGxhdGV9IGZyb20gJy4vdXRpbHMnO1xuXG4vKipcbiAqIE1hbmFnZXMgdGhlIGBOZ0NvbXBpbGVyYCBpbnN0YW5jZSB3aGljaCBiYWNrcyB0aGUgbGFuZ3VhZ2Ugc2VydmljZSwgdXBkYXRpbmcgb3IgcmVwbGFjaW5nIGl0IGFzXG4gKiBuZWVkZWQgdG8gcHJvZHVjZSBhbiB1cC10by1kYXRlIHVuZGVyc3RhbmRpbmcgb2YgdGhlIGN1cnJlbnQgcHJvZ3JhbS5cbiAqXG4gKiBUT0RPKGFseGh1Yik6IGN1cnJlbnRseSB0aGUgb3B0aW9ucyB1c2VkIGZvciB0aGUgY29tcGlsZXIgYXJlIHNwZWNpZmllZCBhdCBgQ29tcGlsZXJGYWN0b3J5YFxuICogY29uc3RydWN0aW9uLCBhbmQgYXJlIG5vdCBjaGFuZ2FibGUuIEluIGEgcmVhbCBwcm9qZWN0LCB1c2VycyBjYW4gdXBkYXRlIGB0c2NvbmZpZy5qc29uYC4gV2UgbmVlZFxuICogdG8gcHJvcGVybHkgaGFuZGxlIGEgY2hhbmdlIGluIHRoZSBjb21waWxlciBvcHRpb25zLCBlaXRoZXIgYnkgaGF2aW5nIGFuIEFQSSB0byB1cGRhdGUgdGhlXG4gKiBgQ29tcGlsZXJGYWN0b3J5YCB0byB1c2UgbmV3IG9wdGlvbnMsIG9yIGJ5IHJlcGxhY2luZyBpdCBlbnRpcmVseS5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbXBpbGVyRmFjdG9yeSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgaW5jcmVtZW50YWxTdHJhdGVneSA9IG5ldyBUcmFja2VkSW5jcmVtZW50YWxCdWlsZFN0cmF0ZWd5KCk7XG4gIHByaXZhdGUgY29tcGlsZXI6IE5nQ29tcGlsZXJ8bnVsbCA9IG51bGw7XG4gIHByaXZhdGUgbGFzdEtub3duUHJvZ3JhbTogdHMuUHJvZ3JhbXxudWxsID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgcmVhZG9ubHkgYWRhcHRlcjogTGFuZ3VhZ2VTZXJ2aWNlQWRhcHRlcixcbiAgICAgIHByaXZhdGUgcmVhZG9ubHkgcHJvZ3JhbVN0cmF0ZWd5OiBUeXBlQ2hlY2tpbmdQcm9ncmFtU3RyYXRlZ3ksXG4gICAgICBwcml2YXRlIHJlYWRvbmx5IG9wdGlvbnM6IE5nQ29tcGlsZXJPcHRpb25zLFxuICApIHt9XG5cbiAgZ2V0T3JDcmVhdGUoKTogTmdDb21waWxlciB7XG4gICAgY29uc3QgcHJvZ3JhbSA9IHRoaXMucHJvZ3JhbVN0cmF0ZWd5LmdldFByb2dyYW0oKTtcbiAgICBjb25zdCBtb2RpZmllZFJlc291cmNlRmlsZXMgPSB0aGlzLmFkYXB0ZXIuZ2V0TW9kaWZpZWRSZXNvdXJjZUZpbGVzKCkgPz8gbmV3IFNldCgpO1xuXG4gICAgaWYgKHRoaXMuY29tcGlsZXIgIT09IG51bGwgJiYgcHJvZ3JhbSA9PT0gdGhpcy5sYXN0S25vd25Qcm9ncmFtKSB7XG4gICAgICBpZiAobW9kaWZpZWRSZXNvdXJjZUZpbGVzLnNpemUgPiAwKSB7XG4gICAgICAgIC8vIE9ubHkgcmVzb3VyY2UgZmlsZXMgaGF2ZSBjaGFuZ2VkIHNpbmNlIHRoZSBsYXN0IE5nQ29tcGlsZXIgd2FzIGNyZWF0ZWQuXG4gICAgICAgIGNvbnN0IHRpY2tldCA9IHJlc291cmNlQ2hhbmdlVGlja2V0KHRoaXMuY29tcGlsZXIsIG1vZGlmaWVkUmVzb3VyY2VGaWxlcyk7XG4gICAgICAgIHRoaXMuY29tcGlsZXIgPSBOZ0NvbXBpbGVyLmZyb21UaWNrZXQodGlja2V0LCB0aGlzLmFkYXB0ZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVGhlIHByZXZpb3VzIE5nQ29tcGlsZXIgaXMgYmVpbmcgcmV1c2VkLCBidXQgd2Ugc3RpbGwgd2FudCB0byByZXNldCBpdHMgcGVyZm9ybWFuY2VcbiAgICAgICAgLy8gdHJhY2tlciB0byBjYXB0dXJlIG9ubHkgdGhlIG9wZXJhdGlvbnMgdGhhdCBhcmUgbmVlZGVkIHRvIHNlcnZpY2UgdGhlIGN1cnJlbnQgcmVxdWVzdC5cbiAgICAgICAgdGhpcy5jb21waWxlci5wZXJmUmVjb3JkZXIucmVzZXQoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGlsZXI7XG4gICAgfVxuXG4gICAgbGV0IHRpY2tldDogQ29tcGlsYXRpb25UaWNrZXQ7XG4gICAgaWYgKHRoaXMuY29tcGlsZXIgPT09IG51bGwgfHwgdGhpcy5sYXN0S25vd25Qcm9ncmFtID09PSBudWxsKSB7XG4gICAgICB0aWNrZXQgPSBmcmVzaENvbXBpbGF0aW9uVGlja2V0KFxuICAgICAgICAgIHByb2dyYW0sIHRoaXMub3B0aW9ucywgdGhpcy5pbmNyZW1lbnRhbFN0cmF0ZWd5LCB0aGlzLnByb2dyYW1TdHJhdGVneSxcbiAgICAgICAgICAvKiBwZXJmUmVjb3JkZXIgKi8gbnVsbCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpY2tldCA9IGluY3JlbWVudGFsRnJvbUNvbXBpbGVyVGlja2V0KFxuICAgICAgICAgIHRoaXMuY29tcGlsZXIsIHByb2dyYW0sIHRoaXMuaW5jcmVtZW50YWxTdHJhdGVneSwgdGhpcy5wcm9ncmFtU3RyYXRlZ3ksXG4gICAgICAgICAgbW9kaWZpZWRSZXNvdXJjZUZpbGVzLCAvKiBwZXJmUmVjb3JkZXIgKi8gbnVsbCk7XG4gICAgfVxuICAgIHRoaXMuY29tcGlsZXIgPSBOZ0NvbXBpbGVyLmZyb21UaWNrZXQodGlja2V0LCB0aGlzLmFkYXB0ZXIpO1xuICAgIHRoaXMubGFzdEtub3duUHJvZ3JhbSA9IHByb2dyYW07XG4gICAgcmV0dXJuIHRoaXMuY29tcGlsZXI7XG4gIH1cblxuICByZWdpc3Rlckxhc3RLbm93blByb2dyYW0oKSB7XG4gICAgdGhpcy5sYXN0S25vd25Qcm9ncmFtID0gdGhpcy5wcm9ncmFtU3RyYXRlZ3kuZ2V0UHJvZ3JhbSgpO1xuICB9XG59XG4iXX0=