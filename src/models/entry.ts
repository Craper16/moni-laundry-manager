import mongoose, { ObjectId, PaginateModel, Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import autopopulate from 'mongoose-autopopulate';

export interface EntryModel {
  item: ObjectId;
  quantity: number;
  date: Date;
  type: 'in' | 'out';
}

const entrySchema = new Schema<EntryModel>(
  {
    item: {
      type: mongoose.Types.ObjectId,
      ref: 'Item',
      required: true,
      autopopulate: true,
    },
    quantity: { type: Number, required: true },
    type: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

entrySchema.plugin(paginate);
entrySchema.plugin(autopopulate);

export const Entry = model<EntryModel, PaginateModel<EntryModel>>(
  'entry',
  entrySchema
);
