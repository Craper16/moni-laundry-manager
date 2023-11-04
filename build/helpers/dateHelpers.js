"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
function formatDate(date) {
    if (!date)
        return '';
    return (0, dayjs_1.default)(date).format('YYYY-MM-DD');
}
exports.formatDate = formatDate;
//# sourceMappingURL=dateHelpers.js.map