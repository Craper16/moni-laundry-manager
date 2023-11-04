import { Schema, model } from 'mongoose';

export interface ItemModel {
  title: string;
}

const itemSchema = new Schema<ItemModel>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Item = model<ItemModel>('Item', itemSchema);
