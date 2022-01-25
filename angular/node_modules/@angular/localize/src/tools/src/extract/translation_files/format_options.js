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
        define("@angular/localize/src/tools/src/extract/translation_files/format_options", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseFormatOptions = exports.validateOptions = void 0;
    /**
     * Check that the given `options` are allowed based on the given `validOptions`.
     * @param name The name of the serializer that is receiving the options.
     * @param validOptions An array of valid options and their allowed values.
     * @param options The options to be validated.
     */
    function validateOptions(name, validOptions, options) {
        var validOptionsMap = new Map(validOptions);
        for (var option in options) {
            if (!validOptionsMap.has(option)) {
                throw new Error("Invalid format option for " + name + ": \"" + option + "\".\n" +
                    ("Allowed options are " + JSON.stringify(Array.from(validOptionsMap.keys())) + "."));
            }
            var validOptionValues = validOptionsMap.get(option);
            var optionValue = options[option];
            if (!validOptionValues.includes(optionValue)) {
                throw new Error("Invalid format option value for " + name + ": \"" + option + "\".\n" +
                    ("Allowed option values are " + JSON.stringify(validOptionValues) + " but received \"" + optionValue + "\"."));
            }
        }
    }
    exports.validateOptions = validateOptions;
    /**
     * Parse the given `optionString` into a collection of `FormatOptions`.
     * @param optionString The string to parse.
     */
    function parseFormatOptions(optionString) {
        if (optionString === void 0) { optionString = '{}'; }
        return JSON.parse(optionString);
    }
    exports.parseFormatOptions = parseFormatOptions;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0X29wdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9sb2NhbGl6ZS9zcmMvdG9vbHMvc3JjL2V4dHJhY3QvdHJhbnNsYXRpb25fZmlsZXMvZm9ybWF0X29wdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7O0lBTUg7Ozs7O09BS0c7SUFDSCxTQUFnQixlQUFlLENBQUMsSUFBWSxFQUFFLFlBQTBCLEVBQUUsT0FBc0I7UUFDOUYsSUFBTSxlQUFlLEdBQUcsSUFBSSxHQUFHLENBQWlDLFlBQVksQ0FBQyxDQUFDO1FBQzlFLEtBQUssSUFBTSxNQUFNLElBQUksT0FBTyxFQUFFO1lBQzVCLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNoQyxNQUFNLElBQUksS0FBSyxDQUNYLCtCQUE2QixJQUFJLFlBQU0sTUFBTSxVQUFNO3FCQUNuRCx5QkFBdUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQUcsQ0FBQSxDQUFDLENBQUM7YUFDbkY7WUFDRCxJQUFNLGlCQUFpQixHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFFLENBQUM7WUFDdkQsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQzVDLE1BQU0sSUFBSSxLQUFLLENBQ1gscUNBQW1DLElBQUksWUFBTSxNQUFNLFVBQU07cUJBQ3pELCtCQUE2QixJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLHdCQUMxRCxXQUFXLFFBQUksQ0FBQSxDQUFDLENBQUM7YUFDMUI7U0FDRjtJQUNILENBQUM7SUFqQkQsMENBaUJDO0lBRUQ7OztPQUdHO0lBQ0gsU0FBZ0Isa0JBQWtCLENBQUMsWUFBMkI7UUFBM0IsNkJBQUEsRUFBQSxtQkFBMkI7UUFDNUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFGRCxnREFFQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5leHBvcnQgdHlwZSBGb3JtYXRPcHRpb25zID0gUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbmV4cG9ydCB0eXBlIFZhbGlkT3B0aW9uID0gW2tleTogc3RyaW5nLCB2YWx1ZXM6IHN0cmluZ1tdXTtcbmV4cG9ydCB0eXBlIFZhbGlkT3B0aW9ucyA9IFZhbGlkT3B0aW9uW107XG5cbi8qKlxuICogQ2hlY2sgdGhhdCB0aGUgZ2l2ZW4gYG9wdGlvbnNgIGFyZSBhbGxvd2VkIGJhc2VkIG9uIHRoZSBnaXZlbiBgdmFsaWRPcHRpb25zYC5cbiAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBzZXJpYWxpemVyIHRoYXQgaXMgcmVjZWl2aW5nIHRoZSBvcHRpb25zLlxuICogQHBhcmFtIHZhbGlkT3B0aW9ucyBBbiBhcnJheSBvZiB2YWxpZCBvcHRpb25zIGFuZCB0aGVpciBhbGxvd2VkIHZhbHVlcy5cbiAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIHRvIGJlIHZhbGlkYXRlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlT3B0aW9ucyhuYW1lOiBzdHJpbmcsIHZhbGlkT3B0aW9uczogVmFsaWRPcHRpb25zLCBvcHRpb25zOiBGb3JtYXRPcHRpb25zKSB7XG4gIGNvbnN0IHZhbGlkT3B0aW9uc01hcCA9IG5ldyBNYXA8VmFsaWRPcHRpb25bMF0sIFZhbGlkT3B0aW9uWzFdPih2YWxpZE9wdGlvbnMpO1xuICBmb3IgKGNvbnN0IG9wdGlvbiBpbiBvcHRpb25zKSB7XG4gICAgaWYgKCF2YWxpZE9wdGlvbnNNYXAuaGFzKG9wdGlvbikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgSW52YWxpZCBmb3JtYXQgb3B0aW9uIGZvciAke25hbWV9OiBcIiR7b3B0aW9ufVwiLlxcbmAgK1xuICAgICAgICAgIGBBbGxvd2VkIG9wdGlvbnMgYXJlICR7SlNPTi5zdHJpbmdpZnkoQXJyYXkuZnJvbSh2YWxpZE9wdGlvbnNNYXAua2V5cygpKSl9LmApO1xuICAgIH1cbiAgICBjb25zdCB2YWxpZE9wdGlvblZhbHVlcyA9IHZhbGlkT3B0aW9uc01hcC5nZXQob3B0aW9uKSE7XG4gICAgY29uc3Qgb3B0aW9uVmFsdWUgPSBvcHRpb25zW29wdGlvbl07XG4gICAgaWYgKCF2YWxpZE9wdGlvblZhbHVlcy5pbmNsdWRlcyhvcHRpb25WYWx1ZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgSW52YWxpZCBmb3JtYXQgb3B0aW9uIHZhbHVlIGZvciAke25hbWV9OiBcIiR7b3B0aW9ufVwiLlxcbmAgK1xuICAgICAgICAgIGBBbGxvd2VkIG9wdGlvbiB2YWx1ZXMgYXJlICR7SlNPTi5zdHJpbmdpZnkodmFsaWRPcHRpb25WYWx1ZXMpfSBidXQgcmVjZWl2ZWQgXCIke1xuICAgICAgICAgICAgICBvcHRpb25WYWx1ZX1cIi5gKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYG9wdGlvblN0cmluZ2AgaW50byBhIGNvbGxlY3Rpb24gb2YgYEZvcm1hdE9wdGlvbnNgLlxuICogQHBhcmFtIG9wdGlvblN0cmluZyBUaGUgc3RyaW5nIHRvIHBhcnNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VGb3JtYXRPcHRpb25zKG9wdGlvblN0cmluZzogc3RyaW5nID0gJ3t9Jyk6IEZvcm1hdE9wdGlvbnMge1xuICByZXR1cm4gSlNPTi5wYXJzZShvcHRpb25TdHJpbmcpO1xufSJdfQ==