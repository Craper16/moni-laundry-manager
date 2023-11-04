"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const mongoose_1 = require("mongoose");
const itemSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.Item = (0, mongoose_1.model)('Item', itemSchema);
//# sourceMappingURL=item.js.map