(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/extract/source_files/es2015_extract_plugin", ["require", "exports", "tslib", "@angular/localize", "@angular/localize/src/tools/src/source_file_utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.makeEs2015ExtractPlugin = void 0;
    var tslib_1 = require("tslib");
    var localize_1 = require("@angular/localize");
    var source_file_utils_1 = require("@angular/localize/src/tools/src/source_file_utils");
    function makeEs2015ExtractPlugin(fs, messages, localizeName) {
        if (localizeName === void 0) { localizeName = '$localize'; }
        return {
            visitor: {
                TaggedTemplateExpression: function (path) {
                    var tag = path.get('tag');
                    if (source_file_utils_1.isNamedIdentifier(tag, localizeName) && source_file_utils_1.isGlobalIdentifier(tag)) {
                        var quasiPath = path.get('quasi');
                        var _a = tslib_1.__read(source_file_utils_1.unwrapMessagePartsFromTemplateLiteral(quasiPath.get('quasis'), fs), 2), messageParts = _a[0], messagePartLocations = _a[1];
                        var _b = tslib_1.__read(source_file_utils_1.unwrapExpressionsFromTemplateLiteral(quasiPath, fs), 2), expressions = _b[0], expressionLocations = _b[1];
                        var location = source_file_utils_1.getLocation(fs, quasiPath);
                        var message = localize_1.ɵparseMessage(messageParts, expressions, location, messagePartLocations, expressionLocations);
                        messages.push(message);
                    }
                }
            }
        };
    }
    exports.makeEs2015ExtractPlugin = makeEs2015ExtractPlugin;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXMyMDE1X2V4dHJhY3RfcGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbG9jYWxpemUvc3JjL3Rvb2xzL3NyYy9leHRyYWN0L3NvdXJjZV9maWxlcy9lczIwMTVfZXh0cmFjdF9wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQVFBLDhDQUFnRTtJQUloRSx1RkFBd0s7SUFFeEssU0FBZ0IsdUJBQXVCLENBQ25DLEVBQWMsRUFBRSxRQUEwQixFQUFFLFlBQTBCO1FBQTFCLDZCQUFBLEVBQUEsMEJBQTBCO1FBQ3hFLE9BQU87WUFDTCxPQUFPLEVBQUU7Z0JBQ1Asd0JBQXdCLEVBQXhCLFVBQXlCLElBQXdDO29CQUMvRCxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUM1QixJQUFJLHFDQUFpQixDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsSUFBSSxzQ0FBa0IsQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDbkUsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDOUIsSUFBQSxLQUFBLGVBQ0YseURBQXFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBQSxFQUQvRCxZQUFZLFFBQUEsRUFBRSxvQkFBb0IsUUFDNkIsQ0FBQzt3QkFDakUsSUFBQSxLQUFBLGVBQ0Ysd0RBQW9DLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxJQUFBLEVBRGhELFdBQVcsUUFBQSxFQUFFLG1CQUFtQixRQUNnQixDQUFDO3dCQUN4RCxJQUFNLFFBQVEsR0FBRywrQkFBVyxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQzt3QkFDNUMsSUFBTSxPQUFPLEdBQUcsd0JBQWEsQ0FDekIsWUFBWSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsb0JBQW9CLEVBQUUsbUJBQW1CLENBQUMsQ0FBQzt3QkFDcEYsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDeEI7Z0JBQ0gsQ0FBQzthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFwQkQsMERBb0JDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0ZpbGVTeXN0ZW19IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyLWNsaS9zcmMvbmd0c2MvZmlsZV9zeXN0ZW0nO1xuaW1wb3J0IHvJtVBhcnNlZE1lc3NhZ2UsIMm1cGFyc2VNZXNzYWdlfSBmcm9tICdAYW5ndWxhci9sb2NhbGl6ZSc7XG5pbXBvcnQge05vZGVQYXRoLCBQbHVnaW5PYmp9IGZyb20gJ0BiYWJlbC9jb3JlJztcbmltcG9ydCB7VGFnZ2VkVGVtcGxhdGVFeHByZXNzaW9ufSBmcm9tICdAYmFiZWwvdHlwZXMnO1xuXG5pbXBvcnQge2dldExvY2F0aW9uLCBpc0dsb2JhbElkZW50aWZpZXIsIGlzTmFtZWRJZGVudGlmaWVyLCB1bndyYXBFeHByZXNzaW9uc0Zyb21UZW1wbGF0ZUxpdGVyYWwsIHVud3JhcE1lc3NhZ2VQYXJ0c0Zyb21UZW1wbGF0ZUxpdGVyYWx9IGZyb20gJy4uLy4uL3NvdXJjZV9maWxlX3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VFczIwMTVFeHRyYWN0UGx1Z2luKFxuICAgIGZzOiBGaWxlU3lzdGVtLCBtZXNzYWdlczogybVQYXJzZWRNZXNzYWdlW10sIGxvY2FsaXplTmFtZSA9ICckbG9jYWxpemUnKTogUGx1Z2luT2JqIHtcbiAgcmV0dXJuIHtcbiAgICB2aXNpdG9yOiB7XG4gICAgICBUYWdnZWRUZW1wbGF0ZUV4cHJlc3Npb24ocGF0aDogTm9kZVBhdGg8VGFnZ2VkVGVtcGxhdGVFeHByZXNzaW9uPikge1xuICAgICAgICBjb25zdCB0YWcgPSBwYXRoLmdldCgndGFnJyk7XG4gICAgICAgIGlmIChpc05hbWVkSWRlbnRpZmllcih0YWcsIGxvY2FsaXplTmFtZSkgJiYgaXNHbG9iYWxJZGVudGlmaWVyKHRhZykpIHtcbiAgICAgICAgICBjb25zdCBxdWFzaVBhdGggPSBwYXRoLmdldCgncXVhc2knKTtcbiAgICAgICAgICBjb25zdCBbbWVzc2FnZVBhcnRzLCBtZXNzYWdlUGFydExvY2F0aW9uc10gPVxuICAgICAgICAgICAgICB1bndyYXBNZXNzYWdlUGFydHNGcm9tVGVtcGxhdGVMaXRlcmFsKHF1YXNpUGF0aC5nZXQoJ3F1YXNpcycpLCBmcyk7XG4gICAgICAgICAgY29uc3QgW2V4cHJlc3Npb25zLCBleHByZXNzaW9uTG9jYXRpb25zXSA9XG4gICAgICAgICAgICAgIHVud3JhcEV4cHJlc3Npb25zRnJvbVRlbXBsYXRlTGl0ZXJhbChxdWFzaVBhdGgsIGZzKTtcbiAgICAgICAgICBjb25zdCBsb2NhdGlvbiA9IGdldExvY2F0aW9uKGZzLCBxdWFzaVBhdGgpO1xuICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSDJtXBhcnNlTWVzc2FnZShcbiAgICAgICAgICAgICAgbWVzc2FnZVBhcnRzLCBleHByZXNzaW9ucywgbG9jYXRpb24sIG1lc3NhZ2VQYXJ0TG9jYXRpb25zLCBleHByZXNzaW9uTG9jYXRpb25zKTtcbiAgICAgICAgICBtZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuIl19