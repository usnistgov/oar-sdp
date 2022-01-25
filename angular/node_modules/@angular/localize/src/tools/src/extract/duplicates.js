(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/extract/duplicates", ["require", "exports", "tslib", "@angular/localize/src/tools/src/diagnostics", "@angular/localize/src/tools/src/source_file_utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.checkDuplicateMessages = void 0;
    var tslib_1 = require("tslib");
    var diagnostics_1 = require("@angular/localize/src/tools/src/diagnostics");
    var source_file_utils_1 = require("@angular/localize/src/tools/src/source_file_utils");
    /**
     * Check each of the given `messages` to find those that have the same id but different message
     * text. Add diagnostics messages for each of these duplicate messages to the given `diagnostics`
     * object (as necessary).
     */
    function checkDuplicateMessages(fs, messages, duplicateMessageHandling, basePath) {
        var e_1, _a, e_2, _b;
        var diagnostics = new diagnostics_1.Diagnostics();
        if (duplicateMessageHandling === 'ignore')
            return diagnostics;
        var messageMap = new Map();
        try {
            for (var messages_1 = tslib_1.__values(messages), messages_1_1 = messages_1.next(); !messages_1_1.done; messages_1_1 = messages_1.next()) {
                var message = messages_1_1.value;
                if (messageMap.has(message.id)) {
                    messageMap.get(message.id).push(message);
                }
                else {
                    messageMap.set(message.id, [message]);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (messages_1_1 && !messages_1_1.done && (_a = messages_1.return)) _a.call(messages_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var _loop_1 = function (duplicates) {
            if (duplicates.length <= 1)
                return "continue";
            if (duplicates.every(function (message) { return message.text === duplicates[0].text; }))
                return "continue";
            var diagnosticMessage = "Duplicate messages with id \"" + duplicates[0].id + "\":\n" +
                duplicates.map(function (message) { return serializeMessage(fs, basePath, message); }).join('\n');
            diagnostics.add(duplicateMessageHandling, diagnosticMessage);
        };
        try {
            for (var _c = tslib_1.__values(messageMap.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var duplicates = _d.value;
                _loop_1(duplicates);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return diagnostics;
    }
    exports.checkDuplicateMessages = checkDuplicateMessages;
    /**
     * Serialize the given `message` object into a string.
     */
    function serializeMessage(fs, basePath, message) {
        if (message.location === undefined) {
            return "   - \"" + message.text + "\"";
        }
        else {
            var locationFile = fs.relative(basePath, message.location.file);
            var locationPosition = source_file_utils_1.serializeLocationPosition(message.location);
            return "   - \"" + message.text + "\" : " + locationFile + ":" + locationPosition;
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVwbGljYXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2xvY2FsaXplL3NyYy90b29scy9zcmMvZXh0cmFjdC9kdXBsaWNhdGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUFVQSwyRUFBdUU7SUFDdkUsdUZBQStEO0lBRS9EOzs7O09BSUc7SUFDSCxTQUFnQixzQkFBc0IsQ0FDbEMsRUFBYyxFQUFFLFFBQTBCLEVBQzFDLHdCQUFvRCxFQUFFLFFBQXdCOztRQUNoRixJQUFNLFdBQVcsR0FBRyxJQUFJLHlCQUFXLEVBQUUsQ0FBQztRQUN0QyxJQUFJLHdCQUF3QixLQUFLLFFBQVE7WUFBRSxPQUFPLFdBQVcsQ0FBQztRQUU5RCxJQUFNLFVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBZ0MsQ0FBQzs7WUFDM0QsS0FBc0IsSUFBQSxhQUFBLGlCQUFBLFFBQVEsQ0FBQSxrQ0FBQSx3REFBRTtnQkFBM0IsSUFBTSxPQUFPLHFCQUFBO2dCQUNoQixJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFO29CQUM5QixVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQzNDO3FCQUFNO29CQUNMLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7aUJBQ3ZDO2FBQ0Y7Ozs7Ozs7OztnQ0FFVSxVQUFVO1lBQ25CLElBQUksVUFBVSxDQUFDLE1BQU0sSUFBSSxDQUFDO2tDQUFXO1lBQ3JDLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBbkMsQ0FBbUMsQ0FBQztrQ0FBVztZQUUvRSxJQUFNLGlCQUFpQixHQUFHLGtDQUErQixVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFNO2dCQUMzRSxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsRUFBdkMsQ0FBdUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsRixXQUFXLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLGlCQUFpQixDQUFDLENBQUM7OztZQU4vRCxLQUF5QixJQUFBLEtBQUEsaUJBQUEsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFBLGdCQUFBO2dCQUF2QyxJQUFNLFVBQVUsV0FBQTt3QkFBVixVQUFVO2FBT3BCOzs7Ozs7Ozs7UUFFRCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBekJELHdEQXlCQztJQUVEOztPQUVHO0lBQ0gsU0FBUyxnQkFBZ0IsQ0FDckIsRUFBYyxFQUFFLFFBQXdCLEVBQUUsT0FBdUI7UUFDbkUsSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRTtZQUNsQyxPQUFPLFlBQVMsT0FBTyxDQUFDLElBQUksT0FBRyxDQUFDO1NBQ2pDO2FBQU07WUFDTCxJQUFNLFlBQVksR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xFLElBQU0sZ0JBQWdCLEdBQUcsNkNBQXlCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3JFLE9BQU8sWUFBUyxPQUFPLENBQUMsSUFBSSxhQUFPLFlBQVksU0FBSSxnQkFBa0IsQ0FBQztTQUN2RTtJQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7QWJzb2x1dGVGc1BhdGgsIEZpbGVTeXN0ZW19IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyLWNsaS9zcmMvbmd0c2MvZmlsZV9zeXN0ZW0nO1xuaW1wb3J0IHvJtU1lc3NhZ2VJZCwgybVQYXJzZWRNZXNzYWdlfSBmcm9tICdAYW5ndWxhci9sb2NhbGl6ZSc7XG5cbmltcG9ydCB7RGlhZ25vc3RpY0hhbmRsaW5nU3RyYXRlZ3ksIERpYWdub3N0aWNzfSBmcm9tICcuLi9kaWFnbm9zdGljcyc7XG5pbXBvcnQge3NlcmlhbGl6ZUxvY2F0aW9uUG9zaXRpb259IGZyb20gJy4uL3NvdXJjZV9maWxlX3V0aWxzJztcblxuLyoqXG4gKiBDaGVjayBlYWNoIG9mIHRoZSBnaXZlbiBgbWVzc2FnZXNgIHRvIGZpbmQgdGhvc2UgdGhhdCBoYXZlIHRoZSBzYW1lIGlkIGJ1dCBkaWZmZXJlbnQgbWVzc2FnZVxuICogdGV4dC4gQWRkIGRpYWdub3N0aWNzIG1lc3NhZ2VzIGZvciBlYWNoIG9mIHRoZXNlIGR1cGxpY2F0ZSBtZXNzYWdlcyB0byB0aGUgZ2l2ZW4gYGRpYWdub3N0aWNzYFxuICogb2JqZWN0IChhcyBuZWNlc3NhcnkpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tEdXBsaWNhdGVNZXNzYWdlcyhcbiAgICBmczogRmlsZVN5c3RlbSwgbWVzc2FnZXM6IMm1UGFyc2VkTWVzc2FnZVtdLFxuICAgIGR1cGxpY2F0ZU1lc3NhZ2VIYW5kbGluZzogRGlhZ25vc3RpY0hhbmRsaW5nU3RyYXRlZ3ksIGJhc2VQYXRoOiBBYnNvbHV0ZUZzUGF0aCk6IERpYWdub3N0aWNzIHtcbiAgY29uc3QgZGlhZ25vc3RpY3MgPSBuZXcgRGlhZ25vc3RpY3MoKTtcbiAgaWYgKGR1cGxpY2F0ZU1lc3NhZ2VIYW5kbGluZyA9PT0gJ2lnbm9yZScpIHJldHVybiBkaWFnbm9zdGljcztcblxuICBjb25zdCBtZXNzYWdlTWFwID0gbmV3IE1hcDzJtU1lc3NhZ2VJZCwgybVQYXJzZWRNZXNzYWdlW10+KCk7XG4gIGZvciAoY29uc3QgbWVzc2FnZSBvZiBtZXNzYWdlcykge1xuICAgIGlmIChtZXNzYWdlTWFwLmhhcyhtZXNzYWdlLmlkKSkge1xuICAgICAgbWVzc2FnZU1hcC5nZXQobWVzc2FnZS5pZCkhLnB1c2gobWVzc2FnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lc3NhZ2VNYXAuc2V0KG1lc3NhZ2UuaWQsIFttZXNzYWdlXSk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChjb25zdCBkdXBsaWNhdGVzIG9mIG1lc3NhZ2VNYXAudmFsdWVzKCkpIHtcbiAgICBpZiAoZHVwbGljYXRlcy5sZW5ndGggPD0gMSkgY29udGludWU7XG4gICAgaWYgKGR1cGxpY2F0ZXMuZXZlcnkobWVzc2FnZSA9PiBtZXNzYWdlLnRleHQgPT09IGR1cGxpY2F0ZXNbMF0udGV4dCkpIGNvbnRpbnVlO1xuXG4gICAgY29uc3QgZGlhZ25vc3RpY01lc3NhZ2UgPSBgRHVwbGljYXRlIG1lc3NhZ2VzIHdpdGggaWQgXCIke2R1cGxpY2F0ZXNbMF0uaWR9XCI6XFxuYCArXG4gICAgICAgIGR1cGxpY2F0ZXMubWFwKG1lc3NhZ2UgPT4gc2VyaWFsaXplTWVzc2FnZShmcywgYmFzZVBhdGgsIG1lc3NhZ2UpKS5qb2luKCdcXG4nKTtcbiAgICBkaWFnbm9zdGljcy5hZGQoZHVwbGljYXRlTWVzc2FnZUhhbmRsaW5nLCBkaWFnbm9zdGljTWVzc2FnZSk7XG4gIH1cblxuICByZXR1cm4gZGlhZ25vc3RpY3M7XG59XG5cbi8qKlxuICogU2VyaWFsaXplIHRoZSBnaXZlbiBgbWVzc2FnZWAgb2JqZWN0IGludG8gYSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIHNlcmlhbGl6ZU1lc3NhZ2UoXG4gICAgZnM6IEZpbGVTeXN0ZW0sIGJhc2VQYXRoOiBBYnNvbHV0ZUZzUGF0aCwgbWVzc2FnZTogybVQYXJzZWRNZXNzYWdlKTogc3RyaW5nIHtcbiAgaWYgKG1lc3NhZ2UubG9jYXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBgICAgLSBcIiR7bWVzc2FnZS50ZXh0fVwiYDtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBsb2NhdGlvbkZpbGUgPSBmcy5yZWxhdGl2ZShiYXNlUGF0aCwgbWVzc2FnZS5sb2NhdGlvbi5maWxlKTtcbiAgICBjb25zdCBsb2NhdGlvblBvc2l0aW9uID0gc2VyaWFsaXplTG9jYXRpb25Qb3NpdGlvbihtZXNzYWdlLmxvY2F0aW9uKTtcbiAgICByZXR1cm4gYCAgIC0gXCIke21lc3NhZ2UudGV4dH1cIiA6ICR7bG9jYXRpb25GaWxlfToke2xvY2F0aW9uUG9zaXRpb259YDtcbiAgfVxufVxuIl19