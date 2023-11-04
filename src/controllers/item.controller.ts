import { RequestHandler } from 'express';
import { Item } from '../models/item';
import { ErrorResponse } from '..';

export const createItem: RequestHandler = async (req, res, next) => {
  const { title } = req.body as { title: string };

  try {
    const newItem = new Item({ title });

    const result = await newItem.save();

    return res.status(201).json({ item: result });
  } catch (error) {
    next(error);
  }
};

export const updateItem: RequestHandler = async (req, res, next) => {
  const { title } = req.body as { title: string };
  const { itemId } = req.params as { itemId: string };

  try {
    const item = await Item.findById(itemId);

    if (!item) {
      const newError: ErrorResponse = {
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
  } catch (error) {
    next(error);
  }
};

export const getItem: RequestHandler = async (req, res, next) => {
  const { itemId } = req.params as { itemId: string };

  try {
    const item = await Item.findById(itemId);

    if (!item) {
      const newError: ErrorResponse = {
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
  } catch (error) {
    next(error);
  }
};

export const getAllItems: RequestHandler = async (req, res, next) => {
  try {
    const items = await Item.find();

    return res.status(200).json({ items });
  } catch (error) {
    next(error);
  }
};

export const deleteItem: RequestHandler = async (req, res, next) => {
  const { itemId } = req.params as { itemId: string };

  try {
    const item = await Item.findByIdAndDelete(itemId);

    if (!item) {
      const newError: ErrorResponse = {
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
  } catch (error) {
    next(error);
  }
};
