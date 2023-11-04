"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inEntry_controller_1 = require("../controllers/inEntry.controller");
const router = (0, express_1.Router)();
router.get('/', inEntry_controller_1.getInEntries);
router.post('/', inEntry_controller_1.createInEntry);
router.get('/:inEntryId', inEntry_controller_1.getInEntry);
router.put('/:inEntryId', inEntry_controller_1.updateInEntry);
router.delete('/:inEntryId', inEntry_controller_1.deleteInEntry);
exports.default = router;
//# sourceMappingURL=inEntry.js.map