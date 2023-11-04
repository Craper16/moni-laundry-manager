"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const entry_1 = require("../controllers/entry");
const router = (0, express_1.Router)();
router.get('/all', entry_1.getEntries);
router.get('/by-date', entry_1.getSpecificDateEntries);
router.get('/:entry_id', entry_1.getEntry);
router.post('/multiple', entry_1.createMultipleEntries);
router.post('/', entry_1.createEntry);
router.delete('/:entry_id', entry_1.deleteEntry);
router.put('/:entry_id', entry_1.updateEntry);
exports.default = router;
//# sourceMappingURL=entry.js.map