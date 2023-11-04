import { Router } from 'express';
import {
  createItem,
  deleteItem,
  getAllItems,
  getItem,
  updateItem,
} from '../controllers/item.controller';

const router = Router();

router.get('/', getAllItems);

router.get('/:itemId', getItem);

router.post('/', createItem);

router.put('/:itemId', updateItem);

router.delete('/:itemId', deleteItem);

export default router;
