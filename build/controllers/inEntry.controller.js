"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonthEntry = exports.deleteInEntry = exports.updateInEntry = exports.getInEntry = exports.createInEntry = exports.getInEntries = void 0;
const inEntry_1 = require("../models/inEntry");
const constants_1 = require("../constants/constants");
const getInEntries = async (req, res, next) => {
    const { page } = req.query;
    try {
        const inEntries = await inEntry_1.InEntry.paginate({}, { limit: constants_1.PER_PAGE, page: +page || 1, sort: { updatedAt: -1 } });
        return res.status(200).json({ inEntries });
    }
    catch (error) {
        next(error);
    }
};
exports.getInEntries = getInEntries;
const createInEntry = async (req, res, next) => {
    const { date, entries } = req.body;
    try {
        const inEntry = new inEntry_1.InEntry({ date: new Date(date), entries });
        const result = await inEntry.save();
        return res.status(201).json({ inEntry: result });
    }
    catch (error) {
        next(error);
    }
};
exports.createInEntry = createInEntry;
const getInEntry = async (req, res, next) => {
    const { inEntryId } = req.params;
    try {
        const inEntry = await inEntry_1.InEntry.findById(inEntryId);
        if (!inEntry) {
            const newError = {
                message: 'In Entry not found',
                name: 'Not found',
                status: 404,
                data: {
                    message: 'In Entry not found',
                    statusCode: 404,
                },
            };
            throw newError;
        }
        return res.status(200).json({ inEntry });
    }
    catch (error) {
        next(error);
    }
};
exports.getInEntry = getInEntry;
const updateInEntry = async (req, res, next) => {
    const { inEntryId } = req.params;
    const { date, entries } = req.body;
    try {
        const inEntry = await inEntry_1.InEntry.findById(inEntryId);
        if (!inEntry) {
            const newError = {
                message: 'In Entry not found',
                name: 'Not found',
                status: 404,
                data: {
                    message: 'In Entry not found',
                    statusCode: 404,
                },
            };
            throw newError;
        }
        inEntry.date = new Date(date);
        inEntry.entries = entries;
        const result = await inEntry.save();
        return res.status(200).json({ inEntry: result });
    }
    catch (error) {
        next(error);
    }
};
exports.updateInEntry = updateInEntry;
const deleteInEntry = async (req, res, next) => {
    const { inEntryId } = req.params;
    try {
        const inEntry = await inEntry_1.InEntry.findByIdAndDelete(inEntryId);
        if (!inEntry) {
            const newError = {
                message: 'In Entry not found',
                name: 'Not found',
                status: 404,
                data: {
                    message: 'In Entry not found',
                    statusCode: 404,
                },
            };
            throw newError;
        }
        return res.status(200).json({ inEntry });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteInEntry = deleteInEntry;
const getMonthEntry = async (req, res, next) => {
    try {
    }
    catch (error) {
        next(error);
    }
};
exports.getMonthEntry = getMonthEntry;
//# sourceMappingURL=inEntry.controller.js.map