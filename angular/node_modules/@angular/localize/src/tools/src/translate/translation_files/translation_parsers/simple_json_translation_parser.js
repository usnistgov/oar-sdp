(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/simple_json_translation_parser", ["require", "exports", "@angular/localize", "path"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var localize_1 = require("@angular/localize");
    var path_1 = require("path");
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
     */
    var SimpleJsonTranslationParser = /** @class */ (function () {
        function SimpleJsonTranslationParser() {
        }
        SimpleJsonTranslationParser.prototype.canParse = function (filePath, _contents) { return (path_1.extname(filePath) === '.json'); };
        SimpleJsonTranslationParser.prototype.parse = function (_filePath, contents) {
            var _a = JSON.parse(contents), parsedLocale = _a.locale, translations = _a.translations;
            var parsedTranslations = {};
            for (var messageId in translations) {
                var targetMessage = translations[messageId];
                parsedTranslations[messageId] = localize_1.ɵparseTranslation(targetMessage);
            }
            return { locale: parsedLocale, translations: parsedTranslations };
        };
        return SimpleJsonTranslationParser;
    }());
    exports.SimpleJsonTranslationParser = SimpleJsonTranslationParser;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlX2pzb25fdHJhbnNsYXRpb25fcGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbG9jYWxpemUvc3JjL3Rvb2xzL3NyYy90cmFuc2xhdGUvdHJhbnNsYXRpb25fZmlsZXMvdHJhbnNsYXRpb25fcGFyc2Vycy9zaW1wbGVfanNvbl90cmFuc2xhdGlvbl9wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQTs7Ozs7O09BTUc7SUFDSCw4Q0FBb0Y7SUFDcEYsNkJBQTZCO0lBRzdCOzs7Ozs7Ozs7Ozs7T0FZRztJQUNIO1FBQUE7UUFZQSxDQUFDO1FBWEMsOENBQVEsR0FBUixVQUFTLFFBQWdCLEVBQUUsU0FBaUIsSUFBYSxPQUFPLENBQUMsY0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsRywyQ0FBSyxHQUFMLFVBQU0sU0FBaUIsRUFBRSxRQUFnQjtZQUNqQyxJQUFBLHlCQUEyRCxFQUExRCx3QkFBb0IsRUFBRSw4QkFBb0MsQ0FBQztZQUNsRSxJQUFNLGtCQUFrQixHQUEyQyxFQUFFLENBQUM7WUFDdEUsS0FBSyxJQUFNLFNBQVMsSUFBSSxZQUFZLEVBQUU7Z0JBQ3BDLElBQU0sYUFBYSxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDOUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLEdBQUcsNEJBQWlCLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDbEU7WUFDRCxPQUFPLEVBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQztRQUNsRSxDQUFDO1FBQ0gsa0NBQUM7SUFBRCxDQUFDLEFBWkQsSUFZQztJQVpZLGtFQUEyQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7ybVNZXNzYWdlSWQsIMm1UGFyc2VkVHJhbnNsYXRpb24sIMm1cGFyc2VUcmFuc2xhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvbG9jYWxpemUnO1xuaW1wb3J0IHtleHRuYW1lfSBmcm9tICdwYXRoJztcbmltcG9ydCB7UGFyc2VkVHJhbnNsYXRpb25CdW5kbGUsIFRyYW5zbGF0aW9uUGFyc2VyfSBmcm9tICcuL3RyYW5zbGF0aW9uX3BhcnNlcic7XG5cbi8qKlxuICogQSB0cmFuc2xhdGlvbiBwYXJzZXIgdGhhdCBjYW4gcGFyc2UgSlNPTiB0aGF0IGhhcyB0aGUgZm9ybTpcbiAqXG4gKiBgYGBcbiAqIHtcbiAqICAgXCJsb2NhbGVcIjogXCIuLi5cIixcbiAqICAgXCJ0cmFuc2xhdGlvbnNcIjoge1xuICogICAgIFwibWVzc2FnZS1pZFwiOiBcIlRhcmdldCBtZXNzYWdlIHN0cmluZ1wiLFxuICogICAgIC4uLlxuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNsYXNzIFNpbXBsZUpzb25UcmFuc2xhdGlvblBhcnNlciBpbXBsZW1lbnRzIFRyYW5zbGF0aW9uUGFyc2VyIHtcbiAgY2FuUGFyc2UoZmlsZVBhdGg6IHN0cmluZywgX2NvbnRlbnRzOiBzdHJpbmcpOiBib29sZWFuIHsgcmV0dXJuIChleHRuYW1lKGZpbGVQYXRoKSA9PT0gJy5qc29uJyk7IH1cblxuICBwYXJzZShfZmlsZVBhdGg6IHN0cmluZywgY29udGVudHM6IHN0cmluZyk6IFBhcnNlZFRyYW5zbGF0aW9uQnVuZGxlIHtcbiAgICBjb25zdCB7bG9jYWxlOiBwYXJzZWRMb2NhbGUsIHRyYW5zbGF0aW9uc30gPSBKU09OLnBhcnNlKGNvbnRlbnRzKTtcbiAgICBjb25zdCBwYXJzZWRUcmFuc2xhdGlvbnM6IFJlY29yZDzJtU1lc3NhZ2VJZCwgybVQYXJzZWRUcmFuc2xhdGlvbj4gPSB7fTtcbiAgICBmb3IgKGNvbnN0IG1lc3NhZ2VJZCBpbiB0cmFuc2xhdGlvbnMpIHtcbiAgICAgIGNvbnN0IHRhcmdldE1lc3NhZ2UgPSB0cmFuc2xhdGlvbnNbbWVzc2FnZUlkXTtcbiAgICAgIHBhcnNlZFRyYW5zbGF0aW9uc1ttZXNzYWdlSWRdID0gybVwYXJzZVRyYW5zbGF0aW9uKHRhcmdldE1lc3NhZ2UpO1xuICAgIH1cbiAgICByZXR1cm4ge2xvY2FsZTogcGFyc2VkTG9jYWxlLCB0cmFuc2xhdGlvbnM6IHBhcnNlZFRyYW5zbGF0aW9uc307XG4gIH1cbn1cbiJdfQ==