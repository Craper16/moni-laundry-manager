"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpecificDateEntries = exports.updateEntry = exports.deleteEntry = exports.getTotals = exports.getEntries = exports.getEntry = exports.createMultipleEntries = exports.createEntry = void 0;
const entry_1 = require("../models/entry");
const item_1 = require("../models/item");
const constants_1 = require("../constants/constants");
const dateHelpers_1 = require("../helpers/dateHelpers");
const createEntry = async (req, res, next) => {
    const { date, itemId, quantity, type } = req.body;
    const dateEntered = new Date(date);
    try {
        const item = await item_1.Item.findById(itemId);
        const itemAlreadyAdded = await entry_1.Entry.findOne({
            item: itemId,
            date: dateEntered,
            type,
        });
        if (itemAlreadyAdded) {
            const newError = {
                message: 'Entry already added',
                name: 'Already Added',
                status: 403,
                data: {
                    message: 'Entry already added',
                    statusCode: 403,
                },
            };
            throw newError;
        }
        if (!item) {
            const newError = {
                message: 'Item not found',
                name: 'Not found',
                status: 404,
                data: {
                    message: 'Item not found',
                    statusCode: 404,
                },
            };
            throw newError;
        }
        const entry = new entry_1.Entry({
            date: dateEntered,
            item: item?._id,
            quantity: quantity,
            type,
        });
        const result = await entry.save();
        return res.status(201).json({ entry: result });
    }
    catch (error) {
        next(error);
    }
};
exports.createEntry = createEntry;
const createMultipleEntries = async (req, res, next) => {
    const { date, type, entries } = req.body;
    const dateEntered = new Date(date);
    try {
        const createdEntries = await Promise.all(entries.map(async ({ itemId, quantity }) => {
            const itemAlreadyAdded = await entry_1.Entry.findOne({
                item: itemId,
                date: dateEntered,
                type,
            });
            if (itemAlreadyAdded) {
                const newError = {
                    message: `Entry item ${itemId} already added`,
                    name: 'Already Added',
                    status: 403,
                    data: {
                        message: `Entry item ${itemId} already added`,
                        statusCode: 403,
                    },
                };
                throw newError;
            }
            const item = await item_1.Item.findById(itemId);
            const entry = new entry_1.Entry({
                date: dateEntered,
                item: item?._id,
                type,
                quantity,
            });
            const result = await entry.save();
            return result;
        }));
        return res.status(201).json({ entries: createdEntries });
    }
    catch (error) {
        next(error);
    }
};
exports.createMultipleEntries = createMultipleEntries;
const getEntry = async (req, res, next) => {
    const { entry_id } = req.params;
    try {
        const entry = await entry_1.Entry.findById(entry_id);
        if (!entry) {
            const newError = {
                message: 'Entry not found',
                name: 'Not found',
                status: 404,
                data: {
                    message: 'Entry not found',
                    statusCode: 404,
                },
            };
            throw newError;
        }
        return res.status(200).json({ entry });
    }
    catch (error) {
        next(error);
    }
};
exports.getEntry = getEntry;
const getEntries = async (req, res, next) => {
    const { page, item_id, type, date_from, date_to, limit } = req.query;
    try {
        const dateFrom = date_from ? new Date(date_from) : undefined;
        const dateTo = date_to ? new Date(date_to) : undefined;
        const item = item_id ? await item_1.Item.findById(item_id) : undefined;
        if (!type) {
            const newError = {
                message: 'Please specify a type',
                name: 'No Type',
                status: 403,
                data: {
                    message: 'Please specify a type',
                    statusCode: 404,
                },
            };
            throw newError;
        }
        const entries = await entry_1.Entry.paginate({
            ...(dateFrom && dateTo && { date: { $gte: dateFrom, $lte: dateTo } }),
            ...(item_id && { item: item?._id }),
            type,
        }, {
            page: page ? +page : 1,
            sort: { date: -1 },
            limit: limit ? +limit : constants_1.PER_PAGE,
        });
        return res.status(200).json({ entries });
    }
    catch (error) {
        next(error);
    }
};
exports.getEntries = getEntries;
const getTotals = async (req, res, next) => {
    const { type, date_from, date_to } = req.query;
    if (!type) {
        const newError = {
            message: 'Please specify a type',
            name: 'No Type',
            status: 403,
            data: {
                message: 'Please specify a type',
                statusCode: 404,
            },
        };
        throw newError;
    }
    if (!date_from || !date_to) {
        const newError = {
            message: 'Dates not specified',
            name: 'No Type',
            status: 403,
            data: {
                message: 'Dates not specified',
                statusCode: 404,
            },
        };
        throw newError;
    }
    const dateFrom = date_from ? new Date(date_from) : undefined;
    const dateTo = date_to ? new Date(date_to) : undefined;
    try {
        const entries = await entry_1.Entry.find({
            date: { $gte: dateFrom, $lte: dateTo },
            type,
        });
        let finalEntries = [];
        for (const entry of entries) {
            const entryAlreadyInArray = finalEntries.findIndex((ent) => ent.item === entry.item);
            if (entryAlreadyInArray !== -1) {
                finalEntries[entryAlreadyInArray] = {
                    item: finalEntries[entryAlreadyInArray].item,
                    quantity: finalEntries[entryAlreadyInArray].quantity + entry.quantity,
                };
            }
            else {
                finalEntries.push({ item: entry.item, quantity: entry.quantity });
            }
        }
        return res.status(200).json({ totals: finalEntries });
    }
    catch (error) {
        next(error);
    }
};
exports.getTotals = getTotals;
const deleteEntry = async (req, res, next) => {
    const { entry_id } = req.params;
    try {
        const entry = await entry_1.Entry.findByIdAndDelete(entry_id);
        if (!entry) {
            const newError = {
                message: 'Entry not found',
                name: 'Not found',
                status: 404,
                data: {
                    message: 'Entry not found',
                    statusCode: 404,
                },
            };
            throw newError;
        }
        return res.status(200).json(entry);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteEntry = deleteEntry;
const updateEntry = async (req, res, next) => {
    const { entry_id } = req.params;
    const { date, itemId, quantity, type } = req.body;
    try {
        const entry = await entry_1.Entry.findById(entry_id);
        const item = await item_1.Item.findById(itemId);
        const dateEntered = new Date(date);
        if (!entry) {
            const newError = {
                message: 'Entry not found',
                name: 'Not found',
                status: 404,
                data: {
                    message: 'Entry not found',
                    statusCode: 404,
                },
            };
            throw newError;
        }
        if (!item) {
            const newError = {
                message: 'Item not found',
                name: 'Not found',
                status: 404,
                data: {
                    message: 'Item not found',
                    statusCode: 404,
                },
            };
            throw newError;
        }
        entry.item = item._id;
        entry.date = dateEntered;
        entry.type = type;
        entry.quantity = quantity;
        const result = await entry.save();
        return res.status(200).json({ entry: result });
    }
    catch (error) {
        next(error);
    }
};
exports.updateEntry = updateEntry;
const getSpecificDateEntries = async (req, res, next) => {
    const { type, date } = req.query;
    const dateEntered = (0, dateHelpers_1.formatDate)(new Date(date));
    try {
        if (!type) {
            const newError = {
                message: 'Please specify a type',
                name: 'No Type',
                status: 403,
                data: {
                    message: 'Please specify a type',
                    statusCode: 404,
                },
            };
            throw newError;
        }
        const entries = await entry_1.Entry.find({
            type,
            date: new Date(dateEntered),
        });
        return res.status(200).json({ entries });
    }
    catch (error) {
        next(error);
    }
};
exports.getSpecificDateEntries = getSpecificDateEntries;
//# sourceMappingURL=entry.js.map