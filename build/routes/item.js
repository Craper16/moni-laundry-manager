"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const item_controller_1 = require("../controllers/item.controller");
const router = (0, express_1.Router)();
router.get('/', item_controller_1.getAllItems);
router.get('/:itemId', item_controller_1.getItem);
router.post('/', item_controller_1.createItem);
router.put('/:itemId', item_controller_1.updateItem);
router.delete('/:itemId', item_controller_1.deleteItem);
exports.default = router;
//# sourceMappingURL=item.js.map