(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/translator", ["require", "exports", "tslib"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Translator = void 0;
    var tslib_1 = require("tslib");
    /**
     * Translate each file (e.g. source file or static asset) using the given `TranslationHandler`s.
     * The file will be translated by the first handler that returns true for `canTranslate()`.
     */
    var Translator = /** @class */ (function () {
        function Translator(fs, resourceHandlers, diagnostics) {
            this.fs = fs;
            this.resourceHandlers = resourceHandlers;
            this.diagnostics = diagnostics;
        }
        Translator.prototype.translateFiles = function (inputPaths, rootPath, outputPathFn, translations, sourceLocale) {
            var _this = this;
            inputPaths.forEach(function (inputPath) {
                var e_1, _a;
                var absInputPath = _this.fs.resolve(rootPath, inputPath);
                var contents = _this.fs.readFileBuffer(absInputPath);
                var relativePath = _this.fs.relative(rootPath, absInputPath);
                try {
                    for (var _b = tslib_1.__values(_this.resourceHandlers), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var resourceHandler = _c.value;
                        if (resourceHandler.canTranslate(relativePath, contents)) {
                            return resourceHandler.translate(_this.diagnostics, rootPath, relativePath, contents, outputPathFn, translations, sourceLocale);
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
                _this.diagnostics.error("Unable to handle resource file: " + inputPath);
            });
        };
        return Translator;
    }());
    exports.Translator = Translator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2xvY2FsaXplL3NyYy90b29scy9zcmMvdHJhbnNsYXRlL3RyYW5zbGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQTREQTs7O09BR0c7SUFDSDtRQUNFLG9CQUNZLEVBQWMsRUFBVSxnQkFBc0MsRUFDOUQsV0FBd0I7WUFEeEIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtZQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBc0I7WUFDOUQsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBRyxDQUFDO1FBRXhDLG1DQUFjLEdBQWQsVUFDSSxVQUF5QixFQUFFLFFBQXdCLEVBQUUsWUFBMEIsRUFDL0UsWUFBaUMsRUFBRSxZQUFxQjtZQUY1RCxpQkFnQkM7WUFiQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsU0FBUzs7Z0JBQzFCLElBQU0sWUFBWSxHQUFHLEtBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDMUQsSUFBTSxRQUFRLEdBQUcsS0FBSSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3RELElBQU0sWUFBWSxHQUFHLEtBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQzs7b0JBQzlELEtBQThCLElBQUEsS0FBQSxpQkFBQSxLQUFJLENBQUMsZ0JBQWdCLENBQUEsZ0JBQUEsNEJBQUU7d0JBQWhELElBQU0sZUFBZSxXQUFBO3dCQUN4QixJQUFJLGVBQWUsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxFQUFFOzRCQUN4RCxPQUFPLGVBQWUsQ0FBQyxTQUFTLENBQzVCLEtBQUksQ0FBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFDOUUsWUFBWSxDQUFDLENBQUM7eUJBQ25CO3FCQUNGOzs7Ozs7Ozs7Z0JBQ0QsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMscUNBQW1DLFNBQVcsQ0FBQyxDQUFDO1lBQ3pFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUNILGlCQUFDO0lBQUQsQ0FBQyxBQXRCRCxJQXNCQztJQXRCWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtBYnNvbHV0ZUZzUGF0aCwgRmlsZVN5c3RlbSwgUGF0aFNlZ21lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyLWNsaS9zcmMvbmd0c2MvZmlsZV9zeXN0ZW0nO1xuaW1wb3J0IHvJtU1lc3NhZ2VJZCwgybVQYXJzZWRUcmFuc2xhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvbG9jYWxpemUnO1xuXG5pbXBvcnQge0RpYWdub3N0aWNzfSBmcm9tICcuLi9kaWFnbm9zdGljcyc7XG5cbmltcG9ydCB7T3V0cHV0UGF0aEZufSBmcm9tICcuL291dHB1dF9wYXRoJztcblxuLyoqXG4gKiBBbiBvYmplY3QgdGhhdCBob2xkcyBpbmZvcm1hdGlvbiB0byBiZSB1c2VkIHRvIHRyYW5zbGF0ZSBmaWxlcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUcmFuc2xhdGlvbkJ1bmRsZSB7XG4gIGxvY2FsZTogc3RyaW5nO1xuICB0cmFuc2xhdGlvbnM6IFJlY29yZDzJtU1lc3NhZ2VJZCwgybVQYXJzZWRUcmFuc2xhdGlvbj47XG4gIGRpYWdub3N0aWNzPzogRGlhZ25vc3RpY3M7XG59XG5cbi8qKlxuICogSW1wbGVtZW50IHRoaXMgaW50ZXJmYWNlIHRvIHByb3ZpZGUgYSBjbGFzcyB0aGF0IGNhbiBoYW5kbGUgdHJhbnNsYXRpb24gZm9yIHRoZSBnaXZlbiByZXNvdXJjZSBpblxuICogYW4gYXBwcm9wcmlhdGUgbWFubmVyLlxuICpcbiAqIEZvciBleGFtcGxlLCBzb3VyY2UgY29kZSBmaWxlcyB3aWxsIG5lZWQgdG8gYmUgdHJhbnNmb3JtZWQgaWYgdGhleSBjb250YWluIGAkbG9jYWxpemVgIHRhZ2dlZFxuICogdGVtcGxhdGUgc3RyaW5ncywgd2hpbGUgbW9zdCBzdGF0aWMgYXNzZXRzIHdpbGwganVzdCBuZWVkIHRvIGJlIGNvcGllZC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUcmFuc2xhdGlvbkhhbmRsZXIge1xuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBmaWxlIGNhbiBiZSB0cmFuc2xhdGVkIGJ5IHRoaXMgaGFuZGxlci5cbiAgICpcbiAgICogQHBhcmFtIHJlbGF0aXZlRmlsZVBhdGggQSByZWxhdGl2ZSBwYXRoIGZyb20gdGhlIHNvdXJjZVJvb3QgdG8gdGhlIHJlc291cmNlIGZpbGUgdG8gaGFuZGxlLlxuICAgKiBAcGFyYW0gY29udGVudHMgVGhlIGNvbnRlbnRzIG9mIHRoZSBmaWxlIHRvIGhhbmRsZS5cbiAgICovXG4gIGNhblRyYW5zbGF0ZShyZWxhdGl2ZUZpbGVQYXRoOiBQYXRoU2VnbWVudHxBYnNvbHV0ZUZzUGF0aCwgY29udGVudHM6IFVpbnQ4QXJyYXkpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUcmFuc2xhdGUgdGhlIGZpbGUgYXQgYHJlbGF0aXZlRmlsZVBhdGhgIGNvbnRhaW5pbmcgYGNvbnRlbnRzYCwgdXNpbmcgdGhlIGdpdmVuIGB0cmFuc2xhdGlvbnNgLFxuICAgKiBhbmQgd3JpdGUgdGhlIHRyYW5zbGF0ZWQgY29udGVudCB0byB0aGUgcGF0aCBjb21wdXRlZCBieSBjYWxsaW5nIGBvdXRwdXRQYXRoRm4oKWAuXG4gICAqXG4gICAqIEBwYXJhbSBkaWFnbm9zdGljcyBBbiBvYmplY3QgZm9yIGNvbGxlY3RpbmcgdHJhbnNsYXRpb24gZGlhZ25vc3RpYyBtZXNzYWdlcy5cbiAgICogQHBhcmFtIHNvdXJjZVJvb3QgQW4gYWJzb2x1dGUgcGF0aCB0byB0aGUgcm9vdCBvZiB0aGUgZmlsZXMgYmVpbmcgdHJhbnNsYXRlZC5cbiAgICogQHBhcmFtIHJlbGF0aXZlRmlsZVBhdGggQSByZWxhdGl2ZSBwYXRoIGZyb20gdGhlIHNvdXJjZVJvb3QgdG8gdGhlIGZpbGUgdG8gdHJhbnNsYXRlLlxuICAgKiBAcGFyYW0gY29udGVudHMgVGhlIGNvbnRlbnRzIG9mIHRoZSBmaWxlIHRvIHRyYW5zbGF0ZS5cbiAgICogQHBhcmFtIG91dHB1dFBhdGhGbiBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhbiBhYnNvbHV0ZSBwYXRoIHdoZXJlIHRoZSBvdXRwdXQgZmlsZSBzaG91bGQgYmVcbiAgICogd3JpdHRlbi5cbiAgICogQHBhcmFtIHRyYW5zbGF0aW9ucyBBIGNvbGxlY3Rpb24gb2YgdHJhbnNsYXRpb25zIHRvIGFwcGx5IHRvIHRoaXMgZmlsZS5cbiAgICogQHBhcmFtIHNvdXJjZUxvY2FsZSBUaGUgbG9jYWxlIG9mIHRoZSBvcmlnaW5hbCBhcHBsaWNhdGlvbiBzb3VyY2UuIElmIHByb3ZpZGVkIHRoZW4gYW5cbiAgICogYWRkaXRpb25hbCBjb3B5IG9mIHRoZSBhcHBsaWNhdGlvbiBpcyBjcmVhdGVkIHVuZGVyIHRoaXMgbG9jYWxlIGp1c3Qgd2l0aCB0aGUgYCRsb2NhbGl6ZWAgY2FsbHNcbiAgICogc3RyaXBwZWQgb3V0LlxuICAgKi9cbiAgdHJhbnNsYXRlKFxuICAgICAgZGlhZ25vc3RpY3M6IERpYWdub3N0aWNzLCBzb3VyY2VSb290OiBBYnNvbHV0ZUZzUGF0aCxcbiAgICAgIHJlbGF0aXZlRmlsZVBhdGg6IFBhdGhTZWdtZW50fEFic29sdXRlRnNQYXRoLCBjb250ZW50czogVWludDhBcnJheSxcbiAgICAgIG91dHB1dFBhdGhGbjogT3V0cHV0UGF0aEZuLCB0cmFuc2xhdGlvbnM6IFRyYW5zbGF0aW9uQnVuZGxlW10sIHNvdXJjZUxvY2FsZT86IHN0cmluZyk6IHZvaWQ7XG59XG5cbi8qKlxuICogVHJhbnNsYXRlIGVhY2ggZmlsZSAoZS5nLiBzb3VyY2UgZmlsZSBvciBzdGF0aWMgYXNzZXQpIHVzaW5nIHRoZSBnaXZlbiBgVHJhbnNsYXRpb25IYW5kbGVyYHMuXG4gKiBUaGUgZmlsZSB3aWxsIGJlIHRyYW5zbGF0ZWQgYnkgdGhlIGZpcnN0IGhhbmRsZXIgdGhhdCByZXR1cm5zIHRydWUgZm9yIGBjYW5UcmFuc2xhdGUoKWAuXG4gKi9cbmV4cG9ydCBjbGFzcyBUcmFuc2xhdG9yIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGZzOiBGaWxlU3lzdGVtLCBwcml2YXRlIHJlc291cmNlSGFuZGxlcnM6IFRyYW5zbGF0aW9uSGFuZGxlcltdLFxuICAgICAgcHJpdmF0ZSBkaWFnbm9zdGljczogRGlhZ25vc3RpY3MpIHt9XG5cbiAgdHJhbnNsYXRlRmlsZXMoXG4gICAgICBpbnB1dFBhdGhzOiBQYXRoU2VnbWVudFtdLCByb290UGF0aDogQWJzb2x1dGVGc1BhdGgsIG91dHB1dFBhdGhGbjogT3V0cHV0UGF0aEZuLFxuICAgICAgdHJhbnNsYXRpb25zOiBUcmFuc2xhdGlvbkJ1bmRsZVtdLCBzb3VyY2VMb2NhbGU/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpbnB1dFBhdGhzLmZvckVhY2goaW5wdXRQYXRoID0+IHtcbiAgICAgIGNvbnN0IGFic0lucHV0UGF0aCA9IHRoaXMuZnMucmVzb2x2ZShyb290UGF0aCwgaW5wdXRQYXRoKTtcbiAgICAgIGNvbnN0IGNvbnRlbnRzID0gdGhpcy5mcy5yZWFkRmlsZUJ1ZmZlcihhYnNJbnB1dFBhdGgpO1xuICAgICAgY29uc3QgcmVsYXRpdmVQYXRoID0gdGhpcy5mcy5yZWxhdGl2ZShyb290UGF0aCwgYWJzSW5wdXRQYXRoKTtcbiAgICAgIGZvciAoY29uc3QgcmVzb3VyY2VIYW5kbGVyIG9mIHRoaXMucmVzb3VyY2VIYW5kbGVycykge1xuICAgICAgICBpZiAocmVzb3VyY2VIYW5kbGVyLmNhblRyYW5zbGF0ZShyZWxhdGl2ZVBhdGgsIGNvbnRlbnRzKSkge1xuICAgICAgICAgIHJldHVybiByZXNvdXJjZUhhbmRsZXIudHJhbnNsYXRlKFxuICAgICAgICAgICAgICB0aGlzLmRpYWdub3N0aWNzLCByb290UGF0aCwgcmVsYXRpdmVQYXRoLCBjb250ZW50cywgb3V0cHV0UGF0aEZuLCB0cmFuc2xhdGlvbnMsXG4gICAgICAgICAgICAgIHNvdXJjZUxvY2FsZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuZGlhZ25vc3RpY3MuZXJyb3IoYFVuYWJsZSB0byBoYW5kbGUgcmVzb3VyY2UgZmlsZTogJHtpbnB1dFBhdGh9YCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==