(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/simple_json_translation_parser", ["require", "exports", "@angular/localize", "path", "@angular/localize/src/tools/src/diagnostics"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SimpleJsonTranslationParser = void 0;
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var localize_1 = require("@angular/localize");
    var path_1 = require("path");
    var diagnostics_1 = require("@angular/localize/src/tools/src/diagnostics");
    /**
     * A translation parser that can parse JSON that has the form:
     *
     * ```
     * {
     *   "locale": "...",
     *   "translations": {
     *     "message-id": "Target message string",
     *     ...
     *   }
     * }
     * ```
     *
     * @see SimpleJsonTranslationSerializer
     * @publicApi used by CLI
     */
    var SimpleJsonTranslationParser = /** @class */ (function () {
        function SimpleJsonTranslationParser() {
        }
        /**
         * @deprecated
         */
        SimpleJsonTranslationParser.prototype.canParse = function (filePath, contents) {
            var result = this.analyze(filePath, contents);
            return result.canParse && result.hint;
        };
        SimpleJsonTranslationParser.prototype.analyze = function (filePath, contents) {
            var diagnostics = new diagnostics_1.Diagnostics();
            if (path_1.extname(filePath) !== '.json') {
                diagnostics.warn('File does not have .json extension.');
                return { canParse: false, diagnostics: diagnostics };
            }
            try {
                var json = JSON.parse(contents);
                if (json.locale === undefined) {
                    diagnostics.warn('Required "locale" property missing.');
                    return { canParse: false, diagnostics: diagnostics };
                }
                if (typeof json.locale !== 'string') {
                    diagnostics.warn('The "locale" property is not a string.');
                    return { canParse: false, diagnostics: diagnostics };
                }
                if (json.translations === undefined) {
                    diagnostics.warn('Required "translations" property missing.');
                    return { canParse: false, diagnostics: diagnostics };
                }
                if (typeof json.translations !== 'object') {
                    diagnostics.warn('The "translations" is not an object.');
                    return { canParse: false, diagnostics: diagnostics };
                }
                return { canParse: true, diagnostics: diagnostics, hint: json };
            }
            catch (e) {
                diagnostics.warn('File is not valid JSON.');
                return { canParse: false, diagnostics: diagnostics };
            }
        };
        SimpleJsonTranslationParser.prototype.parse = function (_filePath, contents, json) {
            var _a = json || JSON.parse(contents), parsedLocale = _a.locale, translations = _a.translations;
            var parsedTranslations = {};
            for (var messageId in translations) {
                var targetMessage = translations[messageId];
                parsedTranslations[messageId] = localize_1.ɵparseTranslation(targetMessage);
            }
            return { locale: parsedLocale, translations: parsedTranslations, diagnostics: new diagnostics_1.Diagnostics() };
        };
        return SimpleJsonTranslationParser;
    }());
    exports.SimpleJsonTranslationParser = SimpleJsonTranslationParser;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlX2pzb25fdHJhbnNsYXRpb25fcGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbG9jYWxpemUvc3JjL3Rvb2xzL3NyYy90cmFuc2xhdGUvdHJhbnNsYXRpb25fZmlsZXMvdHJhbnNsYXRpb25fcGFyc2Vycy9zaW1wbGVfanNvbl90cmFuc2xhdGlvbl9wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBQUE7Ozs7OztPQU1HO0lBQ0gsOENBQW9GO0lBQ3BGLDZCQUE2QjtJQUM3QiwyRUFBaUQ7SUFJakQ7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0g7UUFBQTtRQWlEQSxDQUFDO1FBaERDOztXQUVHO1FBQ0gsOENBQVEsR0FBUixVQUFTLFFBQWdCLEVBQUUsUUFBZ0I7WUFDekMsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDaEQsT0FBTyxNQUFNLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDeEMsQ0FBQztRQUVELDZDQUFPLEdBQVAsVUFBUSxRQUFnQixFQUFFLFFBQWdCO1lBQ3hDLElBQU0sV0FBVyxHQUFHLElBQUkseUJBQVcsRUFBRSxDQUFDO1lBQ3RDLElBQUksY0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLE9BQU8sRUFBRTtnQkFDakMsV0FBVyxDQUFDLElBQUksQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO2dCQUN4RCxPQUFPLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxXQUFXLGFBQUEsRUFBQyxDQUFDO2FBQ3ZDO1lBQ0QsSUFBSTtnQkFDRixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO29CQUM3QixXQUFXLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxDQUFDLENBQUM7b0JBQ3hELE9BQU8sRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFdBQVcsYUFBQSxFQUFDLENBQUM7aUJBQ3ZDO2dCQUNELElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRTtvQkFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO29CQUMzRCxPQUFPLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxXQUFXLGFBQUEsRUFBQyxDQUFDO2lCQUN2QztnQkFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssU0FBUyxFQUFFO29CQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLDJDQUEyQyxDQUFDLENBQUM7b0JBQzlELE9BQU8sRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFdBQVcsYUFBQSxFQUFDLENBQUM7aUJBQ3ZDO2dCQUNELElBQUksT0FBTyxJQUFJLENBQUMsWUFBWSxLQUFLLFFBQVEsRUFBRTtvQkFDekMsV0FBVyxDQUFDLElBQUksQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO29CQUN6RCxPQUFPLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxXQUFXLGFBQUEsRUFBQyxDQUFDO2lCQUN2QztnQkFDRCxPQUFPLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxXQUFXLGFBQUEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUM7YUFDbEQ7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixXQUFXLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7Z0JBQzVDLE9BQU8sRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFdBQVcsYUFBQSxFQUFDLENBQUM7YUFDdkM7UUFDSCxDQUFDO1FBRUQsMkNBQUssR0FBTCxVQUFNLFNBQWlCLEVBQUUsUUFBZ0IsRUFBRSxJQUFhO1lBQ2hELElBQUEsS0FBdUMsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQTFELFlBQVksWUFBQSxFQUFFLFlBQVksa0JBQWdDLENBQUM7WUFDMUUsSUFBTSxrQkFBa0IsR0FBMkMsRUFBRSxDQUFDO1lBQ3RFLEtBQUssSUFBTSxTQUFTLElBQUksWUFBWSxFQUFFO2dCQUNwQyxJQUFNLGFBQWEsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzlDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxHQUFHLDRCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ2xFO1lBQ0QsT0FBTyxFQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxJQUFJLHlCQUFXLEVBQUUsRUFBQyxDQUFDO1FBQ2xHLENBQUM7UUFDSCxrQ0FBQztJQUFELENBQUMsQUFqREQsSUFpREM7SUFqRFksa0VBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge8m1TWVzc2FnZUlkLCDJtVBhcnNlZFRyYW5zbGF0aW9uLCDJtXBhcnNlVHJhbnNsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2xvY2FsaXplJztcbmltcG9ydCB7ZXh0bmFtZX0gZnJvbSAncGF0aCc7XG5pbXBvcnQge0RpYWdub3N0aWNzfSBmcm9tICcuLi8uLi8uLi9kaWFnbm9zdGljcyc7XG5cbmltcG9ydCB7UGFyc2VBbmFseXNpcywgUGFyc2VkVHJhbnNsYXRpb25CdW5kbGUsIFRyYW5zbGF0aW9uUGFyc2VyfSBmcm9tICcuL3RyYW5zbGF0aW9uX3BhcnNlcic7XG5cbi8qKlxuICogQSB0cmFuc2xhdGlvbiBwYXJzZXIgdGhhdCBjYW4gcGFyc2UgSlNPTiB0aGF0IGhhcyB0aGUgZm9ybTpcbiAqXG4gKiBgYGBcbiAqIHtcbiAqICAgXCJsb2NhbGVcIjogXCIuLi5cIixcbiAqICAgXCJ0cmFuc2xhdGlvbnNcIjoge1xuICogICAgIFwibWVzc2FnZS1pZFwiOiBcIlRhcmdldCBtZXNzYWdlIHN0cmluZ1wiLFxuICogICAgIC4uLlxuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAc2VlIFNpbXBsZUpzb25UcmFuc2xhdGlvblNlcmlhbGl6ZXJcbiAqIEBwdWJsaWNBcGkgdXNlZCBieSBDTElcbiAqL1xuZXhwb3J0IGNsYXNzIFNpbXBsZUpzb25UcmFuc2xhdGlvblBhcnNlciBpbXBsZW1lbnRzIFRyYW5zbGF0aW9uUGFyc2VyPE9iamVjdD4ge1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWRcbiAgICovXG4gIGNhblBhcnNlKGZpbGVQYXRoOiBzdHJpbmcsIGNvbnRlbnRzOiBzdHJpbmcpOiBPYmplY3R8ZmFsc2Uge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuYW5hbHl6ZShmaWxlUGF0aCwgY29udGVudHMpO1xuICAgIHJldHVybiByZXN1bHQuY2FuUGFyc2UgJiYgcmVzdWx0LmhpbnQ7XG4gIH1cblxuICBhbmFseXplKGZpbGVQYXRoOiBzdHJpbmcsIGNvbnRlbnRzOiBzdHJpbmcpOiBQYXJzZUFuYWx5c2lzPE9iamVjdD4ge1xuICAgIGNvbnN0IGRpYWdub3N0aWNzID0gbmV3IERpYWdub3N0aWNzKCk7XG4gICAgaWYgKGV4dG5hbWUoZmlsZVBhdGgpICE9PSAnLmpzb24nKSB7XG4gICAgICBkaWFnbm9zdGljcy53YXJuKCdGaWxlIGRvZXMgbm90IGhhdmUgLmpzb24gZXh0ZW5zaW9uLicpO1xuICAgICAgcmV0dXJuIHtjYW5QYXJzZTogZmFsc2UsIGRpYWdub3N0aWNzfTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGpzb24gPSBKU09OLnBhcnNlKGNvbnRlbnRzKTtcbiAgICAgIGlmIChqc29uLmxvY2FsZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRpYWdub3N0aWNzLndhcm4oJ1JlcXVpcmVkIFwibG9jYWxlXCIgcHJvcGVydHkgbWlzc2luZy4nKTtcbiAgICAgICAgcmV0dXJuIHtjYW5QYXJzZTogZmFsc2UsIGRpYWdub3N0aWNzfTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YganNvbi5sb2NhbGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGRpYWdub3N0aWNzLndhcm4oJ1RoZSBcImxvY2FsZVwiIHByb3BlcnR5IGlzIG5vdCBhIHN0cmluZy4nKTtcbiAgICAgICAgcmV0dXJuIHtjYW5QYXJzZTogZmFsc2UsIGRpYWdub3N0aWNzfTtcbiAgICAgIH1cbiAgICAgIGlmIChqc29uLnRyYW5zbGF0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRpYWdub3N0aWNzLndhcm4oJ1JlcXVpcmVkIFwidHJhbnNsYXRpb25zXCIgcHJvcGVydHkgbWlzc2luZy4nKTtcbiAgICAgICAgcmV0dXJuIHtjYW5QYXJzZTogZmFsc2UsIGRpYWdub3N0aWNzfTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YganNvbi50cmFuc2xhdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIGRpYWdub3N0aWNzLndhcm4oJ1RoZSBcInRyYW5zbGF0aW9uc1wiIGlzIG5vdCBhbiBvYmplY3QuJyk7XG4gICAgICAgIHJldHVybiB7Y2FuUGFyc2U6IGZhbHNlLCBkaWFnbm9zdGljc307XG4gICAgICB9XG4gICAgICByZXR1cm4ge2NhblBhcnNlOiB0cnVlLCBkaWFnbm9zdGljcywgaGludDoganNvbn07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZGlhZ25vc3RpY3Mud2FybignRmlsZSBpcyBub3QgdmFsaWQgSlNPTi4nKTtcbiAgICAgIHJldHVybiB7Y2FuUGFyc2U6IGZhbHNlLCBkaWFnbm9zdGljc307XG4gICAgfVxuICB9XG5cbiAgcGFyc2UoX2ZpbGVQYXRoOiBzdHJpbmcsIGNvbnRlbnRzOiBzdHJpbmcsIGpzb24/OiBPYmplY3QpOiBQYXJzZWRUcmFuc2xhdGlvbkJ1bmRsZSB7XG4gICAgY29uc3Qge2xvY2FsZTogcGFyc2VkTG9jYWxlLCB0cmFuc2xhdGlvbnN9ID0ganNvbiB8fCBKU09OLnBhcnNlKGNvbnRlbnRzKTtcbiAgICBjb25zdCBwYXJzZWRUcmFuc2xhdGlvbnM6IFJlY29yZDzJtU1lc3NhZ2VJZCwgybVQYXJzZWRUcmFuc2xhdGlvbj4gPSB7fTtcbiAgICBmb3IgKGNvbnN0IG1lc3NhZ2VJZCBpbiB0cmFuc2xhdGlvbnMpIHtcbiAgICAgIGNvbnN0IHRhcmdldE1lc3NhZ2UgPSB0cmFuc2xhdGlvbnNbbWVzc2FnZUlkXTtcbiAgICAgIHBhcnNlZFRyYW5zbGF0aW9uc1ttZXNzYWdlSWRdID0gybVwYXJzZVRyYW5zbGF0aW9uKHRhcmdldE1lc3NhZ2UpO1xuICAgIH1cbiAgICByZXR1cm4ge2xvY2FsZTogcGFyc2VkTG9jYWxlLCB0cmFuc2xhdGlvbnM6IHBhcnNlZFRyYW5zbGF0aW9ucywgZGlhZ25vc3RpY3M6IG5ldyBEaWFnbm9zdGljcygpfTtcbiAgfVxufVxuIl19