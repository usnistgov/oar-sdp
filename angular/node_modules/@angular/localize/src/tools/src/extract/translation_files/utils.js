(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/extract/translation_files/utils", ["require", "exports", "tslib"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hasLocation = exports.consolidateMessages = void 0;
    var tslib_1 = require("tslib");
    /**
     * Consolidate an array of messages into a map from message id to an array of messages with that id.
     *
     * @param messages the messages to consolidate.
     * @param getMessageId a function that will compute the message id of a message.
     */
    function consolidateMessages(messages, getMessageId) {
        var e_1, _a;
        var consolidateMessages = new Map();
        try {
            for (var messages_1 = tslib_1.__values(messages), messages_1_1 = messages_1.next(); !messages_1_1.done; messages_1_1 = messages_1.next()) {
                var message = messages_1_1.value;
                var id = getMessageId(message);
                if (!consolidateMessages.has(id)) {
                    consolidateMessages.set(id, [message]);
                }
                else {
                    consolidateMessages.get(id).push(message);
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
        return consolidateMessages;
    }
    exports.consolidateMessages = consolidateMessages;
    /**
     * Does the given message have a location property?
     */
    function hasLocation(message) {
        return message.location !== undefined;
    }
    exports.hasLocation = hasLocation;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9sb2NhbGl6ZS9zcmMvdG9vbHMvc3JjL2V4dHJhY3QvdHJhbnNsYXRpb25fZmlsZXMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQVNBOzs7OztPQUtHO0lBQ0gsU0FBZ0IsbUJBQW1CLENBQy9CLFFBQTBCLEVBQzFCLFlBQWlEOztRQUNuRCxJQUFNLG1CQUFtQixHQUFHLElBQUksR0FBRyxFQUFnQyxDQUFDOztZQUNwRSxLQUFzQixJQUFBLGFBQUEsaUJBQUEsUUFBUSxDQUFBLGtDQUFBLHdEQUFFO2dCQUEzQixJQUFNLE9BQU8scUJBQUE7Z0JBQ2hCLElBQU0sRUFBRSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDakMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDaEMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7aUJBQ3hDO3FCQUFNO29CQUNMLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQzVDO2FBQ0Y7Ozs7Ozs7OztRQUNELE9BQU8sbUJBQW1CLENBQUM7SUFDN0IsQ0FBQztJQWJELGtEQWFDO0lBRUQ7O09BRUc7SUFDSCxTQUFnQixXQUFXLENBQUMsT0FBdUI7UUFFakQsT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQztJQUN4QyxDQUFDO0lBSEQsa0NBR0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7ybVNZXNzYWdlSWQsIMm1UGFyc2VkTWVzc2FnZSwgybVTb3VyY2VMb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvbG9jYWxpemUnO1xuXG4vKipcbiAqIENvbnNvbGlkYXRlIGFuIGFycmF5IG9mIG1lc3NhZ2VzIGludG8gYSBtYXAgZnJvbSBtZXNzYWdlIGlkIHRvIGFuIGFycmF5IG9mIG1lc3NhZ2VzIHdpdGggdGhhdCBpZC5cbiAqXG4gKiBAcGFyYW0gbWVzc2FnZXMgdGhlIG1lc3NhZ2VzIHRvIGNvbnNvbGlkYXRlLlxuICogQHBhcmFtIGdldE1lc3NhZ2VJZCBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBjb21wdXRlIHRoZSBtZXNzYWdlIGlkIG9mIGEgbWVzc2FnZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnNvbGlkYXRlTWVzc2FnZXMoXG4gICAgbWVzc2FnZXM6IMm1UGFyc2VkTWVzc2FnZVtdLFxuICAgIGdldE1lc3NhZ2VJZDogKG1lc3NhZ2U6IMm1UGFyc2VkTWVzc2FnZSkgPT4gc3RyaW5nKTogTWFwPMm1TWVzc2FnZUlkLCDJtVBhcnNlZE1lc3NhZ2VbXT4ge1xuICBjb25zdCBjb25zb2xpZGF0ZU1lc3NhZ2VzID0gbmV3IE1hcDzJtU1lc3NhZ2VJZCwgybVQYXJzZWRNZXNzYWdlW10+KCk7XG4gIGZvciAoY29uc3QgbWVzc2FnZSBvZiBtZXNzYWdlcykge1xuICAgIGNvbnN0IGlkID0gZ2V0TWVzc2FnZUlkKG1lc3NhZ2UpO1xuICAgIGlmICghY29uc29saWRhdGVNZXNzYWdlcy5oYXMoaWQpKSB7XG4gICAgICBjb25zb2xpZGF0ZU1lc3NhZ2VzLnNldChpZCwgW21lc3NhZ2VdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29saWRhdGVNZXNzYWdlcy5nZXQoaWQpIS5wdXNoKG1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY29uc29saWRhdGVNZXNzYWdlcztcbn1cblxuLyoqXG4gKiBEb2VzIHRoZSBnaXZlbiBtZXNzYWdlIGhhdmUgYSBsb2NhdGlvbiBwcm9wZXJ0eT9cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc0xvY2F0aW9uKG1lc3NhZ2U6IMm1UGFyc2VkTWVzc2FnZSk6IG1lc3NhZ2UgaXMgybVQYXJzZWRNZXNzYWdlJlxuICAgIHtsb2NhdGlvbjogybVTb3VyY2VMb2NhdGlvbn0ge1xuICByZXR1cm4gbWVzc2FnZS5sb2NhdGlvbiAhPT0gdW5kZWZpbmVkO1xufVxuIl19