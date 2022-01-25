(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/extract/translation_files/json_translation_serializer", ["require", "exports", "tslib"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SimpleJsonTranslationSerializer = void 0;
    var tslib_1 = require("tslib");
    /**
     * This is a semi-public bespoke serialization format that is used for testing and sometimes as a
     * format for storing translations that will be inlined at runtime.
     *
     * @see SimpleJsonTranslationParser
     */
    var SimpleJsonTranslationSerializer = /** @class */ (function () {
        function SimpleJsonTranslationSerializer(sourceLocale) {
            this.sourceLocale = sourceLocale;
        }
        SimpleJsonTranslationSerializer.prototype.serialize = function (messages) {
            var e_1, _a;
            var fileObj = { locale: this.sourceLocale, translations: {} };
            try {
                for (var messages_1 = tslib_1.__values(messages), messages_1_1 = messages_1.next(); !messages_1_1.done; messages_1_1 = messages_1.next()) {
                    var message = messages_1_1.value;
                    fileObj.translations[message.id] = message.text;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (messages_1_1 && !messages_1_1.done && (_a = messages_1.return)) _a.call(messages_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return JSON.stringify(fileObj, null, 2);
        };
        return SimpleJsonTranslationSerializer;
    }());
    exports.SimpleJsonTranslationSerializer = SimpleJsonTranslationSerializer;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbl90cmFuc2xhdGlvbl9zZXJpYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbG9jYWxpemUvc3JjL3Rvb2xzL3NyYy9leHRyYWN0L3RyYW5zbGF0aW9uX2ZpbGVzL2pzb25fdHJhbnNsYXRpb25fc2VyaWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBZ0JBOzs7OztPQUtHO0lBQ0g7UUFDRSx5Q0FBb0IsWUFBb0I7WUFBcEIsaUJBQVksR0FBWixZQUFZLENBQVE7UUFBRyxDQUFDO1FBQzVDLG1EQUFTLEdBQVQsVUFBVSxRQUEwQjs7WUFDbEMsSUFBTSxPQUFPLEdBQThCLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBQyxDQUFDOztnQkFDekYsS0FBc0IsSUFBQSxhQUFBLGlCQUFBLFFBQVEsQ0FBQSxrQ0FBQSx3REFBRTtvQkFBM0IsSUFBTSxPQUFPLHFCQUFBO29CQUNoQixPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO2lCQUNqRDs7Ozs7Ozs7O1lBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUNILHNDQUFDO0lBQUQsQ0FBQyxBQVRELElBU0M7SUFUWSwwRUFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7ybVNZXNzYWdlSWQsIMm1UGFyc2VkTWVzc2FnZSwgybVTb3VyY2VNZXNzYWdlfSBmcm9tICdAYW5ndWxhci9sb2NhbGl6ZSc7XG5pbXBvcnQge1RyYW5zbGF0aW9uU2VyaWFsaXplcn0gZnJvbSAnLi90cmFuc2xhdGlvbl9zZXJpYWxpemVyJztcblxuXG5pbnRlcmZhY2UgU2ltcGxlSnNvblRyYW5zbGF0aW9uRmlsZSB7XG4gIGxvY2FsZTogc3RyaW5nO1xuICB0cmFuc2xhdGlvbnM6IFJlY29yZDzJtU1lc3NhZ2VJZCwgybVTb3VyY2VNZXNzYWdlPjtcbn1cblxuLyoqXG4gKiBUaGlzIGlzIGEgc2VtaS1wdWJsaWMgYmVzcG9rZSBzZXJpYWxpemF0aW9uIGZvcm1hdCB0aGF0IGlzIHVzZWQgZm9yIHRlc3RpbmcgYW5kIHNvbWV0aW1lcyBhcyBhXG4gKiBmb3JtYXQgZm9yIHN0b3JpbmcgdHJhbnNsYXRpb25zIHRoYXQgd2lsbCBiZSBpbmxpbmVkIGF0IHJ1bnRpbWUuXG4gKlxuICogQHNlZSBTaW1wbGVKc29uVHJhbnNsYXRpb25QYXJzZXJcbiAqL1xuZXhwb3J0IGNsYXNzIFNpbXBsZUpzb25UcmFuc2xhdGlvblNlcmlhbGl6ZXIgaW1wbGVtZW50cyBUcmFuc2xhdGlvblNlcmlhbGl6ZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNvdXJjZUxvY2FsZTogc3RyaW5nKSB7fVxuICBzZXJpYWxpemUobWVzc2FnZXM6IMm1UGFyc2VkTWVzc2FnZVtdKTogc3RyaW5nIHtcbiAgICBjb25zdCBmaWxlT2JqOiBTaW1wbGVKc29uVHJhbnNsYXRpb25GaWxlID0ge2xvY2FsZTogdGhpcy5zb3VyY2VMb2NhbGUsIHRyYW5zbGF0aW9uczoge319O1xuICAgIGZvciAoY29uc3QgbWVzc2FnZSBvZiBtZXNzYWdlcykge1xuICAgICAgZmlsZU9iai50cmFuc2xhdGlvbnNbbWVzc2FnZS5pZF0gPSBtZXNzYWdlLnRleHQ7XG4gICAgfVxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShmaWxlT2JqLCBudWxsLCAyKTtcbiAgfVxufVxuIl19