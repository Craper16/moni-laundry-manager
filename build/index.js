"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./helpers/db");
const item_1 = __importDefault(require("./routes/item"));
const entry_1 = __importDefault(require("./routes/entry"));
(0, db_1.connectToDb)()
    .then(() => console.log('Connected'))
    .catch((error) => console.log(error));
const app = (0, express_1.default)();
app.use((0, express_1.json)());
app.use((0, express_1.urlencoded)({ extended: true }));
app.use((0, cors_1.default)());
app.use('/api/items', item_1.default);
app.use('/api/entries', entry_1.default);
app.use('*', (req, res) => {
    return res.status(404).json({ message: 'Endpoint does not exist' });
});
app.use((error, req, res, next) => {
    const { message, status, data } = error;
    res
        .status(status || 500)
        .json({ message: message || 'Internal server error', data: data });
});
app.listen(process.env.PORT || 8060);
//# sourceMappingURL=index.js.map