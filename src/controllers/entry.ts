import { RequestHandler } from 'express';
import { Entry } from '../models/entry';
import { ErrorResponse } from '..';
import { Item } from '../models/item';
import { PER_PAGE } from '../constants/constants';
import { formatDate } from '../helpers/dateHelpers';
import dayjs from 'dayjs';

export const createEntry: RequestHandler = async (req, res, next) => {
  const { date, itemId, quantity, type } = req.body as {
    itemId: string;
    date: string;
    quantity: number;
    type: 'in' | 'out';
  };

  const dateEntered = new Date(date);

  try {
    const item = await Item.findById(itemId);
    const itemAlreadyAdded = await Entry.findOne({
      item: itemId,
      date: dateEntered,
      type,
    });

    if (itemAlreadyAdded) {
      const newError: ErrorResponse = {
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

    const entry = new Entry({
      date: dateEntered,
      item: item?._id,
      quantity: quantity,
      type,
    });

    const result = await entry.save();

    return res.status(201).json({ entry: result });
  } catch (error) {
    next(error);
  }
};

export const createMultipleEntries: RequestHandler = async (req, res, next) => {
  const { date, type, entries } = req.body as {
    date: string;
    type: 'in' | 'out';
    entries: { itemId: string; quantity: number }[];
  };

  const dateEntered = new Date(date);

  try {
    const createdEntries = await Promise.all(
      entries.map(async ({ itemId, quantity }) => {
        const itemAlreadyAdded = await Entry.findOne({
          item: itemId,
          date: dateEntered,
          type,
        });

        if (itemAlreadyAdded) {
          const newError: ErrorResponse = {
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

        const item = await Item.findById(itemId);
        const entry = new Entry({
          date: dateEntered,
          item: item?._id,
          type,
          quantity,
        });

        const result = await entry.save();

        return result;
      })
    );

    return res.status(201).json({ entries: createdEntries });
  } catch (error) {
    next(error);
  }
};

export const getEntry: RequestHandler = async (req, res, next) => {
  const { entry_id } = req.params as { entry_id: string };
  try {
    const entry = await Entry.findById(entry_id);

    if (!entry) {
      const newError: ErrorResponse = {
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
  } catch (error) {
    next(error);
  }
};

export const getEntries: RequestHandler = async (req, res, next) => {
  const { page, item_id, type, date_from, date_to, limit } = req.query as {
    date_from?: string;
    date_to?: string;
    page: string;
    item_id?: string;
    type: 'in' | 'out';
    limit?: string;
  };

  try {
    const dateFrom = date_from ? new Date(date_from) : undefined;
    const dateTo = date_to ? new Date(date_to) : undefined;
    const item = item_id ? await Item.findById(item_id) : undefined;

    if (!type) {
      const newError: ErrorResponse = {
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

    const entries = await Entry.paginate(
      {
        ...(dateFrom && dateTo && { date: { $gte: dateFrom, $lte: dateTo } }),
        ...(item_id && { item: item?._id }),
        type,
      },
      {
        page: page ? +page : 1,
        sort: { date: -1 },
        limit: limit ? +limit : PER_PAGE,
      }
    );

    return res.status(200).json({ entries });
  } catch (error) {
    next(error);
  }
};

export const deleteEntry: RequestHandler = async (req, res, next) => {
  const { entry_id } = req.params as { entry_id: string };

  try {
    const entry = await Entry.findByIdAndDelete(entry_id);

    if (!entry) {
      const newError: ErrorResponse = {
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
  } catch (error) {
    next(error);
  }
};

export const updateEntry: RequestHandler = async (req, res, next) => {
  const { entry_id } = req.params as { entry_id: string };
  const { date, itemId, quantity, type } = req.body as {
    itemId: string;
    date: string;
    quantity: number;
    type: 'in' | 'out';
  };

  try {
    const entry = await Entry.findById(entry_id);
    const item = await Item.findById(itemId);

    const dateEntered = new Date(date);

    if (!entry) {
      const newError: ErrorResponse = {
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

    entry.item = item._id as any;
    entry.date = dateEntered;
    entry.type = type;
    entry.quantity = quantity;

    const result = await entry.save();

    return res.status(200).json({ entry: result });
  } catch (error) {
    next(error);
  }
};

export const getSpecificDateEntries: RequestHandler = async (
  req,
  res,
  next
) => {
  const { type, date } = req.query as { type: 'in' | 'out'; date: string };

  const dateEntered = formatDate(new Date(date));

  try {
    if (!type) {
      const newError: ErrorResponse = {
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

    const entries = await Entry.find({
      type,
      date: new Date(dateEntered),
    });

    return res.status(200).json({ entries });
  } catch (error) {
    next(error);
  }
};
