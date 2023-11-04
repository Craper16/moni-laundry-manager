"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnEntry = void 0;
const dateHelpers_1 = require("./dateHelpers");
function returnEntry(entry) {
    const date = (0, dateHelpers_1.formatDate)(entry.date);
    return { ...entry, date };
}
exports.returnEntry = returnEntry;
//# sourceMappingURL=entries.js.map