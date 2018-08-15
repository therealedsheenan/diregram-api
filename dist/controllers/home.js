"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * GET home page.
 */
exports.index = (req, res, next) => {
    res.json({
        title: "Welcome to min-ts-node.",
        description: "Minimal typescript + node express implementation\n"
    });
};
/*
 * GET sample page.
 */
exports.sample = (req, res, next) => {
    res.send("This is the users endpoint.");
};
//# sourceMappingURL=home.js.map