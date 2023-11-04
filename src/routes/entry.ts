import { Router } from 'express';
import {
  createEntry,
  createMultipleEntries,
  deleteEntry,
  getEntries,
  getEntry,
  getSpecificDateEntries,
  updateEntry,
} from '../controllers/entry';

const router = Router();

router.get('/all', getEntries);

router.get('/by-date', getSpecificDateEntries);

router.get('/:entry_id', getEntry);

router.post('/multiple', createMultipleEntries);

router.post('/', createEntry);

router.delete('/:entry_id', deleteEntry);

router.put('/:entry_id', updateEntry);

export default router;
