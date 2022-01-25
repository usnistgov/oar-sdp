(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/translation_files/translation_loader", ["require", "exports", "tslib"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TranslationLoader = void 0;
    var tslib_1 = require("tslib");
    /**
     * Use this class to load a collection of translation files from disk.
     */
    var TranslationLoader = /** @class */ (function () {
        function TranslationLoader(fs, translationParsers, duplicateTranslation, 
        /** @deprecated */ diagnostics) {
            this.fs = fs;
            this.translationParsers = translationParsers;
            this.duplicateTranslation = duplicateTranslation;
            this.diagnostics = diagnostics;
        }
        /**
         * Load and parse the translation files into a collection of `TranslationBundles`.
         *
         * @param translationFilePaths An array, per locale, of absolute paths to translation files.
         *
         * For each locale to be translated, there is an element in `translationFilePaths`. Each element
         * is an array of absolute paths to translation files for that locale.
         * If the array contains more than one translation file, then the translations are merged.
         * If allowed by the `duplicateTranslation` property, when more than one translation has the same
         * message id, the message from the earlier translation file in the array is used.
         * For example, if the files are `[app.xlf, lib-1.xlf, lib-2.xlif]` then a message that appears in
         * `app.xlf` will override the same message in `lib-1.xlf` or `lib-2.xlf`.
         *
         * @param translationFileLocales An array of locales for each of the translation files.
         *
         * If there is a locale provided in `translationFileLocales` then this is used rather than a
         * locale extracted from the file itself.
         * If there is neither a provided locale nor a locale parsed from the file, then an error is
         * thrown.
         * If there are both a provided locale and a locale parsed from the file, and they are not the
         * same, then a warning is reported.
         */
        TranslationLoader.prototype.loadBundles = function (translationFilePaths, translationFileLocales) {
            var _this = this;
            return translationFilePaths.map(function (filePaths, index) {
                var providedLocale = translationFileLocales[index];
                return _this.mergeBundles(filePaths, providedLocale);
            });
        };
        /**
         * Load all the translations from the file at the given `filePath`.
         */
        TranslationLoader.prototype.loadBundle = function (filePath, providedLocale) {
            var e_1, _a, e_2, _b;
            var fileContents = this.fs.readFile(filePath);
            var unusedParsers = new Map();
            try {
                for (var _c = tslib_1.__values(this.translationParsers), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var translationParser = _d.value;
                    var result = translationParser.analyze(filePath, fileContents);
                    if (!result.canParse) {
                        unusedParsers.set(translationParser, result);
                        continue;
                    }
                    var _e = translationParser.parse(filePath, fileContents, result.hint), parsedLocale = _e.locale, translations = _e.translations, diagnostics = _e.diagnostics;
                    if (diagnostics.hasErrors) {
                        throw new Error(diagnostics.formatDiagnostics("The translation file \"" + filePath + "\" could not be parsed."));
                    }
                    var locale = providedLocale || parsedLocale;
                    if (locale === undefined) {
                        throw new Error("The translation file \"" + filePath + "\" does not contain a target locale and no explicit locale was provided for this file.");
                    }
                    if (parsedLocale !== undefined && providedLocale !== undefined &&
                        parsedLocale !== providedLocale) {
                        diagnostics.warn("The provided locale \"" + providedLocale + "\" does not match the target locale \"" + parsedLocale + "\" found in the translation file \"" + filePath + "\".");
                    }
                    // If we were passed a diagnostics object then copy the messages over to it.
                    if (this.diagnostics) {
                        this.diagnostics.merge(diagnostics);
                    }
                    return { locale: locale, translations: translations, diagnostics: diagnostics };
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var diagnosticsMessages = [];
            try {
                for (var _f = tslib_1.__values(unusedParsers.entries()), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var _h = tslib_1.__read(_g.value, 2), parser = _h[0], result = _h[1];
                    diagnosticsMessages.push(result.diagnostics.formatDiagnostics("\n" + parser.constructor.name + " cannot parse translation file."));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                }
                finally { if (e_2) throw e_2.error; }
            }
            throw new Error("There is no \"TranslationParser\" that can parse this translation file: " + filePath + "." +
                diagnosticsMessages.join('\n'));
        };
        /**
         * There is more than one `filePath` for this locale, so load each as a bundle and then merge
         * them all together.
         */
        TranslationLoader.prototype.mergeBundles = function (filePaths, providedLocale) {
            var _this = this;
            var bundles = filePaths.map(function (filePath) { return _this.loadBundle(filePath, providedLocale); });
            var bundle = bundles[0];
            var _loop_1 = function (i) {
                var nextBundle = bundles[i];
                if (nextBundle.locale !== bundle.locale) {
                    if (this_1.diagnostics) {
                        var previousFiles = filePaths.slice(0, i).map(function (f) { return "\"" + f + "\""; }).join(', ');
                        this_1.diagnostics.warn("When merging multiple translation files, the target locale \"" + nextBundle.locale + "\" found in \"" + filePaths[i] + "\" does not match the target locale \"" + bundle.locale + "\" found in earlier files [" + previousFiles + "].");
                    }
                }
                Object.keys(nextBundle.translations).forEach(function (messageId) {
                    var _a;
                    if (bundle.translations[messageId] !== undefined) {
                        (_a = _this.diagnostics) === null || _a === void 0 ? void 0 : _a.add(_this.duplicateTranslation, "Duplicate translations for message \"" + messageId + "\" when merging \"" + filePaths[i] + "\".");
                    }
                    else {
                        bundle.translations[messageId] = nextBundle.translations[messageId];
                    }
                });
            };
            var this_1 = this;
            for (var i = 1; i < bundles.length; i++) {
                _loop_1(i);
            }
            return bundle;
        };
        return TranslationLoader;
    }());
    exports.TranslationLoader = TranslationLoader;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb25fbG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbG9jYWxpemUvc3JjL3Rvb2xzL3NyYy90cmFuc2xhdGUvdHJhbnNsYXRpb25fZmlsZXMvdHJhbnNsYXRpb25fbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUFhQTs7T0FFRztJQUNIO1FBQ0UsMkJBQ1ksRUFBYyxFQUFVLGtCQUE0QyxFQUNwRSxvQkFBZ0Q7UUFDeEQsa0JBQWtCLENBQVMsV0FBeUI7WUFGNUMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtZQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBMEI7WUFDcEUseUJBQW9CLEdBQXBCLG9CQUFvQixDQUE0QjtZQUM3QixnQkFBVyxHQUFYLFdBQVcsQ0FBYztRQUFHLENBQUM7UUFFNUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQXFCRztRQUNILHVDQUFXLEdBQVgsVUFDSSxvQkFBd0MsRUFDeEMsc0JBQTRDO1lBRmhELGlCQU9DO1lBSkMsT0FBTyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsVUFBQyxTQUFTLEVBQUUsS0FBSztnQkFDL0MsSUFBTSxjQUFjLEdBQUcsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3JELE9BQU8sS0FBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDdEQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQ7O1dBRUc7UUFDSyxzQ0FBVSxHQUFsQixVQUFtQixRQUF3QixFQUFFLGNBQWdDOztZQUUzRSxJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRCxJQUFNLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBOEMsQ0FBQzs7Z0JBQzVFLEtBQWdDLElBQUEsS0FBQSxpQkFBQSxJQUFJLENB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QUMsSUFBSSxPQUFBLE9BQUksQ0FBQyxPQUFHLEVBQVIsQ0FBUSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUMxRSxPQUFLLFdBQVcsQ0FBQyxJQUFJLENBQUMsa0VBQ2xCLFVBQVUsQ0FBQyxNQUFNLHNCQUFlLFNBQVMsQ0FBQyxDQUFDLENBQUMsOENBQzVDLE1BQU0sQ0FBQyxNQUFNLG1DQUE2QixhQUFhLE9BQUksQ0FBQyxDQUFDO3FCQUNsRTtpQkFDRjtnQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxTQUFTOztvQkFDcEQsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFLLFNBQVMsRUFBRTt3QkFDaEQsTUFBQSxLQUFJLENBQUMsV0FBVywwQ0FBRSxHQUFHLENBQ2pCLEtBQUksQ0FBQyxvQkFBb0IsRUFDekIsMENBQXVDLFNBQVMsMEJBQW1CLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBSSxFQUFFO3FCQUMxRjt5QkFBTTt3QkFDTCxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7cUJBQ3JFO2dCQUNILENBQUMsQ0FBQyxDQUFDOzs7WUFsQkwsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO3dCQUE5QixDQUFDO2FBbUJUO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQztRQUNILHdCQUFDO0lBQUQsQ0FBQyxBQXZIRCxJQXVIQztJQXZIWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7QWJzb2x1dGVGc1BhdGgsIEZpbGVTeXN0ZW19IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyLWNsaS9zcmMvbmd0c2MvZmlsZV9zeXN0ZW0nO1xuaW1wb3J0IHtEaWFnbm9zdGljSGFuZGxpbmdTdHJhdGVneSwgRGlhZ25vc3RpY3N9IGZyb20gJy4uLy4uL2RpYWdub3N0aWNzJztcbmltcG9ydCB7VHJhbnNsYXRpb25CdW5kbGV9IGZyb20gJy4uL3RyYW5zbGF0b3InO1xuXG5pbXBvcnQge1BhcnNlQW5hbHlzaXMsIFRyYW5zbGF0aW9uUGFyc2VyfSBmcm9tICcuL3RyYW5zbGF0aW9uX3BhcnNlcnMvdHJhbnNsYXRpb25fcGFyc2VyJztcblxuLyoqXG4gKiBVc2UgdGhpcyBjbGFzcyB0byBsb2FkIGEgY29sbGVjdGlvbiBvZiB0cmFuc2xhdGlvbiBmaWxlcyBmcm9tIGRpc2suXG4gKi9cbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGlvbkxvYWRlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBmczogRmlsZVN5c3RlbSwgcHJpdmF0ZSB0cmFuc2xhdGlvblBhcnNlcnM6IFRyYW5zbGF0aW9uUGFyc2VyPGFueT5bXSxcbiAgICAgIHByaXZhdGUgZHVwbGljYXRlVHJhbnNsYXRpb246IERpYWdub3N0aWNIYW5kbGluZ1N0cmF0ZWd5LFxuICAgICAgLyoqIEBkZXByZWNhdGVkICovIHByaXZhdGUgZGlhZ25vc3RpY3M/OiBEaWFnbm9zdGljcykge31cblxuICAvKipcbiAgICogTG9hZCBhbmQgcGFyc2UgdGhlIHRyYW5zbGF0aW9uIGZpbGVzIGludG8gYSBjb2xsZWN0aW9uIG9mIGBUcmFuc2xhdGlvbkJ1bmRsZXNgLlxuICAgKlxuICAgKiBAcGFyYW0gdHJhbnNsYXRpb25GaWxlUGF0aHMgQW4gYXJyYXksIHBlciBsb2NhbGUsIG9mIGFic29sdXRlIHBhdGhzIHRvIHRyYW5zbGF0aW9uIGZpbGVzLlxuICAgKlxuICAgKiBGb3IgZWFjaCBsb2NhbGUgdG8gYmUgdHJhbnNsYXRlZCwgdGhlcmUgaXMgYW4gZWxlbWVudCBpbiBgdHJhbnNsYXRpb25GaWxlUGF0aHNgLiBFYWNoIGVsZW1lbnRcbiAgICogaXMgYW4gYXJyYXkgb2YgYWJzb2x1dGUgcGF0aHMgdG8gdHJhbnNsYXRpb24gZmlsZXMgZm9yIHRoYXQgbG9jYWxlLlxuICAgKiBJZiB0aGUgYXJyYXkgY29udGFpbnMgbW9yZSB0aGFuIG9uZSB0cmFuc2xhdGlvbiBmaWxlLCB0aGVuIHRoZSB0cmFuc2xhdGlvbnMgYXJlIG1lcmdlZC5cbiAgICogSWYgYWxsb3dlZCBieSB0aGUgYGR1cGxpY2F0ZVRyYW5zbGF0aW9uYCBwcm9wZXJ0eSwgd2hlbiBtb3JlIHRoYW4gb25lIHRyYW5zbGF0aW9uIGhhcyB0aGUgc2FtZVxuICAgKiBtZXNzYWdlIGlkLCB0aGUgbWVzc2FnZSBmcm9tIHRoZSBlYXJsaWVyIHRyYW5zbGF0aW9uIGZpbGUgaW4gdGhlIGFycmF5IGlzIHVzZWQuXG4gICAqIEZvciBleGFtcGxlLCBpZiB0aGUgZmlsZXMgYXJlIGBbYXBwLnhsZiwgbGliLTEueGxmLCBsaWItMi54bGlmXWAgdGhlbiBhIG1lc3NhZ2UgdGhhdCBhcHBlYXJzIGluXG4gICAqIGBhcHAueGxmYCB3aWxsIG92ZXJyaWRlIHRoZSBzYW1lIG1lc3NhZ2UgaW4gYGxpYi0xLnhsZmAgb3IgYGxpYi0yLnhsZmAuXG4gICAqXG4gICAqIEBwYXJhbSB0cmFuc2xhdGlvbkZpbGVMb2NhbGVzIEFuIGFycmF5IG9mIGxvY2FsZXMgZm9yIGVhY2ggb2YgdGhlIHRyYW5zbGF0aW9uIGZpbGVzLlxuICAgKlxuICAgKiBJZiB0aGVyZSBpcyBhIGxvY2FsZSBwcm92aWRlZCBpbiBgdHJhbnNsYXRpb25GaWxlTG9jYWxlc2AgdGhlbiB0aGlzIGlzIHVzZWQgcmF0aGVyIHRoYW4gYVxuICAgKiBsb2NhbGUgZXh0cmFjdGVkIGZyb20gdGhlIGZpbGUgaXRzZWxmLlxuICAgKiBJZiB0aGVyZSBpcyBuZWl0aGVyIGEgcHJvdmlkZWQgbG9jYWxlIG5vciBhIGxvY2FsZSBwYXJzZWQgZnJvbSB0aGUgZmlsZSwgdGhlbiBhbiBlcnJvciBpc1xuICAgKiB0aHJvd24uXG4gICAqIElmIHRoZXJlIGFyZSBib3RoIGEgcHJvdmlkZWQgbG9jYWxlIGFuZCBhIGxvY2FsZSBwYXJzZWQgZnJvbSB0aGUgZmlsZSwgYW5kIHRoZXkgYXJlIG5vdCB0aGVcbiAgICogc2FtZSwgdGhlbiBhIHdhcm5pbmcgaXMgcmVwb3J0ZWQuXG4gICAqL1xuICBsb2FkQnVuZGxlcyhcbiAgICAgIHRyYW5zbGF0aW9uRmlsZVBhdGhzOiBBYnNvbHV0ZUZzUGF0aFtdW10sXG4gICAgICB0cmFuc2xhdGlvbkZpbGVMb2NhbGVzOiAoc3RyaW5nfHVuZGVmaW5lZClbXSk6IFRyYW5zbGF0aW9uQnVuZGxlW10ge1xuICAgIHJldHVybiB0cmFuc2xhdGlvbkZpbGVQYXRocy5tYXAoKGZpbGVQYXRocywgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHByb3ZpZGVkTG9jYWxlID0gdHJhbnNsYXRpb25GaWxlTG9jYWxlc1tpbmRleF07XG4gICAgICByZXR1cm4gdGhpcy5tZXJnZUJ1bmRsZXMoZmlsZVBhdGhzLCBwcm92aWRlZExvY2FsZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTG9hZCBhbGwgdGhlIHRyYW5zbGF0aW9ucyBmcm9tIHRoZSBmaWxlIGF0IHRoZSBnaXZlbiBgZmlsZVBhdGhgLlxuICAgKi9cbiAgcHJpdmF0ZSBsb2FkQnVuZGxlKGZpbGVQYXRoOiBBYnNvbHV0ZUZzUGF0aCwgcHJvdmlkZWRMb2NhbGU6IHN0cmluZ3x1bmRlZmluZWQpOlxuICAgICAgVHJhbnNsYXRpb25CdW5kbGUge1xuICAgIGNvbnN0IGZpbGVDb250ZW50cyA9IHRoaXMuZnMucmVhZEZpbGUoZmlsZVBhdGgpO1xuICAgIGNvbnN0IHVudXNlZFBhcnNlcnMgPSBuZXcgTWFwPFRyYW5zbGF0aW9uUGFyc2VyPGFueT4sIFBhcnNlQW5hbHlzaXM8YW55Pj4oKTtcbiAgICBmb3IgKGNvbnN0IHRyYW5zbGF0aW9uUGFyc2VyIG9mIHRoaXMudHJhbnNsYXRpb25QYXJzZXJzKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSB0cmFuc2xhdGlvblBhcnNlci5hbmFseXplKGZpbGVQYXRoLCBmaWxlQ29udGVudHMpO1xuICAgICAgaWYgKCFyZXN1bHQuY2FuUGFyc2UpIHtcbiAgICAgICAgdW51c2VkUGFyc2Vycy5zZXQodHJhbnNsYXRpb25QYXJzZXIsIHJlc3VsdCk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7bG9jYWxlOiBwYXJzZWRMb2NhbGUsIHRyYW5zbGF0aW9ucywgZGlhZ25vc3RpY3N9ID1cbiAgICAgICAgICB0cmFuc2xhdGlvblBhcnNlci5wYXJzZShmaWxlUGF0aCwgZmlsZUNvbnRlbnRzLCByZXN1bHQuaGludCk7XG4gICAgICBpZiAoZGlhZ25vc3RpY3MuaGFzRXJyb3JzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihkaWFnbm9zdGljcy5mb3JtYXREaWFnbm9zdGljcyhcbiAgICAgICAgICAgIGBUaGUgdHJhbnNsYXRpb24gZmlsZSBcIiR7ZmlsZVBhdGh9XCIgY291bGQgbm90IGJlIHBhcnNlZC5gKSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxvY2FsZSA9IHByb3ZpZGVkTG9jYWxlIHx8IHBhcnNlZExvY2FsZTtcbiAgICAgIGlmIChsb2NhbGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSB0cmFuc2xhdGlvbiBmaWxlIFwiJHtcbiAgICAgICAgICAgIGZpbGVQYXRofVwiIGRvZXMgbm90IGNvbnRhaW4gYSB0YXJnZXQgbG9jYWxlIGFuZCBubyBleHBsaWNpdCBsb2NhbGUgd2FzIHByb3ZpZGVkIGZvciB0aGlzIGZpbGUuYCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJzZWRMb2NhbGUgIT09IHVuZGVmaW5lZCAmJiBwcm92aWRlZExvY2FsZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgcGFyc2VkTG9jYWxlICE9PSBwcm92aWRlZExvY2FsZSkge1xuICAgICAgICBkaWFnbm9zdGljcy53YXJuKFxuICAgICAgICAgICAgYFRoZSBwcm92aWRlZCBsb2NhbGUgXCIke3Byb3ZpZGVkTG9jYWxlfVwiIGRvZXMgbm90IG1hdGNoIHRoZSB0YXJnZXQgbG9jYWxlIFwiJHtcbiAgICAgICAgICAgICAgICBwYXJzZWRMb2NhbGV9XCIgZm91bmQgaW4gdGhlIHRyYW5zbGF0aW9uIGZpbGUgXCIke2ZpbGVQYXRofVwiLmApO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiB3ZSB3ZXJlIHBhc3NlZCBhIGRpYWdub3N0aWNzIG9iamVjdCB0aGVuIGNvcHkgdGhlIG1lc3NhZ2VzIG92ZXIgdG8gaXQuXG4gICAgICBpZiAodGhpcy5kaWFnbm9zdGljcykge1xuICAgICAgICB0aGlzLmRpYWdub3N0aWNzLm1lcmdlKGRpYWdub3N0aWNzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtsb2NhbGUsIHRyYW5zbGF0aW9ucywgZGlhZ25vc3RpY3N9O1xuICAgIH1cblxuICAgIGNvbnN0IGRpYWdub3N0aWNzTWVzc2FnZXM6IHN0cmluZ1tdID0gW107XG4gICAgZm9yIChjb25zdCBbcGFyc2VyLCByZXN1bHRdIG9mIHVudXNlZFBhcnNlcnMuZW50cmllcygpKSB7XG4gICAgICBkaWFnbm9zdGljc01lc3NhZ2VzLnB1c2gocmVzdWx0LmRpYWdub3N0aWNzLmZvcm1hdERpYWdub3N0aWNzKFxuICAgICAgICAgIGBcXG4ke3BhcnNlci5jb25zdHJ1Y3Rvci5uYW1lfSBjYW5ub3QgcGFyc2UgdHJhbnNsYXRpb24gZmlsZS5gKSk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFRoZXJlIGlzIG5vIFwiVHJhbnNsYXRpb25QYXJzZXJcIiB0aGF0IGNhbiBwYXJzZSB0aGlzIHRyYW5zbGF0aW9uIGZpbGU6ICR7ZmlsZVBhdGh9LmAgK1xuICAgICAgICBkaWFnbm9zdGljc01lc3NhZ2VzLmpvaW4oJ1xcbicpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGVyZSBpcyBtb3JlIHRoYW4gb25lIGBmaWxlUGF0aGAgZm9yIHRoaXMgbG9jYWxlLCBzbyBsb2FkIGVhY2ggYXMgYSBidW5kbGUgYW5kIHRoZW4gbWVyZ2VcbiAgICogdGhlbSBhbGwgdG9nZXRoZXIuXG4gICAqL1xuICBwcml2YXRlIG1lcmdlQnVuZGxlcyhmaWxlUGF0aHM6IEFic29sdXRlRnNQYXRoW10sIHByb3ZpZGVkTG9jYWxlOiBzdHJpbmd8dW5kZWZpbmVkKTpcbiAgICAgIFRyYW5zbGF0aW9uQnVuZGxlIHtcbiAgICBjb25zdCBidW5kbGVzID0gZmlsZVBhdGhzLm1hcChmaWxlUGF0aCA9PiB0aGlzLmxvYWRCdW5kbGUoZmlsZVBhdGgsIHByb3ZpZGVkTG9jYWxlKSk7XG4gICAgY29uc3QgYnVuZGxlID0gYnVuZGxlc1swXTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IGJ1bmRsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IG5leHRCdW5kbGUgPSBidW5kbGVzW2ldO1xuICAgICAgaWYgKG5leHRCdW5kbGUubG9jYWxlICE9PSBidW5kbGUubG9jYWxlKSB7XG4gICAgICAgIGlmICh0aGlzLmRpYWdub3N0aWNzKSB7XG4gICAgICAgICAgY29uc3QgcHJldmlvdXNGaWxlcyA9IGZpbGVQYXRocy5zbGljZSgwLCBpKS5tYXAoZiA9PiBgXCIke2Z9XCJgKS5qb2luKCcsICcpO1xuICAgICAgICAgIHRoaXMuZGlhZ25vc3RpY3Mud2FybihgV2hlbiBtZXJnaW5nIG11bHRpcGxlIHRyYW5zbGF0aW9uIGZpbGVzLCB0aGUgdGFyZ2V0IGxvY2FsZSBcIiR7XG4gICAgICAgICAgICAgIG5leHRCdW5kbGUubG9jYWxlfVwiIGZvdW5kIGluIFwiJHtmaWxlUGF0aHNbaV19XCIgZG9lcyBub3QgbWF0Y2ggdGhlIHRhcmdldCBsb2NhbGUgXCIke1xuICAgICAgICAgICAgICBidW5kbGUubG9jYWxlfVwiIGZvdW5kIGluIGVhcmxpZXIgZmlsZXMgWyR7cHJldmlvdXNGaWxlc31dLmApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBPYmplY3Qua2V5cyhuZXh0QnVuZGxlLnRyYW5zbGF0aW9ucykuZm9yRWFjaChtZXNzYWdlSWQgPT4ge1xuICAgICAgICBpZiAoYnVuZGxlLnRyYW5zbGF0aW9uc1ttZXNzYWdlSWRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLmRpYWdub3N0aWNzPy5hZGQoXG4gICAgICAgICAgICAgIHRoaXMuZHVwbGljYXRlVHJhbnNsYXRpb24sXG4gICAgICAgICAgICAgIGBEdXBsaWNhdGUgdHJhbnNsYXRpb25zIGZvciBtZXNzYWdlIFwiJHttZXNzYWdlSWR9XCIgd2hlbiBtZXJnaW5nIFwiJHtmaWxlUGF0aHNbaV19XCIuYCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnVuZGxlLnRyYW5zbGF0aW9uc1ttZXNzYWdlSWRdID0gbmV4dEJ1bmRsZS50cmFuc2xhdGlvbnNbbWVzc2FnZUlkXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBidW5kbGU7XG4gIH1cbn1cbiJdfQ==