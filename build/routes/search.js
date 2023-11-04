"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const search_controller_1 = require("../controllers/search.controller");
const router = (0, express_1.Router)();
router.get('/in-entries', search_controller_1.searchInEntries);
router.get('/out-entries', search_controller_1.searchOutEntries);
exports.default = router;
//# sourceMappingURL=search.js.map