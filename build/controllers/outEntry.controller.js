"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOutEntry = exports.updateOutEntry = exports.getOutEntry = exports.createOutEntry = exports.getOutEntries = void 0;
const constants_1 = require("../constants/constants");
const outEntry_1 = require("../models/outEntry");
const getOutEntries = async (req, res, next) => {
    const { page } = req.query;
    try {
        const outEntries = await outEntry_1.OutEntry.paginate({}, { limit: constants_1.PER_PAGE, page: +page || 1, sort: { updatedAt: -1 } });
        return res.status(200).json({ outEntries });
    }
    catch (error) {
        next(error);
    }
};
exports.getOutEntries = getOutEntries;
const createOutEntry = async (req, res, next) => {
    const { date, entries } = req.body;
    try {
        const outEntry = new outEntry_1.OutEntry({ date: new Date(date), entries });
        const result = await outEntry.save();
        return res.status(201).json({ outEntry: result });
    }
    catch (error) {
        next(error);
    }
};
exports.createOutEntry = createOutEntry;
const getOutEntry = async (req, res, next) => {
    const { outEntryId } = req.params;
    try {
        const outEntry = await outEntry_1.OutEntry.findById(outEntryId);
        if (!outEntry) {
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
        return res.status(200).json({ outEntry });
    }
    catch (error) {
        next(error);
    }
};
exports.getOutEntry = getOutEntry;
const updateOutEntry = async (req, res, next) => {
    const { outEntryId } = req.params;
    const { date, entries } = req.body;
    try {
        const outEntry = await outEntry_1.OutEntry.findById(outEntryId);
        if (!outEntry) {
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
        outEntry.date = new Date(date);
        outEntry.entries = entries;
        const result = await outEntry.save();
        return res.status(200).json({ outEntry: result });
    }
    catch (error) {
        next(error);
    }
};
exports.updateOutEntry = updateOutEntry;
const deleteOutEntry = async (req, res, next) => {
    const { outEntryId } = req.params;
    try {
        const outEntry = await outEntry_1.OutEntry.findByIdAndDelete(outEntryId);
        if (!outEntry) {
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
        return res.status(200).json({ outEntry });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteOutEntry = deleteOutEntry;
//# sourceMappingURL=outEntry.controller.js.map