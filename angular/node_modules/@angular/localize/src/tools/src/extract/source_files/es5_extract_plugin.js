(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/extract/source_files/es5_extract_plugin", ["require", "exports", "tslib", "@angular/localize", "@angular/localize/src/tools/src/source_file_utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.makeEs5ExtractPlugin = void 0;
    var tslib_1 = require("tslib");
    var localize_1 = require("@angular/localize");
    var source_file_utils_1 = require("@angular/localize/src/tools/src/source_file_utils");
    function makeEs5ExtractPlugin(fs, messages, localizeName) {
        if (localizeName === void 0) { localizeName = '$localize'; }
        return {
            visitor: {
                CallExpression: function (callPath) {
                    var calleePath = callPath.get('callee');
                    if (source_file_utils_1.isNamedIdentifier(calleePath, localizeName) && source_file_utils_1.isGlobalIdentifier(calleePath)) {
                        var _a = tslib_1.__read(source_file_utils_1.unwrapMessagePartsFromLocalizeCall(callPath, fs), 2), messageParts = _a[0], messagePartLocations = _a[1];
                        var _b = tslib_1.__read(source_file_utils_1.unwrapSubstitutionsFromLocalizeCall(callPath, fs), 2), expressions = _b[0], expressionLocations = _b[1];
                        var _c = tslib_1.__read(callPath.get('arguments'), 2), messagePartsArg = _c[0], expressionsArg = _c[1];
                        var location = source_file_utils_1.getLocation(fs, messagePartsArg, expressionsArg);
                        var message = localize_1.ɵparseMessage(messageParts, expressions, location, messagePartLocations, expressionLocations);
                        messages.push(message);
                    }
                }
            }
        };
    }
    exports.makeEs5ExtractPlugin = makeEs5ExtractPlugin;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXM1X2V4dHJhY3RfcGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbG9jYWxpemUvc3JjL3Rvb2xzL3NyYy9leHRyYWN0L3NvdXJjZV9maWxlcy9lczVfZXh0cmFjdF9wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQVFBLDhDQUFnRTtJQUloRSx1RkFBb0s7SUFFcEssU0FBZ0Isb0JBQW9CLENBQ2hDLEVBQWMsRUFBRSxRQUEwQixFQUFFLFlBQTBCO1FBQTFCLDZCQUFBLEVBQUEsMEJBQTBCO1FBQ3hFLE9BQU87WUFDTCxPQUFPLEVBQUU7Z0JBQ1AsY0FBYyxFQUFkLFVBQWUsUUFBa0M7b0JBQy9DLElBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQzFDLElBQUkscUNBQWlCLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxJQUFJLHNDQUFrQixDQUFDLFVBQVUsQ0FBQyxFQUFFO3dCQUMzRSxJQUFBLEtBQUEsZUFDRixzREFBa0MsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLElBQUEsRUFEN0MsWUFBWSxRQUFBLEVBQUUsb0JBQW9CLFFBQ1csQ0FBQzt3QkFDL0MsSUFBQSxLQUFBLGVBQ0YsdURBQW1DLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxJQUFBLEVBRDlDLFdBQVcsUUFBQSxFQUFFLG1CQUFtQixRQUNjLENBQUM7d0JBQ2hELElBQUEsS0FBQSxlQUFvQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFBLEVBQTVELGVBQWUsUUFBQSxFQUFFLGNBQWMsUUFBNkIsQ0FBQzt3QkFDcEUsSUFBTSxRQUFRLEdBQUcsK0JBQVcsQ0FBQyxFQUFFLEVBQUUsZUFBZSxFQUFFLGNBQWMsQ0FBQyxDQUFDO3dCQUNsRSxJQUFNLE9BQU8sR0FBRyx3QkFBYSxDQUN6QixZQUFZLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO3dCQUNwRixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3FCQUN4QjtnQkFDSCxDQUFDO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQztJQXBCRCxvREFvQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7RmlsZVN5c3RlbX0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXItY2xpL3NyYy9uZ3RzYy9maWxlX3N5c3RlbSc7XG5pbXBvcnQge8m1UGFyc2VkTWVzc2FnZSwgybVwYXJzZU1lc3NhZ2V9IGZyb20gJ0Bhbmd1bGFyL2xvY2FsaXplJztcbmltcG9ydCB7Tm9kZVBhdGgsIFBsdWdpbk9ian0gZnJvbSAnQGJhYmVsL2NvcmUnO1xuaW1wb3J0IHtDYWxsRXhwcmVzc2lvbn0gZnJvbSAnQGJhYmVsL3R5cGVzJztcblxuaW1wb3J0IHtnZXRMb2NhdGlvbiwgaXNHbG9iYWxJZGVudGlmaWVyLCBpc05hbWVkSWRlbnRpZmllciwgdW53cmFwTWVzc2FnZVBhcnRzRnJvbUxvY2FsaXplQ2FsbCwgdW53cmFwU3Vic3RpdHV0aW9uc0Zyb21Mb2NhbGl6ZUNhbGx9IGZyb20gJy4uLy4uL3NvdXJjZV9maWxlX3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VFczVFeHRyYWN0UGx1Z2luKFxuICAgIGZzOiBGaWxlU3lzdGVtLCBtZXNzYWdlczogybVQYXJzZWRNZXNzYWdlW10sIGxvY2FsaXplTmFtZSA9ICckbG9jYWxpemUnKTogUGx1Z2luT2JqIHtcbiAgcmV0dXJuIHtcbiAgICB2aXNpdG9yOiB7XG4gICAgICBDYWxsRXhwcmVzc2lvbihjYWxsUGF0aDogTm9kZVBhdGg8Q2FsbEV4cHJlc3Npb24+KSB7XG4gICAgICAgIGNvbnN0IGNhbGxlZVBhdGggPSBjYWxsUGF0aC5nZXQoJ2NhbGxlZScpO1xuICAgICAgICBpZiAoaXNOYW1lZElkZW50aWZpZXIoY2FsbGVlUGF0aCwgbG9jYWxpemVOYW1lKSAmJiBpc0dsb2JhbElkZW50aWZpZXIoY2FsbGVlUGF0aCkpIHtcbiAgICAgICAgICBjb25zdCBbbWVzc2FnZVBhcnRzLCBtZXNzYWdlUGFydExvY2F0aW9uc10gPVxuICAgICAgICAgICAgICB1bndyYXBNZXNzYWdlUGFydHNGcm9tTG9jYWxpemVDYWxsKGNhbGxQYXRoLCBmcyk7XG4gICAgICAgICAgY29uc3QgW2V4cHJlc3Npb25zLCBleHByZXNzaW9uTG9jYXRpb25zXSA9XG4gICAgICAgICAgICAgIHVud3JhcFN1YnN0aXR1dGlvbnNGcm9tTG9jYWxpemVDYWxsKGNhbGxQYXRoLCBmcyk7XG4gICAgICAgICAgY29uc3QgW21lc3NhZ2VQYXJ0c0FyZywgZXhwcmVzc2lvbnNBcmddID0gY2FsbFBhdGguZ2V0KCdhcmd1bWVudHMnKTtcbiAgICAgICAgICBjb25zdCBsb2NhdGlvbiA9IGdldExvY2F0aW9uKGZzLCBtZXNzYWdlUGFydHNBcmcsIGV4cHJlc3Npb25zQXJnKTtcbiAgICAgICAgICBjb25zdCBtZXNzYWdlID0gybVwYXJzZU1lc3NhZ2UoXG4gICAgICAgICAgICAgIG1lc3NhZ2VQYXJ0cywgZXhwcmVzc2lvbnMsIGxvY2F0aW9uLCBtZXNzYWdlUGFydExvY2F0aW9ucywgZXhwcmVzc2lvbkxvY2F0aW9ucyk7XG4gICAgICAgICAgbWVzc2FnZXMucHVzaChtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cbiJdfQ==