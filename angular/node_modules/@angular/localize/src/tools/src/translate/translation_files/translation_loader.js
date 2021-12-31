(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/translation_files/translation_loader", ["require", "exports", "tslib", "@angular/localize/src/tools/src/file_utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var file_utils_1 = require("@angular/localize/src/tools/src/file_utils");
    /**
     * Use this class to load a collection of translation files from disk.
     */
    var TranslationLoader = /** @class */ (function () {
        function TranslationLoader(translationParsers, diagnostics) {
            this.translationParsers = translationParsers;
            this.diagnostics = diagnostics;
        }
        /**
         * Load and parse the translation files into a collection of `TranslationBundles`.
         *
         * If there is a locale provided in `translationFileLocales` then this is used rather than the
         * locale extracted from the file itself.
         * If there is neither a provided locale nor a locale parsed from the file, then an error is
         * thrown.
         * If there are both a provided locale and a locale parsed from the file, and they are not the
         * same, then a warning is reported .
         *
         * @param translationFilePaths An array of absolute paths to the translation files.
         * @param translationFileLocales An array of locales for each of the translation files.
         */
        TranslationLoader.prototype.loadBundles = function (translationFilePaths, translationFileLocales) {
            var _this = this;
            return translationFilePaths.map(function (filePath, index) {
                var e_1, _a;
                var fileContents = file_utils_1.FileUtils.readFile(filePath);
                try {
                    for (var _b = tslib_1.__values(_this.translationParsers), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var translationParser = _c.value;
                        if (translationParser.canParse(filePath, fileContents)) {
                            var providedLocale = translationFileLocales[index];
                            var _d = translationParser.parse(filePath, fileContents), parsedLocale = _d.locale, translations = _d.translations;
                            var locale = providedLocale || parsedLocale;
                            if (locale === undefined) {
                                throw new Error("The translation file \"" + filePath + "\" does not contain a target locale and no explicit locale was provided for this file.");
                            }
                            if (parsedLocale !== undefined && providedLocale !== undefined &&
                                parsedLocale !== providedLocale) {
                                _this.diagnostics.warn("The provided locale \"" + providedLocale + "\" does not match the target locale \"" + parsedLocale + "\" found in the translation file \"" + filePath + "\".");
                            }
                            return { locale: locale, translations: translations };
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
                throw new Error("There is no \"TranslationParser\" that can parse this translation file: " + filePath + ".");
            });
        };
        return TranslationLoader;
    }());
    exports.TranslationLoader = TranslationLoader;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb25fbG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbG9jYWxpemUvc3JjL3Rvb2xzL3NyYy90cmFuc2xhdGUvdHJhbnNsYXRpb25fZmlsZXMvdHJhbnNsYXRpb25fbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQVFBLHlFQUEyQztJQUkzQzs7T0FFRztJQUNIO1FBQ0UsMkJBQW9CLGtCQUF1QyxFQUFVLFdBQXdCO1lBQXpFLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBcUI7WUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFHLENBQUM7UUFFakc7Ozs7Ozs7Ozs7OztXQVlHO1FBQ0gsdUNBQVcsR0FBWCxVQUFZLG9CQUE4QixFQUFFLHNCQUE0QztZQUF4RixpQkF5QkM7WUF2QkMsT0FBTyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsVUFBQyxRQUFRLEVBQUUsS0FBSzs7Z0JBQzlDLElBQU0sWUFBWSxHQUFHLHNCQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztvQkFDbEQsS0FBZ0MsSUFBQSxLQUFBLGlCQUFBLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQSxnQkFBQSw0QkFBRTt3QkFBcEQsSUFBTSxpQkFBaUIsV0FBQTt3QkFDMUIsSUFBSSxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxFQUFFOzRCQUN0RCxJQUFNLGNBQWMsR0FBRyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDL0MsSUFBQSxvREFDNkMsRUFENUMsd0JBQW9CLEVBQUUsOEJBQ3NCLENBQUM7NEJBQ3BELElBQU0sTUFBTSxHQUFHLGNBQWMsSUFBSSxZQUFZLENBQUM7NEJBQzlDLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtnQ0FDeEIsTUFBTSxJQUFJLEtBQUssQ0FDWCw0QkFBeUIsUUFBUSwyRkFBdUYsQ0FBQyxDQUFDOzZCQUMvSDs0QkFDRCxJQUFJLFlBQVksS0FBSyxTQUFTLElBQUksY0FBYyxLQUFLLFNBQVM7Z0NBQzFELFlBQVksS0FBSyxjQUFjLEVBQUU7Z0NBQ25DLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUNqQiwyQkFBd0IsY0FBYyw4Q0FBdUMsWUFBWSwyQ0FBb0MsUUFBUSxRQUFJLENBQUMsQ0FBQzs2QkFDaEo7NEJBQ0QsT0FBTyxFQUFDLE1BQU0sUUFBQSxFQUFFLFlBQVksY0FBQSxFQUFDLENBQUM7eUJBQy9CO3FCQUNGOzs7Ozs7Ozs7Z0JBQ0QsTUFBTSxJQUFJLEtBQUssQ0FDWCw2RUFBeUUsUUFBUSxNQUFHLENBQUMsQ0FBQztZQUM1RixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFDSCx3QkFBQztJQUFELENBQUMsQUExQ0QsSUEwQ0M7SUExQ1ksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtEaWFnbm9zdGljc30gZnJvbSAnLi4vLi4vZGlhZ25vc3RpY3MnO1xuaW1wb3J0IHtGaWxlVXRpbHN9IGZyb20gJy4uLy4uL2ZpbGVfdXRpbHMnO1xuaW1wb3J0IHtUcmFuc2xhdGlvbkJ1bmRsZX0gZnJvbSAnLi4vdHJhbnNsYXRvcic7XG5pbXBvcnQge1RyYW5zbGF0aW9uUGFyc2VyfSBmcm9tICcuL3RyYW5zbGF0aW9uX3BhcnNlcnMvdHJhbnNsYXRpb25fcGFyc2VyJztcblxuLyoqXG4gKiBVc2UgdGhpcyBjbGFzcyB0byBsb2FkIGEgY29sbGVjdGlvbiBvZiB0cmFuc2xhdGlvbiBmaWxlcyBmcm9tIGRpc2suXG4gKi9cbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGlvbkxvYWRlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJhbnNsYXRpb25QYXJzZXJzOiBUcmFuc2xhdGlvblBhcnNlcltdLCBwcml2YXRlIGRpYWdub3N0aWNzOiBEaWFnbm9zdGljcykge31cblxuICAvKipcbiAgICogTG9hZCBhbmQgcGFyc2UgdGhlIHRyYW5zbGF0aW9uIGZpbGVzIGludG8gYSBjb2xsZWN0aW9uIG9mIGBUcmFuc2xhdGlvbkJ1bmRsZXNgLlxuICAgKlxuICAgKiBJZiB0aGVyZSBpcyBhIGxvY2FsZSBwcm92aWRlZCBpbiBgdHJhbnNsYXRpb25GaWxlTG9jYWxlc2AgdGhlbiB0aGlzIGlzIHVzZWQgcmF0aGVyIHRoYW4gdGhlXG4gICAqIGxvY2FsZSBleHRyYWN0ZWQgZnJvbSB0aGUgZmlsZSBpdHNlbGYuXG4gICAqIElmIHRoZXJlIGlzIG5laXRoZXIgYSBwcm92aWRlZCBsb2NhbGUgbm9yIGEgbG9jYWxlIHBhcnNlZCBmcm9tIHRoZSBmaWxlLCB0aGVuIGFuIGVycm9yIGlzXG4gICAqIHRocm93bi5cbiAgICogSWYgdGhlcmUgYXJlIGJvdGggYSBwcm92aWRlZCBsb2NhbGUgYW5kIGEgbG9jYWxlIHBhcnNlZCBmcm9tIHRoZSBmaWxlLCBhbmQgdGhleSBhcmUgbm90IHRoZVxuICAgKiBzYW1lLCB0aGVuIGEgd2FybmluZyBpcyByZXBvcnRlZCAuXG4gICAqXG4gICAqIEBwYXJhbSB0cmFuc2xhdGlvbkZpbGVQYXRocyBBbiBhcnJheSBvZiBhYnNvbHV0ZSBwYXRocyB0byB0aGUgdHJhbnNsYXRpb24gZmlsZXMuXG4gICAqIEBwYXJhbSB0cmFuc2xhdGlvbkZpbGVMb2NhbGVzIEFuIGFycmF5IG9mIGxvY2FsZXMgZm9yIGVhY2ggb2YgdGhlIHRyYW5zbGF0aW9uIGZpbGVzLlxuICAgKi9cbiAgbG9hZEJ1bmRsZXModHJhbnNsYXRpb25GaWxlUGF0aHM6IHN0cmluZ1tdLCB0cmFuc2xhdGlvbkZpbGVMb2NhbGVzOiAoc3RyaW5nfHVuZGVmaW5lZClbXSk6XG4gICAgICBUcmFuc2xhdGlvbkJ1bmRsZVtdIHtcbiAgICByZXR1cm4gdHJhbnNsYXRpb25GaWxlUGF0aHMubWFwKChmaWxlUGF0aCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGZpbGVDb250ZW50cyA9IEZpbGVVdGlscy5yZWFkRmlsZShmaWxlUGF0aCk7XG4gICAgICBmb3IgKGNvbnN0IHRyYW5zbGF0aW9uUGFyc2VyIG9mIHRoaXMudHJhbnNsYXRpb25QYXJzZXJzKSB7XG4gICAgICAgIGlmICh0cmFuc2xhdGlvblBhcnNlci5jYW5QYXJzZShmaWxlUGF0aCwgZmlsZUNvbnRlbnRzKSkge1xuICAgICAgICAgIGNvbnN0IHByb3ZpZGVkTG9jYWxlID0gdHJhbnNsYXRpb25GaWxlTG9jYWxlc1tpbmRleF07XG4gICAgICAgICAgY29uc3Qge2xvY2FsZTogcGFyc2VkTG9jYWxlLCB0cmFuc2xhdGlvbnN9ID1cbiAgICAgICAgICAgICAgdHJhbnNsYXRpb25QYXJzZXIucGFyc2UoZmlsZVBhdGgsIGZpbGVDb250ZW50cyk7XG4gICAgICAgICAgY29uc3QgbG9jYWxlID0gcHJvdmlkZWRMb2NhbGUgfHwgcGFyc2VkTG9jYWxlO1xuICAgICAgICAgIGlmIChsb2NhbGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgIGBUaGUgdHJhbnNsYXRpb24gZmlsZSBcIiR7ZmlsZVBhdGh9XCIgZG9lcyBub3QgY29udGFpbiBhIHRhcmdldCBsb2NhbGUgYW5kIG5vIGV4cGxpY2l0IGxvY2FsZSB3YXMgcHJvdmlkZWQgZm9yIHRoaXMgZmlsZS5gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHBhcnNlZExvY2FsZSAhPT0gdW5kZWZpbmVkICYmIHByb3ZpZGVkTG9jYWxlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgcGFyc2VkTG9jYWxlICE9PSBwcm92aWRlZExvY2FsZSkge1xuICAgICAgICAgICAgdGhpcy5kaWFnbm9zdGljcy53YXJuKFxuICAgICAgICAgICAgICAgIGBUaGUgcHJvdmlkZWQgbG9jYWxlIFwiJHtwcm92aWRlZExvY2FsZX1cIiBkb2VzIG5vdCBtYXRjaCB0aGUgdGFyZ2V0IGxvY2FsZSBcIiR7cGFyc2VkTG9jYWxlfVwiIGZvdW5kIGluIHRoZSB0cmFuc2xhdGlvbiBmaWxlIFwiJHtmaWxlUGF0aH1cIi5gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHtsb2NhbGUsIHRyYW5zbGF0aW9uc307XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgVGhlcmUgaXMgbm8gXCJUcmFuc2xhdGlvblBhcnNlclwiIHRoYXQgY2FuIHBhcnNlIHRoaXMgdHJhbnNsYXRpb24gZmlsZTogJHtmaWxlUGF0aH0uYCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==