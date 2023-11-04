"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.getAllItems = exports.getItem = exports.updateItem = exports.createItem = void 0;
const item_1 = require("../models/item");
const createItem = async (req, res, next) => {
    const { title } = req.body;
    try {
        const newItem = new item_1.Item({ title });
        const result = await newItem.save();
        return res.status(201).json({ item: result });
    }
    catch (error) {
        next(error);
    }
};
exports.createItem = createItem;
const updateItem = async (req, res, next) => {
    const { title } = req.body;
    const { itemId } = req.params;
    try {
        const item = await item_1.Item.findById(itemId);
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
        item.title = title;
        const result = await item.save();
        return res.status(200).json({ item: result });
    }
    catch (error) {
        next(error);
    }
};
exports.updateItem = updateItem;
const getItem = async (req, res, next) => {
    const { itemId } = req.params;
    try {
        const item = await item_1.Item.findById(itemId);
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
        return res.status(200).json({ item });
    }
    catch (error) {
        next(error);
    }
};
exports.getItem = getItem;
const getAllItems = async (req, res, next) => {
    try {
        const items = await item_1.Item.find();
        return res.status(200).json({ items });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllItems = getAllItems;
const deleteItem = async (req, res, next) => {
    const { itemId } = req.params;
    try {
        const item = await item_1.Item.findByIdAndDelete(itemId);
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
        return res.status(200).json({ item });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteItem = deleteItem;
//# sourceMappingURL=item.controller.js.map