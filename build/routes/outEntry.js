"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const outEntry_controller_1 = require("../controllers/outEntry.controller");
const router = (0, express_1.Router)();
router.get('/', outEntry_controller_1.getOutEntries);
router.post('/', outEntry_controller_1.createOutEntry);
router.get('/:outEntryId', outEntry_controller_1.getOutEntry);
router.put('/:outEntryId', outEntry_controller_1.updateOutEntry);
router.delete('/:outEntryId', outEntry_controller_1.deleteOutEntry);
exports.default = router;
//# sourceMappingURL=outEntry.js.map