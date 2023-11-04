"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDb = void 0;
const mongoose_1 = require("mongoose");
async function connectToDb() {
    return await (0, mongoose_1.connect)(process.env.DB_URI);
}
exports.connectToDb = connectToDb;
//# sourceMappingURL=db.js.map