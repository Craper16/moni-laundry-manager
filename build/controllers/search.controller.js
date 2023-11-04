"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchOutEntries = exports.searchInEntries = void 0;
const inEntry_1 = require("../models/inEntry");
const constants_1 = require("../constants/constants");
const outEntry_1 = require("../models/outEntry");
const searchInEntries = async (req, res, next) => {
    const { page, date_from, date_to } = req.query;
    try {
        const inEntries = await inEntry_1.InEntry.paginate({
            date: { $gte: new Date(date_from), $lte: new Date(date_to) },
        }, { limit: constants_1.PER_PAGE, page: +page ?? 1, sort: { updatedAt: -1 } });
        return res.status(200).json({ inEntries });
    }
    catch (error) {
        next(error);
    }
};
exports.searchInEntries = searchInEntries;
const searchOutEntries = async (req, res, next) => {
    const { page, date_from, date_to } = req.query;
    try {
        const outEntries = await outEntry_1.OutEntry.paginate({ date: { $gte: new Date(date_from), $lte: new Date(date_to) } }, { limit: constants_1.PER_PAGE, page: +page ?? 1, sort: { updatedAt: -1 } });
        return res.status(200).json({ outEntries });
    }
    catch (error) {
        next(error);
    }
};
exports.searchOutEntries = searchOutEntries;
//# sourceMappingURL=search.controller.js.map