import * as dotenv from 'dotenv';
dotenv.config();

import express, {
  NextFunction,
  Request,
  Response,
  json,
  urlencoded,
} from 'express';

import cors from 'cors';
import { connectToDb } from './helpers/db';
import itemRoutes from './routes/item';
import entriesRoutes from './routes/entry';

export interface ErrorResponse extends Error {
  status: number;
  data?: { message: string; statusCode: number; reason?: string; data?: any[] };
}

connectToDb()
  .then(() => console.log('Connected'))
  .catch((error) => console.log(error));

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.use('/api/items', itemRoutes);
app.use('/api/entries', entriesRoutes);

app.use('*', (req: Request, res: Response) => {
  return res.status(404).json({ message: 'Endpoint does not exist' });
});

app.use(
  (error: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
    const { message, status, data } = error;
    res
      .status(status || 500)
      .json({ message: message || 'Internal server error', data: data });
  }
);

app.listen(process.env.PORT || 8060);
